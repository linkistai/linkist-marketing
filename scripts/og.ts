/**
 * Open Graph images, 1200 x 630, rendered with the brand fonts from an HTML template through
 * Playwright (brief 7). Each entry: slug, title, eyebrow, optional screen from public/screens
 * (drawn in a phone at the right) and optional person from public/assets/people.
 *
 *   pnpm og            all entries in OG_PAGES
 *   pnpm og home       one entry
 */
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';
import { OG_PAGES } from '../src/content/og';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public/og');
const only = process.argv.slice(2).filter((a) => !a.startsWith('-'));

const data = (file: string, mime: string) => (existsSync(file) ? `data:${mime};base64,${readFileSync(file).toString('base64')}` : '');

function html(title: string, eyebrow: string, screen?: string, person?: string) {
  const mark = data(join(root, 'public/brand/mark.png'), 'image/png');
  const shot = screen ? data(join(root, 'public/screens', `${screen}.png`), 'image/png') : '';
  const cut = person ? data(join(root, 'public/assets/people', `${person}-2x.webp`), 'image/webp') : '';
  const preview = screen?.startsWith('proto-');
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@600;700&family=Inter:wght@500;600&display=block" rel="stylesheet">
<style>
  html,body{margin:0;width:1200px;height:630px;overflow:hidden}
  body{background:#141413;color:#fff;font-family:Inter,system-ui,sans-serif;position:relative}
  .glow{position:absolute;left:50%;bottom:-360px;width:1100px;height:700px;transform:translateX(-50%);border-radius:50%;background:radial-gradient(closest-side,rgba(206,57,77,.34),transparent)}
  .wrap{position:absolute;inset:0;padding:64px 72px;display:flex;flex-direction:column;justify-content:space-between}
  .brand{display:inline-flex;align-items:center;gap:12px;font-family:'DM Sans';font-weight:700;font-size:38px;letter-spacing:-.02em}
  .brand img{width:40px;height:40px}
  .eyebrow{display:flex;align-items:center;gap:10px;font-size:20px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:#D1CDC7}
  .eyebrow::before{content:'';width:9px;height:9px;border-radius:50%;background:#CE394D}
  h1{font-family:'DM Sans';font-weight:600;font-size:${title.length > 44 ? 58 : 70}px;line-height:1.04;letter-spacing:-.02em;margin:18px 0 0;max-width:${shot || cut ? 660 : 960}px;text-wrap:balance}
  .foot{font-size:22px;color:#D1CDC7;max-width:${shot || cut ? 620 : 960}px}
  .phone{position:absolute;right:88px;top:96px;width:262px;height:567px;border-radius:40px;background:#0b0b0b;padding:8px;box-shadow:0 30px 70px rgba(0,0,0,.55),inset 0 0 0 2px #3a3a3b}
  .phone .screen{position:relative;width:100%;height:100%;border-radius:32px;overflow:hidden;background:#141413}
  .phone img{width:100%;height:100%;object-fit:cover;object-position:top}
  .badge{position:absolute;left:50%;top:16px;transform:translateX(-50%);padding:6px 10px;border-radius:999px;background:rgba(0,0,0,.7);border:1px solid rgba(255,255,255,.18);font:600 11px/1 Inter;letter-spacing:.06em;text-transform:uppercase;color:#fff;white-space:nowrap}
  .person{position:absolute;right:56px;bottom:0;max-height:600px;max-width:520px;width:auto;height:auto;filter:drop-shadow(0 24px 40px rgba(0,0,0,.5))}
</style></head><body>
<div class="glow"></div>
<div class="wrap">
  <div><span class="brand">${mark ? `<img src="${mark}" alt="">` : ''}Linkist</span>
    <p class="eyebrow" style="margin-top:44px">${eyebrow}</p>
    <h1>${title}</h1></div>
  <p class="foot">Personal Relationship Manager. Free plan, no card required. Add an NFC card any time.</p>
</div>
${shot ? `<div class="phone"><div class="screen"><img src="${shot}" alt="">${preview ? '<span class="badge">Design preview</span>' : ''}</div></div>` : ''}
${cut ? `<img class="person" src="${cut}" alt="">` : ''}
</body></html>`;
}

async function main() {
  mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  for (const og of OG_PAGES) {
    if (only.length && !only.includes(og.slug)) continue;
    await page.setContent(html(og.title, og.eyebrow, og.screen, og.person), { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    await page.screenshot({ path: join(outDir, `${og.slug}.png`), type: 'png' });
    console.log(`  ok og/${og.slug}.png`);
  }
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
