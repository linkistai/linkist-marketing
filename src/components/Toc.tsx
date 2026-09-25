'use client';

import { useEffect, useState } from 'react';
import type { Chapter } from '@/lib/markdown';

/** Chapters sidebar: lists h2 and h3 anchors and highlights the one in view. */
export function Toc({ chapters, title = 'Chapters' }: { chapters: readonly Chapter[]; title?: string }) {
  const [active, setActive] = useState<string | null>(chapters[0]?.id ?? null);
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const els = chapters.map((c) => document.getElementById(c.id)).filter((x): x is HTMLElement => !!x);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [chapters]);
  if (!chapters.length) return null;
  return (
    <nav aria-label={title}>
      <p className="text-xs font-semibold uppercase tracking-[0.06em] text-muted">{title}</p>
      <ol className="mt-3.5 flex flex-col border-l border-line">
        {chapters.map((c) => {
          const on = active === c.id;
          return (
            <li key={c.id} className={c.level === 3 ? 'pl-3' : ''}>
              <a href={`#${c.id}`} className={`-ml-px flex min-h-[44px] items-center border-l py-1.5 pl-4 text-sm leading-[1.4] no-underline transition-colors hover:border-red-bright hover:text-white ${on ? 'border-red-bright font-medium text-white' : 'border-transparent text-body'}`} aria-current={on ? 'location' : undefined}>
                {c.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
