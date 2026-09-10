/**
 * Brand assets from the prototype's logo lockup (brief 3.8): the crimson mark is cropped and
 * trimmed to a transparent PNG for the wordmark, and app icons are drawn on the ground colour.
 * Vector originals from the client replace public/brand/mark.png when they arrive (confirm list).
 *
 *   pnpm tsx scripts/brand-build.ts
 *
 * Note: sharp runs trim before extract inside one pipeline, so the crop and the trim are two steps.
 */
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const lockup = join(root, '../prototype/assets/d402e071-eaf5-4eb1-adab-548f46d88c02.png');
const brandDir = join(root, 'public/brand');
const publicDir = join(root, 'public');
const appDir = join(root, 'src/app');

async function icon(size: number, markShare: number, radius: number, out: string, mark: Buffer) {
  const markSize = Math.round(size * markShare);
  const m = await sharp(mark).resize(markSize, markSize, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  const bg = Buffer.from(`<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="#141413"/></svg>`);
  await sharp(bg).composite([{ input: m, gravity: 'centre' }]).png().toFile(out);
  console.log('  ok', out.replace(root, ''));
}

async function main() {
  if (!existsSync(lockup)) throw new Error(`lockup not found at ${lockup}`);
  mkdirSync(brandDir, { recursive: true });
  // The mark occupies the left third of the 1352 x 422 lockup. Crop first, then trim to alpha bounds.
  const crop = await sharp(lockup).ensureAlpha().extract({ left: 20, top: 20, width: 400, height: 380 }).png().toBuffer();
  const mark = await sharp(crop).trim().png().toBuffer();
  const meta = await sharp(mark).metadata();
  const w = meta.width ?? 0;
  const h = meta.height ?? 0;
  const side = Math.max(w, h);
  const square = await sharp(mark)
    .extend({ top: Math.floor((side - h) / 2), bottom: Math.ceil((side - h) / 2), left: Math.floor((side - w) / 2), right: Math.ceil((side - w) / 2), background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  await sharp(square).resize(256, 256).png().toFile(join(brandDir, 'mark.png'));
  console.log(`  ok /public/brand/mark.png (mark ${w} x ${h}, padded square)`);
  await sharp(lockup).png().toFile(join(brandDir, 'lockup.png'));
  await icon(256, 0.62, 56, join(appDir, 'icon.png'), square);
  await icon(180, 0.62, 40, join(appDir, 'apple-icon.png'), square);
  await icon(192, 0.62, 42, join(publicDir, 'icon-192.png'), square);
  await icon(512, 0.62, 112, join(publicDir, 'icon-512.png'), square);
  await icon(512, 0.46, 0, join(publicDir, 'maskable-512.png'), square);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
