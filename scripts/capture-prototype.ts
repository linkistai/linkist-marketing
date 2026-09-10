/**
 * Design previews from the approved prototype (brief, rule 2 and Appendix A): the three phone
 * renders inside the prototype hero composite are design mockups, not app screens. Until real
 * captures exist they are shown in phone frames with a "Design preview" badge (Grownz D23), never
 * as live screens. This script crops each screen out of the composite into public/screens.
 *
 *   pnpm capture:prototype                write public/screens/proto-<name>.png and captures/prototype-log.json
 *   pnpm capture:prototype --grid <dir>   also write a measuring grid over the composite to <dir>
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, '../prototype/assets/2d0f0fdc-956c-4c4f-a14c-91fedfcee8f6.png');
const outDir = join(root, 'public/screens');
const logPath = join(root, 'captures/prototype-log.json');

/** Screen regions inside the bezels of the 960 x 810 composite. Occluded edges are trimmed to a 390:844 ratio. */
export const PROTO_SCREENS = {
  'proto-profile': { left: 44, top: 78, width: 238, height: 515, caption: 'Public profile page' },
  'proto-home': { left: 318, top: 62, width: 322, height: 697, caption: 'Home: Welcome Back, ICP Matches Found, a nudge, Opportunity Radar, Network Pulse, Relationship Health' },
  'proto-share': { left: 672, top: 78, width: 226, height: 489, caption: 'Share Contact with QR and Tap to Link' },
} as const;

async function main() {
  if (!existsSync(src)) throw new Error(`prototype composite not found at ${src}; unpack the prototype first`);
  const args = process.argv.slice(2);
  const gridIdx = args.indexOf('--grid');
  const meta = await sharp(src).metadata();
  if (gridIdx >= 0) {
    const dir = args[gridIdx + 1] ?? outDir;
    mkdirSync(dir, { recursive: true });
    const w = meta.width ?? 0;
    const h = meta.height ?? 0;
    const cols = Array.from({ length: Math.ceil(w / 50) }, (_, i) => `<line x1="${i * 50}" y1="0" x2="${i * 50}" y2="${h}" stroke="${i % 2 ? '#0f0' : '#ff0'}" stroke-width="1" opacity="0.8"/><text x="${i * 50 + 2}" y="12" font-size="10" fill="#0f0">${i * 50}</text>`);
    const rows = Array.from({ length: Math.ceil(h / 50) }, (_, i) => `<line x1="0" y1="${i * 50}" x2="${w}" y2="${i * 50}" stroke="${i % 2 ? '#0f0' : '#ff0'}" stroke-width="1" opacity="0.8"/><text x="2" y="${i * 50 + 12}" font-size="10" fill="#0f0">${i * 50}</text>`);
    await sharp(src).composite([{ input: Buffer.from(`<svg width="${w}" height="${h}">${cols.join('')}${rows.join('')}</svg>`), top: 0, left: 0 }]).toFile(join(dir, 'grid.png'));
    console.log(`grid: ${join(dir, 'grid.png')}`);
  }
  mkdirSync(outDir, { recursive: true });
  const log: Record<string, unknown>[] = [];
  for (const [name, c] of Object.entries(PROTO_SCREENS)) {
    const file = join(outDir, `${name}.png`);
    await sharp(src).extract({ left: c.left, top: c.top, width: c.width, height: c.height }).png().toFile(file);
    log.push({ name, source: 'Linkist Landing.html hero composite (design mockup, not an app screen)', region: { left: c.left, top: c.top, width: c.width, height: c.height }, caption: c.caption, at: new Date().toISOString() });
    console.log(`  ok screens/${name}.png  ${c.width}x${c.height} (${(c.width / c.height).toFixed(3)})`);
  }
  mkdirSync(dirname(logPath), { recursive: true });
  writeFileSync(logPath, JSON.stringify(log, null, 2) + '\n');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
