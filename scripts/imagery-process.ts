/**
 * Turns generated masters into the files the site resolves (brief 8, lib/screens.ts):
 *
 *   public/assets/masters/people/<name>.png   -> public/assets/people/<name>-1x.webp and -2x.webp (transparent margins trimmed)
 *   public/assets/masters/3d/<name>.png       -> public/assets/3d/3d-<name>-1x.webp and -2x.webp
 *   public/assets/masters/scenes/<name>.png   -> public/assets/scenes/<name>-1x.webp and -2x.webp
 *
 * Masters stay git-ignored; the delivered WebP files are committed. 2x widths: people 900,
 * objects 512, scenes 1200 (the components request those sizes). Run after every Magnific batch;
 * existing outputs are rewritten so a regenerated master replaces its old cut-out.
 *
 *   pnpm imagery            every master
 *   pnpm imagery hero-1     masters whose name contains the text
 */
import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import { basename, dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const filter = process.argv.slice(2).filter((a) => !a.startsWith('-'));

const KINDS: readonly { dir: string; out: string; prefix: string; width2x: number; trim: boolean }[] = [
  { dir: 'people', out: 'people', prefix: '', width2x: 900, trim: true },
  { dir: '3d', out: '3d', prefix: '3d-', width2x: 512, trim: true },
  { dir: 'scenes', out: 'scenes', prefix: '', width2x: 1200, trim: false },
];

async function deliver(src: string, outDir: string, name: string, width2x: number, trim: boolean) {
  mkdirSync(outDir, { recursive: true });
  // sharp applies trim before extract or resize inside one pipeline, so trim to a buffer first.
  const base = trim ? await sharp(src).trim({ threshold: 8 }).png().toBuffer() : await sharp(src).png().toBuffer();
  const meta = await sharp(base).metadata();
  const width = Math.min(width2x, meta.width ?? width2x);
  await sharp(base).resize({ width }).webp({ quality: 86, alphaQuality: 90 }).toFile(join(outDir, `${name}-2x.webp`));
  await sharp(base).resize({ width: Math.round(width / 2) }).webp({ quality: 84, alphaQuality: 90 }).toFile(join(outDir, `${name}-1x.webp`));
  return { width, height: meta.height ?? 0 };
}

async function main() {
  let n = 0;
  for (const kind of KINDS) {
    const dir = join(root, 'public/assets/masters', kind.dir);
    if (!existsSync(dir)) continue;
    for (const file of readdirSync(dir)) {
      if (!/\.(png|jpe?g|webp)$/i.test(file)) continue;
      const stem = basename(file, extname(file));
      if (filter.length && !filter.some((f) => stem.includes(f))) continue;
      const name = `${kind.prefix}${stem}`;
      const { width, height } = await deliver(join(dir, file), join(root, 'public/assets', kind.out), name, kind.width2x, kind.trim);
      console.log(`  ok assets/${kind.out}/${name}-2x.webp (${width} x ${Math.round((height * width) / Math.max(1, width))})`);
      n += 1;
    }
  }
  console.log(`${n} master(s) delivered. Masters stay in public/assets/masters (git-ignored).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
