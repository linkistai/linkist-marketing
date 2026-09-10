import { existsSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Resolves a real capture in public/screens at build time. Returns undefined when the capture
 * has not been taken yet, so ScreenFrame shows its pending state instead of a mock (rule 2).
 * Prototype-derived design previews use the proto- prefix and must be shown with the preview badge.
 * Server components only.
 */
export function screen(name: string): string | undefined {
  const file = `${name}.png`;
  return existsSync(join(process.cwd(), 'public/screens', file)) ? `/screens/${file}` : undefined;
}

export const isPreview = (name: string) => name.startsWith('proto-');

/** A generated asset under public, or undefined until the image plan produces it (brief 8). */
export function asset(path: string): string | undefined {
  return existsSync(join(process.cwd(), 'public', path)) ? `/${path}` : undefined;
}

export const person = (name: string) => asset(`assets/people/${name}-2x.webp`);
export const object = (name: string) => asset(`assets/3d/3d-${name}-2x.webp`);
export const scene = (name: string) => asset(`assets/scenes/${name}-2x.webp`);
