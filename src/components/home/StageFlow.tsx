'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { TextLink } from '@/components/Button';
import { INTENTS } from '@/content/home';

export interface FlowStage {
  readonly n: 1 | 2 | 3;
  readonly label: string;
  readonly title: string;
  readonly href: string;
  readonly frame: ReactNode;
}

const STEP_MS = 4000;

/**
 * "How Linkist works" (D51, from linkist-homepage-v1.html): the intent chips, then three stage
 * cards, each a numbered badge, the stage's screen in a phone, the stage name and one line. One
 * card is lifted at a time; the stages take turns every 4 s while the block is in view and motion
 * is on, and stop once a visitor picks a chip or a card. A chip rewrites the scenario line, lifts
 * the stage the moment belongs to and points at the matching use case. Each card links to its
 * feature page; the long bullets, outcomes and capability tags live there and on /how-it-works.
 * The Design preview badge sits at the top of the card, in the space beside the number, not over
 * the phone's tab bar (owner, 21 September).
 */
export function StageFlow({ stages }: { stages: readonly FlowStage[] }) {
  const [intent, setIntent] = useState<number | null>(null);
  const [active, setActive] = useState(1);
  const [manual, setManual] = useState(false);
  const [inView, setInView] = useState(false);
  const [motion, setMotion] = useState(true);
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
    const io = new IntersectionObserver(([e]) => setInView(!!e?.isIntersecting), { threshold: 0.25 });
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
    <div ref={ref} className="flow" data-in={inView}>
      <div className="mx-auto max-w-3xl text-center" data-reveal="rise">
        <p className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">Where are you right now?</p>
        <div className="mt-3 flex flex-wrap justify-center gap-2" role="group" aria-label="Pick your situation">
          {INTENTS.map((it, i) => (
            <button key={it.key} type="button" className="intent" aria-pressed={i === intent} onClick={() => pick(i)}>
              {it.chip}
            </button>
          ))}
        </div>
        <p className="mx-auto mt-4 min-h-[2.6em] max-w-xl text-sm text-body" aria-live="polite">
          {chosen ? chosen.lede : 'Pick the moment you are in and see which stage of Linkist answers it, or watch the three stages take turns.'}
        </p>
        {chosen ? (
          <p className="mt-1 text-sm">
            <TextLink href={chosen.href}>Read this use case</TextLink>
          </p>
        ) : null}
      </div>

      <ol className="stages mt-14" aria-label="The three stages">
        {stages.map((s, i) => (
          <li key={s.n} className="stages__item" style={{ '--i': i } as CSSProperties}>
            <Link href={s.href} className="stagecard no-underline" data-active={i === active} aria-current={i === active ? 'step' : undefined} onMouseEnter={() => { setActive(i); setManual(true); }} onFocus={() => { setActive(i); setManual(true); }}>
              <span className="stagecard__badge" aria-hidden="true">
                {s.n}
              </span>
              <span className="preview-badge stagecard__preview">Design preview</span>
              <div className="stagecard__phone">{s.frame}</div>
              <h3 className="stagecard__title">
                {s.label}
                <ArrowRight size={16} aria-hidden="true" className="stagecard__arrow" />
              </h3>
              <p className="stagecard__desc">{s.title}</p>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
