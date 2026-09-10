'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight, Nfc, Target } from 'lucide-react';
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { GetApp, GetCard } from '@/components/Button';
import { FloatingCard } from '@/components/FloatingCard';
import { MetricChip } from '@/components/MetricChip';
import { NfcCard } from '@/components/NfcCard';
import { Person } from '@/components/Person';
import { ScreenFrame } from '@/components/ScreenFrame';
import { HeroIntro } from '@/motion/HeroIntro';
import { HERO, HERO_SLIDES } from '@/content/home';

const AUTO_MS = 8000;
const SWIPE_PX = 48;

/**
 * Hero carousel (D15): two slides that slide sideways, one for the PRM app (Get the App) and one
 * for the NFC cards (Get NFC Card). Tabs and arrows below the copy, swipe on touch, arrow keys on
 * the tabs. It advances by itself every 8 s while in view and motion is on, pauses on hover and
 * focus, and stops once a visitor takes control. The inactive slide is inert and hidden from
 * assistive technology; the live region only speaks when the carousel is not rotating.
 */
export function HeroCarousel({ screen, screenAlt, person }: { screen?: string; screenAlt: string; person?: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [manual, setManual] = useState(false);
  const [inView, setInView] = useState(false);
  const [motion, setMotion] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const downX = useRef<number | null>(null);
  const [pill, setPill] = useState({ left: 4, width: 0 });
  const n = HERO_SLIDES.length;

  // The segmented control's crimson pill tweens to the selected tab (the segtabs pattern).
  useEffect(() => {
    const measure = () => {
      const tab = tabsRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[index];
      if (tab) setPill({ left: tab.offsetLeft, width: tab.offsetWidth });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [index]);

  const go = useCallback(
    (to: number, byUser = true) => {
      setIndex(((to % n) + n) % n);
      if (byUser) setManual(true);
    },
    [n],
  );

  useEffect(() => {
    const html = document.documentElement;
    const read = () => setMotion(html.dataset['motion'] !== 'off');
    read();
    const mo = new MutationObserver(read);
    mo.observe(html, { attributes: true, attributeFilter: ['data-motion'] });
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return () => mo.disconnect();
    }
    const io = new IntersectionObserver(([e]) => setInView(!!e?.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);

  const rotating = motion && inView && !paused && !manual;
  useEffect(() => {
    if (!rotating) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible') setIndex((i) => (i + 1) % n);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [rotating, n]);

  const onTabKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const next = e.key === 'ArrowRight' ? index + 1 : e.key === 'ArrowLeft' ? index - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : null;
    if (next === null) return;
    e.preventDefault();
    go(next);
    tabsRef.current?.querySelectorAll<HTMLButtonElement>('button')[((next % n) + n) % n]?.focus();
  };
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    downX.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (downX.current === null) return;
    const dx = e.clientX - downX.current;
    downX.current = null;
    if (Math.abs(dx) < SWIPE_PX) return;
    go(dx < 0 ? index + 1 : index - 1);
  };

  return (
    <section className="section pt-10 sm:pt-14">
      <div className="container">
        {/* The page's one H1 never hides: a parked slide is invisible to assistive technology, so the slide headings are H2s. */}
        <h1 className="sr-only">{HERO.lines.join(' ')}</h1>
        <div ref={rootRef} className="hcar" role="region" aria-roledescription="carousel" aria-label="Linkist products" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
          <HeroIntro className="hcar__track">
            <div aria-live={rotating ? 'off' : 'polite'} onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={() => (downX.current = null)} className="hcar__slides">
              {HERO_SLIDES.map((s, i) => {
                const active = i === index;
                const state = active ? 'active' : i < index ? 'prev' : 'next';
                const Heading = 'h2';
                return (
                  <div key={s.key} id={`hero-panel-${s.key}`} role="tabpanel" aria-roledescription="slide" aria-labelledby={`hero-tab-${s.key}`} aria-hidden={!active} inert={!active} data-state={state} className="hcar__slide grid items-center gap-12 lg:grid-cols-[5fr_3fr] lg:gap-10">
                    <div className="hero-copy max-w-3xl">
                      <p className="eyebrow" data-hero-text>
                        {s.eyebrow}
                      </p>
                      <Heading className="display-1 mt-5" data-hero-text>
                        {s.lines[0]}
                        <br />
                        {s.lines[1]}
                        <br />
                        <span className="em-coral">{s.lines[2]}</span>
                      </Heading>
                      <p className="lede mt-6" data-hero-text>
                        {s.lede}
                      </p>
                      <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center" data-hero-text>
                        {s.key === 'app' ? <GetApp size="lg" /> : <GetCard size="lg" variant="primary" />}
                        <Link href={s.secondary.href} className="btn btn--secondary btn--lg">
                          {s.secondary.label}
                        </Link>
                      </div>
                      <p className="mt-5 text-sm text-muted" data-hero-text>
                        {s.subline}
                      </p>
                    </div>
                    {s.key === 'app' ? <AppStage screen={screen} alt={screenAlt} person={person} priority={i === 0} /> : <CardStage />}
                  </div>
                );
              })}
            </div>
          </HeroIntro>

          <div className="hcar__controls" data-hero-text>
            <button type="button" className="btn btn--ghost btn--sm !h-11 !w-11 !p-0" onClick={() => go(index - 1)} aria-label="Previous slide">
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <div ref={tabsRef} role="tablist" aria-label="Choose a product" className="segtabs" onKeyDown={onTabKey}>
              <span className="segtabs__pill" style={{ left: pill.left, width: pill.width }} aria-hidden="true" />
              {HERO_SLIDES.map((s, i) => (
                <button key={s.key} type="button" role="tab" id={`hero-tab-${s.key}`} aria-selected={i === index} aria-controls={`hero-panel-${s.key}`} tabIndex={i === index ? 0 : -1} className="segtabs__tab" onClick={() => go(i)}>
                  {s.tab}
                </button>
              ))}
            </div>
            <button type="button" className="btn btn--ghost btn--sm !h-11 !w-11 !p-0" onClick={() => go(index + 1)} aria-label="Next slide">
              <ChevronRight size={18} aria-hidden="true" />
            </button>
            <span className="sr-only" aria-live="polite">
              {rotating ? 'Slides change every 8 seconds; hover or press a tab to pause.' : ''}
            </span>
          </div>
        </div>

        <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-body sm:mt-14" aria-label="Proof points" data-reveal="fade">
          {HERO.proof.map((p) => (
            <li key={p} className="flex items-center gap-2">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--brand-crimson)' }} />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** The PRM slide: the home screen in a phone with the three floating cards, and the hero person once the image plan produces one. */
function AppStage({ screen, alt, person, priority }: { screen?: string; alt: string; person?: string; priority?: boolean }) {
  return (
    <div className="hero-stage relative min-h-[460px] p-2 sm:min-h-[600px] sm:p-4">
      {person ? (
        <div className="absolute bottom-0 left-0 hidden h-[92%] w-[270px] lg:block" data-hero-card="3">
          <Person src={person} alt="A person holding a phone with the Linkist home screen towards the camera" hero bust priority sizes="300px" />
        </div>
      ) : null}
      <div className={`relative mx-auto mt-2 max-w-[560px] ${person ? 'lg:pl-40' : ''}`}>
        <div className="flex justify-center" data-hero-card="1">
          <div className="w-full max-w-[300px]">
            <ScreenFrame kind="phone" src={screen} alt={alt} priority={priority} preview full />
          </div>
        </div>
        <FloatingCard className="absolute -left-2 top-8 hidden p-1 sm:block lg:-left-6" variant={1} heroIndex={2} ariaLabel="Contact captured, context saved">
          <MetricChip live text="Contact captured, context saved" />
        </FloatingCard>
        <FloatingCard className="absolute -right-2 bottom-16 hidden p-1 sm:block lg:-right-8" variant={2} delay={1.1} deep heroIndex={4} ariaLabel="Next action: follow up with Sara M., example">
          <MetricChip initials="SM" text="Next action: follow up with Sara M." example />
        </FloatingCard>
        <FloatingCard className="absolute right-0 top-[38%] hidden p-1 md:block lg:-right-4" variant={1} delay={0.5} ariaLabel="20 strong ICP matches found, example">
          <MetricChip icon={Target} label="ICP matches" value="20 found" example />
        </FloatingCard>
      </div>
    </div>
  );
}

/** The NFC slide: the three materials fanned as CSS cards (photographs replace them, C3) with two floating cards. */
function CardStage() {
  return (
    <div className="hero-stage relative min-h-[420px] p-2 sm:min-h-[560px] sm:p-4">
      <div className="relative mx-auto mt-2 max-w-[560px]">
        <div className="cardfan" data-hero-card="1" aria-label="Signature cards in PVC, wood and metal, example names" role="group">
          <div className="cardfan__card cardfan__card--1">
            <NfcCard material="pvc" tier="signature" name="Olivia Jones" meta="NYU Abu Dhabi" />
          </div>
          <div className="cardfan__card cardfan__card--2">
            <NfcCard material="metal" tier="signature" name="Olivia Jones" meta="NYU Abu Dhabi" />
          </div>
          <div className="cardfan__card cardfan__card--3">
            <NfcCard material="wood" tier="signature" name="Olivia Jones" meta="NYU Abu Dhabi" />
          </div>
        </div>
        <FloatingCard className="absolute -left-2 top-4 hidden p-1 sm:block lg:-left-6" variant={1} heroIndex={2} ariaLabel="Profile opened with one tap">
          <MetricChip live text="Profile opened with one tap" />
        </FloatingCard>
        <FloatingCard className="absolute -right-2 bottom-8 hidden p-1 sm:block lg:-right-8" variant={2} delay={1.1} deep heroIndex={4} ariaLabel="Contact saved to Linkist: Olivia Jones, example">
          <MetricChip initials="OJ" text="Contact saved: Olivia Jones" example />
        </FloatingCard>
        <FloatingCard className="absolute right-0 top-[40%] hidden p-1 md:block lg:-right-4" variant={1} delay={0.5} ariaLabel="Every card includes PRM Essential">
          <MetricChip icon={Nfc} label="Included" value="PRM Essential" />
        </FloatingCard>
      </div>
    </div>
  );
}
