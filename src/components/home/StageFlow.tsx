'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { TextLink } from '@/components/Button';
import { Outcome, Tags } from '@/components/Section';
import { INTENTS } from '@/content/home';

export interface FlowStage {
  readonly n: 1 | 2 | 3;
  readonly label: string;
  readonly title: string;
  readonly bullets: readonly string[];
  readonly outcome: string;
  readonly chips: readonly string[];
  readonly href: string;
  readonly frame: ReactNode;
}

const STEP_MS = 3600;

/**
 * "How Linkist works" (D17): the intent chips from the hero sit above a flow of the three stage
 * screens joined by a rail. One stage is lit at a time and the rail fills towards the next; the
 * flow steps by itself while in view and motion is on, and stops once a visitor picks a chip or a
 * stage. Each chip rewrites the scenario line, lights the stage the moment belongs to and points at
 * the matching use case. The three stage cards below follow the same active stage.
 */
export function StageFlow({ stages }: { stages: readonly FlowStage[] }) {
  const [intent, setIntent] = useState<number | null>(null);
  const [active, setActive] = useState(0);
  const [manual, setManual] = useState(false);
  const [inView, setInView] = useState(false);
  const [motion, setMotion] = useState(true);
  const [tick, setTick] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const read = () => setMotion(html.dataset['motion'] !== 'off');
    read();
    const mo = new MutationObserver(read);
    mo.observe(html, { attributes: true, attributeFilter: ['data-motion'] });
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return () => mo.disconnect();
    }
    const io = new IntersectionObserver(([e]) => setInView(!!e?.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);

  const stepping = motion && inView && !manual;
  useEffect(() => {
    if (!stepping) return;
    const id = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      setActive((a) => (a + 1) % stages.length);
      setTick((t) => t + 1);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [stepping, stages.length]);

  const pick = (i: number) => {
    setIntent(i);
    setActive((INTENTS[i]?.stage ?? 1) - 1);
    setManual(true);
  };
  const chosen = intent === null ? null : (INTENTS[intent] ?? null);

  return (
    <div ref={ref} className="flow" data-in={inView} data-stepping={stepping}>
      <div className="mx-auto max-w-3xl text-center" data-reveal="rise">
        <p className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">Where are you right now?</p>
        <div className="mt-3 flex flex-wrap justify-center gap-2" role="group" aria-label="Pick your situation">
          {INTENTS.map((it, i) => (
            <button key={it.key} type="button" className="intent" aria-pressed={i === intent} onClick={() => pick(i)}>
              {it.chip}
            </button>
          ))}
        </div>
        <p className="lede mx-auto mt-5 min-h-[3.2em]" aria-live="polite">
          {chosen ? chosen.lede : 'Pick the moment you are in and see which stage of Linkist answers it, or watch the three stages take turns.'}
        </p>
        {chosen ? (
          <p className="mt-2 text-sm">
            <TextLink href={chosen.href}>Read this use case</TextLink>
          </p>
        ) : null}
      </div>

      <ol className="flow__stages mt-12" aria-label="The three stages">
        {stages.map((s, i) => {
          const state = i === active ? 'active' : 'idle';
          const seg = i < stages.length - 1 ? (i < active ? 'done' : i === active ? (stepping ? 'filling' : 'todo') : 'todo') : null;
          return (
            <li key={s.n} className="flow__stage" data-state={state} style={{ '--i': i } as CSSProperties}>
              <div className="flow__phone" onClick={() => { setActive(i); setManual(true); }}>
                {s.frame}
              </div>
              {seg ? <span className="flow__seg" data-state={seg} key={`${seg}-${tick}`} style={{ '--dur': `${STEP_MS}ms` } as CSSProperties} aria-hidden="true" /> : null}
              <button type="button" className="flow__label" aria-pressed={i === active} onClick={() => { setActive(i); setManual(true); }}>
                <span className="flow__num">{s.n}</span>
                <span>
                  <span className="block font-semibold">{s.label}</span>
                  <span className="block text-sm text-muted">{s.title}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="mt-12 grid gap-6 lg:grid-cols-3" data-reveal="rise" data-reveal-stagger="0.08">
        {stages.map((s, i) => (
          <article key={s.n} className={`card card--hover flow__card flex flex-col gap-4 p-7 ${i === active ? 'flow__card--active' : ''}`} aria-current={i === active ? 'step' : undefined}>
            <p className="eyebrow eyebrow--accent text-[12px]">
              {s.n} · {s.label}
            </p>
            <h3 className="display-3">{s.title}</h3>
            <ul className="flex flex-col gap-2 pl-5 text-md text-body" style={{ listStyle: 'disc' }}>
              {s.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <div className="mt-auto">
              <Outcome>{s.outcome}</Outcome>
            </div>
            <Tags items={s.chips} />
            <Link href={s.href} className="link text-sm">
              {s.label} in depth
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
