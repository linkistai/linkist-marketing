'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

export interface FlowStage {
  readonly n: 1 | 2 | 3;
  readonly label: string;
  readonly title: string;
  readonly href: string;
  readonly frame: ReactNode;
}

const STEP_MS = 4000;

/**
 * "How Linkist works" (D51, from linkist-homepage-v1.html): three stage cards, each a numbered badge with the stage name and one line at the top, then the stage's
 * screen in a phone (owner, 24 September 2026: title first, no preview chip). One
 * card is lifted at a time; the stages take turns every 4 s while the block is in view and motion
 * is on, and stop once a visitor points at a card. The "Where are you right now?" chips were
 * removed on 24 September 2026 at the owner's request. Each card links to its
 * feature page; the long bullets, outcomes and capability tags live there and on /how-it-works.
 */
export function StageFlow({ stages }: { stages: readonly FlowStage[] }) {
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

  return (
    <div ref={ref} className="flow" data-in={inView}>
      <ol className="stages" aria-label="The three stages">
        {stages.map((s, i) => (
          <li key={s.n} className="stages__item" style={{ '--i': i } as CSSProperties}>
            <Link href={s.href} className="stagecard no-underline" data-active={i === active} aria-current={i === active ? 'step' : undefined} onMouseEnter={() => { setActive(i); setManual(true); }} onFocus={() => { setActive(i); setManual(true); }}>
              <div className="stagecard__head">
                <span className="stagecard__badge" aria-hidden="true">
                  {s.n}
                </span>
                <div>
                  <h3 className="stagecard__title">
                    {s.label}
                    <ArrowRight size={16} aria-hidden="true" className="stagecard__arrow" />
                  </h3>
                  <p className="stagecard__desc">{s.title}</p>
                </div>
              </div>
              <div className="stagecard__phone">{s.frame}</div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
