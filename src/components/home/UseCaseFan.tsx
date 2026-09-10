'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, type CSSProperties } from 'react';
import { Outcome, Tags } from '@/components/Section';
import { USE_CASES } from '@/content/usecases';

/** The five use cases as a snap strip on phones and a fan of tilted cards on desktop (brief 5). */
export function UseCaseFan() {
  const ref = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      el.dataset['in'] = 'true';
      return;
    }
    const io = new IntersectionObserver(([e]) => (el.dataset['in'] = String(!!e?.isIntersecting)), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <ul ref={ref} className="fanstrip" data-in="false" tabIndex={0} aria-label="Five use cases, scroll sideways on small screens">
      {USE_CASES.map((u, i) => (
        <li key={u.slug} className="fanstrip__item" style={{ '--i': i - 2 } as CSSProperties}>
          <Link href={`/use-cases/${u.slug}`} className="card card--sm sweep sweep--neutral lift flex h-full flex-col p-6 no-underline">
            <p className="eyebrow eyebrow--accent text-[11px]">{u.short}</p>
            <h3 className="display-3 mt-3 text-[20px]">{u.title}</h3>
            <p className="mt-2 text-sm text-body">{u.problem}</p>
            <div className="mt-4">
              <Outcome label="Result">{u.result}</Outcome>
            </div>
            <span className="flex-1" />
            <Tags items={u.chips.slice(0, 3)} className="mt-4" />
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-coral">
              Read the use case <ArrowRight size={14} aria-hidden="true" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
