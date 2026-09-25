'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { G } from '@/lib/glossary';
import { FREE_PROFILE_URL, GET_CARD_URL } from '@/lib/site';

const LINKS = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/features', label: 'Features' },
  { href: '/use-cases', label: 'Use cases' },
  { href: '/nfc-cards', label: 'NFC cards' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/teams', label: 'Teams' },
  { href: '/blogs', label: 'Blog' },
];

/** The v2 breakpoint: the seven links and both buttons need 1180 px. */
const DESKTOP = '(min-width: 1180px)';

/**
 * The v2 header: a fixed floating pill, blurred, that firms up after 40 px of scroll. The lockup
 * sits left, the seven links centre (the current route is tinted red and marked aria-current), and
 * Get NFC Card and Get the App right. Below 1180 px the pill keeps Get the App and a 44 px menu
 * button that opens a full-screen overlay; Escape, any link and crossing the breakpoint close it.
 */
export function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
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
    <>
      <header className="v2nav">
        <div className="v2nav__pill" data-scrolled={scrolled}>
          <Link href="/" aria-label="Linkist home" className="inline-flex min-h-[44px] items-center no-underline">
            <Image src="/brand/lockup.png" alt="Linkist" width={1352} height={422} priority className="h-[36px] w-auto sm:h-[44px]" />
          </Link>
          <nav aria-label="Primary" className="hidden items-center gap-0.5 min-[1180px]:flex">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="v2nav__link" aria-current={current(l.href)}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-2 min-[1180px]:flex">
            <a href={GET_CARD_URL} className="btn btn--secondary btn--sm">
              {G.ctaNfc}
            </a>
            <a href={FREE_PROFILE_URL} className="btn btn--primary btn--sm">
              {G.ctaApp}
            </a>
          </div>
          <div className="flex items-center gap-2 min-[1180px]:hidden">
            <a href={FREE_PROFILE_URL} className="btn btn--primary btn--sm">
              {G.ctaApp}
            </a>
            <button type="button" className="v2nav__menu-btn" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen((v) => !v)}>
              {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            </button>
          </div>
        </div>
      </header>
      {open ? (
        <div id="mobile-nav" className="v2nav__overlay min-[1180px]:hidden">
          <nav aria-label="Primary mobile" className="flex flex-col">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="v2nav__big" aria-current={current(l.href)} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-2.5">
            <a href={FREE_PROFILE_URL} className="btn btn--primary w-full !min-h-[52px]">
              {G.ctaApp}
            </a>
            <a href={GET_CARD_URL} className="btn btn--secondary w-full !min-h-[52px]">
              {G.ctaNfc}
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
