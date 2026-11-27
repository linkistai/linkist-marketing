import type { Claim } from '@/lib/early-access';

/**
 * Early access claims in Linkist's Supabase project (owner, 27 November 2026, D90). The website's server saves each
 * claim through the REST API with the project's secret key: `record_early_access_claim` adds the claim, or updates the
 * row when the same email claims again, and the row then records whether the two emails went out. Nothing else can
 * read or write the table (docs/early-access-claims.sql). Without SUPABASE_URL and SUPABASE_SECRET_KEY nothing is
 * saved and the claim goes by email alone, as before. Failures are reported, never thrown, so a claim is not lost to
 * a slow or paused database.
 */

export type SaveResult = { readonly ok: true; readonly id: number } | { readonly ok: false; readonly reason: string };

const TIMEOUT_MS = 5000;

function settings(): { readonly url: string; readonly key: string } | null {
  const url = process.env['SUPABASE_URL']?.trim().replace(/\/+$/, '');
  const key = process.env['SUPABASE_SECRET_KEY']?.trim();
  return url && key ? { url, key } : null;
}

/** A new secret key (`sb_secret_…`) goes in `apikey` alone; a legacy service_role key is a JWT and goes in both headers. */
export function authHeaders(key: string): Record<string, string> {
  return key.startsWith('eyJ') ? { apikey: key, authorization: `Bearer ${key}` } : { apikey: key };
}

export async function saveClaim(claim: Claim): Promise<SaveResult> {
  const s = settings();
  if (!s) return { ok: false, reason: 'the database is not set up' };
  try {
    const res = await fetch(`${s.url}/rest/v1/rpc/record_early_access_claim`, {
      method: 'POST',
      headers: { ...authHeaders(s.key), 'content-type': 'application/json' },
      body: JSON.stringify({ p_email: claim.email, p_name: claim.name, p_source: claim.source }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) return { ok: false, reason: `the database answered ${res.status}` };
    const id: unknown = await res.json();
    return typeof id === 'number' && Number.isSafeInteger(id) ? { ok: true, id } : { ok: false, reason: 'the database returned no row' };
  } catch {
    return { ok: false, reason: 'the database did not answer' };
  }
}

/** Records on the claim's row whether the team's email and the visitor's welcome email went out. */
export async function markEmailed(id: number, emails: { readonly lead: boolean; readonly welcome: boolean }): Promise<boolean> {
  const s = settings();
  if (!s) return false;
  try {
    const res = await fetch(`${s.url}/rest/v1/early_access_claims?id=eq.${id}`, {
      method: 'PATCH',
      headers: { ...authHeaders(s.key), 'content-type': 'application/json', prefer: 'return=minimal' },
      body: JSON.stringify({ lead_emailed: emails.lead, welcome_emailed: emails.welcome }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    return res.ok;
  } catch {
    return false;
  }
}
