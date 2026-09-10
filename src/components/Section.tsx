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

/** Eyebrow + headline + lede block, optionally centred. */
export function SectionHead({ eyebrow, title, lede, center, as, size }: { eyebrow?: string; title: ReactNode; lede?: ReactNode; center?: boolean; as?: 'h1' | 'h2' | 'h3'; size?: 1 | 2 | 3 }) {
  return (
    <div className={`max-w-3xl ${center ? 'mx-auto text-center [&_.lede]:mx-auto' : ''}`} data-reveal="rise">
      {eyebrow ? <Eyebrow className={center ? 'justify-center' : ''}>{eyebrow}</Eyebrow> : null}
      <Headline as={as} size={size}>
        {title}
      </Headline>
      {lede ? <Lede>{lede}</Lede> : null}
    </div>
  );
}

/** The outcome line that closes every stage and use case (brief 9). */
export function Outcome({ label = 'Outcome', children }: { label?: string; children: ReactNode }) {
  return (
    <p className="text-sm text-body">
      <strong className="text-accent">{label}:</strong> {children}
    </p>
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
