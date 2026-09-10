import type { CSSProperties, ReactNode } from 'react';

/** Cards that pin under each other as the reader scrolls. Sticky positioning only, no scale, no parallax on text. */
export function CardStack({ children }: { children: ReactNode[] }) {
  return (
    <div className="stack">
      {children.map((c, i) => (
        <div key={i} className="stack__card" style={{ '--stack-i': i } as CSSProperties}>
          {c}
        </div>
      ))}
    </div>
  );
}
