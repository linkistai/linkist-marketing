import { Plus } from 'lucide-react';
import type { ReactNode } from 'react';

export interface FaqItem {
  readonly q: string;
  readonly a: string;
}

/**
 * The v2 FAQ: hairline rows of <details> in one exclusive group (<details name>), the first open,
 * each question an H3 inside its summary with a 36 px round plus that turns 45 degrees and fills
 * red when open. With `title`, the block is two columns: a sticky eyebrow and H2 on the left (with
 * an optional `aside` picture under them), the questions on the right. Emits FAQPage JSON-LD from
 * the same data when asked.
 */
export function Faq({
  items,
  name = 'faq',
  jsonLd,
  aside,
  title,
  eyebrow = 'FAQ',
  num,
  lede,
}: {
  items: readonly FaqItem[];
  name?: string;
  jsonLd?: boolean;
  aside?: ReactNode;
  title?: ReactNode;
  eyebrow?: string;
  num?: string;
  lede?: ReactNode;
}) {
  const list = (
    <div className="faq">
      {items.map((it, i) => (
        <details key={it.q} name={name} open={i === 0}>
          <summary>
            <h3>{it.q}</h3>
            <span className="faq__plus" aria-hidden="true">
              <Plus size={14} strokeWidth={2.5} />
            </span>
          </summary>
          <p className="faq__body">{it.a}</p>
        </details>
      ))}
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: items.map((it) => ({ '@type': 'Question', name: it.q, acceptedAnswer: { '@type': 'Answer', text: it.a } })),
            }),
          }}
        />
      ) : null}
    </div>
  );
  if (!title && !aside) return list;
  return (
    <div className="grid items-start gap-[clamp(32px,5vw,72px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,360px),1fr))]">
      <div className="md:sticky md:top-[110px]" data-reveal="rise">
        {title ? (
          <>
            <p className="eyebrow eyebrow--plain">
              {num ? <span className="eyebrow__num">{num}</span> : null}
              {eyebrow}
            </p>
            <h2 className="display-2 mt-[18px]">{title}</h2>
            {lede ? <p className="lede mt-5">{lede}</p> : null}
          </>
        ) : null}
        {aside ? <div className={title ? 'mt-8' : ''}>{aside}</div> : null}
      </div>
      {list}
    </div>
  );
}
