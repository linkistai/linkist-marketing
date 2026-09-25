'use client';

import { Check } from 'lucide-react';
import { StartFree, TextLink } from '@/components/Button';
import { CurrencySwitch, useCurrency } from '@/components/Currency';
import { PlanPromo } from '@/components/Promotions';
import { ENTERPRISE_NOTE, PLANS, type Plan } from '@/content/plans';
import { formatMoney, type Currency } from '@/lib/glossary';

/** The line under the price: the yearly price, or the Team plan's minimum and extra users. */
function priceLine(p: Plan, cur: Currency): string {
  const m = (usd: number, aed: number) => (cur === 'USD' ? formatMoney(usd, 'USD') : formatMoney(aed, 'AED'));
  if (p.monthly === 0) return 'Free, for as long as you like';
  if (p.team) {
    const t = p.team;
    return `${m(t.usd.monthly, t.aed.monthly)} a month or ${m(t.usd.yearly, t.aed.yearly)} a year for ${p.minUsers} users · minimum ${p.minUsers} users · each additional user ${m(t.extra.usd.monthly, t.extra.aed.monthly)} a month or ${m(t.extra.usd.yearly, t.extra.aed.yearly)} a year`;
  }
  return p.yearly && p.aed.yearly !== undefined ? `${m(p.yearly, p.aed.yearly)} paid annually` : '';
}

/**
 * Four PRM plan cards (v2): Essential, Enhanced, Pro featured (red border, a dark red wash and a
 * white "Most popular" badge on the top edge) and Team. Each card lists its groups, then pins the
 * price block and its CTA to the bottom. Prices follow the shared USD / AED switch (AED by default).
 */
export function PlanCards({ compact, headingLevel = 3 }: { compact?: boolean; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? 'h2' : 'h3';
  const { currency: cur } = useCurrency();
  return (
    <div>
      <div className="mb-6 flex justify-end">
        <CurrencySwitch label="Show plan prices in" />
      </div>
      <div className="grid items-stretch gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,265px),1fr))]" data-reveal="rise" data-reveal-stagger="0.08">
        {PLANS.map((p) => {
          const featured = p.key === 'pro';
          return (
            <article key={p.key} className={`card card--panel relative flex flex-col !rounded-[24px] p-[26px] ${featured ? 'card--featured' : ''}`}>
              {p.badge ? <span className="plan-badge">{p.badge}</span> : null}
              <div className="flex items-center justify-between gap-2">
                <H className="font-mono text-[13px] font-normal uppercase tracking-[0.14em] text-soft-2">{p.name}</H>
                {p.key === 'essential' ? <span className="text-xs font-semibold text-muted">No NFC card required</span> : null}
              </div>
              <p className="mt-2.5 text-sm italic text-[#9a968f]">{p.fit}</p>
              {p.groups.map((g) => (
                <div key={g.heading} className="mt-[18px]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">{g.heading}</p>
                  <ul className="mt-2 flex flex-col gap-[7px] text-sm text-soft">
                    {g.items.map((line) => (
                      <li key={line} className="flex items-start gap-2">
                        <Check size={15} strokeWidth={2.5} aria-hidden="true" className="mt-[3px] flex-none text-coral" />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="mt-auto pt-[26px]">
                <PlanPromo plan={p.key} />
                <p className="flex items-baseline gap-1">
                  <span className="font-mono text-[34px] font-semibold tracking-[-0.03em] tabular">{formatMoney(cur === 'USD' ? p.monthly : p.aed.monthly, cur)}</span>
                  {p.monthly ? <span className="text-sm text-body">{p.perUser ? '/user/month' : '/month'}</span> : null}
                </p>
<p className="mt-1 text-xs leading-normal text-muted">{priceLine(p, cur)}</p>
                <div className="mt-4">
                  <StartFree label="Start Here" size="sm" variant={featured ? 'primary' : 'secondary'} className="w-full !min-h-[46px] !shadow-none" />
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <div className="mt-[22px] flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <p className="max-w-[760px] text-xs leading-normal text-muted">Software subscription in US dollars or UAE dirhams. No NFC card required. {ENTERPRISE_NOTE}</p>
        {compact ? <TextLink href="/pricing#compare">Compare PRM plans</TextLink> : null}
      </div>
    </div>
  );
}
