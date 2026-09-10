/**
 * Plans, cards and bundles as data (brief 3.5). Every figure comes from the approved prototype
 * and is marked to confirm against the app's plan page and checkout in Phase 1
 * (docs/confirm-list.md). Prices are whole US dollars; AED card prices are the prototype's
 * cardCurrency values [CONFIRM]. Savings are derived from these figures, never typed by hand.
 */
import type { Currency } from '@/lib/glossary';

export type PlanKey = 'essential' | 'enhanced' | 'pro' | 'team';

export interface Plan {
  readonly key: PlanKey;
  readonly name: string;
  readonly fit: string;
  readonly badge?: string;
  readonly monthly: number;
  readonly yearly?: number;
  readonly lifetime?: number;
  readonly perUser?: boolean;
  readonly minUsers?: number;
  readonly groups: readonly { heading: string; items: readonly string[] }[];
}

export const PLANS: readonly Plan[] = [
  {
    key: 'essential',
    name: 'Essential',
    fit: 'Your baseline Linkist identity. Free for as long as you like.',
    monthly: 0,
    groups: [
      { heading: 'Share', items: ['Digital business card with photo', '1 personal profile', '1 card template', 'QR, URL, email and SMS sharing'] },
      { heading: 'Capture', items: ['Card scan, 5 a month', 'Phone, CSV and VCF import'] },
    ],
  },
  {
    key: 'enhanced',
    name: 'Enhanced',
    fit: 'For a profile that works as hard as you do.',
    monthly: 2,
    yearly: 12,
    lifetime: 25,
    groups: [
      { heading: 'Everything in Essential, plus', items: ['Personal URL and unlimited profile fields', 'Bio, socials, services, products, certifications', '3 profiles: 1 personal, 2 business', '3 card templates and a branded QR'] },
      { heading: 'Capture', items: ['Card scan, 20 a month', 'Lead capture form', 'Export contacts'] },
    ],
  },
  {
    key: 'pro',
    name: 'Pro',
    fit: 'For anyone whose network is too big to hold in their head.',
    badge: 'Most popular',
    monthly: 10,
    yearly: 100,
    groups: [
      { heading: 'Everything in Enhanced, plus', items: ['5 profiles and full template customisation', 'Unlimited card scans'] },
      { heading: 'Relationship intelligence', items: ['AI Enrichment and lead scoring', 'ICP Matching and Network Ask', 'Intelligent Nudges and Top Actions', 'AI voice notetaker and AI Follow-up', 'Deal-tracking mini-CRM'] },
    ],
  },
  {
    key: 'team',
    name: 'Team',
    fit: 'For companies that want relationships to stay with the company.',
    monthly: 4,
    yearly: 200,
    perUser: true,
    minUsers: 5,
    groups: [
      { heading: 'Everything in Pro, teamwide', items: ['Contact sharing across the team', 'Centralised admin console', 'Company branding on cards', 'Team directory'] },
    ],
  },
];

export const planByKey = (key: PlanKey) => PLANS.find((p) => p.key === key)!;

/** Enterprise is coming later and interest only (brief 3.9): a contact route, never a plan card. */
export const ENTERPRISE_NOTE = 'Enterprise: coming later, interest only. Single sign-on, CRM and HRMS integration and product customisation are planned for it.';

export type Material = 'pvc' | 'wood' | 'metal';
export const MATERIALS: readonly { key: Material; name: string }[] = [
  { key: 'pvc', name: 'PVC' },
  { key: 'wood', name: 'Wood' },
  { key: 'metal', name: 'Metal' },
];

export type TierKey = 'starter' | 'signature';
export interface CardTier {
  readonly key: TierKey;
  readonly name: string;
  readonly blurb: string;
  readonly badge?: string;
  readonly prices: Record<Currency, Record<Material, number>>;
}

/** The store prices in AED and shows an approximate dollar figure beside it (walk-through, 10 September). */
export const AED_PER_USD = 3.6725;
const approxUsd = (aed: Record<Material, number>): Record<Material, number> => ({ pvc: Math.round(aed.pvc / AED_PER_USD), wood: Math.round(aed.wood / AED_PER_USD), metal: Math.round(aed.metal / AED_PER_USD) });

/** One-time prices per material: AED as the store lists them, USD as the store's approximation (C5). */
export const CARD_TIERS: readonly CardTier[] = [
  {
    key: 'starter',
    name: 'Starter',
    blurb: 'No customisation. Tap and share from day one.',
    prices: { AED: { pvc: 75, wood: 95, metal: 195 }, USD: approxUsd({ pvc: 75, wood: 95, metal: 195 }) },
  },
  {
    key: 'signature',
    name: 'Signature',
    blurb: 'Your name and logo on the card.',
    badge: 'Most chosen',
    prices: { AED: { pvc: 95, wood: 115, metal: 225 }, USD: approxUsd({ pvc: 95, wood: 115, metal: 225 }) },
  },
];

/** What the store offers per material (walk-through, 10 September). */
export const CARD_OPTIONS = [
  { material: 'PVC', finish: 'Premium PVC', colours: ['White', 'Black'], patterns: ['Minimal', 'Geometric', 'Wave', 'Crystal'] },
  { material: 'Wood', finish: 'Natural wood', colours: ['Cherry'], patterns: ['Minimal'] },
  { material: 'Metal', finish: 'Brushed metal', colours: ['Silver', 'Black'], patterns: ['Minimal', 'Geometric', 'Wave', 'Crystal'] },
] as const;

/** Shipping regions the store lists (C6). */
export const SHIPPING_REGIONS = ['United Arab Emirates', 'Saudi Arabia', 'Bahrain', 'Kuwait', 'Oman', 'Qatar', 'India', 'United Kingdom', 'United States', 'Canada', 'Australia', 'Pakistan', 'Philippines', 'Egypt', 'Jordan', 'Lebanon'] as const;

export interface Bundle {
  readonly key: 'signature' | 'founders';
  readonly name: string;
  readonly includes: string;
  readonly price: number;
  readonly priceNote: string;
  readonly featured?: boolean;
  readonly proYears: number | 'lifetime';
}

export const BUNDLES: readonly Bundle[] = [
  { key: 'signature', name: 'Signature Bundle', includes: 'Any Signature card plus 1 year of PRM Pro', price: 100, priceNote: 'bundle price', proYears: 1 },
  { key: 'founders', name: 'Founders Circle Bundle', includes: 'Founders Circle card plus lifetime PRM Pro', price: 150, priceNote: 'one-time bundle price', featured: true, proYears: 'lifetime' },
];

export const BUNDLE_BENEFITS = [
  { title: 'One purchase', body: 'Card and PRM Pro together.' },
  { title: 'Better value', body: 'Pay less than the card and Pro bought separately.' },
  { title: 'Start with the full system', body: 'Share by NFC and use Pro from day one.' },
  { title: 'UAE shipping included', body: 'Card shipping is included in the UAE.' },
] as const;

const PRO_YEAR = planByKey('pro').yearly ?? 100;
const signature = CARD_TIERS.find((t) => t.key === 'signature')!;

/** Signature card plus 1 year of Pro bought separately, against the bundle, per material. Derived, not typed. */
export const IMMEDIATE_SAVINGS = MATERIALS.map((m) => {
  const separately = signature.prices.USD[m.key] + PRO_YEAR;
  const bundle = BUNDLES[0]!.price;
  return { material: m.name, separately, bundle, saving: separately - bundle };
});

/**
 * Three-year view, per material: the bundle route (bundle in year 1, then Pro yearly) against
 * buying the card and 3 years of Pro separately. The Founders Circle route is one payment.
 */
export const THREE_YEAR = MATERIALS.map((m) => {
  const separately = signature.prices.USD[m.key] + PRO_YEAR * 3;
  const signatureRoute = BUNDLES[0]!.price + PRO_YEAR * 2;
  const foundersRoute = BUNDLES[1]!.price;
  return { material: m.name, separately, signatureRoute, signatureSaving: separately - signatureRoute, foundersRoute, foundersSaving: separately - foundersRoute };
});

export type CompareCell = string;
export type CompareRow = { readonly group: string } | { readonly label: string; readonly cells: readonly [CompareCell, CompareCell, CompareCell, CompareCell, CompareCell] };

/**
 * The prototype's plan comparison, feature by feature. The compliance row of the prototype
 * (GDPR and SOC 2) is left out until evidence exists (brief, rule 3). Enterprise is interest only;
 * its cells are what the prototype lists as planned.
 */
export const COMPARE_HEADERS = ['Essential', 'Enhanced', 'Pro', 'Team', 'Enterprise'] as const;
export const COMPARE_ROWS: readonly CompareRow[] = [
  { group: 'Identity and sharing' },
  { label: 'Digital business card with photo', cells: ['Yes', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { label: 'Add to Google or Apple Wallet', cells: ['Yes', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { label: 'QR, URL, email and SMS sharing', cells: ['Yes', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { label: 'Unlimited sharing', cells: ['Yes', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { label: 'Personal URL', cells: ['No', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { label: 'Profile fields', cells: ['Limited', 'All', 'All', 'All', 'All'] },
  { label: 'Bio, socials, services, products, certifications', cells: ['No', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { label: 'Number of profiles', cells: ['1 personal', '3 (1 personal, 2 business)', '5 (1 personal, 4 business)', '5 per user', '5 per user'] },
  { label: 'Themes', cells: ['Classic only', 'All', 'All', 'All', 'All'] },
  { label: 'Verified tick, after verification', cells: ['No', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { label: 'Profile templates', cells: ['1', '3', 'Full customisation', 'Full customisation', 'Full customisation'] },
  { label: 'Custom card colours and design', cells: ['No', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { label: 'Branded QR code', cells: ['No', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { label: 'Card scans with OCR', cells: ['5 a month', '20 a month', 'Unlimited', 'Unlimited', 'Unlimited'] },
  { label: 'Company-wide branding on cards', cells: ['No', 'No', 'No', 'Yes', 'Yes'] },
  { group: 'Contacts and pipeline' },
  { label: 'Notes and tags', cells: ['No', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { label: 'Lead capture form', cells: ['No', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { label: 'Save to address book', cells: ['Yes', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { label: 'Export contacts', cells: ['No', 'No', 'Yes', 'Yes', 'Yes'] },
  { label: 'Deal-tracking mini-CRM', cells: ['No', 'No', 'Yes', 'Yes', 'Yes'] },
  { label: 'Engagement analytics', cells: ['None', 'Basic', 'Full', 'Full', 'Full'] },
  { label: 'Contact sharing across the team', cells: ['No', 'No', 'No', 'Yes', 'Yes'] },
  { label: 'Team directory', cells: ['No', 'No', 'No', 'Yes', 'Yes'] },
  { group: 'AI and relationship intelligence' },
  { label: 'AI badge scanner', cells: ['No', 'No', 'Yes', 'Yes', 'Yes'] },
  { label: 'AI Enrichment', cells: ['No', 'No', 'Yes', 'Yes', 'Yes'] },
  { label: 'ICPs', cells: ['No', 'No', 'Yes', 'Yes', 'Yes'] },
  { label: 'Network Ask', cells: ['No', 'No', 'Yes', 'Yes', 'Yes'] },
  { label: 'Lead scoring and ICP Matching', cells: ['No', 'No', 'Yes', 'Yes', 'Yes'] },
  { label: 'Intelligent Nudges and reminders', cells: ['No', 'No', 'Yes', 'Yes', 'Yes'] },
  { label: 'Warm Introductions', cells: ['No', 'No', 'Yes', 'Yes', 'Yes'] },
  { label: 'AI voice notetaker', cells: ['No', 'No', 'Yes', 'Yes', 'Yes'] },
  { group: 'Administration' },
  { label: 'Users', cells: ['1', '1', '1', '5 minimum', '5 minimum'] },
  { label: 'Centralised admin console', cells: ['No', 'No', 'No', 'Yes', 'Yes'] },
  { label: 'Single sign-on', cells: ['No', 'No', 'No', 'No', 'Planned'] },
  { label: 'CRM integration', cells: ['No', 'No', 'No', 'No', 'Planned'] },
  { label: 'HRMS integration', cells: ['No', 'No', 'No', 'No', 'Planned'] },
  { group: 'Support' },
  { label: 'Support level', cells: ['Community and help centre', 'Email', 'Priority email, 24 hours', 'Priority email, 6 hours', 'Dedicated'] },
];
