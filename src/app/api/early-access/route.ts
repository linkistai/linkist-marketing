import { NextResponse } from 'next/server';
import { SUPPORT } from '@/content/company';
import { J } from '@/content/journeys';
import { closedReason, readClaim, type Claim } from '@/lib/early-access';
import { clientIp, rateLimit, readJsonObject, sendMail, tooMany, verifyTurnstile } from '@/lib/forms';

/**
 * Early access claims (D77). Server validation, honeypot, a per-address rate limit, Turnstile when
 * configured. The claim goes to LEAD_TO, then the visitor gets their code by email, and the answer
 * carries the code for the confirmation on screen. The code lives only here, so the page source does
 * not give it away. Outside Vercel production, with no mail set up, the claim is not sent and the
 * confirmation still shows, so the page can be reviewed.
 */
export const runtime = 'nodejs';

/**
 * The coupon the Linkist app accepts at checkout for the year of Pro (Linkist's brief); EARLY_ACCESS_CODE
 * replaces it without a code change. The repository is public and the code follows the campaign's
 * name, so the coupon's own limit in the app is what protects the 200 places.
 */
const CODE = process.env['EARLY_ACCESS_CODE']?.trim() || 'UAE55';

const dubai = (d: Date) => d.toLocaleString('en-GB', { timeZone: 'Asia/Dubai', dateStyle: 'medium', timeStyle: 'short' });

function leadText(c: Claim, now: Date): string {
  const source = Object.entries(c.source).map(([k, v]) => `${k}=${v}`);
  return [
    'Early access claim, UAE 55 Founding Members',
    '',
    `Name: ${c.firstName} ${c.lastName}`,
    `Work email: ${c.email}`,
    `Country: ${c.country}`,
    `Product updates: ${c.updates ? 'yes' : 'no'}`,
    `Code shown: ${CODE}`,
    `Claimed: ${dubai(now)} (Dubai)`,
    `Came from: ${source.length ? source.join(', ') : 'no tracking tags'}`,
  ].join('\n');
}

/** The confirmation's words, as on the page (Linkist's brief). */
function visitorText(c: Claim): string {
  return [
    `Welcome, ${c.firstName}. Your early access is confirmed.`,
    '',
    `Your coupon code: ${CODE}`,
    '',
    'What you get',
    '- One year of Linkist Pro, worth USD 100, at no cost to you',
    '- Founding Member status',
    '- Early access to new features',
    '- A direct feedback channel to the Linkist team',
    '',
    'We’ll send you one short feedback survey 2 weeks after you join.',
    '',
    'Copy your code, then choose Pro at checkout and paste it.',
    `Activate my year of Pro: ${J.early_access_email_activate_pro}`,
    '',
    'Use it by 6 December 2026. No payment details needed.',
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
  const closed = closedReason(now, process.env['EARLY_ACCESS_CLOSED']);
  if (closed) return NextResponse.json({ error: closed }, { status: 410 });
  const body = await readJsonObject(req);
  if (!body) return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  if (typeof body['website'] === 'string' && body['website'].trim()) return NextResponse.json({ ok: true }); // honeypot: pretend success, no code
  const read = readClaim(body);
  if (!read.ok) return NextResponse.json({ errors: read.errors }, { status: 422 });
  const ts = await verifyTurnstile(typeof body['turnstile'] === 'string' ? body['turnstile'].slice(0, 4000) : '', ip);
  if (!ts.ok) return NextResponse.json({ error: ts.reason, turnstile: true }, { status: ts.status });
  const claim = read.claim;

  const lead = await sendMail({
    to: process.env['LEAD_TO'],
    subject: `[linkist website] early access: ${claim.firstName} ${claim.lastName}`,
    text: leadText(claim, now),
    replyTo: claim.email,
  });
  const review = !lead.ok && lead.status === 503 && process.env['VERCEL_ENV'] !== 'production';
  if (!lead.ok && !review) return NextResponse.json({ error: lead.reason }, { status: lead.status });

  let emailed = false;
  if (lead.ok) {
    const sent = await sendMail({
      to: claim.email,
      from: process.env['EARLY_ACCESS_FROM'] ?? 'Linkist <hello@linkist.ai>',
      subject: `Welcome, ${claim.firstName}. Your early access is confirmed`,
      text: visitorText(claim),
      replyTo: SUPPORT,
    });
    emailed = sent.ok;
  }
  return NextResponse.json({ ok: true, code: CODE, firstName: claim.firstName, email: claim.email, emailed });
}
