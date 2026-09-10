/**
 * Shared server helpers for the API routes (Grownz D31): body parsing that never throws, a
 * best-effort per-address rate limit, Turnstile verification (env-flagged) and Resend delivery.
 */

/** Largest request body any route accepts, in bytes. */
export const MAX_BODY = 16 * 1024;

/**
 * Reads the JSON body as a plain object. Returns null for anything else (invalid JSON, null,
 * arrays, strings, oversize bodies), so routes answer 400 instead of throwing 500.
 */
export async function readJsonObject(req: Request): Promise<Record<string, unknown> | null> {
  const len = Number(req.headers.get('content-length') ?? 0);
  if (len > MAX_BODY) return null;
  try {
    const text = await req.text();
    if (text.length > MAX_BODY) return null;
    const data: unknown = JSON.parse(text);
    if (!data || typeof data !== 'object' || Array.isArray(data)) return null;
    return data as Record<string, unknown>;
  } catch {
    return null;
  }
}

/** First address in x-forwarded-for, or a stable fallback when there is none. */
export function clientIp(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';
}

const buckets = new Map<string, number[]>();

/**
 * Sliding-window rate limit in process memory: limit hits per windowMs per key. Best effort
 * only: each serverless instance keeps its own counts, so treat it as a brake on naive scripts,
 * not a guarantee. Turnstile (when configured) is the real defence for the forms.
 */
export function rateLimit(key: string, limit: number, windowMs: number): { ok: true } | { ok: false; retryAfter: number } {
  const now = Date.now();
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= limit) {
    buckets.set(key, hits);
    return { ok: false, retryAfter: Math.ceil((windowMs - (now - hits[0]!)) / 1000) };
  }
  hits.push(now);
  buckets.set(key, hits);
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) if (!v.some((t) => now - t < windowMs)) buckets.delete(k);
  }
  return { ok: true };
}

export function tooMany(retryAfter: number) {
  return new Response(JSON.stringify({ error: 'Too many requests. Try again in a minute.' }), {
    status: 429,
    headers: { 'content-type': 'application/json', 'retry-after': String(retryAfter) },
  });
}

export async function verifyTurnstile(token: string, ip: string | null): Promise<{ ok: true } | { ok: false; status: number; reason: string }> {
  const secret = process.env['TURNSTILE_SECRET_KEY'];
  if (!secret) return { ok: true }; // feature-flagged off
  if (!token) return { ok: false, status: 400, reason: 'Please complete the check.' };
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ secret, response: token, remoteip: ip?.split(',')[0]?.trim() }),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success ? { ok: true } : { ok: false, status: 403, reason: 'The check did not pass. Try again.' };
  } catch {
    return { ok: false, status: 502, reason: 'Could not verify the check. Try again in a minute.' };
  }
}

/** The message shown when delivery is not configured. Names an address only when one is set. */
export function unconfiguredMessage(): string {
  const support = process.env['NEXT_PUBLIC_SUPPORT_EMAIL'];
  return support ? `This form is not switched on yet. Email ${support} instead.` : 'This form is not switched on yet. Please try again later, or use the help centre.';
}

export async function sendMail(opts: { to: string | undefined; subject: string; text: string; replyTo?: string }): Promise<{ ok: true } | { ok: false; status: number; reason: string }> {
  const key = process.env['RESEND_API_KEY'];
  const from = process.env['LEAD_FROM'] ?? 'Linkist website <website@linkist.ai>';
  if (!key || !opts.to) return { ok: false, status: 503, reason: unconfiguredMessage() };
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
      body: JSON.stringify({ from, to: [opts.to], subject: opts.subject, text: opts.text, reply_to: opts.replyTo }),
    });
    if (!res.ok) return { ok: false, status: 502, reason: 'Could not send right now. Try again in a minute.' };
    return { ok: true };
  } catch {
    return { ok: false, status: 502, reason: 'Could not send right now. Try again in a minute.' };
  }
}
