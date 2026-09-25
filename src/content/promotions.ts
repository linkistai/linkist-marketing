import type { PlanKey } from '@/content/plans';

/**
 * Launch promotions (owner, 25 September 2026). An offer shows only while `active` is true and the
 * date is inside `starts` to `ends` (both optional, inclusive, Dubai dates). Where it shows:
 *
 *   'bar'   a slim bar across the top of every page, which a visitor can dismiss (remembered)
 *   'plan'  a highlighted box on the plan card named by `plan`, wherever the plan cards appear
 *
 * To run an offer: set `active: true` (and dates if it should start or stop on its own), add the
 * dirham price, and deploy. To look at one before it goes live, open any page with
 * `?promo=<id>`, for example /pricing?promo=enhanced-lifetime; nobody else sees it.
 */
export type PromoPlacement = 'bar' | 'plan';

export interface Promo {
  readonly id: string;
  readonly active: boolean;
  /** First day on, YYYY-MM-DD. */
  readonly starts?: string;
  /** Last day on, YYYY-MM-DD. */
  readonly ends?: string;
  readonly placements: readonly PromoPlacement[];
  /** The plan card that carries the 'plan' placement. */
  readonly plan?: PlanKey;
  /** The small label, for example "Launch offer". */
  readonly label: string;
  readonly title: string;
  /** A one-time or offer price. Without `aed`, the dollar price shows in both currencies. */
  readonly price?: { readonly usd: number; readonly aed?: number; readonly note: string };
  readonly body?: string;
  readonly cta?: { readonly label: string; readonly href: string };
}

export const PROMOTIONS: readonly Promo[] = [
  {
    // The one-time Enhanced price the plan card used to show (owner, 25 September 2026: not shown
    // now, kept for a launch offer). Set the dirham price before switching it on.
    id: 'enhanced-lifetime',
    active: false,
    placements: ['bar', 'plan'],
    plan: 'enhanced',
    label: 'Launch offer',
    title: 'Enhanced for life',
    price: { usd: 25, note: 'one time' },
    body: 'Everything in Enhanced, paid once instead of every year.',
    cta: { label: 'See the offer', href: '/pricing#plans' },
  },
];

/** Today's date in Dubai as YYYY-MM-DD. */
export function dubaiDate(now: Date): string {
  return new Date(now.getTime() + 4 * 3600 * 1000).toISOString().slice(0, 10);
}

export function isLive(p: Promo, now: Date): boolean {
  if (!p.active) return false;
  const d = dubaiDate(now);
  return (!p.starts || d >= p.starts) && (!p.ends || d <= p.ends);
}

export const livePromos = (now: Date) => PROMOTIONS.filter((p) => isLive(p, now));
