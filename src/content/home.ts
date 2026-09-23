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
export const HERO = {
  eyebrow: 'Personal Relationship Manager',
  lines: ['Capture contacts.', 'Remember context.', 'Follow up at the right time.'] as const,
  lede: 'Linkist is the AI-powered Personal Relationship Manager (PRM) that turns the people you meet into relationships you keep. Save contacts in seconds, get timely nudges and never lose track of who matters. It works with or without an NFC card.',
  primary: 'Create Free Profile',
  secondary: 'Get Linkist NFC',
  byo: 'Already have an NFC card? Bring your own',
  stores: {
    apple: { small: 'Download on the', big: 'App Store' },
    google: { small: 'Get it on', big: 'Google Play' },
    pending: 'Coming soon',
  },
  /** The product on the right (D51): a public-profile sample on a phone and its Signature card. */
  imageAlt: 'Linkist on a phone with a Signature NFC card beside it, cycling through two public profiles and the app dashboard. Design preview; the people are examples.',
} as const;

/** The three-stage journey, the prototype's spine (brief 3.2). One screen per stage in the deck. */
export interface Stage {
  readonly n: 1 | 2 | 3;
  readonly label: string;
  readonly title: string;
  readonly bullets: readonly string[];
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
    outcome: 'every useful contact becomes more than a name and number.',
    chips: ['AI Enrichment', 'Card Scan', 'Contact Import', 'Voice Notes'],
    screen: 'v6-shareready',
    href: '/features/capture',
  },
  {
    n: 2,
    label: 'Build relationships',
    title: 'Find the people worth your attention.',
    bullets: ['Search using what you remember', 'Define who you are looking for and see who fits', 'See which relationships are active or going quiet', 'Post what you need and find relevant people or trusted paths'],
    outcome: 'know who matters, who fits, and who can help.',
    chips: ['Natural-Language Search', 'ICP Matching', 'Relationship Priority', 'Network Ask'],
    screen: 'v6-icpdetail',
    href: '/features/find',
  },
  {
    n: 3,
    label: 'Act and grow',
    title: 'Know what to do next.',
    bullets: ['Start the day with your most important actions', 'Plan relationships and opportunities for the week', 'Get useful nudges before follow-ups slip away', 'Reach out or ask for a warm introduction'],
    outcome: 'stay on top of the right relationships and act before the moment passes.',
    chips: ['Top Actions', 'Intelligent Nudges', 'Warm Introductions'],
    screen: 'v6-home',
    href: '/features/act',
  },
];

/** "More than an organised address book": four cards and the closing line. */
export const MORE_THAN = [
  { title: 'Keeps the context', body: 'Know why the person mattered, not just their number.' },
  { title: 'Finds the right people', body: 'Search, match and uncover opportunities inside the network you already have.' },
  { title: 'Tells you what needs attention', body: 'See important relationships and actions before they slip through the cracks.' },
  { title: 'Helps you act', body: 'Follow up, reconnect, or find a warm introduction with the context already in place.' },
] as const;
export const MORE_THAN_LINE = 'Contacts store people. Linkist helps you build trust and use relationship capital.';

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
    body: 'Turns incomplete contacts into richer records automatically.',
    href: '/features/capture',
    object: 'enrich',
    mock: { kind: 'enrich', label: 'A contact record filling in', fields: [['Name', 'Julian Baptiste', false], ['Company', 'Nadir Fintech', true], ['Role', 'Co-founder', true], ['Met at', 'GITEX, hall 4', false]] },
  },
  {
    title: 'Natural-Language Search',
    body: 'Find people using what you remember, not exact names.',
    href: '/features/find',
    object: 'search',
    mock: { kind: 'search', label: 'A search typed in plain words with two results', query: 'fintech founder I met at GITEX', results: [['JB', 'Julian Baptiste', 'Nadir Fintech'], ['SM', 'Sara Mansour', 'Fintech, Series A']] },
  },
  {
    title: 'ICP Matching',
    body: 'Tell Linkist who you are looking for and see who fits.',
    href: '/features/find',
    object: 'icp',
    mock: { kind: 'icp', label: 'ICP chips lighting up on matches', items: ['Fintech', 'Founder', 'Dubai', 'Series A'], count: '12 matches' },
  },
  {
    title: 'Intelligent Nudges',
    body: 'See what changed and what deserves action today.',
    href: '/features/act',
    object: 'nudge',
    mock: { kind: 'nudge', label: 'A nudge dropping in', title: 'You met Julian at GITEX', note: 'Want to follow up?', actions: ['Draft a message', 'Later'] },
  },
];

export const FAQ: readonly FaqItem[] = [
  { q: 'What is Linkist?', a: 'Linkist is a Personal Relationship Manager paired with an optional NFC business card. It captures the people you meet, remembers the context, and tells you what to do next.' },
  { q: 'What is a Personal Relationship Manager (PRM)?', a: 'A PRM organises relationships rather than deals: your contacts, meeting context, priorities and follow-ups live in one place, focused on who matters and what deserves action.' },
  { q: 'How is Linkist different from a contact app or CRM?', a: 'Contact apps store people and CRMs manage deals. Linkist helps you manage relationships: who matters, who fits what you are looking for, and what to do next.' },
  { q: 'Do I need an NFC card to use Linkist PRM?', a: 'No. You can start with the free PRM plan on its own and add an NFC card any time.' },
  { q: 'Does every NFC card include PRM Essential?', a: 'Yes. Every Linkist NFC card includes the PRM Essential plan.' },
  { q: 'What happens to my contacts if I leave my company?', a: 'Your personal contacts stay yours. Team-shared contacts and their relationship history remain with the authorised team, so relationship value stays inside the company.' },
  { q: 'How does Linkist use AI and handle contact data?', a: 'AI enriches incomplete records, matches contacts against your ICPs and helps draft follow-ups. You review what it suggests. Contact data is handled under the Linkist Terms and Privacy: you decide how the contacts you save are used, Linkist stores and protects them, never sells them, and AI is off until you switch it on.' },
];

export const COMMUNITY = {
  eyebrow: 'Community',
  title: 'Join the Linkist community',
  body: 'Product notes, launch invitations and networking events in Dubai and online. Occasional, no tracking, unsubscribe any time.',
} as const;
