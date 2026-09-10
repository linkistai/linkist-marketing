'use client';

import { useEffect, useRef, useState } from 'react';

/** Counts up once, 900 ms, tabular numerals. Prefix and suffix are strings so server pages can use it. */
export function Counter({ to, prefix = '', suffix = '', decimals = 0, locale = 'en-GB', className = '' }: { to: number; prefix?: string; suffix?: string; decimals?: number; locale?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (document.documentElement.dataset['motion'] !== 'on' || typeof IntersectionObserver === 'undefined') {
      setV(to);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e?.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / 900);
          setV(to * (1 - Math.pow(1 - p, 3)));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);
  return (
    <span ref={ref} className={`tabular ${className}`}>
      {prefix}
      {v.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}
