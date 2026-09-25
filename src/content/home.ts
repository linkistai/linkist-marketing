/**
 * Home page copy as data, in the prototype's section order (brief, Appendix A). Every sentence
 * lifted from the prototype has had its em dashes rewritten (rule 5). Every claim traces to the
 * Product Truth Sheet and carries a confirm-list item until the Phase 1 audit.
 * British English, no em dashes anywhere (owner, 23 September 2026), digits for numbers, headlines with one coral phrase.
 */
import type { FaqItem } from '@/components/Faq';
import type { MiniMockKind } from '@/components/mockups/MiniMock';
import type { ProtoScreen } from '@/content/design';

/**
 * The home hero (D50): the owner's copy of 16 September 2026, word for word, in place of the two-slide
 * product switcher. The lede was rewritten without its em dash on 23 September 2026, at the owner's
 * request, and names the Personal Relationship Manager in full. The store badges only link once the listings exist
 * (R3, `APP_STORE_URL` and `PLAY_STORE_URL`); until then they say so.
 */
/** One side of the hero switcher (owner, 25 September 2026): the H1 in lines, the last `em` lines in red. */
export interface HeroMode {
  readonly key: 'teams' | 'individuals';
  readonly tab: string;
  readonly lines: readonly string[];
  readonly em: number;
  readonly lede: string;
  /** A closing sentence set in bold white after the lede. */
  readonly ledeStrong?: string;
  readonly primary: { readonly label: string; readonly href: string };
  readonly secondary: { readonly label: string; readonly href: string };
}

export const HERO = {
  eyebrow: 'Personal Relationship Manager (PRM)',
  /** The hero switcher: For teams first and open by default, as in the owner's screens. */
  modes: [
    {
      key: 'teams',
      tab: 'For teams',
      lines: ['Turn your team’s network', 'into business intelligence.'],
      em: 1,
      lede: 'Give your team an intelligent relationship platform that remembers who they meet, enriches every contact, identifies ICP matches and recommends the relationships worth developing.',
      ledeStrong: 'Reduce customer acquisition time and cost.',
      primary: { label: 'Set up your team', href: 'free-profile' },
      secondary: { label: 'Explore Teams', href: '/teams' },
    },
    {
      key: 'individuals',
      tab: 'For individuals',
      lines: ['Capture contacts.', 'Remember context.', 'Follow up at the right time.'],
      em: 1,
      lede: 'Linkist is the AI-powered Personal Relationship Manager (PRM) that turns the people you meet into relationships you keep. Save contacts in seconds, get timely nudges and never lose track of who matters. It works with or without an NFC card.',
      primary: { label: 'Create Free Profile', href: 'free-profile' },
      secondary: { label: 'Get Linkist NFC', href: 'get-card' },
    },
  ] as const satisfies readonly HeroMode[],
  switchToIndividuals: { lead: 'Buying just for yourself?', link: 'Switch to individuals' },
  byo: 'Already have an NFC card? Bring your own',
  /** The five capabilities under the buttons, with their icons. */
  pillars: ['Smart NFC Cards', 'Contact Enrichment', 'ICP Matching', 'AI Recommendations', 'Smart Follow-ups'] as const,
  stores: {
    apple: { small: 'Download on the', big: 'App Store' },
    google: { small: 'Get it on', big: 'Google Play' },
    pending: 'Coming soon',
  },
  imageAlt: 'A hand taps a Linkist NFC card on a phone, which opens the Linkist app.',
} as const;

/** The three-stage journey, the prototype's spine (brief 3.2). One screen per stage in the deck. */
export interface Stage {
  readonly n: 1 | 2 | 3;
  readonly label: string;
  readonly title: string;
  readonly bullets: readonly string[];
  /** The shorter bullets the v2 home page shows in its stage switcher. */
  readonly bulletsShort: readonly string[];
  readonly outcome: string;
  readonly chips: readonly string[];
  readonly screen: ProtoScreen;
  readonly href: string;
}
export const STAGES: readonly Stage[] = [
  {
    n: 1,
    label: 'Capture and share',
    title: 'Save the contact. Save the context.',
    bullets: ['Capture through NFC, QR, card scan, phone import, CSV or VCF, or manual add', 'Fill missing details with AI Enrichment', 'Save where you met and what mattered', 'Share your live profile with one tap'],
    bulletsShort: ['Capture by NFC, QR, card scan, import or manual add', 'Fill gaps with AI Enrichment', 'Save where you met and what mattered', 'Share your live profile in one tap'],
    outcome: 'Every useful contact becomes more than a name and number.',
    chips: ['AI Enrichment', 'Card Scan', 'Contact Import', 'Voice Notes'],
    screen: 'v12-shareready',
    href: '/features/capture',
  },
  {
    n: 2,
    label: 'Build relationships',
    title: 'Find the people worth your attention.',
    bullets: ['Search using what you remember', 'Define who you are looking for and see who fits', 'See which relationships are active or going quiet', 'Post what you need and find relevant people or trusted paths'],
    bulletsShort: ['Search by what you remember', 'Define who you want and see who fits', 'See which relationships are active or quiet', 'Post a need, find people or trusted paths'],
    outcome: 'Know who matters, who fits, and who can help.',
    chips: ['Natural-Language Search', 'ICP Matching', 'Relationship Priority', 'Network Ask'],
    screen: 'v12-icpintro',
    href: '/features/find',
  },
  {
    n: 3,
    label: 'Act and grow',
    title: 'Know what to do next.',
    bullets: ['Start the day with your most important actions', 'Plan relationships and opportunities for the week', 'Get useful nudges before follow-ups slip away', 'Reach out or ask for a warm introduction'],
    bulletsShort: ['Start the day with your top actions', 'Plan the week’s relationships', 'Get nudged before follow-ups slip', 'Reach out or ask for a warm intro'],
    outcome: 'Stay on top of the right relationships and act before the moment passes.',
    chips: ['Top Actions', 'Intelligent Nudges', 'Warm Introductions'],
    screen: 'v6-home',
    href: '/features/act',
  },
];


/** "What powers Linkist": four capability cards, each with a 3D object slot and an animated mini mockup (Grownz D26). */
export interface Capability {
  readonly title: string;
  readonly body: string;
  readonly href: string;
  readonly object: string;
  readonly mock: MiniMockKind;
}
export const CAPABILITIES: readonly Capability[] = [
  {
    title: 'AI Enrichment',
    body: 'Turns incomplete contacts into rich records.',
    href: '/features/capture',
    object: 'enrich',
    mock: { kind: 'enrich', label: 'A contact record filling in', fields: [['Name', 'Julian Baptiste', false], ['Company', 'Nadir Fintech', true], ['Role', 'Co-founder', true], ['Met at', 'GITEX, hall 4', false]] },
  },
  {
    title: 'Natural-Language Search',
    body: 'Find people by what you remember, not exact names.',
    href: '/features/find',
    object: 'search',
    mock: { kind: 'search', label: 'A search typed in plain words with two results', query: 'fintech founder I met at GITEX', results: [['JB', 'Julian Baptiste', 'Nadir Fintech'], ['SM', 'Sara Mansour', 'Fintech, Series A']] },
  },
  {
    title: 'ICP Matching',
    body: 'Say who you are looking for. See who fits.',
    href: '/features/find',
    object: 'icp',
    mock: { kind: 'icp', label: 'ICP chips lighting up on matches', items: ['Fintech', 'Founder', 'Dubai', 'Series A'], count: '12 matches' },
  },
  {
    title: 'Intelligent Nudges',
    body: 'See what changed and what needs action today.',
    href: '/features/act',
    object: 'nudge',
    mock: { kind: 'nudge', label: 'A nudge dropping in', title: 'You met Julian at GITEX', note: 'Want to follow up?', actions: ['Draft a message', 'Later'] },
  },
];

export const FAQ: readonly FaqItem[] = [
  { q: 'What is Linkist?', a: 'Linkist is a Personal Relationship Manager with an optional NFC card. It captures who you meet, remembers the context and tells you what to do next.' },
  { q: 'What is a Personal Relationship Manager (PRM)?', a: 'A PRM organises relationships, not deals: contacts, context, priorities and follow-ups in one place.' },
  { q: 'How is Linkist different from a contact app or CRM?', a: 'Contact apps store people. CRMs manage deals. Linkist manages relationships: who matters, who fits and what to do next.' },
  { q: 'Do I need an NFC card to use Linkist PRM?', a: 'No. Start on the free PRM plan and add a card any time.' },
  { q: 'Does every NFC card include PRM Essential?', a: 'Yes. Every Linkist NFC card includes PRM Essential.' },
  { q: 'What happens to my contacts if I leave my company?', a: 'Your personal contacts stay yours. Team-shared contacts and their history stay with the team.' },
  { q: 'How does Linkist use AI and handle contact data?', a: 'AI enriches records, matches contacts to your ICPs and drafts follow-ups for your review. You decide how contacts are used. Linkist protects them, never sells them, and AI stays off until you switch it on.' },
];

export const COMMUNITY = {
  eyebrow: 'Community',
  title: 'Join the Linkist community',
  body: 'Product notes, launch invites and events in Dubai and online. Occasional, no tracking.',
} as const;
