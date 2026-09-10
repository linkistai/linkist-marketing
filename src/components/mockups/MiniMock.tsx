'use client';

import { Check, Search } from 'lucide-react';
import { useEffect, useRef, type CSSProperties } from 'react';

/**
 * Mini mockups (brief 5, Grownz D26): card-sized UI sequences that replay what a feature does
 * with example figures, in the "See it move" style. Each variant is CSS keyframes on the 9 s loop
 * (styles/mockups.css, `.mini`), paused off-screen and frozen at its end state when motion is off.
 * They are not app screens and every figure is an example.
 */
export type MiniMockKind =
  | { kind: 'enrich'; label: string; fields: readonly (readonly [string, string, boolean])[] }
  | { kind: 'search'; label: string; query: string; results: readonly (readonly [string, string, string])[] }
  | { kind: 'icp'; label: string; items: readonly string[]; count: string }
  | { kind: 'nudge'; label: string; title: string; note: string; actions: readonly [string, string] }
  | { kind: 'day'; label: string; items: readonly (readonly [string, string])[] }
  | { kind: 'share'; label: string; front: readonly [string, string]; back: readonly [string, string] }
  | { kind: 'tap'; label: string }
  | { kind: 'ring'; label: string; value: string; pct: number; pct2?: number; legend: readonly (readonly [string, string])[] }
  | { kind: 'rows'; label: string; rows: readonly (readonly [string, string])[] }
  | { kind: 'bars'; label: string; values: readonly number[]; alt?: number }
  | { kind: 'progress'; label: string; pct: number; note: string }
  | { kind: 'chips'; label: string; items: readonly string[]; pick: number };

export function MiniMock({ mock, className = '' }: { mock: MiniMockKind; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => el.setAttribute('data-inview', String(!!e?.isIntersecting)), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`mini mini--${mock.kind} ${className}`} data-inview="false" role="img" aria-label={`${mock.label}, example`}>
      <span className="mini__example" aria-hidden="true">
        example
      </span>
      <Body mock={mock} />
    </div>
  );
}

const AVATARS = ['', 'mini__avatar--2', 'mini__avatar--3'];

function Body({ mock }: { mock: MiniMockKind }) {
  switch (mock.kind) {
    case 'enrich':
      return (
        <dl className="mini__fields">
          {mock.fields.map(([k, v, fill], i) => (
            <FieldRow key={k} k={k} v={v} fill={fill} i={i} />
          ))}
        </dl>
      );
    case 'search': {
      const q = mock.query;
      const steps = [0.2, 0.4, 0.6, 0.8, 1].map((p) => JSON.stringify(q.slice(0, Math.ceil(q.length * p))));
      const vars = { '--full': JSON.stringify(q), '--t1': steps[0], '--t2': steps[1], '--t3': steps[2], '--t4': steps[3], '--t5': steps[4] } as CSSProperties;
      return (
        <div>
          <div className="mini__field">
            <Search size={13} aria-hidden="true" />
            <span className="mini__typed" style={vars} />
            <span className="mini__caret" aria-hidden="true" />
          </div>
          <ul className="mini__results">
            {mock.results.map(([ini, name, meta], i) => (
              <li key={name} className="mini__result" style={{ '--d': `${2 + i * 0.5}s` } as CSSProperties}>
                <span className={`mini__avatar ${AVATARS[i] ?? ''}`} aria-hidden="true">
                  {ini}
                </span>
                <span className="flex flex-col leading-tight">
                  <b className="font-medium">{name}</b>
                  <span className="text-muted">{meta}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    case 'icp':
      return (
        <div>
          <p className="mini__label">Ideal customer profile</p>
          <div className="mini__chips">
            {mock.items.map((c, i) => (
              <span key={c} className="mini__chip" data-pick style={{ '--d': `${i * 0.45}s` } as CSSProperties}>
                {c}
              </span>
            ))}
          </div>
          <p className="mini__note" style={{ '--d': '2.4s' } as CSSProperties}>
            <span className="flex items-center gap-1">
              <Check size={12} aria-hidden="true" /> {mock.count}
            </span>
          </p>
        </div>
      );
    case 'nudge':
      return (
        <div className="mini__nudge">
          <b>{mock.title}</b>
          <small>{mock.note}</small>
          <div className="mini__actions">
            <span className="mini__btn" data-press>
              {mock.actions[0]}
            </span>
            <span className="mini__btn mini__btn--ghost">{mock.actions[1]}</span>
          </div>
        </div>
      );
    case 'day':
      return (
        <ul className="mini__rows">
          {mock.items.map(([t, meta], i) => (
            <li key={t} className="mini__row" style={{ '--d': `${0.3 + i * 0.5}s` } as CSSProperties}>
              <span className="flex items-center gap-2">
                <span className="mini__tick" style={{ '--d': `${1.4 + i * 1.3}s` } as CSSProperties} aria-hidden="true">
                  <Check size={11} />
                </span>
                {t}
              </span>
              <span className="text-muted">{meta}</span>
            </li>
          ))}
        </ul>
      );
    case 'share':
      return (
        <div className="mini__pair">
          <div className="mini__pcard mini__pcard--back">
            <b>{mock.back[0]}</b>
            <span className="text-muted">{mock.back[1]}</span>
            <span className="mini__teamtag">Shared</span>
          </div>
          <div className="mini__pcard mini__pcard--front">
            <b>{mock.front[0]}</b>
            <span className="text-muted">{mock.front[1]}</span>
          </div>
        </div>
      );
    case 'tap':
      return (
        <div className="mini__tap">
          <div className="mini__tap-phone" aria-hidden="true" />
          <div className="mini__tap-card" aria-hidden="true">
            <i />
          </div>
          <span className="mini__toast">
            <i aria-hidden="true" /> Profile shared
          </span>
        </div>
      );
    case 'ring':
      return (
        <div className="mini__ring">
          <svg viewBox="0 0 80 80" aria-hidden="true">
            <circle className="mini__ring-track" cx="40" cy="40" r="32" />
            <circle className="mini__ring-fill" cx="40" cy="40" r="32" style={{ '--pct': mock.pct } as CSSProperties} />
            {mock.pct2 !== undefined ? <circle className="mini__ring-fill mini__ring-fill--2" cx="40" cy="40" r="26" style={{ '--pct': mock.pct2 } as CSSProperties} /> : null}
          </svg>
          <span className="mini__ring-value">{mock.value}</span>
          <ul className="mini__legend">
            {mock.legend.map(([t, c], i) => (
              <li key={t} style={{ '--c': c, '--d': `${1.2 + i * 0.4}s` } as CSSProperties}>
                <i aria-hidden="true" /> {t}
              </li>
            ))}
          </ul>
        </div>
      );
    case 'rows':
      return (
        <ul className="mini__rows">
          {mock.rows.map(([k, v], i) => (
            <li key={k} className="mini__row" style={{ '--d': `${0.3 + i * 0.5}s` } as CSSProperties}>
              <span>{k}</span>
              <span className="mini__amt">{v}</span>
            </li>
          ))}
        </ul>
      );
    case 'bars':
      return (
        <div className="mini__bars">
          {mock.values.map((v, i) => (
            <span key={i} className="mini__bar" data-alt={mock.alt === i || undefined} style={{ '--h': `${v}%`, '--d': `${i * 0.18}s` } as CSSProperties} />
          ))}
        </div>
      );
    case 'progress':
      return (
        <div>
          <div className="mini__track">
            <span className="mini__fill" style={{ '--pct': `${mock.pct}%` } as CSSProperties} />
          </div>
          <p className="mini__note">
            <span className="flex items-center gap-1">
              <Check size={12} aria-hidden="true" /> {mock.note}
            </span>
          </p>
        </div>
      );
    case 'chips':
      return (
        <div className="mini__chips">
          {mock.items.map((c, i) => (
            <span key={c} className="mini__chip" data-pick={mock.pick === i || undefined}>
              {c}
            </span>
          ))}
        </div>
      );
  }
}

function FieldRow({ k, v, fill, i }: { k: string; v: string; fill: boolean; i: number }) {
  return (
    <>
      <dt>{k}</dt>
      <dd data-fill={fill || undefined} style={{ '--d': `${1 + i * 0.7}s` } as CSSProperties}>
        {v}
      </dd>
    </>
  );
}
