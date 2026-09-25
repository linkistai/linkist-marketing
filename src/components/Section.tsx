import type { ReactNode } from 'react';

/**
 * Section rhythm (brief 5): eyebrow in crimson small caps, headline with one coral phrase, a
 * one-sentence lede, then the visual. Grounds alternate near-black (bg), charcoal and a slightly
 * lifted charcoal; `glow` adds the prototype's radial crimson light rising from the bottom.
 */
export function Section({
  id,
  children,
  tone = 'bg',
  tight,
  glow,
  className = '',
}: {
  id?: string;
  children: ReactNode;
  tone?: 'bg' | 'charcoal' | 'lifted';
  tight?: boolean;
  glow?: boolean;
  className?: string;
}) {
  const toneClass = tone === 'charcoal' ? 'section--charcoal' : tone === 'lifted' ? 'section--lifted' : '';
  return (
    <section id={id} className={`section ${tight ? 'section--tight' : ''} ${toneClass} ${glow ? 'section--glow' : ''} ${className}`}>
      <div className="container">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, accent, className = '' }: { children: ReactNode; accent?: boolean; className?: string }) {
  return <p className={`eyebrow ${accent ? 'eyebrow--accent' : ''} ${className}`}>{children}</p>;
}

export function Headline({ as: Tag = 'h2', size = 2, children, className = '' }: { as?: 'h1' | 'h2' | 'h3'; size?: 1 | 2 | 3; children: ReactNode; className?: string }) {
  return <Tag className={`display-${size} mt-4 ${className}`}>{children}</Tag>;
}

export function Lede({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`lede mt-4 ${className}`}>{children}</p>;
}

/**
 * Section head (v2): mono eyebrow (with an optional section number), H2 and lede. Centred, or split:
 * eyebrow and H2 on the left, the lede on the right, bottom-aligned. Page-level H1 heads keep the
 * stacked layout.
 */
export function SectionHead({ eyebrow, title, lede, center, as, size, num, id }: { eyebrow?: string; title: ReactNode; lede?: ReactNode; center?: boolean; as?: 'h1' | 'h2' | 'h3'; size?: 1 | 2 | 3; num?: string; id?: string }) {
  const Tag = as ?? 'h2';
  const eyebrowEl = eyebrow ? (
    <p className={`eyebrow ${num ? 'eyebrow--plain' : ''} ${center ? 'justify-center' : ''}`}>
      {num ? <span className="eyebrow__num">{num}</span> : null}
      {eyebrow}
    </p>
  ) : null;
  const heading = (
    <Tag id={id} className={`display-${size ?? (Tag === 'h1' ? 1 : 2)} ${eyebrow ? 'mt-[18px]' : ''}`}>
      {title}
    </Tag>
  );
  if (center || Tag === 'h1' || !lede) {
    return (
      <div className={center ? 'mx-auto max-w-[860px] text-center [&_.lede]:mx-auto' : 'max-w-[900px]'} data-reveal="rise">
        {eyebrowEl}
        {heading}
        {lede ? <p className="lede mt-[22px]">{lede}</p> : null}
      </div>
    );
  }
  return (
    <div className="grid items-end gap-x-16 gap-y-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]" data-reveal="rise">
      <div>
        {eyebrowEl}
        {heading}
      </div>
      <p className="lede max-w-[560px]">{lede}</p>
    </div>
  );
}

/** The outcome box that closes every stage and use case (v2: red-tinted panel, mono label). */
export function Outcome({ label = 'Outcome', children }: { label?: string; children: ReactNode }) {
  return (
    <p className="outcome">
      <span className="outcome__label">{label}</span>
      {children}
    </p>
  );
}

/** Check-mark bullets (v2). */
export function Bullets({ items, className = '' }: { items: readonly ReactNode[]; className?: string }) {
  return (
    <ul className={`bullets ${className}`}>
      {items.map((b, i) => (
        <li key={i}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

/** Capability chips (glossary spellings). */
export function Tags({ items, accent, className = '' }: { items: readonly string[]; accent?: boolean; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} aria-label="Capabilities">
      {items.map((t) => (
        <li key={t} className={`tag ${accent ? 'tag--accent' : ''}`}>
          {t}
        </li>
      ))}
    </ul>
  );
}
