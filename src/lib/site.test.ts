import { describe, expect, it } from 'vitest';
import { coerceUrl, envString } from './site';

describe('environment URLs', () => {
  it('falls back when the variable is missing, empty or blank', () => {
    expect(coerceUrl(undefined, 'https://linkist.ai')).toBe('https://linkist.ai');
    expect(coerceUrl('', 'https://linkist.ai')).toBe('https://linkist.ai');
    expect(coerceUrl('   ', 'https://linkist.ai/')).toBe('https://linkist.ai');
  });

  it('falls back when the value is not an absolute http(s) URL', () => {
    expect(coerceUrl('linkist.ai', 'https://linkist.ai')).toBe('https://linkist.ai');
    expect(coerceUrl('mailto:hello@linkist.ai', 'https://linkist.ai')).toBe('https://linkist.ai');
  });

  it('keeps a good value and drops one trailing slash', () => {
    expect(coerceUrl('https://prm.linkist.ai/', 'https://x')).toBe('https://prm.linkist.ai');
    expect(coerceUrl(' https://m.linkist.ai/login ', 'https://x')).toBe('https://m.linkist.ai/login');
  });

  it('treats empty strings as unset', () => {
    expect(envString('')).toBeUndefined();
    expect(envString('  ')).toBeUndefined();
    expect(envString(' support@linkist.ai ')).toBe('support@linkist.ai');
  });
});
