'use client';

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';

export interface FeatureTab {
  readonly key: string;
  readonly title: string;
  readonly body: string;
  readonly plan?: string;
  readonly screen: ReactNode;
}

/**
 * "What is inside" tabs (v2): a row of pill tabs, then the open tab as a split: its number, title,
 * body and plan badge on the left, the screen on the right. Keyboard: arrows, Home, End.
 */
export function FeatureTabs({ tabs, label }: { tabs: readonly FeatureTab[]; label: string }) {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const n = tabs.length;
  const onKey = (e: KeyboardEvent) => {
    const next = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? (active + 1) % n : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? (active - 1 + n) % n : e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    listRef.current?.querySelectorAll<HTMLElement>('[role="tab"]')[next]?.focus();
  };
  return (
    <div>
      <div ref={listRef} role="tablist" aria-label={label} className="flex flex-wrap gap-2" onKeyDown={onKey}>
        {tabs.map((t, i) => (
          <button key={t.key} type="button" role="tab" id={`${id}-tab-${t.key}`} aria-selected={i === active} aria-controls={`${id}-panel-${t.key}`} tabIndex={i === active ? 0 : -1} className="pilltab" onClick={() => setActive(i)}>
            {t.title}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div key={t.key} role="tabpanel" id={`${id}-panel-${t.key}`} aria-labelledby={`${id}-tab-${t.key}`} hidden={i !== active} className="mt-[clamp(32px,4vw,48px)]">
          <div className="grid items-center gap-[clamp(32px,5vw,72px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
            <div className="min-w-0">
              <p className="font-mono text-xs tracking-[0.16em] text-coral">
                {String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
              </p>
              <h3 className="mt-3 font-display text-[clamp(26px,2.6vw,34px)] font-semibold tracking-[-0.03em]">{t.title}</h3>
              <p className="lede mt-3 max-w-[520px]">{t.body}</p>
              {t.plan ? <p className="tag tag--plan mt-5">{t.plan}</p> : null}
            </div>
            <div className="min-w-0">{t.screen}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
