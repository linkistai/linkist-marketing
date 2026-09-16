/**
 * The home hero scene (D50). Nano Banana 2 renders the phone with a flat magenta screen and the
 * cards blank (image plan, "Rules carried from the brief": never generate app screens, logos or
 * text). This script then puts the real design preview on the screen, pixel for pixel wherever the
 * magenta is, composites the brand mark file onto the black card, and turns the magenta light the
 * render casts on the surface and the bezel into the brand crimson. The raw render and the master
 * stay under public/assets/masters (git-ignored); `pnpm imagery hero-composite` delivers the WebP
 * files the site resolves through `scene('hero-composite')`.
 *
 *   pnpm tsx scripts/hero-composite.ts
 */
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const RAW = join(root, 'public/assets/masters/scenes-raw/hero-composite-raw.png');
const SCREEN = join(root, 'public/screens/proto-home.png');
const MARK = join(root, 'public/brand/mark.png');
const OUT = join(root, 'public/assets/masters/scenes/hero-composite.png');

/** Where the mark sits on the black card in the raw render (measured on the 2048 px render, 16 September 2026). */
const CARD_MARK = { left: 296, top: 1012, size: 76 };
/** The final crop: the objects with a little less of the empty studio around them, still square. */
const CROP = { left: 130, top: 240, width: 1790, height: 1790 };

/** How magenta a pixel is: 1 on the flat #FF00FF screen, 0 on anything neutral. */
const magenta = (r: number, g: number, b: number) => Math.max(0, Math.min(1, (Math.min(r, b) - g - 40) / 120));

async function main() {
  if (!existsSync(RAW)) throw new Error(`raw render not found at ${RAW}; download the Magnific render there first`);
  const { data, info } = await sharp(RAW).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;

  // 1. The screen: the bounding box of the fully magenta pixels, and a soft mask for its edges.
  let minx = W;
  let miny = H;
  let maxx = 0;
  let maxy = 0;
  const mask = Buffer.alloc(W * H);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 3;
      const m = magenta(data[i]!, data[i + 1]!, data[i + 2]!);
      mask[y * W + x] = Math.round(m * 255);
      if (m >= 0.99) {
        if (x < minx) minx = x;
        if (x > maxx) maxx = x;
        if (y < miny) miny = y;
        if (y > maxy) maxy = y;
      }
    }
  }
  const slot = { left: minx, top: miny, width: maxx - minx + 1, height: maxy - miny + 1 };
  console.log(`screen slot ${slot.width} x ${slot.height} at ${slot.left},${slot.top} (${(slot.width / slot.height).toFixed(3)})`);

  // 2. The magenta spill outside the screen becomes crimson: keep the red, pull the blue back towards the green.
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 3;
      const r = data[i]!;
      const g = data[i + 1]!;
      const b = data[i + 2]!;
      const m = mask[y * W + x]!;
      if (b > g + 12 && r > g + 12 && m < 250) {
        data[i + 2] = Math.round(g + (b - g) * 0.3);
        data[i] = Math.min(255, Math.round(r * 0.96));
      }
      // The anti-aliased rim of the screen darkens towards the bezel so the preview blends into black, not into a red fringe.
      if (m > 0 && m < 250) {
        const k = 1 - m / 255;
        data[i] = Math.round(data[i]! * k);
        data[i + 1] = Math.round(data[i + 1]! * k);
        data[i + 2] = Math.round(data[i + 2]! * k);
      }
    }
  }
  const base = sharp(data, { raw: { width: W, height: H, channels: 3 } });

  // 3. The design preview, fitted to the slot's width and aligned to the top (the capture is a touch wider than the
  //    screen, so nothing is cut; the sliver left below the tab bar is the black of the home-indicator zone), masked by the magenta.
  const screen = await sharp(SCREEN).resize({ width: slot.width, height: slot.height, fit: 'contain', position: 'top', background: '#000000', kernel: 'lanczos3' }).ensureAlpha().raw().toBuffer();
  const overlay = Buffer.alloc(W * H * 4);
  for (let y = 0; y < slot.height; y++) {
    for (let x = 0; x < slot.width; x++) {
      const s = (y * slot.width + x) * 4;
      const X = slot.left + x;
      const Y = slot.top + y;
      const o = (Y * W + X) * 4;
      overlay[o] = screen[s]!;
      overlay[o + 1] = screen[s + 1]!;
      overlay[o + 2] = screen[s + 2]!;
      overlay[o + 3] = mask[Y * W + X]!;
    }
  }

  // 4. The brand mark on the card, slightly translucent so the matte surface shows through as print would.
  const mark = await sharp(MARK).resize(CARD_MARK.size).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 3; i < mark.data.length; i += 4) mark.data[i] = Math.round(mark.data[i]! * 0.92);
  const markPng = await sharp(mark.data, { raw: { width: mark.info.width, height: mark.info.height, channels: 4 } }).png().toBuffer();

  // sharp crops before it composites, so the composite is finished first and the crop is a second pass.
  mkdirSync(dirname(OUT), { recursive: true });
  const composed = await base
    .composite([
      { input: overlay, raw: { width: W, height: H, channels: 4 }, left: 0, top: 0 },
      { input: markPng, left: CARD_MARK.left, top: CARD_MARK.top },
    ])
    .png()
    .toBuffer();
  await sharp(composed).extract(CROP).png().toFile(OUT);
  console.log(`ok ${OUT} (${CROP.width} x ${CROP.height}); now run: pnpm imagery hero-composite`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
