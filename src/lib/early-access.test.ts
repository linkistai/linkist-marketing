import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { LANDING_PATHS } from '@/components/SiteChrome';
import { activationUrl, closedState, readClaim } from './early-access';

const good = { name: ' Aisha ', email: 'aisha@example.com' };
/** Everything a visitor reads on the early access page, in its email or in its link preview. */
const PAGE_FILES = ['src/app/early-access/page.tsx', 'src/components/early-access/ClaimForm.tsx', 'src/app/api/early-access/route.ts', 'src/lib/early-access.ts', 'src/content/og.ts'];

describe('early access claims (D77, D79)', () => {
  it('takes a name and an email, trimmed, and keeps only the known tracking tags', () => {
    const r = readClaim({ ...good, lastName: 'ignored', country: 'Atlantis', source: { utm_source: 'linkedin', utm_campaign: 'uae55', other: 'x', gclid: '' } });
    expect(r).toEqual({ ok: true, claim: { name: 'Aisha', email: 'aisha@example.com', source: { utm_source: 'linkedin', utm_campaign: 'uae55' } } });
  });

  it('asks nothing about product updates (owner, 26 November 2026, D85)', () => {
    expect(readClaim({ ...good, updates: true })).toEqual({ ok: true, claim: { name: 'Aisha', email: 'aisha@example.com', source: {} } });
    expect(readFileSync('src/components/early-access/ClaimForm.tsx', 'utf8')).not.toContain('type="checkbox"');
  });

  it('names every missing or wrong field in Liju’s words', () => {
    expect(readClaim({ name: ' ', email: 'not-an-email' })).toEqual({ ok: false, errors: { name: 'Enter your name.', email: 'Enter a valid email address.' } });
  });

  it('stays open until the end of 31 December 2026 in Dubai, unless the places are marked as taken', () => {
    expect(closedState(new Date('2026-11-17T10:00:00+04:00'), undefined)).toBeNull();
    expect(closedState(new Date('2026-12-31T23:59:00+04:00'), '')).toBeNull();
    expect(closedState(new Date('2027-01-01T00:00:01+04:00'), undefined)).toEqual({ state: 'closed', title: 'Early access sign-up closed on 31 December 2026.' });
    expect(closedState(new Date('2026-11-20T10:00:00+04:00'), '1')).toEqual({ state: 'full', title: 'All 55 Founding Member places have been claimed.', text: 'You can still try Linkist Pro.' });
  });
});

describe('the hand-off to the app (RatioX Labs, D79)', () => {
  it('opens the plans page with Pro annual, the UAE and the coupon chosen, and the email encoded', () => {
    expect(activationUrl('popup', 'a+b@example.com')).toBe(
      'https://prm.linkist.ai/plans?plan=pro&period=annual&country=AE&coupon=UAE55&email=a%2Bb%40example.com&utm_source=linkist_ai&utm_campaign=early_access_uae55&utm_medium=website&utm_content=early_access_popup',
    );
    const u = new URL(activationUrl('email', 'a+b@example.com'));
    expect(u.searchParams.get('email')).toBe('a+b@example.com');
    expect(u.searchParams.get('utm_medium')).toBe('email');
    expect(u.searchParams.get('utm_content')).toBe('early_access_email');
  });

  it('never carries the name, and leaves the email out of the address the button shows', () => {
    const shown = new URL(activationUrl('popup'));
    expect(shown.searchParams.has('email')).toBe(false);
    expect(shown.searchParams.has('name')).toBe(false);
    expect(new URL(activationUrl('popup', 'x@example.com')).searchParams.has('name')).toBe(false);
  });
});

describe('the page text (Liju’s notes v2.1)', () => {
  it('says 55 places and 31 December, and never asks anyone to paste a code', () => {
    for (const f of PAGE_FILES) {
      const t = readFileSync(f, 'utf8');
      expect(/\b200 (early|people|places|professionals|Founding)|first 200|All 200/.test(t), f).toBe(false);
      expect(t.includes('6 December'), f).toBe(false);
      expect(/paste/i.test(t), f).toBe(false);
    }
  });

  it('gives the landing page its own header and footer', () => {
    expect(LANDING_PATHS).toContain('/early-access');
  });
});
