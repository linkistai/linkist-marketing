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
    <nav aria-label={title} className="card card--sm p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">{title}</p>
      <ol className="mt-3 flex flex-col gap-1 text-sm">
        {chapters.map((c) => (
          <li key={c.id} className={c.level === 3 ? 'pl-3' : ''}>
            <a href={`#${c.id}`} className="flex min-h-[44px] items-center rounded-md px-2 py-1 no-underline" style={active === c.id ? { background: 'var(--color-surface2)', fontWeight: 600 } : { color: 'var(--color-muted)' }} aria-current={active === c.id ? 'location' : undefined}>
              {c.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
