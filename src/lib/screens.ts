import { existsSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Resolves a real capture in public/screens at build time. Returns undefined when the capture
 * has not been taken yet, so ScreenFrame shows its pending state instead of a mock (rule 2).
 * Prototype-derived design previews use the v6- or profile- prefix and must be shown with the preview badge.
 * Server components only.
 */
export function screen(name: string): string | undefined {
  for (const ext of ['png', 'webp']) {
    const file = `${name}.${ext}`;
    if (existsSync(join(process.cwd(), 'public/screens', file))) return `/screens/${file}`;
  }
  return undefined;
}

/** A 4:3 crop of a screen's upper part (status bar removed), written by `pnpm capture:v6` into public/screens/crops. */
export function crop(name: string): string | undefined {
  const file = `${name}-43.webp`;
  return existsSync(join(process.cwd(), 'public/screens/crops', file)) ? `/screens/crops/${file}` : undefined;
}

/** v6- and profile- screens are prototype previews (D51); anything else in public/screens is a real capture. */
export const isPreview = (name: string) => /^(proto|v6|v12|profile)-/.test(name);

/** A generated asset under public, or undefined until the image plan produces it (brief 8). */
export function asset(path: string): string | undefined {
  return existsSync(join(process.cwd(), 'public', path)) ? `/${path}` : undefined;
}

export const person = (name: string) => asset(`assets/people/${name}-2x.webp`);
export const object = (name: string) => asset(`assets/3d/3d-${name}-2x.webp`);
export const scene = (name: string) => asset(`assets/scenes/${name}-2x.webp`);
