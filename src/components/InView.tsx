'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/** Sets data-inview on a wrapper when it scrolls into view, so CSS can play an entrance once. */
export function InView({ children, className = '', threshold = 0.25, as: Tag = 'div', once = true, ...rest }: { children: ReactNode; className?: string; threshold?: number; as?: 'div' | 'ul'; once?: boolean } & Record<string, unknown>) {
  const ref = useRef<HTMLDivElement & HTMLUListElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      el?.setAttribute('data-inview', 'true');
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          el.setAttribute('data-inview', 'true');
          if (once) io.disconnect();
        } else if (!once) el.setAttribute('data-inview', 'false');
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);
  return (
    <Tag ref={ref} className={className} data-inview="false" {...rest}>
      {children}
    </Tag>
  );
}
