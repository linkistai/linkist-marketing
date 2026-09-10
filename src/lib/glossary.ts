/**
 * One spelling for every product term (brief, section 9). Import these instead of typing them.
 * Source: the prototype's capability chips and plan names, and the app's own labels once Phase 1
 * confirms them (docs/01-audit.md).
 */
export const G = {
  product: 'Linkist',
  prm: 'Linkist PRM',
  category: 'Personal Relationship Manager',
  categoryShort: 'PRM',
  tagline: 'Capture Contacts. Remember Context. Act at the right time.',
  headline: ['Capture Contacts.', 'Remember Context.', 'Act at the right time.'] as const,
  stages: ['Capture and share', 'Build relationships', 'Act and grow'] as const,
  ctaPrimary: 'Start free',
  ctaSignIn: 'Sign in',
  ctaSecondary: 'Explore Linkist',
  ctaTry: 'Try Linkist now',
  ctaCard: 'Get your card',
  ctaCompare: 'Compare PRM plans',
  plans: { essential: 'Essential', enhanced: 'Enhanced', pro: 'Pro', team: 'Team', enterprise: 'Enterprise' } as const,
  planIncluded: 'PRM Essential',
  card: 'NFC card',
  cardTiers: { starter: 'Starter', signature: 'Signature', founders: 'Founders Circle' } as const,
  bundles: { signature: 'Signature Bundle', founders: 'Founders Circle Bundle' } as const,
  reassurance: 'Free plan. No card required. Add a card any time.',
  capabilities: {
    enrichment: 'AI Enrichment',
    scan: 'Card Scan',
    import: 'Contact Import',
    voice: 'Voice Notes',
    search: 'Natural-Language Search',
    icp: 'ICP Matching',
    priority: 'Relationship Priority',
    ask: 'Network Ask',
    strength: 'Network Strength',
    pulse: 'Network Pulse',
    radar: 'Opportunity Radar',
    topActions: 'Top Actions',
    planner: 'Weekly Planner',
    nudges: 'Intelligent Nudges',
    signals: 'Smart Signals',
    intros: 'Warm Introductions',
    followUp: 'AI Follow-up',
    teamIntel: 'Team Intelligence',
    shared: 'Shared Contacts',
    history: 'Relationship History',
  } as const,
} as const;

export type Currency = 'USD' | 'AED';
export const CURRENCIES: readonly Currency[] = ['USD', 'AED'];

/** Prices are whole units. The app bills in USD; AED is a display option for the cards [CONFIRM]. */
export function formatMoney(amount: number, currency: Currency): string {
  if (currency === 'AED') return `AED ${amount.toLocaleString('en-AE')}`;
  return `$${amount.toLocaleString('en-US')}`;
}
