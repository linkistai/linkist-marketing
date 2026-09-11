'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Wordmark } from './Logo';
import { G } from '@/lib/glossary';
import { GET_APP_URL, GET_CARD_URL } from '@/lib/site';

const LINKS = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/features', label: 'Features' },
  { href: '/use-cases', label: 'Use cases' },
  { href: '/nfc-cards', label: 'NFC cards' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/teams', label: 'Teams' },
  { href: '/blogs', label: 'Blog' },
];

/** Matches Tailwind's `xl` breakpoint, where the desktop links replace the menu button (D15: two buttons need the room). */
const DESKTOP = '(min-width: 1280px)';

/**
 * The prototype's centred pill navigation: sticky, blurred, links that fill crimson on hover, and
 * the two product buttons at the right: Get the App (the PRM app) and Get NFC Card (the card product).
 * Below the desktop breakpoint the pill holds the wordmark, Get the App and a menu button; the menu
 * closes on Escape, on navigation and when the viewport crosses the breakpoint (Grownz D31).
 */
export function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const mq = window.matchMedia(DESKTOP);
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    onChange();
    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onChange);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onChange);
    };
  }, [open]);
  const current = (href: string) => (path === href || path.startsWith(href + '/') ? 'page' : undefined);
  return (
    <header className="nav">
      <div className="nav__pill">
        <Link href="/" aria-label="Linkist home" className="inline-flex min-h-[44px] items-center no-underline">
          <Wordmark size={19} />
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-0.5 xl:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="nav__link" aria-current={current(l.href)}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 xl:flex">
          <a href={GET_CARD_URL} className="btn btn--secondary btn--sm">
            {G.ctaNfc}
          </a>
          <a href={GET_APP_URL} className="btn btn--primary btn--sm">
            {G.ctaApp}
          </a>
        </div>
        <div className="flex items-center gap-2 xl:hidden">
          <a href={GET_APP_URL} className="btn btn--primary btn--sm">
            {G.ctaApp}
          </a>
          <button type="button" className="btn btn--ghost btn--sm !px-3" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((v) => !v)}>
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>
      {open ? (
        <div id="mobile-nav" className="nav__menu xl:hidden">
          <nav aria-label="Primary mobile" className="flex flex-col">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="nav__link py-3 text-lg" aria-current={current(l.href)}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <a href={GET_APP_URL} className="btn btn--primary">
              {G.ctaApp}
            </a>
            <a href={GET_CARD_URL} className="btn btn--secondary">
              {G.ctaNfc}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
