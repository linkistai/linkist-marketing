/**
 * Which visitors the cookie notice only informs, and the country hint the edge sets for them (D87).
 *
 * In a notice-only market the analytics and ad-measurement tags start on the first page unless the visitor
 * switches them off; everyone else, and anyone whose country is unknown, gets nothing until they allow it.
 * The owner confirmed the UAE on 27 November 2026 ("Yes" to counting UAE visitors without them tapping
 * Allow). Brief 7 also listed India, the US, Singapore and Australia; they are not confirmed (C12), so they stay
 * consent-first. No imports, so the edge middleware can use it.
 */
export const NOTICE_ONLY: readonly string[] = ['AE'];

/** The cookie the edge sets for a visitor in a notice-only market: their ISO country code, for the browser session. */
export const COUNTRY_COOKIE = 'linkist-country';

/** What the edge does with the country cookie on a page request. */
export type CountryCookieAction = { readonly set: string } | { readonly clear: true } | null;

/**
 * Set the cookie when the request comes from a notice-only market (unless it already says so), clear it when it
 * does not (someone who travelled, or a country the host could not tell), and otherwise leave it alone.
 */
export function countryCookie(country: string | null | undefined, current: string | undefined): CountryCookieAction {
  const c = (country ?? '').trim().toUpperCase();
  if (NOTICE_ONLY.includes(c)) return current === c ? null : { set: c };
  return current === undefined ? null : { clear: true };
}
