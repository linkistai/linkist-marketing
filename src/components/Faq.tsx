import { ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';

export interface FaqItem {
  readonly q: string;
  readonly a: string;
}

/**
 * Exclusive accordion via <details name>, each question a pill card as in the prototype; renders
 * FAQPage JSON-LD when asked. `aside` takes the person or scene that stands beside every FAQ
 * (brief 5); until that asset exists the list simply spans the full width.
 */
export function Faq({ items, name = 'faq', jsonLd, aside }: { items: readonly FaqItem[]; name?: string; jsonLd?: boolean; aside?: ReactNode }) {
  const list = (
    <div className="faq">
      {items.map((it) => (
        <details key={it.q} name={name}>
          <summary>
            {it.q}
            <ChevronDown size={18} aria-hidden="true" />
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
  if (!aside) return list;
  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
      {list}
      <div className="hidden lg:block lg:sticky lg:top-28" data-reveal="rise">
        {aside}
      </div>
    </div>
  );
}
