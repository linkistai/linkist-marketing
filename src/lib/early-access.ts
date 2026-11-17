/**
 * The UAE 55 early access offer (D77, changed by D79 on 17 November 2026 from Liju's "Linkist UAE 55: website
 * text changes" v2.1 and RatioX Labs' "Early Access Page Changes"): 55 places for professionals in the UAE, one
 * year of Pro (annual) through the coupon UAE55, which the app applies by itself, open until the end of
 * 31 December 2026 in Dubai or until the places are taken. The site does not count the places (owner: "Just say
 * 55 places without a counter"); the coupon's own limit in the app does, and EARLY_ACCESS_CLOSED shows the page
 * as full once they are gone.
 */
export const EARLY_ACCESS = {
  /** The end of 31 December 2026, Dubai time. */
  closes: new Date('2026-12-31T23:59:59+04:00'),
  /** The only country the offer is for, shown on the form and not editable. */
  country: 'United Arab Emirates',
  /** The coupon the link applies. It is named on the page (How it works), so it is not a secret. */
  code: 'UAE55',
} as const;

/** Query parameters a claim carries from the ad that brought the visitor, for the lead email. */
export const SOURCE_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid', 'li_fat_id'] as const;
export type SourceKey = (typeof SOURCE_KEYS)[number];

export interface Claim {
  /** One field, "Name", used to greet the visitor in their email; the app asks for the name itself after payment. */
  readonly name: string;
  readonly email: string;
  readonly updates: boolean;
  readonly source: Partial<Record<SourceKey, string>>;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const text = (v: unknown, max: number) => (typeof v === 'string' ? v : '').replace(/\p{Cc}/gu, ' ').trim().slice(0, max);

/** Checks a claim from the form. Field errors use the form's field names and Liju's wording. */
export function readClaim(body: Record<string, unknown>): { ok: true; claim: Claim } | { ok: false; errors: Record<string, string> } {
  const name = text(body['name'], 80);
  const email = text(body['email'], 200);
  const errors: Record<string, string> = {};
  if (!name) errors['name'] = 'Enter your name.';
  if (!EMAIL.test(email)) errors['email'] = 'Enter a valid email address.';
  if (Object.keys(errors).length) return { ok: false, errors };
  const raw = body['source'] && typeof body['source'] === 'object' && !Array.isArray(body['source']) ? (body['source'] as Record<string, unknown>) : {};
  const source: Partial<Record<SourceKey, string>> = {};
  for (const k of SOURCE_KEYS) {
    const v = text(raw[k], 200);
    if (v) source[k] = v;
  }
  return { ok: true, claim: { name, email, updates: body['updates'] === true, source } };
}

/** What the claim card says once claims stop (Liju's notes v2.1, section 13). */
export interface Closed {
  readonly state: 'full' | 'closed';
  readonly title: string;
  readonly text?: string;
}

const FULL: Closed = { state: 'full', title: 'All 55 Founding Member places have been claimed.', text: 'You can still try Linkist Pro.' };
const CLOSED: Closed = { state: 'closed', title: 'Early access sign-up closed on 31 December 2026.' };

/** Why the form no longer takes claims, or null while it is open. EARLY_ACCESS_CLOSED marks the places as taken. */
export function closedState(now: Date, flag: string | undefined): Closed | null {
  if (now.getTime() > EARLY_ACCESS.closes.getTime()) return CLOSED;
  if (/^(1|true|yes)$/i.test((flag ?? '').trim())) return FULL;
  return null;
}

/** Where each Activate link sits, so the app's reports can tell the confirmation from the email. */
const PLACEMENTS = {
  popup: 'utm_medium=website&utm_content=early_access_popup',
  email: 'utm_medium=email&utm_content=early_access_email',
} as const;

/**
 * "Activate my year of Pro": the app's plans page with Pro (annual), the UAE and the coupon chosen, and the
 * visitor's email filled in (RatioX Labs, 16 November 2026). The parameter names are the app's own, and
 * utm_source=linkist_ai gives the app's Back button its way home. The name is not passed: the app asks for it
 * after payment (Surya, 17 November 2026). Without an email it is the same address with nothing personal in it,
 * which is what the button's href carries, so no tag on the page can read the email from the link.
 */
export function activationUrl(placement: keyof typeof PLACEMENTS, email?: string): string {
  const who = email ? `&email=${encodeURIComponent(email)}` : '';
  return `https://prm.linkist.ai/plans?plan=pro&period=annual&country=AE&coupon=${EARLY_ACCESS.code}${who}&utm_source=linkist_ai&utm_campaign=early_access_uae55&${PLACEMENTS[placement]}`;
}
