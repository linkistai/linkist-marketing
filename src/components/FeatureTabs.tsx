'use client';

import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';

export interface FeatureTab {
  readonly key: string;
  readonly title: string;
  readonly body: string;
  readonly screen: ReactNode;
}

/** Sticky left tabs, right screen crossfade (250 ms + 12 px slide), animated indicator. Keyboard: arrows, Home, End. */
export function FeatureTabs({ tabs, label }: { tabs: readonly FeatureTab[]; label: string }) {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const [ind, setInd] = useState({ top: 0, height: 0 });
  const id = useId();
  useEffect(() => {
    const el = listRef.current?.querySelectorAll<HTMLElement>('.ftabs__tab')[active];
    if (el) setInd({ top: el.offsetTop, height: el.offsetHeight });
  }, [active, tabs.length]);
  const onKey = (e: KeyboardEvent) => {
    const n = tabs.length;
    const next = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? (active + 1) % n : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? (active - 1 + n) % n : e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    listRef.current?.querySelectorAll<HTMLElement>('.ftabs__tab')[next]?.focus();
  };
  return (
    <div className="ftabs">
      <div ref={listRef} className="ftabs__list" role="tablist" aria-label={label} aria-orientation="vertical" onKeyDown={onKey}>
        <span className="ftabs__indicator hidden lg:block" style={{ top: ind.top, height: ind.height }} aria-hidden="true" />
        {tabs.map((t, i) => (
          <button key={t.key} type="button" role="tab" id={`${id}-tab-${t.key}`} aria-selected={i === active} aria-controls={`${id}-panel-${t.key}`} tabIndex={i === active ? 0 : -1} className="ftabs__tab" onClick={() => setActive(i)}>
            <h3>{t.title}</h3>
            <p>{t.body}</p>
          </button>
        ))}
      </div>
      <div className="ftabs__panel">
        {tabs.map((t, i) => (
          <div key={t.key} role="tabpanel" id={`${id}-panel-${t.key}`} aria-labelledby={`${id}-tab-${t.key}`} className="ftabs__screen" data-active={i === active} aria-hidden={i !== active}>
            {t.screen}
          </div>
        ))}
      </div>
    </div>
  );
}
