import { NfcCard } from '@/components/NfcCard';
import { BUNDLES, BUNDLE_BENEFITS, IMMEDIATE_SAVINGS, THREE_YEAR } from '@/content/plans';
import { formatMoney } from '@/lib/glossary';

/** Bundled offers: four benefits, two offer cards (Founders Circle featured), the savings table and the three-year view, all derived from the plan and card prices. */
export function Bundles({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-reveal="rise" data-reveal-stagger="0.06">
        {BUNDLE_BENEFITS.map((b) => (
          <li key={b.title} className="card card--sm p-5 text-center">
            <p className="font-semibold">{b.title}</p>
            <p className="mt-1 text-sm text-body">{b.body}</p>
          </li>
        ))}
      </ul>
      <div className="mt-6 grid gap-6 md:grid-cols-2" data-reveal="rise" data-reveal-stagger="0.1">
        {BUNDLES.map((b) => (
          <div key={b.key} className={`card lift relative flex flex-col items-center p-8 text-center ${b.featured ? 'sweep sweep--featured' : 'sweep sweep--neutral'}`}>
            <div className="w-40">
              <NfcCard material={b.key === 'founders' ? 'founders' : 'metal'} tier={b.key === 'founders' ? 'founders' : 'signature'} name="Olivia Jones" meta={b.key === 'founders' ? 'Founding member' : 'NYU Abu Dhabi'} />
            </div>
            <H className="eyebrow mt-6 justify-center !text-body">{b.name}</H>
            <p className="mt-3 text-body">{b.includes}</p>
            <p className="mt-4 font-mono text-4xl font-semibold tabular">{formatMoney(b.price, 'USD')}</p>
            <p className="mt-1 text-xs text-muted">{b.priceNote}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2" data-reveal="rise">
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
                <th scope="row" className="!text-text !font-semibold">
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
      <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-body" data-reveal="rise">
        Why the bundles win: the Signature Bundle gives you a card plus a full year of Pro for the same $100 as Pro alone, and the Founders Circle Bundle locks in lifetime Pro for a one-time $150.
      </p>
      <p className="mt-2 text-center text-xs text-muted">Card shipping is included in the UAE. Savings are calculated from the approximate dollar prices on this page; the store bills cards in AED and the bundle prices are confirmed at checkout.</p>
    </div>
  );
}
