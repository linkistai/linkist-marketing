'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export interface HeroSlide {
  readonly key: string;
  /** The screen on the phone: a profile sample or an app screen. */
  readonly screen?: string;
  readonly alt: string;
  /** The Signature card that goes with it. */
  readonly card?: string;
  readonly cardAlt: string;
}

const STEP_MS = 4500;

/**
 * The hero product as a carousel (owner, 23 September 2026, D54): the phone and the card beside it
 * cycle together through two public profiles and the app dashboard, crossfading every 4.5 s. It
 * runs while in view and motion is on, pauses on hover and focus, and the dots let a visitor pick
 * a slide. Inactive layers are hidden from assistive technology.
 */
export function HeroProduct({ slides, label }: { slides: readonly HeroSlide[]; label: string }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const [motion, setMotion] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const n = slides.length;

  useEffect(() => {
    const html = document.documentElement;
    const read = () => setMotion(html.dataset['motion'] !== 'off');
    read();
    const mo = new MutationObserver(read);
    mo.observe(html, { attributes: true, attributeFilter: ['data-motion'] });
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return () => mo.disconnect();
    const io = new IntersectionObserver(([e]) => setInView(!!e?.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);

  const running = motion && inView && !paused && n > 1;
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible') setActive((a) => (a + 1) % n);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [running, n]);

  return (
    <div ref={ref} className="hero-product" role="group" aria-roledescription="carousel" aria-label={label} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="hero-product__phone">
        <div className="phone">
          <div className="phone__notch" aria-hidden="true" />
          <div className="phone__screen">
            {slides.map((s, i) =>
              s.screen ? (
                <div key={s.key} className="hero-product__layer" data-active={i === active} aria-hidden={i !== active}>
                  <Image src={s.screen} alt={s.alt} fill sizes="(min-width: 1024px) 320px, 62vw" priority={i === 0} style={{ objectFit: 'cover', objectPosition: 'top' }} />
                </div>
              ) : null,
            )}
            <span className="preview-badge">Design preview</span>
          </div>
        </div>
      </div>
      <div className="hero-product__card" data-hero-card="2">
        {slides.map((s, i) =>
          s.card ? (
            <div key={s.key} className="hero-product__layer" data-active={i === active} aria-hidden={i !== active}>
              <Image src={s.card} alt={s.cardAlt} fill sizes="(min-width: 1024px) 320px, 60vw" priority={i === 0} style={{ objectFit: 'contain' }} />
            </div>
          ) : null,
        )}
      </div>
      {n > 1 ? (
        <div className="hero-product__dots" role="tablist" aria-label="Choose a screen">
          {slides.map((s, i) => (
            <button key={s.key} type="button" role="tab" aria-selected={i === active} aria-label={`Show ${s.alt.replace(/^Design preview\. /, '')}`} className="hero-product__dot" onClick={() => setActive(i)} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
