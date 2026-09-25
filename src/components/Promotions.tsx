'use client';

import Link from 'next/link';
import { ArrowRight, X } from 'lucide-react';
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { useCurrency } from '@/components/Currency';
import { PROMOTIONS, isLive, type Promo } from '@/content/promotions';
import type { PlanKey } from '@/content/plans';
import { formatMoney } from '@/lib/glossary';

const DISMISSED = 'lk-promo-dismissed';
const Ctx = createContext<{ promos: readonly Promo[]; dismiss: (id: string) => void }>({ promos: [], dismiss: () => {} });

/**
 * The offers that are on (src/content/promotions.ts). The list is decided when the page is built,
 * so the bar is in the HTML with no layout jump; after load, an offer whose end date has passed is
 * dropped, and `?promo=<id>` adds one for a private preview. A dismissed bar stays dismissed on the
 * device (the inline script in the layout hides it before the first paint).
 */
export function PromoProvider({ live, children }: { live: readonly Promo[]; children: ReactNode }) {
  const [promos, setPromos] = useState<readonly Promo[]>(live);
  useEffect(() => {
    const now = new Date();
    let list = live.filter((p) => isLive(p, now));
    const preview = new URLSearchParams(window.location.search).get('promo');
    const extra = preview ? PROMOTIONS.find((p) => p.id === preview) : undefined;
    if (extra && !list.some((p) => p.id === extra.id)) list = [...list, extra];
    const html = document.documentElement;
    let dismissed = '';
    try {
      dismissed = ` ${window.localStorage.getItem(DISMISSED) ?? ''} `;
    } catch {
      /* storage blocked */
    }
    const bar = list.find((p) => p.placements.includes('bar') && (p === extra || !dismissed.includes(` ${p.id} `)));
    if (bar) html.dataset['promo'] = bar.id;
    else delete html.dataset['promo'];
    setPromos(list);
  }, [live]);
  const dismiss = useCallback((id: string) => {
    try {
      const was = window.localStorage.getItem(DISMISSED) ?? '';
      if (!` ${was} `.includes(` ${id} `)) window.localStorage.setItem(DISMISSED, `${was} ${id}`.trim());
    } catch {
      /* storage blocked: dismissed for this page */
    }
    if (document.documentElement.dataset['promo'] === id) delete document.documentElement.dataset['promo'];
  }, []);
  return <Ctx.Provider value={{ promos, dismiss }}>{children}</Ctx.Provider>;
}

const usePromos = () => useContext(Ctx);

function PromoPrice({ price }: { price: NonNullable<Promo['price']> }) {
  const { currency } = useCurrency();
  const amount = currency === 'AED' && price.aed !== undefined ? formatMoney(price.aed, 'AED') : formatMoney(price.usd, 'USD');
  return (
    <>
      {amount} {price.note}
    </>
  );
}

/** The slim offer bar across the top of every page. Hidden by CSS when html[data-promo] is absent. */
export function PromoBar() {
  const { promos, dismiss } = usePromos();
  const [hidden, setHidden] = useState(false);
  const p = promos.find((x) => x.placements.includes('bar'));
  if (!p || hidden) return null;
  return (
    <div className="promobar" role="region" aria-label={p.label} data-id={p.id}>
      <p className="promobar__text">
        <span className="promobar__label">{p.label}</span>
        <span className="font-semibold">{p.title}</span>
        {p.price ? (
          <span className="promobar__price">
            <PromoPrice price={p.price} />
          </span>
        ) : null}
        {p.cta ? (
          <Link href={p.cta.href} className="promobar__cta">
            {p.cta.label}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        ) : null}
      </p>
      <button
        type="button"
        className="promobar__close"
        aria-label={`Dismiss the ${p.label.toLowerCase()}`}
        onClick={() => {
          dismiss(p.id);
          setHidden(true);
        }}
      >
        <X size={16} aria-hidden="true" />
      </button>
    </div>
  );
}

/** The offer box on a plan card, when an offer names that plan. */
export function PlanPromo({ plan }: { plan: PlanKey }) {
  const { promos } = usePromos();
  const p = promos.find((x) => x.placements.includes('plan') && x.plan === plan);
  if (!p) return null;
  return (
    <div className="planpromo">
      <p className="planpromo__label">{p.label}</p>
      <p className="mt-1 font-semibold text-white">
        {p.title}
        {p.price ? (
          <>
            {': '}
            <PromoPrice price={p.price} />
          </>
        ) : null}
      </p>
      {p.body ? <p className="mt-1 text-xs leading-normal text-body">{p.body}</p> : null}
    </div>
  );
}
