/**
 * Plans, cards and bundles as data (brief 3.5). Every price is in US dollars and UAE dirhams from
 * the owner's price table of 25 September 2026 (D58). Savings are derived from these figures,
 * never typed by hand.
 */
import type { Currency } from '@/lib/glossary';

export type PlanKey = 'essential' | 'enhanced' | 'pro' | 'team';

export interface Plan {
  readonly key: PlanKey;
  readonly name: string;
  readonly fit: string;
  readonly badge?: string;
  /** US dollars: a month (per user for Team) and a year. A one-time lifetime price is a launch promotion, not a plan price (src/content/promotions.ts). */
  readonly monthly: number;
  readonly yearly?: number;
  /** The same prices in UAE dirhams (owner's price table, 25 September 2026). */
  readonly aed: { readonly monthly: number; readonly yearly?: number };
  readonly perUser?: boolean;
  readonly minUsers?: number;
  /** A per-user plan: the monthly and yearly price of the minimum team, in USD and AED (owner, 21 September 2026, D52). */
  readonly team?: {
    readonly usd: { monthly: number; yearly: number };
    readonly aed: { monthly: number; yearly: number };
    /** Each user beyond the minimum: $5 a month or $50 a year (owner, 25 September); the dirham figures are the 5-user prices divided by 5. */
    readonly extra: { readonly usd: { monthly: number; yearly: number }; readonly aed: { monthly: number; yearly: number } };
  };
  readonly groups: readonly { heading: string; items: readonly string[] }[];
}

export const PLANS: readonly Plan[] = [
  {
    key: 'essential',
    name: 'Essential',
    fit: 'Your baseline Linkist identity. Free for as long as you like.',
    monthly: 0,
    aed: { monthly: 0 },
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
    yearly: 20,
    aed: { monthly: 8, yearly: 80 },
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
    aed: { monthly: 40, yearly: 400 },
    groups: [
      { heading: 'Everything in Enhanced, plus', items: ['5 profiles and full template customisation', 'Unlimited card scans'] },
      { heading: 'Relationship intelligence', items: ['AI Enrichment and lead scoring', 'ICP Matching and Network Ask', 'Intelligent Nudges and Top Actions', 'AI voice notetaker and AI Follow-up', 'Deal-tracking mini-CRM'] },
    ],
  },
  {
    key: 'team',
    name: 'Team',
    fit: 'For companies that want relationships to stay with the company.',
    monthly: 5,
    aed: { monthly: 20 },
    perUser: true,
    minUsers: 5,
    team: { usd: { monthly: 25, yearly: 250 }, aed: { monthly: 100, yearly: 1000 }, extra: { usd: { monthly: 5, yearly: 50 }, aed: { monthly: 20, yearly: 200 } } },
    groups: [
      { heading: 'Everything in Pro, teamwide', items: ['Contact sharing across the team', 'Centralised admin console', 'Company branding on cards', 'Team directory'] },
    ],
  },
];

export const planByKey = (key: PlanKey) => PLANS.find((p) => p.key === key)!;

/** The Team plan in one sentence (owner, 21 and 25 September 2026): $5 (AED 20) per user a month, minimum 5 users; $25 a month or $250 a year for 5 (AED 100 / AED 1,000); $5 (AED 20) a month or $50 (AED 200) a year for each additional user. */
export const TEAM_PRICE_LINE = '$5 (AED 20) per user a month, minimum 5 users: $25 a month or $250 a year for 5 users (AED 100 a month or AED 1,000 a year), then $5 (AED 20) a month, or $50 (AED 200) a year, for each additional user.';

/** Enterprise is upcoming and interest only today (brief 3.9, owner 25 September 2026): a contact route, never a plan card. */
export const ENTERPRISE_NOTE = 'Enterprise: upcoming, interest only today. Single sign-on, CRM and HRMS integration, product customisation, and GDPR and SOC 2 Type 2 data security are planned for it.';

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

/** The dirham peg, used only where the owner has not given a dirham figure (it is then shown as "about"). */
export const AED_PER_USD = 3.6725;

/** One-time prices per material in both currencies (owner's price table, 25 September 2026). */
export const CARD_TIERS: readonly CardTier[] = [
  {
    key: 'starter',
    name: 'Starter',
    blurb: 'No customisation. Tap and share from day one.',
    prices: { AED: { pvc: 75, wood: 95, metal: 200 }, USD: { pvc: 20, wood: 25, metal: 55 } },
  },
  {
    key: 'signature',
    name: 'Signature',
    blurb: 'Your name and logo on the NFC card.',
    badge: 'Most chosen',
    prices: { AED: { pvc: 95, wood: 125, metal: 240 }, USD: { pvc: 25, wood: 35, metal: 65 } },
  },
];

/** What the store offers per material (walk-through, 10 September). */
export const CARD_OPTIONS = [
  { material: 'PVC', finish: 'Premium PVC', colours: ['White', 'Black'], patterns: ['Minimal', 'Geometric', 'Wave', 'Crystal'] },
  { material: 'Wood', finish: 'Natural wood', colours: ['Cherry'], patterns: ['Minimal'] },
  { material: 'Metal', finish: 'Brushed metal', colours: ['Silver', 'Black'], patterns: ['Minimal', 'Geometric', 'Wave', 'Crystal'] },
] as const;

/** Shipping: the UAE only, shipping included (owner, 14 September; the store's 16-region list is not offered). */
export const SHIPPING_REGIONS = ['United Arab Emirates'] as const;

export interface Bundle {
  readonly key: 'signature' | 'founders';
  readonly name: string;
  readonly includes: string;
  readonly price: Record<Currency, number>;
  readonly priceNote: string;
  readonly featured?: boolean;
  readonly proYears: number | 'lifetime';
}

export const BUNDLES: readonly Bundle[] = [
  { key: 'signature', name: 'Signature Bundle', includes: 'Any Signature NFC card plus 1 year of PRM Pro', price: { USD: 100, AED: 369 }, priceNote: 'bundle price', proYears: 1 },
  { key: 'founders', name: 'Founders Circle Bundle', includes: 'Founders Circle NFC card plus lifetime PRM Pro', price: { USD: 150, AED: 549 }, priceNote: 'one-time bundle price', featured: true, proYears: 'lifetime' },
];

export const BUNDLE_BENEFITS = [
  { title: 'One purchase', body: 'NFC card and PRM Pro together.' },
  { title: 'Better value', body: 'Pay less than buying both separately.' },
  { title: 'Start with the full system', body: 'Share by NFC and use Pro from day one.' },
  { title: 'UAE shipping included', body: 'NFC cards ship within the UAE, shipping included.' },
] as const;

const PRO = planByKey('pro');
const PRO_YEAR: Record<Currency, number> = { USD: PRO.yearly ?? 100, AED: PRO.aed.yearly ?? 400 };
const signature = CARD_TIERS.find((t) => t.key === 'signature')!;

/** Signature card plus 1 year of Pro bought separately, against the bundle, per material and currency. Derived, not typed. */
export const immediateSavings = (cur: Currency) =>
  MATERIALS.map((m) => {
    const separately = signature.prices[cur][m.key] + PRO_YEAR[cur];
    const bundle = BUNDLES[0]!.price[cur];
    return { material: m.name, separately, bundle, saving: separately - bundle };
  });

/**
 * Three-year view, per material and currency: the bundle route (bundle in year 1, then Pro yearly)
 * against buying the card and 3 years of Pro separately. The Founders Circle route is one payment.
 */
export const threeYear = (cur: Currency) =>
  MATERIALS.map((m) => {
    const separately = signature.prices[cur][m.key] + PRO_YEAR[cur] * 3;
    const signatureRoute = BUNDLES[0]!.price[cur] + PRO_YEAR[cur] * 2;
    const foundersRoute = BUNDLES[1]!.price[cur];
    return { material: m.name, separately, signatureRoute, signatureSaving: separately - signatureRoute, foundersRoute, foundersSaving: separately - foundersRoute };
  });

export type CompareCell = string;
export type CompareRow = { readonly group: string } | { readonly label: string; readonly cells: readonly [CompareCell, CompareCell, CompareCell, CompareCell, CompareCell] };

/**
 * The plan comparison, feature by feature, from the owner's "Linkist Plan Comparison" sheet of
 * 25 September 2026 (D58). Rows marked * are Enterprise extras at cost or custom pricing; the
 * footnote sits under the table. The sheet's "GDPR and SOC 2 Type 2 data security" row is an
 * Enterprise feature (owner, 25 September), and Enterprise is marked upcoming, so it is ticked for
 * Enterprise only; nothing is claimed for the plans on sale today.
 */
export const COMPARE_HEADERS = ['Essential', 'Enhanced', 'Pro', 'Team', 'Enterprise'] as const;
export const COMPARE_FOOTNOTE = '* Available at cost or custom pricing (Enterprise).';
export const COMPARE_ROWS: readonly CompareRow[] = [
  { group: 'Digital profile and card design' },
  { label: 'Digital business card with photo', cells: ['Yes', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { label: 'Personal URL', cells: ['No', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { label: 'Number of profiles', cells: ['1 (personal)', '3 (1 personal, 2 business)', '5 (1 personal, 4 business)', '5 per user (1 personal, 4 business)', '5 per user'] },
  { label: 'Profile fields', cells: ['Limited', 'All', 'All', 'All', 'All'] },
  { label: 'Bio, socials, services, products, certifications', cells: ['No', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { label: 'Verified tick', cells: ['No', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { label: 'Themes', cells: ['Classic only', 'All available', 'All available', 'All available', 'All available'] },
  { label: 'Profile templates', cells: ['1', '3', 'Full customisation', 'Full customisation', 'Full customisation'] },
  { label: 'Custom card colours and design (built-in)', cells: ['No', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { group: 'Sharing' },
  { label: 'QR, URL, email and SMS sharing', cells: ['Yes', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { label: 'QR code', cells: ['Yes', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { label: 'Add to Google or Apple Wallet', cells: ['Yes', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { label: 'Unlimited sharing', cells: ['Yes', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { group: 'Contact capture and import' },
  { label: 'OCR business card scans', cells: ['5 / month', '20 / month', 'Unlimited', 'Unlimited', 'Unlimited'] },
  { label: 'Multi Card Scan', cells: ['No', 'No', 'Unlimited', 'Unlimited', 'Unlimited'] },
  { label: 'AI-powered universal badge scanner', cells: ['No', 'No', 'Yes', 'Yes', 'Yes'] },
  { label: 'Lead capture form', cells: ['No', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { label: 'Save to address book', cells: ['Yes', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { label: 'Contact import (Phone, CSV, VCF)', cells: ['Yes', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { label: 'Import from Google Contacts', cells: ['No', 'No', 'Yes', 'Yes', 'Yes'] },
  { label: 'Import from Microsoft Contacts', cells: ['No', 'No', 'Yes', 'Yes', 'Yes'] },
  { group: 'Contact management and pipeline' },
  { label: 'Notes and tags', cells: ['No', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { label: 'Deal-tracking mini-CRM', cells: ['No', 'No', 'Yes', 'Yes', 'Yes'] },
  { label: 'Linker Messaging', cells: ['No', 'No', 'Yes', 'Yes', 'Yes'] },
  { label: 'Engagement analytics', cells: ['None', 'Basic', 'Full', 'Full', 'Full'] },
  { label: 'Export contacts (non-CRM)', cells: ['No', 'Yes', 'Yes', 'Yes', 'Yes'] },
  { label: 'Export contacts to CRM', cells: ['No', 'No', 'Yes', 'Yes', 'Yes'] },
  { group: 'AI and relationship intelligence' },
  { label: 'AI contact enrichment', cells: ['No', 'No', 'Yes', 'Yes', 'Yes'] },
  { label: 'ICPs', cells: ['No', 'No', 'Yes', 'Yes', 'Yes'] },
  { label: 'Lead scoring and ICP matching', cells: ['No', 'No', 'Yes', 'Yes', 'Yes'] },
  { label: 'Smart nudges and reminders', cells: ['No', 'No', 'Yes', 'Yes', 'Yes'] },
  { label: 'Warm-path introductions', cells: ['No', 'No', 'Yes', 'Yes', 'Yes'] },
  { label: 'Post an Ask', cells: ['No', 'No', 'Yes', 'Yes', 'Yes'] },
  { label: 'AI voice notetaker', cells: ['No', 'No', 'Yes', 'Yes', 'Yes'] },
  { group: 'Team collaboration and administration' },
  { label: 'Centralised admin console', cells: ['No', 'No', 'No', 'Yes', 'Yes'] },
  { label: 'Company-wide branding on cards (Admin)', cells: ['No', 'No', 'No', 'Yes', 'Yes'] },
  { label: 'Team directory', cells: ['No', 'No', 'No', 'Yes', 'Yes'] },
  { label: 'Contact sharing across team', cells: ['No', 'No', 'No', 'Yes', 'Yes'] },
  { group: 'Enterprise integrations and customisation' },
  { label: 'Single sign-on (SSO)*', cells: ['No', 'No', 'No', 'No', 'Yes'] },
  { label: 'CRM integration*', cells: ['No', 'No', 'No', 'No', 'Yes'] },
  { label: 'HRMS integration*', cells: ['No', 'No', 'No', 'No', 'Yes'] },
  { label: 'Product Customisation*', cells: ['No', 'No', 'No', 'No', 'Yes'] },
  { group: 'Security and support' },
  { label: 'GDPR and SOC 2 Type 2 data security', cells: ['No', 'No', 'No', 'No', 'Yes'] },
  { label: 'Support level', cells: ['Community / AI help centre', 'Plus Email (standard SLA)', 'Priority email (24 hrs)', 'Priority email (6 hrs)', 'Dedicated support'] },
];
