/**
 * Viewport-height slices of a route for close visual review (the full-page sheets from
 * scripts/review.ts are too small to read at desktop width).
 *
 *   pnpm tsx scripts/review-slices.ts / [--width 1440] [--out captures/site-review/slices]
 */
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const base = (process.env['REVIEW_BASE_URL'] ?? 'http://localhost:3200').replace(/\/$/, '');
const args = process.argv.slice(2);
const route = args.find((a) => a.startsWith('/')) ?? '/';
const wIdx = args.indexOf('--width');
const width = wIdx >= 0 ? Number(args[wIdx + 1]) : 1440;
const oIdx = args.indexOf('--out');
const out = join(root, oIdx >= 0 ? (args[oIdx + 1] ?? 'captures/site-review/slices') : 'captures/site-review/slices');
const motion = args.includes('--motion') ? 'on' : 'off';

async function main() {
  mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  const height = width > 768 ? 900 : 844;
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, isMobile: width < 768, hasTouch: width < 768, colorScheme: 'dark' });
  const page = await ctx.newPage();
  await page.goto(`${base}${route}?motion=${motion}`, { waitUntil: 'networkidle', timeout: 60_000 });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(600);
  const total = await page.evaluate(() => document.body.scrollHeight);
  const sliceH = width > 768 ? 2000 : 2400;
  const name = route === '/' ? 'home' : route.slice(1).replace(/\//g, '-');
  let i = 0;
  for (let y = 0; y < total; y += sliceH) {
    await page.screenshot({ path: join(out, `${name}-${width}-${i}.png`), fullPage: true, clip: { x: 0, y, width, height: Math.min(sliceH, total - y) } });
    i++;
  }
  console.log(`${route} @${width}: ${total}px tall, ${i} slices in ${out}`);
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
