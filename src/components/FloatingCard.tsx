'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

/**
 * A floating UI card over the hero stage: static position with drift clearance, the prototype's
 * lk-float (7 s) or lk-float2 (8 s) drift of 6 px, paused off-screen. Pill by default, as the
 * prototype's "Contact captured" and "Next action" cards.
 */
export function FloatingCard({
  children,
  style,
  className = '',
  deep,
  variant = 1,
  duration,
  delay = 0,
  ariaLabel,
  heroIndex,
  card,
}: {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  deep?: boolean;
  variant?: 1 | 2;
  duration?: number;
  delay?: number;
  ariaLabel?: string;
  heroIndex?: 1 | 2 | 3 | 4;
  /** Rounded card instead of a pill. */
  card?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => el.setAttribute('data-inview', String(!!e?.isIntersecting)), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const vars = { '--drift-duration': `${duration ?? (variant === 2 ? 8 : 7)}s`, '--drift-delay': `${delay}s` } as CSSProperties;
  return (
    <div ref={ref} className={`float drift ${variant === 2 ? 'drift--2' : ''} ${deep ? 'float--deep' : ''} ${card ? 'float--card' : ''} ${className}`} style={{ ...style, ...vars }} aria-label={ariaLabel} role={ariaLabel ? 'img' : undefined} data-hero-card={heroIndex}>
      {children}
    </div>
  );
}
