import { NextResponse } from 'next/server';
import { clientIp, rateLimit, readJsonObject, sendMail, tooMany, verifyTurnstile } from '@/lib/forms';

/**
 * Contact form. Server validation, honeypot, a per-address rate limit, Cloudflare Turnstile when
 * configured, Resend delivery. Answers 503 when RESEND_API_KEY or LEAD_TO is unset.
 */
export const runtime = 'nodejs';

const TOPICS = ['support', 'teams', 'partnership', 'press', 'security', 'design-partner', 'other'];

export async function POST(req: Request) {
  const ip = clientIp(req);
  const rl = rateLimit(`lead:${ip}`, 5, 10 * 60 * 1000);
  if (!rl.ok) return tooMany(rl.retryAfter);
  const body = await readJsonObject(req);
  if (!body) return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  const str = (k: string, max = 2000) => {
    const v = body[k];
    return (typeof v === 'string' ? v : '').trim().slice(0, max);
  };
  if (str('website')) return NextResponse.json({ ok: true }); // honeypot: pretend success
  const name = str('name', 120);
  const email = str('email', 200);
  const topic = str('topic', 40);
  const message = str('message', 4000);
  const errors: Record<string, string> = {};
  if (!name) errors['name'] = 'Tell us who you are.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors['email'] = 'That email does not look right.';
  if (!TOPICS.includes(topic)) errors['topic'] = 'Pick a topic.';
  if (message.length < 10) errors['message'] = 'A sentence or two helps.';
  if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 422 });
  const ts = await verifyTurnstile(str('turnstile', 4000), ip);
  if (!ts.ok) return NextResponse.json({ error: ts.reason, turnstile: true }, { status: ts.status });
  const sent = await sendMail({
    to: process.env['LEAD_TO'],
    subject: `[linkist website] ${topic}: ${name}`,
    text: `From: ${name} <${email}>\nTopic: ${topic}\n\n${message}`,
    replyTo: email,
  });
  if (!sent.ok) return NextResponse.json({ error: sent.reason }, { status: sent.status });
  return NextResponse.json({ ok: true });
}
