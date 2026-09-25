'use client';

import { CurrencySwitch, useCurrency } from '@/components/Currency';
import { planByKey } from '@/content/plans';
import { formatMoney } from '@/lib/glossary';

/** The Team plan price on /teams, in the shared currency: a one-line `note` for the hero or the priced `block` with its switch. */
export function TeamPrice({ variant }: { variant: 'note' | 'block' }) {
  const { currency: cur } = useCurrency();
  const team = planByKey('team');
  const t = team.team!;
  const usd = cur === 'USD';
  const perUser = formatMoney(usd ? team.monthly : team.aed.monthly, cur);
  const month = formatMoney(usd ? t.usd.monthly : t.aed.monthly, cur);
  const year = formatMoney(usd ? t.usd.yearly : t.aed.yearly, cur);
  const extraMonth = formatMoney(usd ? t.extra.usd.monthly : t.extra.aed.monthly, cur);
  const extraYear = formatMoney(usd ? t.extra.usd.yearly : t.extra.aed.yearly, cur);
  if (variant === 'note') {
    return (
      <p className="mt-6 text-sm text-body">
        {perUser} per user a month, minimum {team.minUsers} users: {month} a month or {year} a year for {team.minUsers} users.
      </p>
    );
  }
  return (
    <div className="mt-7">
      <CurrencySwitch label="Show Team prices in" />
      <p className="mt-5 flex items-baseline gap-2">
        <span className="font-mono text-[34px] font-semibold tracking-[-0.03em] tabular">{perUser}</span>
        <span className="text-body">per user a month</span>
      </p>
      <p className="mt-1 text-sm text-muted">
        Minimum {team.minUsers} users: {month} a month or {year} a year. Each additional user {extraMonth} a month or {extraYear} a year.
      </p>
    </div>
  );
}
