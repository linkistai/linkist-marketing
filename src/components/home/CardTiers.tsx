'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CurrencySwitcher } from '@/components/CurrencySwitcher';
import { NfcCard } from '@/components/NfcCard';
import { CARD_TIERS, MATERIALS } from '@/content/plans';
import { formatMoney, type Currency } from '@/lib/glossary';

/**
 * Starter and Signature by material with the prototype's USD/AED switch. The store prices in AED
 * and shows an approximate dollar figure; the switch decides which leads, both stay visible.
 * Signature is featured with the gradient ring. Every card includes PRM Essential.
 */
export function CardTiers({ cta = { href: '/nfc-cards', label: 'Explore NFC cards' }, headingLevel = 3 }: { cta?: { href: string; label: string } | null; headingLevel?: 2 | 3 }) {
  const [cur, setCur] = useState<Currency>('AED');
  const other: Currency = cur === 'AED' ? 'USD' : 'AED';
  const H = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <div>
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CurrencySwitcher value={cur} onChange={setCur} label="Card prices in" />
        <p className="text-sm text-muted">One-time prices. The store bills in AED; the dollar figure is approximate. Every card includes PRM Essential.</p>
      </div>
      <div className="mx-auto mt-8 grid max-w-4xl gap-6 md:grid-cols-2" data-reveal="rise" data-reveal-stagger="0.1">
        {CARD_TIERS.map((t) => {
          const featured = t.key === 'signature';
          return (
            <div key={t.key} className={`card lift relative flex flex-col gap-5 p-6 sm:p-8 ${featured ? 'sweep sweep--featured' : 'sweep sweep--neutral'}`}>
              {t.badge ? <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.04em] text-ground">{t.badge}</span> : null}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {MATERIALS.map((m) => (
                  <NfcCard key={m.key} material={m.key} tier={t.key} name="Olivia Jones" meta="NYU Abu Dhabi" />
                ))}
              </div>
              <div>
                <H className="display-3">{t.name}</H>
                <p className="mt-1 text-sm text-body">{t.blurb}</p>
              </div>
              <dl className="flex flex-col gap-2 text-sm">
                {MATERIALS.map((m) => (
                  <div key={m.key} className="flex items-center justify-between gap-3 border-t border-line pt-2 first:border-0 first:pt-0">
                    <dt className="text-body">{m.name}</dt>
                    <dd className="text-right">
                      <span className="font-mono font-semibold tabular">{formatMoney(t.prices[cur][m.key], cur)}</span>
                      <span className="ml-2 text-xs text-muted">
                        {other === 'USD' ? 'about ' : ''}
                        {formatMoney(t.prices[other][m.key], other)}
                        {other === 'AED' ? ' at the store' : ''}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="text-xs italic text-muted">PRM Essential plan included</p>
            </div>
          );
        })}
      </div>
      {cta ? (
        <div className="mt-9 text-center" data-reveal="rise">
          <p className="text-sm text-muted">Prefer to start without a physical card? Use Linkist PRM on its own and add a card any time.</p>
          <p className="mt-1 text-sm text-muted">Save by buying an NFC card bundled with PRM Pro. See the bundles below.</p>
          <Link href={cta.href} className="btn btn--secondary mt-6">
            {cta.label}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
