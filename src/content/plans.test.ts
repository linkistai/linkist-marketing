import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { AED_PER_USD, BUNDLES, CARD_TIERS, MATERIALS, PLANS } from './plans';

/** Every [label, USD, AED] price pair the site shows. */
function pairs(): [string, number, number][] {
  const out: [string, number, number][] = [];
  for (const p of PLANS) {
    out.push([`${p.key} monthly`, p.monthly, p.aed.monthly]);
    if (p.yearly !== undefined) out.push([`${p.key} yearly`, p.yearly, p.aed.yearly ?? NaN]);
    if (p.team) {
      for (const k of ['monthly', 'yearly'] as const) {
        out.push([`${p.key} team ${k}`, p.team.usd[k], p.team.aed[k]]);
        out.push([`${p.key} extra user ${k}`, p.team.extra.usd[k], p.team.extra.aed[k]]);
      }
    }
  }
  for (const t of CARD_TIERS) for (const m of MATERIALS) out.push([`${t.key} ${m.key}`, t.prices.USD[m.key], t.prices.AED[m.key]]);
  for (const b of BUNDLES) out.push([b.key, b.price.USD, b.price.AED]);
  return out;
}

describe('prices in two currencies (D78)', () => {
  it('shows every dirham price as the dollar price at AED 4 to the dollar, so the switch never changes the amount', () => {
    expect(AED_PER_USD).toBe(4);
    for (const [label, usd, aed] of pairs()) expect(aed, label).toBe(usd * AED_PER_USD);
  });

  it('writes the same pairs in the page and answer text', () => {
    // Any "AED n ($m)", "$m (AED n)" or "USD m (AED n)" written out in a page, the help centre, the assistant or llms.txt follows the same rate.
    const files = ['src/content/help.ts', 'src/lib/knowledge.ts', 'src/app/bundles/page.tsx', 'src/app/nfc-cards/page.tsx', 'src/app/pricing/page.tsx', 'src/app/early-access/page.tsx', 'src/app/llms.txt/route.ts', 'src/content/plans.ts'];
    for (const f of files) {
      const text = readFileSync(f, 'utf8');
      const n = (s: string) => Number(s.replace(/,/g, ''));
      for (const m of text.matchAll(/AED ([\d,]+) \(\$([\d,]+)\)/g)) expect(n(m[1]!), `${f}: ${m[0]}`).toBe(n(m[2]!) * AED_PER_USD);
      for (const m of text.matchAll(/(?:\$|USD )([\d,]+) \(AED ([\d,]+)\)/g)) expect(n(m[2]!), `${f}: ${m[0]}`).toBe(n(m[1]!) * AED_PER_USD);
    }
    expect(readFileSync('src/app/early-access/page.tsx', 'utf8')).toContain('USD 100 (AED 400)');
  });
});
