import { Check } from 'lucide-react';
import { StartFree, TextLink } from '@/components/Button';
import { ENTERPRISE_NOTE, PLANS } from '@/content/plans';
import { formatMoney } from '@/lib/glossary';

/**
 * Four PRM plan cards with Pro featured (a gradient ring and the glow, "Most popular"), grouped
 * inclusions and honest fine print (brief 5). Prices are in US dollars; the AED display option is
 * being confirmed with the app, so the cards say so rather than promise it.
 */
export function PlanCards({ compact, headingLevel = 3 }: { compact?: boolean; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <div>
      <div className="grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-4" data-reveal="rise" data-reveal-stagger="0.08">
        {PLANS.map((p) => {
          const featured = p.key === 'pro';
          return (
            <div key={p.key} className={`card lift relative flex flex-col p-6 ${featured ? 'sweep sweep--featured' : 'sweep sweep--neutral'}`}>
              {p.badge ? <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.04em] text-ground">{p.badge}</span> : null}
              <div className="flex items-center justify-between gap-2">
                <H className="eyebrow !text-body">{p.name}</H>
                {p.key === 'essential' ? <span className="text-xs font-semibold text-muted">No card required</span> : null}
              </div>
              <p className="mt-2 text-sm italic text-muted">{p.fit}</p>
              {p.groups.map((g) => (
                <div key={g.heading} className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">{g.heading}</p>
                  <ul className="mt-2 flex flex-col gap-1.5 text-sm text-body">
                    {g.items.map((line) => (
                      <li key={line} className="flex items-start gap-2">
                        <Check size={15} aria-hidden="true" className="mt-0.5 flex-none text-coral" />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="mt-auto pt-6">
                <p className="flex items-baseline gap-1">
                  <span className="font-mono text-3xl font-semibold tabular">{formatMoney(p.monthly, 'USD')}</span>
                  {p.monthly ? <span className="text-sm text-body">{p.perUser ? '/user/month' : '/month'}</span> : null}
                </p>
                <p className="mt-1 text-xs text-muted">
                  {p.monthly === 0 ? 'Free, for as long as you like' : [p.yearly ? `${formatMoney(p.yearly, 'USD')} paid annually` : null, p.lifetime ? `${formatMoney(p.lifetime, 'USD')} lifetime` : null, p.minUsers ? `minimum ${p.minUsers} users` : null].filter(Boolean).join(' · ')}
                </p>
                <div className="mt-4">
                  <StartFree size="sm" variant={featured ? 'primary' : 'secondary'} className="w-full" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-3xl text-xs text-muted">Software subscription in US dollars. No NFC card required. {ENTERPRISE_NOTE}</p>
        {compact ? <TextLink href="/pricing#compare">Compare PRM plans</TextLink> : null}
      </div>
    </div>
  );
}
