import { NextResponse } from 'next/server';
import { clientIp, rateLimit, readJsonObject, sendMail, tooMany, verifyTurnstile } from '@/lib/forms';

/**
 * Newsletter sign-up: forwards the address to LEAD_TO through Resend. Honeypot, per-address
 * rate limit, Turnstile when configured (the footer form renders the widget). 503 when unconfigured.
 */
export const runtime = 'nodejs';

export async function POST(req: Request) {
  const ip = clientIp(req);
  const rl = rateLimit(`subscribe:${ip}`, 5, 10 * 60 * 1000);
  if (!rl.ok) return tooMany(rl.retryAfter);
  const body = await readJsonObject(req);
  if (!body) return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  const str = (k: string, max: number) => {
    const v = body[k];
    return (typeof v === 'string' ? v : '').trim().slice(0, max);
  };
  if (str('website', 10)) return NextResponse.json({ ok: true });
  const email = str('email', 200);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ errors: { email: 'That email does not look right.' } }, { status: 422 });
  const ts = await verifyTurnstile(str('turnstile', 4000), ip);
  if (!ts.ok) return NextResponse.json({ error: ts.reason, turnstile: true }, { status: ts.status });
  const sent = await sendMail({ to: process.env['LEAD_TO'], subject: '[linkist website] newsletter sign-up', text: `Subscribe: ${email}` });
  if (!sent.ok) return NextResponse.json({ error: sent.reason }, { status: sent.status });
  return NextResponse.json({ ok: true });
}
