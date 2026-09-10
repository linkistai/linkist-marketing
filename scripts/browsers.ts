/**
 * Cross-browser pass (brief 10): Chromium, Firefox and WebKit on desktop, plus an iPhone (WebKit)
 * and a Pixel (Chromium) emulation, against a running site. Every route loads without a page
 * error or console error and without horizontal overflow; the assistant answers three turns on
 * each engine; one screenshot per route and engine goes to captures/browsers for a visual pass.
 *
 *   pnpm browsers               every route in src/app/sitemap.ts
 *   pnpm browsers / /pricing    only those
 */
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium, devices, firefox, webkit, type Browser, type BrowserContextOptions } from '@playwright/test';
import { ROUTES } from '../src/app/sitemap';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const base = (process.env['REVIEW_BASE_URL'] ?? 'http://localhost:3200').replace(/\/$/, '');
const only = process.argv.slice(2).filter((a) => a.startsWith('/'));
const routes = only.length ? only : [...ROUTES];
const outDir = join(root, 'captures/browsers');

const TARGETS: { name: string; launch: () => Promise<Browser>; ctx: BrowserContextOptions }[] = [
  { name: 'chromium-desktop', launch: () => chromium.launch(), ctx: { viewport: { width: 1440, height: 900 } } },
  { name: 'firefox-desktop', launch: () => firefox.launch(), ctx: { viewport: { width: 1440, height: 900 } } },
  { name: 'webkit-desktop', launch: () => webkit.launch(), ctx: { viewport: { width: 1440, height: 900 } } },
  { name: 'iphone-webkit', launch: () => webkit.launch(), ctx: { ...devices['iPhone 14'] } },
  { name: 'pixel-chromium', launch: () => chromium.launch(), ctx: { ...devices['Pixel 7'] } },
];

async function main() {
  mkdirSync(outDir, { recursive: true });
  const problems: string[] = [];
  for (const t of TARGETS) {
    let browser: Browser;
    try {
      browser = await t.launch();
    } catch (err) {
      problems.push(`${t.name}: could not launch (${(err as Error).message.split('\n')[0]})`);
      continue;
    }
    const ctx = await browser.newContext(t.ctx);
    const version = browser.version();
    for (const route of routes) {
      const page = await ctx.newPage();
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(`pageerror ${e.message}`));
      page.on('console', (m) => m.type() === 'error' && !/404/.test(m.text()) && errors.push(`console ${m.text().slice(0, 120)}`));
      try {
        await page.goto(base + route, { waitUntil: 'load', timeout: 60_000 });
        await page.waitForTimeout(800);
        const overflow = await page.evaluate('({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth })') as { sw: number; cw: number };
        if (overflow.sw > overflow.cw) problems.push(`${t.name} ${route}: scrollWidth ${overflow.sw} > ${overflow.cw}`);
        const slug = route === '/' ? 'home' : route.slice(1).replace(/\//g, '-');
        await page.screenshot({ path: join(outDir, `${slug}-${t.name}.png`), fullPage: false });
      } catch (err) {
        problems.push(`${t.name} ${route}: ${(err as Error).message.split('\n')[0]}`);
      }
      for (const e of errors) problems.push(`${t.name} ${route}: ${e}`);
      await page.close();
    }
    // The assistant, three turns, on this engine.
    if (!only.length || only.includes('/chat')) {
      const page = await ctx.newPage();
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(`pageerror ${e.message}`));
      try {
        await page.goto(`${base}/chat`, { waitUntil: 'networkidle', timeout: 60_000 });
        let expected = 1;
        for (const q of ['Do I need an NFC card?', 'What is the weather in Dubai tomorrow?', 'How do I switch the AI off?']) {
          expected += 2;
          // A submit that lands before React has hydrated the form is lost (WebKit hydrates later than Chromium
          // on a cold load), which no visitor can do by typing; the test retries once, then waits for the answer.
          for (let attempt = 0; attempt < 2; attempt += 1) {
            await page.fill('#chat-q', q);
            await page.press('#chat-q', 'Enter');
            const ok = await page
              .waitForFunction(`document.querySelectorAll('[role="log"] li').length >= ${expected}`, undefined, { timeout: 6000 })
              .then(() => true)
              .catch(() => false);
            if (ok) break;
          }
        }
        const turns = await page.evaluate('document.querySelectorAll(\'[role="log"] li\').length') as number;
        if (turns < 7) problems.push(`${t.name} /chat: ${turns} turns rendered, expected at least 7`);
        const text = await page.evaluate('document.querySelector(\'[role="log"]\').innerText') as string;
        if (!/I do not have an answer/.test(text)) problems.push(`${t.name} /chat: the off-topic question did not get the fallback`);
      } catch (err) {
        problems.push(`${t.name} /chat: ${(err as Error).message.split('\n')[0]}`);
      }
      for (const e of errors) problems.push(`${t.name} /chat: ${e}`);
      await page.close();
    }
    console.log(`${t.name} (${version}): ${routes.length} routes${problems.filter((p) => p.startsWith(t.name)).length ? '' : ', clean'}`);
    await ctx.close();
    await browser.close();
  }
  for (const p of problems) console.log(`FAIL ${p}`);
  console.log(`browsers: ${TARGETS.length} targets, ${routes.length} routes, ${problems.length} problem(s); screenshots in captures/browsers`);
  process.exit(problems.length ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
