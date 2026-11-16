import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MessageCircle, Play, Star, Zap, type LucideIcon } from 'lucide-react';
import { CookieChoicesLink } from '@/components/CookieChoicesLink';
import { ClaimForm } from '@/components/early-access/ClaimForm';
import { COMPANY, pageMeta } from '@/lib/site';

export const metadata: Metadata = pageMeta(
  'Get early access',
  'Linkist launches on 9 November. To mark the UAE’s 55th National Day, we’re giving 200 professionals early access and the chance to help shape Linkist.',
  '/early-access',
  { image: '/og/early-access.png' },
);

/**
 * The UAE 55 early access page, word for word and section for section from Linkist's "Early Access
 * UAE 55 Founding Members Page and Ads" (November 2026), drawn in the site's own type, colours and
 * buttons (owner, 16 November 2026, D77). A landing page for the ads: its own short header and footer
 * stand in for the site's (SiteChrome). The app screens and video stills are cut from the brief.
 */

const GETS: readonly { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Star, title: 'Founding Member status', body: 'Recognised as one of the first 200 people to use Linkist.' },
  { icon: Zap, title: 'Early access', body: 'Use new features before they are released to everyone.' },
];

const STEPS = [
  { title: 'Claim your place', body: 'Enter your name, work email and country.' },
  { title: 'Copy your code', body: 'Your code appears on screen and in your inbox.' },
  { title: 'Activate Pro', body: 'Choose Pro at prm.linkist.ai/plans and paste your code. You pay USD 0.' },
] as const;

const FEATURES = [
  { title: 'Digital business card', body: 'Share your details with a tap or a QR code, and store every contact you receive.' },
  { title: 'Scan several cards at once', body: 'Scan a whole stack of business cards in one go. No typing.' },
  { title: 'Contact and company enrichment', body: 'Automatically fills in missing contact and company details for every card you scan.' },
  { title: 'ICP matching', body: 'Ranks your contacts against your ideal customer profile, so you know who to focus on.' },
  { title: 'Nudges and reminders', body: 'Reminds you who to follow up with, and when, while the conversation is still warm.' },
  { title: 'Relationship memory', body: 'Remembers where you met everyone, with notes and tags.' },
  { title: 'Export to your CRM', body: 'Send your contacts to the CRM your team already uses.' },
] as const;

type Shot = { src: string; title: string; body: string; alt: string };

const REMEMBER: readonly Shot[] = [
  { src: '/early-access/remember-1-digital-profile.webp', title: 'Digital profile', body: 'Shared by NFC or QR; saved in one tap', alt: 'Natalie Vale’s digital profile in the Linkist app' },
  { src: '/early-access/remember-2-contact-intelligence.webp', title: 'Contact Intelligence', body: 'Identity verified; ICP match and network value scored', alt: 'Contact Intelligence brief with ICP match and network value scores' },
  { src: '/early-access/remember-3-company-intelligence.webp', title: 'Company Intelligence', body: 'Industry, size, HQ and public signals, with confidence', alt: 'Company Intelligence with industry, company size, headquarters and public signals' },
  { src: '/early-access/remember-4-interaction-log.webp', title: 'Interaction log', body: 'Meetings, calls, intros and notes on one timeline', alt: 'Log Interaction screen with meeting, call, email, message, note and intro types' },
];

const RECONNECT: readonly Shot[] = [
  { src: '/early-access/reconnect-1-daily-dashboard.webp', title: 'Daily dashboard', body: 'AI insight, relationship health and network strength', alt: 'Daily dashboard with relationship health and network strength scores' },
  { src: '/early-access/reconnect-2-smart-signals.webp', title: 'Smart Signals', body: 'Relevance-scored market signals with a suggested next step', alt: 'Smart Signals with a relevance-scored market signal and a suggested next step' },
  { src: '/early-access/reconnect-3-connection-profile.webp', title: 'Connection profile', body: 'Define the ICP once; matching contacts found for you', alt: 'Connection profile with an ICP definition and matching contacts' },
];

const DEMOS = [
  {
    src: '/early-access/demo-business-profile.webp',
    title: 'Create your digital business card',
    body: 'Set up a business profile in minutes and share it by NFC card or QR code.',
    href: 'https://www.youtube.com/watch?v=AemkFHSq9_I',
    length: '1:12',
  },
  {
    src: '/early-access/demo-enrichment.webp',
    title: 'Know who you’re meeting with Contact Intelligence',
    body: 'AI enrichment adds verified role, company and context to every contact.',
    href: 'https://www.youtube.com/watch?v=bUJy8eZwiwE',
    length: '0:44',
  },
] as const;

export default function EarlyAccessPage() {
  return (
    <div className="ea">
      <header className="ea-top">
        <div className="container ea-top__inner">
          <Link href="/">
            <Image src="/brand/lockup.png" alt="Linkist" width={1352} height={422} priority className="h-[30px] w-auto sm:h-[34px]" />
          </Link>
          <a href="#claim" className="btn btn--ghost btn--sm ea-top__cta">
            Get early access
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </header>

      <section className="ea-hero">
        <HeroLines />
        <div className="container ea-hero__grid">
          <div>
            <p className="eyebrow eyebrow--accent">Celebrating 55 years of the UAE · 200 early access places</p>
            <h1 className="ea-h1 mt-5">
              Built in the UAE. Now it’s yours first. <span className="em-coral">200 early access places for Founding Members.</span>
            </h1>
            <p className="ea-lede mt-6">Linkist launches on 9 November. To mark the UAE’s 55th National Day, we’re giving 200 professionals early access and the chance to help shape Linkist.</p>
            <p className="ea-callout mt-7">
              Cost is on us. <strong>One year of Linkist Pro, worth USD 100, at no cost to you.</strong> No payment details needed.
            </p>
          </div>
          <ClaimForm />
        </div>
      </section>

      <section className="ea-section ea-lifted">
        <div className="container">
          <div className="ea-narrow">
            <p className="ea-label">A thank-you to the UAE</p>
            <h2 className="ea-h2 mt-3">We kept building. Now we want to give back.</h2>
            <p className="ea-text mt-6">
              This year asked a lot of all of us. We kept building, because we believe in what this country makes possible. Linkist is now ready, and to mark the UAE’s 55th National Day, we’re giving <strong>200</strong> people early
              access as <strong>Founding Members</strong>, with one year of Linkist Pro, <strong>worth USD 100</strong>, on us.
            </p>
            <p className="ea-text mt-4">Thank you to the UAE and to everyone who stood with us.</p>
            <p className="mt-5 font-semibold">The Linkist team</p>
          </div>
        </div>
      </section>

      <section className="ea-section">
        <div className="container">
          <p className="ea-label">What you get</p>
          <h2 className="ea-h2 mt-3">Everything in Pro, plus a seat at the table.</h2>
          <ul className="ea-gets mt-8">
            <li className="card ea-card">
              <p className="ea-figure">USD 100</p>
              <h3 className="ea-card__title mt-3">One year of Linkist Pro</h3>
              <p className="ea-card__text">Full access to the Pro app for 12 months, at no cost. No payment details needed.</p>
            </li>
            {GETS.map(({ icon: Icon, title, body }) => (
              <li key={title} className="card ea-card">
                <Icon size={22} className="ea-icon" aria-hidden="true" />
                <h3 className="ea-card__title mt-4">{title}</h3>
                <p className="ea-card__text">{body}</p>
              </li>
            ))}
            <li className="card ea-card ea-gets__wide">
              <MessageCircle size={22} className="ea-icon" aria-hidden="true" />
              <h3 className="ea-card__title mt-4">A direct line to the team</h3>
              <p className="ea-card__text">Tell us what works and what doesn’t, and help shape the product.</p>
            </li>
          </ul>
          <p className="mt-6 text-[15px]">
            <strong>What we ask in return:</strong> one short feedback survey, 2 weeks after you join.
          </p>
        </div>
      </section>

      <section className="ea-section ea-lifted">
        <div className="container">
          <p className="ea-label">How it works</p>
          <h2 className="ea-h2 mt-3">Three steps, about two minutes.</h2>
          <ol className="ea-steps mt-8">
            {STEPS.map((s, i) => (
              <li key={s.title} className="ea-step">
                <span className="ea-num" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3 className="ea-card__title">{s.title}</h3>
                  <p className="ea-card__text">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ea-section">
        <div className="container">
          <p className="ea-label">Remember and reconnect</p>
          <h2 className="ea-h2 mt-3">What you’ll get early access to</h2>
          <ul className="ea-features mt-8">
            {FEATURES.map((f) => (
              <li key={f.title} className="card ea-card">
                <h3 className="ea-card__title">{f.title}</h3>
                <p className="ea-card__text">{f.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ea-section ea-lifted">
        <div className="container">
          <p className="ea-label ea-label--live">Live app</p>
          <h2 className="ea-h2 mt-3">See Linkist in action</h2>
          <p className="ea-text mt-3 text-muted">Screens captured from the working Linkist app, October 2026.</p>

          <p className="ea-label mt-12">Remember</p>
          <h3 className="ea-h3 mt-2">Every contact remembered, with context</h3>
          <Phones items={REMEMBER} label="Remember: four app screens" />

          <p className="ea-label mt-14">Reconnect</p>
          <h3 className="ea-h3 mt-2">The right person, at the right time</h3>
          <Phones items={RECONNECT} label="Reconnect: three app screens" />

          <p className="ea-label mt-14">Product demo</p>
          <h3 className="ea-h3 mt-2">Short walkthroughs, recorded in the working app</h3>
          <ul className="ea-demos mt-6">
            {DEMOS.map((d) => (
              <li key={d.title} className="card ea-demo">
                <a href={d.href} target="_blank" rel="noopener noreferrer" className="ea-demo__thumb" tabIndex={-1} aria-hidden="true">
                  <Image src={d.src} alt="" width={1119} height={622} sizes="(min-width: 768px) 600px, 92vw" />
                </a>
                <div className="ea-demo__body">
                  <h4 className="ea-card__title">{d.title}</h4>
                  <p className="ea-card__text">{d.body}</p>
                  <a href={d.href} target="_blank" rel="noopener noreferrer" className="ea-watch">
                    <Play size={13} fill="currentColor" aria-hidden="true" />
                    Watch on YouTube · {d.length}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ea-section ea-final">
        <div className="container text-center">
          <h2 className="ea-h2 mx-auto max-w-[19ch]">200 places. One year of Pro. Cost is on us.</h2>
          <p className="ea-text mx-auto mt-4 text-muted">Open until 6 December 2026, or until all places are taken.</p>
          <a href="#claim" className="btn btn--primary mt-7">
            Claim my early access
          </a>
        </div>
      </section>

      <footer className="ea-foot">
        <div className="container ea-foot__inner">
          <Link href="/" className="ea-foot__logo">
            <Image src="/brand/lockup.png" alt="Linkist" width={1352} height={422} className="h-[26px] w-auto" />
          </Link>
          <nav aria-label="Legal" className="ea-foot__links">
            <Link href="/legal/privacy" className="underline">
              Privacy policy
            </Link>
            <Link href="/legal/terms" className="underline">
              Terms
            </Link>
            <CookieChoicesLink />
          </nav>
          <p className="ea-foot__company">Linkist by {COMPANY}</p>
        </div>
      </footer>
    </div>
  );
}

/** A row of app screens with numbered captions: four across on a wide screen, a sideways scroller on a phone. */
function Phones({ items, label }: { items: readonly Shot[]; label: string }) {
  return (
    <div className="ea-phones-scroll" role="region" aria-label={label} tabIndex={0}>
      <ol className="ea-phones">
        {items.map((s, i) => (
          <li key={s.title} className="ea-phone">
            <Image src={s.src} alt={s.alt} width={484} height={1044} sizes="(min-width: 900px) 290px, 72vw" />
            <div className="ea-phone__cap">
              <span className="ea-num" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <p className="ea-card__title">{s.title}</p>
                <p className="ea-card__text">{s.body}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Fine lines behind the hero, after the brief's: faint arcs on the right and two crimson rules. Decorative. */
function HeroLines() {
  return (
    <svg className="ea-hero__lines" viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <g fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1">
        <circle cx="1180" cy="120" r="260" />
        <circle cx="1180" cy="120" r="420" />
        <circle cx="1180" cy="120" r="600" />
      </g>
      <g stroke="rgba(163,22,45,0.45)" strokeWidth="1">
        <line x1="1010" y1="-20" x2="1460" y2="430" />
        <line x1="-40" y1="610" x2="380" y2="790" />
      </g>
    </svg>
  );
}
