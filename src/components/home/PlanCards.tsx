import { Check } from 'lucide-react';
import { StartFree, TextLink } from '@/components/Button';
import { ENTERPRISE_NOTE, PLANS } from '@/content/plans';
import { formatMoney } from '@/lib/glossary';

/**
 * Four PRM plan cards (v2): Essential, Enhanced, Pro featured (red border, a dark red wash and a
 * white "Most popular" badge on the top edge) and Team. Each card lists its groups, then pins the
 * price block and its CTA to the bottom. Prices are in US dollars.
 */
export function PlanCards({ compact, headingLevel = 3 }: { compact?: boolean; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <div>
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
                <p className="flex items-baseline gap-1">
                  <span className="font-mono text-[34px] font-semibold tracking-[-0.03em] tabular">{formatMoney(p.monthly, 'USD')}</span>
                  {p.monthly ? <span className="text-sm text-body">{p.perUser ? '/user/month' : '/month'}</span> : null}
                </p>
                <p className="mt-1 text-xs leading-normal text-muted">
                  {p.monthly === 0
                    ? 'Free, for as long as you like'
                    : p.team
                      ? `${formatMoney(p.team.usd.monthly, 'USD')}/month or ${formatMoney(p.team.usd.yearly, 'USD')}/year for ${p.minUsers} users (${formatMoney(p.team.aed.monthly, 'AED')} / ${formatMoney(p.team.aed.yearly, 'AED')}). Extra users ${formatMoney(p.monthly, 'USD')}/month or ${formatMoney(p.team.extraYearly, 'USD')}/year.`
                      : [p.yearly ? `${formatMoney(p.yearly, 'USD')} paid annually` : null, p.lifetime ? `${formatMoney(p.lifetime, 'USD')} lifetime` : null].filter(Boolean).join(' · ')}
                </p>
                <div className="mt-4">
                  <StartFree size="sm" variant={featured ? 'primary' : 'secondary'} className="w-full !min-h-[46px] !shadow-none" />
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <div className="mt-[22px] flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <p className="max-w-[760px] text-xs leading-normal text-muted">Billed in USD. No NFC card required. {ENTERPRISE_NOTE}</p>
        {compact ? <TextLink href="/pricing#compare">Compare PRM plans</TextLink> : null}
      </div>
    </div>
  );
}
