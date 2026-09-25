'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export interface SwitcherStage {
  readonly n: 1 | 2 | 3;
  readonly label: string;
  readonly title: string;
  readonly bullets: readonly string[];
  readonly chips: readonly string[];
  readonly href: string;
  readonly screen?: string;
  readonly alt: string;
  /** A full-length capture that scrolls inside the phone (pixel size). */
  readonly tall?: { readonly w: number; readonly h: number };
}

const STEP_MS = 4500;

/**
 * How Linkist works (v2): three stage buttons on the left, the phone on the right. The open stage
 * shows its bullets and chips and a progress bar; the stages advance every 4.5 s while in view
 * and motion is on, and stop for good once a visitor picks one. The phone crossfades between the
 * three screens with a giant outlined stage number behind it.
 */
export function StageSwitcher({ stages }: { stages: readonly SwitcherStage[] }) {
  const [active, setActive] = useState(0);
  const [manual, setManual] = useState(false);
  const [running, setRunning] = useState(false);
  const [cycle, setCycle] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const motionOn = document.documentElement.dataset['motion'] !== 'off';
    if (!el || !motionOn || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => setRunning(!!e?.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running || manual) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setActive((a) => (a + 1) % stages.length);
      setCycle((c) => c + 1);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [running, manual, stages.length]);

  const pick = (i: number) => {
    setActive(i);
    setManual(true);
  };

  return (
    <div ref={ref} className="mt-[clamp(40px,6vw,72px)] grid items-center gap-[clamp(28px,5vw,64px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr))]">
      <ol aria-label="The three stages" className="m-0 flex list-none flex-col gap-3 p-0">
        {stages.map((s, i) => {
          const on = i === active;
          return (
            <li key={s.n}>
              <div className="stagebtn" data-active={on}>
                <button type="button" className="stagebtn__head" aria-expanded={on} aria-controls={`stage-panel-${s.n}`} onClick={() => pick(i)}>
                  <span className="stagebtn__num" aria-hidden="true">
                    {s.n}
                  </span>
                  <span className="block min-w-0">
                    <span className="stagebtn__label">{s.label}</span>
                    <span className="stagebtn__title">{s.title}</span>
                  </span>
                </button>
                <div id={`stage-panel-${s.n}`} hidden={!on} className="stagebtn__panel">
                  <ul className="bullets !gap-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="!text-sm">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Capabilities">
                    {s.chips.map((c) => (
                      <li key={c} className="tag">
                        {c}
                      </li>
                    ))}
                  </ul>
                  <Link href={s.href} className="link mt-2">
                    {s.label} in depth
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
                {on ? (
                  <span className="stagebtn__track" aria-hidden="true">
                    <span key={`${active}-${cycle}`} className="stagebtn__bar" data-run={running && !manual} />
                  </span>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
      <div className="relative flex min-h-[600px] items-center justify-center">
        <div className="v2-glow w-[min(100%,520px)]" style={{ background: 'radial-gradient(circle, rgba(163,22,45,.32), transparent 65%)' }} aria-hidden="true" />
        <div className="stage-num" aria-hidden="true">
          {stages[active]?.n}
        </div>
        <div className="phone relative !w-[280px] !max-w-full">
          <div className="phone__screen">
            {stages.map((s, i) =>
              s.screen && s.tall ? (
                <div key={s.n} className="stage-screen phone__scroll" data-active={i === active} aria-hidden={i !== active} inert={i !== active} tabIndex={i === active ? 0 : -1} role="region" aria-label={`${s.alt}. Scrolls.`} data-lenis-prevent>
                  <Image src={s.screen} alt={i === active ? s.alt : ''} width={s.tall.w} height={s.tall.h} sizes="280px" className="block h-auto w-full" />
                </div>
              ) : s.screen ? (
                <Image key={s.n} src={s.screen} alt={i === active ? s.alt : ''} aria-hidden={i !== active} fill sizes="280px" className="stage-screen" data-active={i === active} />
              ) : null,
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
