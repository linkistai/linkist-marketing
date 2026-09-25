'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

/**
 * Parallax (v2): moves its box by -k times the distance of its centre from the viewport centre, on
 * scroll, with translate3d. Off when motion is off (html[data-motion]), which the footer switch sets.
 */
export function Parallax({ k = 0.08, className = '', style, children }: { k?: number; className?: string; style?: CSSProperties; children?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (document.documentElement.dataset['motion'] === 'off') return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const h = window.innerHeight;
      if (r.bottom < -200 || r.top > h + 200) return;
      el.style.transform = `translate3d(0, ${((r.top + r.height / 2 - h / 2) * -k).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [k]);
  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
