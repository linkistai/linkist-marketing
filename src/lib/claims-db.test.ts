import { readFileSync } from 'node:fs';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { authHeaders, markEmailed, saveClaim } from './claims-db';

const claim = { name: 'Aisha', email: 'Aisha@Example.com', source: { utm_source: 'google' } };
const configure = () => {
  vi.stubEnv('SUPABASE_URL', 'https://example.supabase.co/');
  vi.stubEnv('SUPABASE_SECRET_KEY', 'sb_secret_test');
};

describe('early access claims in Supabase (owner, 27 November 2026, D90)', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('saves nothing and calls nothing until the URL and the secret key are set', async () => {
    const fetchMock = vi.fn<typeof fetch>();
    vi.stubGlobal('fetch', fetchMock);
    vi.stubEnv('SUPABASE_URL', '');
    vi.stubEnv('SUPABASE_SECRET_KEY', '');
    expect(await saveClaim(claim)).toEqual({ ok: false, reason: 'the database is not set up' });
    expect(await markEmailed(1, { lead: true, welcome: true })).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('records the claim through the database function, with a new secret key in apikey alone', async () => {
    const fetchMock = vi.fn<typeof fetch>(async () => new Response('42', { status: 200, headers: { 'content-type': 'application/json' } }));
    vi.stubGlobal('fetch', fetchMock);
    configure();
    expect(await saveClaim(claim)).toEqual({ ok: true, id: 42 });
    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe('https://example.supabase.co/rest/v1/rpc/record_early_access_claim');
    expect(init?.method).toBe('POST');
    expect(init?.headers).toEqual({ apikey: 'sb_secret_test', 'content-type': 'application/json' });
    expect(JSON.parse(String(init?.body))).toEqual({ p_email: 'Aisha@Example.com', p_name: 'Aisha', p_source: { utm_source: 'google' } });
  });

  it('sends a legacy service_role key, a JWT, in both headers', () => {
    expect(authHeaders('eyJhbGciOiJIUzI1NiJ9.x.y')).toEqual({ apikey: 'eyJhbGciOiJIUzI1NiJ9.x.y', authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.x.y' });
  });

  it('reports a refusal or no answer instead of throwing, so the claim still goes by email', async () => {
    configure();
    vi.stubGlobal('fetch', vi.fn<typeof fetch>(async () => new Response('{"message":"permission denied"}', { status: 401 })));
    expect(await saveClaim(claim)).toEqual({ ok: false, reason: 'the database answered 401' });
    vi.stubGlobal('fetch', vi.fn<typeof fetch>(async () => Promise.reject(new Error('timed out'))));
    expect(await saveClaim(claim)).toEqual({ ok: false, reason: 'the database did not answer' });
    expect(await markEmailed(42, { lead: true, welcome: true })).toBe(false);
  });

  it('then marks on that row which emails went out', async () => {
    const fetchMock = vi.fn<typeof fetch>(async () => new Response(null, { status: 204 }));
    vi.stubGlobal('fetch', fetchMock);
    configure();
    expect(await markEmailed(42, { lead: true, welcome: false })).toBe(true);
    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe('https://example.supabase.co/rest/v1/early_access_claims?id=eq.42');
    expect(init?.method).toBe('PATCH');
    expect(JSON.parse(String(init?.body))).toEqual({ lead_emailed: true, welcome_emailed: false });
  });

  it('keeps the table locked in the setup SQL: row level security on, no policies, no rights for anon or authenticated', () => {
    const sql = readFileSync('docs/early-access-claims.sql', 'utf8');
    expect(sql).toContain('alter table public.early_access_claims enable row level security;');
    expect(sql).not.toMatch(/create policy/i);
    expect(sql).toContain('revoke all on table public.early_access_claims from anon, authenticated;');
    expect(sql).toContain('revoke all on function public.record_early_access_claim(text, text, jsonb) from public, anon, authenticated;');
    expect(sql).toContain('grant execute on function public.record_early_access_claim(text, text, jsonb) to service_role;');
  });

  it('is called by the early access route before the emails go out', () => {
    const route = readFileSync('src/app/api/early-access/route.ts', 'utf8');
    expect(route.indexOf('await saveClaim(')).toBeGreaterThan(0);
    expect(route.indexOf('await saveClaim(')).toBeLessThan(route.indexOf('await sendMail('));
    expect(route).toContain('await markEmailed(');
  });
});
