import Image from 'next/image';
import Link from 'next/link';
import { LinkistLogotype } from './LinkistLogotype';
import { CookieChoicesLink } from './CookieChoicesLink';
import { MotionToggle } from './MotionToggle';
import { G } from '@/lib/glossary';
import { COMPANY, SIGN_IN_URL } from '@/lib/site';
import { J, cta } from '@/content/journeys';

const COLUMNS: { title: string; links: { href: string; label: string; external?: boolean }[] }[] = [
  {
    title: 'Product',
    links: [
      { href: '/how-it-works', label: 'How it works' },
      { href: '/features', label: 'Features' },
      { href: '/use-cases', label: 'Use cases' },
      { href: '/pricing', label: 'PRM pricing' },
      { href: '/teams', label: 'Teams' },
    ],
  },
  {
    title: 'Features',
    links: [
      { href: '/features/capture', label: 'Capture' },
      { href: '/features/find', label: 'Find' },
      { href: '/features/act', label: 'Act' },
      { href: '/features/profiles', label: 'Profiles and cards' },
      { href: '/features/teams', label: 'Teams' },
    ],
  },
  {
    title: 'Cards',
    links: [
      { href: '/nfc-cards', label: 'NFC cards' },
      { href: '/bundles', label: 'Bundles' },
      { href: '/bring-your-own', label: 'Bring your own NFC' },
      { href: '/pricing#compare', label: 'Compare PRM plans' },
      { href: J.footer_cards_get_nfc_card, label: G.ctaNfc, external: true },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: SIGN_IN_URL, label: 'Sign in', external: true },
      { href: J.footer_billing, label: 'Billing', external: true },
      { href: '/about', label: 'About' },
      { href: '/blogs', label: 'Blog' },
      { href: '/help', label: 'Help centre' },
      { href: '/chat', label: 'Ask the assistant' },
      { href: '/community', label: 'Community' },
      { href: J.footer_ideas, label: 'Suggest a feature', external: true },
      { href: '/contact', label: 'Contact' },
      { href: '/legal', label: 'Legal' },
      { href: '/legal/privacy', label: 'Privacy' },
      { href: '/legal/terms', label: 'Terms and Privacy' },
    ],
  },
];

/**
 * The v2 footer: an auto-fit grid where the brand block (lockup, blurb and the two product buttons; the
 * email sign-up came out on 5 October 2026, D74) spans two columns beside Product, Features, Cards and Company. Under the columns
 * a giant outlined "Linkist" wordmark drawn from the logotype (D66), decorative; then the copyright bar with the cookie choices
 * and the motion switch (brief 6).
 */
export function Footer() {
  return (
    <footer className="footer-clearance border-t border-line" style={{ background: 'var(--color-bg)' }}>
      <div className="container grid gap-10 py-16 [grid-template-columns:repeat(auto-fit,minmax(min(100%,170px),1fr))]">
        <div className="flex min-w-[min(100%,300px)] flex-col gap-4 sm:col-span-2">
          <Image src="/brand/lockup.png" alt="Linkist" width={1352} height={422} className="h-[26px] w-auto self-start" />
          <p className="max-w-xs text-sm leading-relaxed text-body">A Personal Relationship Manager with an optional NFC card. Built in Dubai.</p>
          <div className="flex flex-wrap gap-2">
            <a href={J.footer_get_app} {...cta(J.footer_get_app, 'btn btn--primary btn--sm')}>
              {G.ctaApp}
            </a>
            <a href={J.footer_get_nfc_card} {...cta(J.footer_get_nfc_card, 'btn btn--secondary btn--sm')}>
              {G.ctaNfc}
            </a>
          </div>
        </div>
        {COLUMNS.map((c) => (
          <nav key={c.title} aria-label={c.title} className="flex flex-col gap-[9px] text-sm">
            <h2 className="mb-1 font-body text-xs font-semibold uppercase tracking-[0.06em] text-muted">{c.title}</h2>
            {c.links.map((l) =>
              l.external ? (
                <a key={l.label} href={l.href} {...cta(l.href, 'text-soft no-underline hover:text-white')}>
                  {l.label}
                </a>
              ) : (
                <Link key={l.label} href={l.href} className="text-soft no-underline hover:text-white">
                  {l.label}
                </Link>
              ),
            )}
          </nav>
        ))}
      </div>
      <div aria-hidden="true" className="container overflow-hidden">
        <LinkistLogotype className="footer-wordmark" />
      </div>
      <div className="border-t border-line">
        <div className="container flex flex-col gap-3 py-[22px] text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {COMPANY}. All rights reserved. Linkist PRM is a web app at prm.linkist.ai.
          </p>
          <p className="flex flex-wrap gap-4">
            <CookieChoicesLink />
            <MotionToggle />
          </p>
        </div>
      </div>
    </footer>
  );
}
