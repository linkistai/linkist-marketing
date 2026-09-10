import type { ReactNode } from 'react';

/**
 * Page-load hero container. The animation itself is CSS (globals.css, hero-in and hero-card-in)
 * keyed on html[data-motion], which an inline script in the layout sets before first paint.
 * Mark text lines with data-hero-text and cards with data-hero-card="1..4".
 */
export function HeroIntro({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div data-hero className={className}>
      {children}
    </div>
  );
}
