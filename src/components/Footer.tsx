import Link from 'next/link';
import { Wordmark } from './Logo';
import { Newsletter } from './forms/Newsletter';
import { CookieChoicesLink } from './CookieChoicesLink';
import { MotionToggle } from './MotionToggle';
import { G } from '@/lib/glossary';
import { COMPANY, EXTERNAL_PRIVACY_URL, EXTERNAL_TERMS_URL, GET_APP_URL, GET_CARD_URL, SIGN_IN_URL, SUPPORT_EMAIL } from '@/lib/site';

const COLUMNS: { title: string; links: { href: string; label: string; external?: boolean }[] }[] = [
  {
    title: 'Product',
    links: [
      { href: '/how-it-works', label: 'How it works' },
      { href: '/features', label: 'Features' },
      { href: '/use-cases', label: 'Use cases' },
      { href: '/pricing', label: 'PRM pricing' },
      { href: '/teams', label: 'Teams' },
      { href: '/ai', label: 'AI and your data' },
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
      { href: '/pricing#compare', label: 'Compare PRM plans' },
      { href: GET_CARD_URL, label: G.ctaNfc, external: true },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: SIGN_IN_URL, label: 'Sign in', external: true },
      { href: '/blogs', label: 'Blog' },
      { href: '/help', label: 'Help centre' },
      { href: '/chat', label: 'Ask the assistant' },
      { href: '/changelog', label: 'Changelog' },
      { href: '/community', label: 'Community' },
      { href: '/security', label: 'Security' },
      { href: SUPPORT_EMAIL ? `mailto:${SUPPORT_EMAIL}` : 'mailto:support@linkist.ai', label: 'Support', external: true },
      { href: EXTERNAL_PRIVACY_URL, label: 'Privacy', external: true },
      { href: EXTERNAL_TERMS_URL, label: 'Terms', external: true },
    ],
  },
];

/**
 * Footer: the two product buttons (Get the App, Get NFC Card), four columns, the newsletter, the
 * motion switch (brief 6), cookie choices and the company line. The newsletter keeps its own row
 * below the tablet breakpoint (Grownz audit finding).
 */
export function Footer() {
  return (
    <footer className="footer-clearance border-t border-line" style={{ background: 'var(--color-bg)' }}>
      <div className="container grid gap-12 py-16 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div className="flex flex-col gap-4">
          <Wordmark size={22} />
          <p className="max-w-xs text-sm text-body">Capture Contacts. Remember Context. Act at the right time. A Personal Relationship Manager with an optional NFC card, built in Dubai.</p>
          <div className="flex flex-wrap gap-2">
            <a href={GET_APP_URL} className="btn btn--primary btn--sm">
              {G.ctaApp}
            </a>
            <a href={GET_CARD_URL} className="btn btn--secondary btn--sm">
              {G.ctaNfc}
            </a>
          </div>
          <div className="mt-4 max-w-sm">
            <Newsletter />
          </div>
        </div>
        {COLUMNS.map((c) => (
          <nav key={c.title} aria-label={c.title} className="flex flex-col gap-2 text-sm">
            <h2 className="mb-1 text-xs font-semibold uppercase tracking-[0.04em] text-muted">{c.title}</h2>
            {c.links.map((l) =>
              l.external ? (
                <a key={l.label} href={l.href} className="no-underline hover:underline">
                  {l.label}
                </a>
              ) : (
                <Link key={l.label} href={l.href} className="no-underline hover:underline">
                  {l.label}
                </Link>
              ),
            )}
          </nav>
        ))}
      </div>
      <div className="container flex flex-col gap-3 border-t border-line py-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {COMPANY}. All rights reserved. Linkist PRM is a web app at prm.linkist.ai; NFC card profiles live at m.linkist.ai.
        </p>
        <p className="flex flex-wrap gap-4">
          <CookieChoicesLink />
          <MotionToggle />
        </p>
      </div>
    </footer>
  );
}
