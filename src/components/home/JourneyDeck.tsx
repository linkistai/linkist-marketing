'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

/**
 * The three-stage journey as a deck (brief 5): three screens fan from a tight stack to a spread as
 * the section scrolls in (80 ms stagger, 500 ms ease-out) and stack again when it leaves. Hover
 * lifts one card out of the fan. Below 900 px the deck becomes a plain grid.
 */
const FAN = [
  { k: -1, r: -6 },
  { k: 0, r: 0 },
  { k: 1, r: 6 },
];
const STACK = [
  { x: -16, r: -3 },
  { x: 0, r: 0 },
  { x: 16, r: 3 },
];

export function JourneyDeck({ cards }: { cards: readonly { key: string; label: string; title: string; frame: ReactNode; href: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (document.documentElement.dataset['motion'] !== 'on' || typeof IntersectionObserver === 'undefined') {
      el.dataset['fanned'] = 'true';
      return;
    }
    const io = new IntersectionObserver(([e]) => (el.dataset['fanned'] = String(!!e?.isIntersecting)), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="deck" data-fanned="false">
      {cards.map((c, i) => {
        const fan = FAN[i] ?? FAN[1]!;
        const stack = STACK[i] ?? STACK[1]!;
        const style = { '--i': i, '--k': fan.k, '--fan-r': `${fan.r}deg`, '--stack-x': `${stack.x}px`, '--stack-r': `${stack.r}deg`, zIndex: i } as CSSProperties;
        return (
          <article key={c.key} className="deck__card" style={style} tabIndex={0} aria-label={`Stage ${i + 1} of 3, ${c.label}`}>
            {c.frame}
            <p className="deck__label">
              <span className="text-muted">{i + 1} · </span>
              {c.label}
            </p>
            <p className="deck__label !mt-1 !font-normal text-muted">{c.title}</p>
          </article>
        );
      })}
    </div>
  );
}
