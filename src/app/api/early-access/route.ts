import { NextResponse } from 'next/server';
import { SUPPORT } from '@/content/company';
import { markEmailed, saveClaim, type SaveResult } from '@/lib/claims-db';
import { activationUrl, closedState, readClaim, type Claim } from '@/lib/early-access';
import { clientIp, rateLimit, readJsonObject, sendMail, tooMany, verifyTurnstile } from '@/lib/forms';

/**
 * Early access claims (D77, D79, D90). Server validation, honeypot, a per-address rate limit, Turnstile when
 * configured. The claim is saved in Linkist's Supabase project when it is set up (D90) and goes to LEAD_TO, then the
 * visitor gets an email with the link that activates their year of Pro, and the answer carries what the confirmation
 * on screen needs. A claim that reached the database or the team's inbox counts, so one failing doesn't turn the
 * visitor away. Outside Vercel production, with no mail set up, the claim is not sent and the confirmation still
 * shows, so the page can be reviewed.
 */
export const runtime = 'nodejs';

const dubai = (d: Date) => d.toLocaleString('en-GB', { timeZone: 'Asia/Dubai', dateStyle: 'medium', timeStyle: 'short' });

function leadText(c: Claim, now: Date, saved: SaveResult): string {
  const source = Object.entries(c.source).map(([k, v]) => `${k}=${v}`);
  return [
    'Early access claim, UAE 55 Founding Members',
    '',
    `Name: ${c.name}`,
    `Email: ${c.email}`,
    `Claimed: ${dubai(now)} (Dubai)`,
    `Came from: ${source.length ? source.join(', ') : 'no tracking tags'}`,
    `Claims database: ${saved.ok ? 'saved' : `not saved, ${saved.reason}`}`,
  ].join('\n');
}

/** The visitor's email (Liju's notes v2.1, section 12), greeting them by the name they gave (owner, 17 November 2026). */
function visitorText(c: Claim): string {
  return [
    `Hi ${c.name},`,
    '',
    'Welcome aboard, and thank you for joining Linkist as one of our 55 Founding Members.',
    '',
    'To celebrate the UAE’s 55th National Day, we’re giving our first 55 members early access, with one year of Linkist Pro on us. Happy Eid Al Etihad.',
    '',
    'What you get',
    '- One year of Linkist Pro, worth AED 400 (USD 100), at no cost to you',
    '- Founding Member status',
    '- Early access to new features',
    '- A direct feedback channel to the Linkist team',
    '',
    'How to activate',
    '1. Tap Activate my year of Pro:',
    `   ${activationUrl('email', c.email)}`,
    '2. Create your account and choose a password.',
    '3. Enter the 6-digit code we send to this email.',
    '4. Confirm Pro at USD 0.',
    '',
    'Use it by 31 December 2026. No payment details needed.',
    '',
    'We’ll send you one short feedback survey 2 weeks after you join.',
    '',
    'The Linkist team',
    'linkist.ai',
  ].join('\n');
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  const rl = rateLimit(`early-access:${ip}`, 5, 10 * 60 * 1000);
  if (!rl.ok) return tooMany(rl.retryAfter);
  const now = new Date();
  const closed = closedState(now, process.env['EARLY_ACCESS_CLOSED']);
  if (closed) return NextResponse.json({ error: [closed.title, closed.text].filter(Boolean).join(' '), closed }, { status: 410 });
  const body = await readJsonObject(req);
  if (!body) return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  if (typeof body['website'] === 'string' && body['website'].trim()) return NextResponse.json({ ok: true }); // honeypot: pretend success, nothing sent
  const read = readClaim(body);
  if (!read.ok) return NextResponse.json({ errors: read.errors }, { status: 422 });
  const ts = await verifyTurnstile(typeof body['turnstile'] === 'string' ? body['turnstile'].slice(0, 4000) : '', ip);
  if (!ts.ok) return NextResponse.json({ error: ts.reason, turnstile: true }, { status: ts.status });
  const claim = read.claim;

  const saved = await saveClaim(claim);
  const lead = await sendMail({
    to: process.env['LEAD_TO'],
    subject: `[linkist website] early access: ${claim.name}`,
    text: leadText(claim, now, saved),
    replyTo: claim.email,
  });
  const review = !lead.ok && lead.status === 503 && process.env['VERCEL_ENV'] !== 'production';
  if (!lead.ok && !saved.ok && !review) return NextResponse.json({ error: lead.reason }, { status: lead.status });

  let emailed = false;
  if (lead.ok || saved.ok) {
    const sent = await sendMail({
      to: claim.email,
      from: process.env['EARLY_ACCESS_FROM'] ?? 'Linkist <hello@linkist.ai>',
      subject: 'You’re in: activate your year of Linkist Pro',
      text: visitorText(claim),
      replyTo: SUPPORT,
    });
    emailed = sent.ok;
  }
  if (saved.ok) await markEmailed(saved.id, { lead: lead.ok, welcome: emailed });
  return NextResponse.json({ ok: true, name: claim.name, email: claim.email, emailed });
}
