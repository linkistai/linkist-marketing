import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const dir = join(__dirname);

describe('design tokens', () => {
  it('tokens.json matches its checksum (run pnpm tokens:build after changing it)', () => {
    const json = readFileSync(join(dir, 'tokens.json'), 'utf8');
    const sum = readFileSync(join(dir, 'tokens.sha256'), 'utf8').trim();
    expect(createHash('sha256').update(json).digest('hex')).toBe(sum);
  });

  it('carries the prototype palette and both themes', () => {
    const t = JSON.parse(readFileSync(join(dir, 'tokens.json'), 'utf8'));
    expect(t.color.brand.crimson).toBe('#CE394D');
    expect(t.color.brand.crimsonDeep).toBe('#B1394B');
    expect(t.color.brand.coral).toBe('#E85F5F');
    expect(t.color.brand.ground).toBe('#141413');
    expect(t.color.dark.surface).toBe('#262627');
    expect(Object.keys(t.color.light)).toEqual(Object.keys(t.color.dark));
    expect(t.font.display).toContain('DM Sans');
    expect(t.radius['2xl']).toBe('24px');
  });

  it('generated css makes dark the default and light the backup', () => {
    const css = readFileSync(join(dir, 'tokens.css'), 'utf8');
    expect(css).toContain('--brand-crimson: #CE394D;');
    expect(css).toMatch(/:root, :root\[data-theme="dark"\][^}]*--color-bg: #141413;/s);
    expect(css).toMatch(/:root\[data-theme="light"\][^}]*--color-bg: #FFFFFF;/s);
    expect(css).toContain('--shadow-glow: 0 8px 28px rgba(206,57,77,0.35);');
  });
});
