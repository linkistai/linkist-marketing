/**
 * Visual review sheet (brief 10): full-page screenshots of the site's own pages at the QA widths,
 * plus a horizontal-overflow scan of every element's bounding box.
 *
 *   pnpm review                      all routes in sitemap.ts at 390 and 1440
 *   pnpm review / /pricing --widths 360,768,1280
 * Needs the site running (pnpm start on port 3200, or REVIEW_BASE_URL).
 */
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';
import { ROUTES as ALL } from '../src/app/sitemap';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const base = (process.env['REVIEW_BASE_URL'] ?? 'http://localhost:3200').replace(/\/$/, '');
const outDir = join(root, 'captures/site-review');
const args = process.argv.slice(2);
const wIdx = args.indexOf('--widths');
const widths = wIdx >= 0 ? (args[wIdx + 1] ?? '').split(',').map(Number) : [390, 1440];
const routes = args.filter((a, i) => a.startsWith('/') && i !== wIdx + 1);
const ROUTES = routes.length ? routes : [...ALL];

async function main() {
  mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  let failures = 0;
  for (const width of widths) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1, isMobile: width < 768, hasTouch: width < 768, colorScheme: 'dark' });
    for (const route of ROUTES) {
      const page = await ctx.newPage();
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(String(e)));
      page.on('console', (m) => m.type() === 'error' && !/404/.test(m.text()) && errors.push(m.text()));
      await page.goto(`${base}${route}?motion=off`, { waitUntil: 'load', timeout: 60_000 });
      await page.waitForTimeout(800);
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 700) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 40));
        }
        window.scrollTo(0, 0);
      });
      const overflow = await page.evaluate(() => {
        const w = document.documentElement.clientWidth;
        const bad: string[] = [];
        for (const el of Array.from(document.querySelectorAll<HTMLElement>('body *'))) {
          const r = el.getBoundingClientRect();
          if (r.width === 0) continue;
          if (el.closest('[style*="overflow-x: auto"], .fanstrip, .preview-row, .table-wrap, .seg, .segtabs, .ftabs__list')) continue;
          if (r.right > w + 1 || r.left < -1) bad.push(`${el.tagName.toLowerCase()}${el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : ''} ${Math.round(r.left)}..${Math.round(r.right)}`);
        }
        return { scrollWidth: document.documentElement.scrollWidth, clientWidth: w, bad: bad.slice(0, 8) };
      });
      const name = `${route === '/' ? 'home' : route.slice(1).replace(/\//g, '-')}-${width}.png`;
      await page.screenshot({ path: join(outDir, name), fullPage: true });
      const ok = overflow.scrollWidth <= overflow.clientWidth && errors.length === 0;
      if (!ok) failures++;
      console.log(`${ok ? 'ok  ' : 'FAIL'} ${route} @${width}  scrollWidth ${overflow.scrollWidth}/${overflow.clientWidth}${overflow.bad.length ? `  overflow: ${overflow.bad.join(' | ')}` : ''}${errors.length ? `  errors: ${errors.join(' | ')}` : ''}`);
      await page.close();
    }
    await ctx.close();
  }
  await browser.close();
  console.log(`review: sheets in captures/site-review (${failures} problem(s))`);
  process.exit(failures ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
