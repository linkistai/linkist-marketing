import { describe, expect, it } from 'vitest';
import { clampDescription } from './site';

describe('clampDescription', () => {
  it('leaves short descriptions alone', () => {
    expect(clampDescription('Short and sweet.')).toBe('Short and sweet.');
  });

  it('cuts at the last sentence end inside 160 characters', () => {
    const long = 'Linkist is a Personal Relationship Manager that captures the people you meet and remembers the context. Pair it with an NFC card or use it alone. Start free, no card required, and add a card any time you like.';
    const out = clampDescription(long);
    expect(out.length).toBeLessThanOrEqual(160);
    expect(out.endsWith('.')).toBe(true);
    expect(out).toBe('Linkist is a Personal Relationship Manager that captures the people you meet and remembers the context. Pair it with an NFC card or use it alone.');
  });

  it('falls back to a word boundary when there is no sentence end', () => {
    const long = 'a'.repeat(50) + ' ' + 'word '.repeat(40);
    const out = clampDescription(long);
    expect(out.length).toBeLessThanOrEqual(161);
    expect(out.endsWith('.')).toBe(true);
    expect(out.includes('  ')).toBe(false);
  });
});
