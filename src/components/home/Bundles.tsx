import Image from 'next/image';
import { PreviewNote } from '@/components/PreviewNote';
import { BUNDLES, BUNDLE_BENEFITS, IMMEDIATE_SAVINGS, THREE_YEAR } from '@/content/plans';
import { formatMoney } from '@/lib/glossary';

/** Bundled offers: four benefits, two offer cards (Founders Circle featured), the savings table and the three-year view, all derived from the plan and card prices. Each offer card shows the owner's product render: a profile on a phone with its card (D54). */
const SHOT: Record<string, { src: string; alt: string }> = {
  signature: { src: '/assets/bundles/signature-2x.webp', alt: 'A phone showing Zayn Rahman’s Linkist profile, with his black Signature NFC card standing beside it. The person is an example.' },
  founders: { src: '/assets/bundles/founders-2x.webp', alt: 'A phone showing Rhea Desai’s Linkist profile, with the front and back of a brushed-metal Founders Circle NFC card. The person is an example.' },
};
export function Bundles({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <div>
      <ul className="m-0 grid list-none gap-0 overflow-hidden rounded-[18px] border border-line p-0 [grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))]" data-reveal="rise" data-reveal-stagger="0.06">
        {BUNDLE_BENEFITS.map((b) => (
          <li key={b.title} className="border-line bg-surface2 p-[22px] [&:not(:first-child)]:border-l">
            <p className="font-semibold">{b.title}</p>
            <p className="mt-1.5 text-sm text-body">{b.body}</p>
          </li>
        ))}
      </ul>
      <div className="mt-[18px] grid gap-[18px] [grid-template-columns:repeat(auto-fit,minmax(min(100%,400px),1fr))]" data-reveal="rise" data-reveal-stagger="0.1">
        {BUNDLES.map((b) => (
          <article key={b.key} className={`card card--panel grid items-center gap-6 p-[clamp(20px,2.6vw,30px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))] ${b.featured ? 'card--featured' : ''}`}>
            <div className="relative aspect-[1400/1120] overflow-hidden rounded-2xl">
              <Image src={SHOT[b.key]!.src} alt={SHOT[b.key]!.alt} fill sizes="(min-width: 768px) 280px, 90vw" className="object-cover" />
            </div>
            <div>
              <H className="font-mono text-[13px] font-normal uppercase tracking-[0.14em] text-soft-2">{b.name}</H>
              <p className="mt-3 text-base leading-normal text-soft">{b.includes}</p>
              <p className="mt-[18px] font-mono text-[48px] font-semibold leading-none tracking-[-0.03em] tabular">{formatMoney(b.price, 'USD')}</p>
              <p className="mt-1 text-xs text-muted">{b.priceNote}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-[18px] grid gap-[18px] [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]" data-reveal="rise">
        <div className="table-wrap" tabIndex={0} role="region" aria-label="Immediate saving with the Signature Bundle, per material">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Signature card and 1 year of Pro</th>
                {IMMEDIATE_SAVINGS.map((r) => (
                  <th key={r.material} scope="col" className="text-center">
                    {r.material}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Bought separately</th>
                {IMMEDIATE_SAVINGS.map((r) => (
                  <td key={r.material} className="text-center font-mono tabular">
                    {formatMoney(r.separately, 'USD')}
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">Signature Bundle</th>
                {IMMEDIATE_SAVINGS.map((r) => (
                  <td key={r.material} className="text-center font-mono tabular">
                    {formatMoney(r.bundle, 'USD')}
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row" className="!font-semibold !text-white">
                  Immediate saving
                </th>
                {IMMEDIATE_SAVINGS.map((r) => (
                  <td key={r.material} className="yes text-center font-mono tabular">
                    {formatMoney(r.saving, 'USD')}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="table-wrap" tabIndex={0} role="region" aria-label="Savings over 3 years, per material">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Over 3 years, with a metal Signature card</th>
                <th scope="col" className="text-center">
                  3 years
                </th>
                <th scope="col" className="text-center">
                  Separately
                </th>
                <th scope="col" className="text-center">
                  Saving
                </th>
              </tr>
            </thead>
            <tbody>
              {THREE_YEAR.filter((r) => r.material === 'Metal').map((r) => (
                <>
                  <tr key={`${r.material}-s`}>
                    <th scope="row">Signature Bundle, then Pro yearly</th>
                    <td className="text-center font-mono tabular">{formatMoney(r.signatureRoute, 'USD')}</td>
                    <td className="text-center font-mono tabular">{formatMoney(r.separately, 'USD')}</td>
                    <td className="yes text-center font-mono tabular">{formatMoney(r.signatureSaving, 'USD')}</td>
                  </tr>
                  <tr key={`${r.material}-f`}>
                    <th scope="row">Founders Circle Bundle, lifetime Pro</th>
                    <td className="text-center font-mono tabular">{formatMoney(r.foundersRoute, 'USD')}</td>
                    <td className="text-center font-mono tabular">{formatMoney(r.separately, 'USD')}</td>
                    <td className="yes text-center font-mono tabular">{formatMoney(r.foundersSaving, 'USD')}</td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-[760px] text-center text-[15px] leading-relaxed text-soft" data-reveal="rise">
        Signature Bundle: a card plus a year of Pro for $100, the price of Pro alone. Founders Circle Bundle: lifetime Pro for a one-time $150.
      </p>
      <p className="mx-auto mt-2 max-w-[760px] text-center text-xs leading-normal text-muted">Free UAE shipping. Savings use approximate dollar prices; cards bill in AED and bundle prices are confirmed at checkout.</p>
      <PreviewNote className="!mt-2.5" />
    </div>
  );
}
