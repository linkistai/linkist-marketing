import { COUNTRIES } from '@/content/countries';

/**
 * The UAE 55 early access offer, from Linkist's "Early Access UAE 55 Founding Members Page and Ads"
 * (November 2026, D77): 200 places, one year of Pro through a coupon the app accepts at checkout,
 * open until 6 December 2026 or until the places are taken. The site does not count the places; the
 * coupon's own limit in the app does, and EARLY_ACCESS_CLOSED closes the form once they are gone.
 */
export const EARLY_ACCESS = {
  /** The end of 6 December 2026, Dubai time. */
  closes: new Date('2026-12-06T23:59:59+04:00'),
  defaultCountry: 'United Arab Emirates',
} as const;

/** Query parameters a claim carries from the ad that brought the visitor, for the lead email. */
export const SOURCE_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid', 'li_fat_id'] as const;
export type SourceKey = (typeof SOURCE_KEYS)[number];

export interface Claim {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly country: string;
  readonly updates: boolean;
  readonly source: Partial<Record<SourceKey, string>>;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const text = (v: unknown, max: number) => (typeof v === 'string' ? v : '').replace(/\p{Cc}/gu, ' ').trim().slice(0, max);

/** Checks a claim from the form. Field errors use the form's field names. */
export function readClaim(body: Record<string, unknown>): { ok: true; claim: Claim } | { ok: false; errors: Record<string, string> } {
  const firstName = text(body['firstName'], 80);
  const lastName = text(body['lastName'], 80);
  const email = text(body['email'], 200);
  const country = text(body['country'], 80);
  const errors: Record<string, string> = {};
  if (!firstName) errors['firstName'] = 'Enter your first name.';
  if (!lastName) errors['lastName'] = 'Enter your last name.';
  if (!EMAIL.test(email)) errors['email'] = 'That email does not look right.';
  if (!COUNTRIES.includes(country)) errors['country'] = 'Choose your country.';
  if (Object.keys(errors).length) return { ok: false, errors };
  const raw = body['source'] && typeof body['source'] === 'object' && !Array.isArray(body['source']) ? (body['source'] as Record<string, unknown>) : {};
  const source: Partial<Record<SourceKey, string>> = {};
  for (const k of SOURCE_KEYS) {
    const v = text(raw[k], 200);
    if (v) source[k] = v;
  }
  return { ok: true, claim: { firstName, lastName, email, country, updates: body['updates'] === true, source } };
}

/** Why the form no longer takes claims, or null while it is open. EARLY_ACCESS_CLOSED marks the places as taken. */
export function closedReason(now: Date, flag: string | undefined): string | null {
  if (/^(1|true|yes)$/i.test((flag ?? '').trim())) return 'All 200 early access places have been taken.';
  if (now.getTime() > EARLY_ACCESS.closes.getTime()) return 'Early access closed on 6 December 2026.';
  return null;
}
