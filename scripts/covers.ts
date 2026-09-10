/**
 * Cover images for articles written in-house (checkpoint 5): a 1600 x 900 title card on the brand
 * ground with the crimson glow, rendered with the brand fonts through Playwright, for every post
 * in content/blog whose cover file does not exist yet. Imported articles keep their photographs.
 *
 *   pnpm covers            every post without a cover
 *   pnpm covers <slug>     one post, rendered again even if it exists
 */
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';
import { getPosts } from '../src/lib/blog';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const only = process.argv.slice(2).filter((a) => !a.startsWith('-'));

const data = (file: string) => (existsSync(file) ? `data:image/png;base64,${readFileSync(file).toString('base64')}` : '');
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function html(title: string, eyebrow: string) {
  const mark = data(join(root, 'public/brand/mark.png'));
  const size = title.length > 60 ? 76 : title.length > 40 ? 88 : 100;
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@600;700&family=Inter:wght@500;600&display=block" rel="stylesheet">
<style>
  html,body{margin:0;width:1600px;height:900px;overflow:hidden}
  body{background:#141413;color:#fff;font-family:Inter,system-ui,sans-serif;position:relative}
  .glow{position:absolute;left:62%;top:50%;width:1300px;height:1100px;transform:translate(-50%,-30%);border-radius:50%;background:radial-gradient(closest-side,rgba(206,57,77,.30),transparent)}
  .rail{position:absolute;left:96px;right:96px;bottom:120px;height:2px;background:rgba(255,255,255,.10)}
  .rail::before{content:'';position:absolute;left:0;top:0;height:2px;width:34%;background:linear-gradient(90deg,#CE394D,#E85F5F)}
  .dot{position:absolute;bottom:113px;width:16px;height:16px;border-radius:50%;background:#CE394D;box-shadow:0 0 0 6px rgba(206,57,77,.25)}
  .wrap{position:absolute;inset:0;padding:96px}
  .brand{display:inline-flex;align-items:center;gap:14px;font-family:'DM Sans';font-weight:700;font-size:44px;letter-spacing:-.02em}
  .brand img{width:48px;height:48px}
  .eyebrow{display:flex;align-items:center;gap:12px;margin-top:150px;font-size:22px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#D1CDC7}
  .eyebrow::before{content:'';width:10px;height:10px;border-radius:50%;background:#CE394D}
  h1{font-family:'DM Sans';font-weight:600;font-size:${size}px;line-height:1.04;letter-spacing:-.02em;margin:22px 0 0;max-width:1240px;text-wrap:balance}
</style></head><body>
<div class="glow"></div>
<div class="wrap">
  <span class="brand">${mark ? `<img src="${mark}" alt="">` : ''}Linkist</span>
  <p class="eyebrow">${esc(eyebrow)}</p>
  <h1>${esc(title)}</h1>
</div>
<div class="rail"></div><span class="dot" style="left:calc(96px + 34% - 8px)"></span>
</body></html>`;
}

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  let n = 0;
  for (const post of getPosts()) {
    const file = join(root, 'public', post.cover.replace(/^\//, ''));
    if (only.length ? !only.includes(post.slug) : existsSync(file)) continue;
    mkdirSync(dirname(file), { recursive: true });
    await page.setContent(html(post.title, post.categoryLabel), { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    await page.screenshot({ path: file, type: 'jpeg', quality: 84 });
    console.log(`  ok ${post.cover}`);
    n += 1;
  }
  await browser.close();
  console.log(`${n} cover(s) rendered.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
