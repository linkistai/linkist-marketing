import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { LANDING_PATHS } from '@/components/SiteChrome';
import { closedReason, readClaim } from './early-access';

const good = { firstName: ' Aisha ', lastName: 'Kareem', email: 'aisha@example.com', country: 'United Arab Emirates', updates: true };

describe('early access claims (D77)', () => {
  it('accepts a complete claim, trimmed, and keeps only the known tracking tags', () => {
    const r = readClaim({ ...good, source: { utm_source: 'linkedin', utm_campaign: 'uae55', other: 'x', gclid: '' } });
    expect(r).toEqual({
      ok: true,
      claim: { firstName: 'Aisha', lastName: 'Kareem', email: 'aisha@example.com', country: 'United Arab Emirates', updates: true, source: { utm_source: 'linkedin', utm_campaign: 'uae55' } },
    });
  });

  it('takes product updates only from a ticked box', () => {
    const r = readClaim({ ...good, updates: 'yes' });
    expect(r.ok && r.claim.updates).toBe(false);
  });

  it('names every missing or wrong field', () => {
    const r = readClaim({ firstName: '', lastName: ' ', email: 'not-an-email', country: 'Atlantis' });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(Object.keys(r.errors).sort()).toEqual(['country', 'email', 'firstName', 'lastName']);
  });

  it('stays open until the end of 6 December 2026 in Dubai, unless the places are marked as taken', () => {
    expect(closedReason(new Date('2026-11-16T10:00:00+04:00'), undefined)).toBeNull();
    expect(closedReason(new Date('2026-12-06T23:59:00+04:00'), '')).toBeNull();
    expect(closedReason(new Date('2026-12-07T00:00:01+04:00'), undefined)).toBe('Early access closed on 6 December 2026.');
    expect(closedReason(new Date('2026-11-20T10:00:00+04:00'), '1')).toBe('All 200 early access places have been taken.');
  });

  it('keeps the code out of the page and the form, so it shows only after a claim', () => {
    for (const f of ['src/app/early-access/page.tsx', 'src/components/early-access/ClaimForm.tsx', 'src/lib/early-access.ts']) {
      expect(readFileSync(f, 'utf8').includes('UAE55'), f).toBe(false);
    }
    expect(readFileSync('src/app/api/early-access/route.ts', 'utf8').includes("|| 'UAE55'")).toBe(true);
  });

  it('gives the landing page its own header and footer', () => {
    expect(LANDING_PATHS).toContain('/early-access');
  });
});
