'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarCheck, CreditCard, Database, Sparkles, Target } from 'lucide-react';
import { useRef, useState, type KeyboardEvent, type MouseEvent } from 'react';
import { Button } from '@/components/Button';
import { StoreBadges } from '@/components/StoreBadges';
import { HERO } from '@/content/home';
import { Parallax } from '@/motion/Parallax';
import { FREE_PROFILE_URL, GET_CARD_URL } from '@/lib/site';

const PILLAR_ICONS = [CreditCard, Database, Target, Sparkles, CalendarCheck];
/** Content hrefs: two keywords for the app's sign-up and store, anything else is a site path. */
const go = (href: string) => (href === 'free-profile' ? FREE_PROFILE_URL : href === 'get-card' ? GET_CARD_URL : href);

/**
 * The v2 home hero, with a For teams / For individuals switcher on the left (owner, 25 September
 * 2026) that swaps the H1, lede, buttons and the line under them; the five capability icons and the
 * store badges stay. The rest: a full-viewport block. A 640 px red spotlight follows the pointer (a CSS
 * variable pair, no re-render), the three H1 lines rise into view behind a mask, 140 ms apart, and
 * the right side is the hand-tapping-a-card photograph with NFC ripples, over a crimson light field
 * and a slow-turning giant brand mark. Everything decorative is aria-hidden; with motion off the
 * lines, ripples and float stand still.
 */
export function HomeHero() {
  const spot = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState(0);
  const m = HERO.modes[mode]!;
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const onTabKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft' && e.key !== 'Home' && e.key !== 'End') return;
    e.preventDefault();
    const n = HERO.modes.length;
    const next = e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : (mode + (e.key === 'ArrowRight' ? 1 : n - 1)) % n;
    setMode(next);
    tabs.current[next]?.focus();
  };
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const el = spot.current;
    if (!el) return;
    const r = e.currentTarget.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <section className="home-hero" aria-labelledby="hero-title" onMouseMove={onMove}>
      <div ref={spot} className="home-hero__spot" aria-hidden="true" />
      <div className="home-hero__floor" aria-hidden="true" />
      <Image src="/assets/gen/abstract.webp" alt="" aria-hidden="true" fill priority sizes="100vw" className="home-hero__field" />
      <Parallax k={0.12} className="home-hero__mark">
        <Image src="/brand/mark.png" alt="" aria-hidden="true" width={256} height={256} className="v2-spin h-auto w-full" />
      </Parallax>

      <div className="container grid items-center gap-[clamp(24px,4vw,56px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,500px),1fr))]">
        <div className="min-w-0 [container-type:inline-size]">
          <p className="eyebrow eyebrow--pulse" data-reveal="fade">
            {HERO.eyebrow}
          </p>
          <div role="tablist" aria-label="Linkist for" className="herotabs mt-6" onKeyDown={onTabKey}>
            {HERO.modes.map((x, i) => (
              <button
                key={x.key}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`hero-tab-${x.key}`}
                aria-selected={i === mode}
                aria-controls="hero-panel"
                tabIndex={i === mode ? 0 : -1}
                className="herotabs__tab"
                onClick={() => setMode(i)}
              >
                {x.tab}
              </button>
            ))}
          </div>
          <div id="hero-panel" role="tabpanel" aria-labelledby={`hero-tab-${m.key}`}>
            <h1 id="hero-title" className="home-hero__title" key={m.key}>
              {m.lines.map((line, i) => (
                <span key={line} className="home-hero__mask">
                  <span className={`home-hero__line ${i >= m.lines.length - m.em ? 'em-coral' : ''}`} style={{ animationDelay: `${150 + i * 140}ms` }}>
                    {line}
                  </span>
                </span>
              ))}
            </h1>
            <p className="lede mt-7 max-w-[600px] !text-[clamp(16px,1.35vw,18px)]">
              {m.lede}
              {'ledeStrong' in m && m.ledeStrong ? <strong className="font-semibold text-white"> {m.ledeStrong}</strong> : null}
            </p>
            <div className="mt-[34px] flex flex-wrap gap-3">
              <Button href={go(m.primary.href)} size="lg" className="min-w-[220px] !min-h-[56px]">
                {m.primary.label}
              </Button>
              <Button href={go(m.secondary.href)} size="lg" variant="secondary" className="min-w-[220px] !min-h-[56px]">
                {m.secondary.label}
              </Button>
            </div>
            <div className="mt-7 border-t border-line pt-4">
              {m.key === 'teams' ? (
                <p className="text-[15px] text-body">
                  {HERO.switchToIndividuals.lead}{' '}
                  <button type="button" className="inline-flex min-h-[44px] items-center text-white underline underline-offset-4 hover:text-coral" onClick={() => setMode(HERO.modes.findIndex((x) => x.key === 'individuals'))}>
                    {HERO.switchToIndividuals.link}
                  </button>
                </p>
              ) : (
                <Link href="/bring-your-own" className="link min-h-[44px]">
                  {HERO.byo}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
          <ul className="heropillars mt-4" aria-label="What Linkist does">
            {HERO.pillars.map((p, i) => {
              const Icon = PILLAR_ICONS[i]!;
              return (
                <li key={p}>
                  <span className="heropillars__icon" aria-hidden="true">
                    <Icon size={20} strokeWidth={1.6} />
                  </span>
                  <span>{p}</span>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 border-t border-line pt-6">
            <StoreBadges />
          </div>
        </div>

        <div className="home-hero__stage" role="img" aria-label={HERO.imageAlt}>
          <div className="v2-glow w-[80%] blur-[14px]" style={{ background: 'radial-gradient(circle, rgba(163,22,45,.5), rgba(163,22,45,0) 64%)' }} aria-hidden="true" />
          <Parallax k={0.1} className="home-hero__cards" style={{ position: 'absolute' }}>
            <Image src="/assets/gen/cards-cut.webp" alt="" aria-hidden="true" width={1024} height={1024} sizes="160px" className="v2-float w-full blur-[2px]" style={{ ['--float-dur' as string]: '9s' }} />
          </Parallax>
          <Parallax k={-0.05} className="relative w-[min(100%,560px)]">
            <Image src="/assets/gen/hero-tap.webp" alt="" aria-hidden="true" width={928} height={1152} priority sizes="(min-width: 1024px) 560px, 90vw" className="home-hero__photo v2-float" />
            <span className="v2-ripple absolute left-[52%] top-[30%] h-0 w-0" style={{ ['--ripple-gap' as string]: '0.5s' }} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </Parallax>
        </div>
      </div>
      <div className="container">
      </div>
    </section>
  );
}
