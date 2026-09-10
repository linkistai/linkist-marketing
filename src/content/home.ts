/**
 * Home page copy as data, in the prototype's section order (brief, Appendix A). Every sentence
 * lifted from the prototype has had its em dashes rewritten (rule 5). Every claim traces to the
 * Product Truth Sheet and carries a confirm-list item until the Phase 1 audit.
 * British English, no em dashes, digits for numbers, headlines with one coral phrase.
 */
import type { FaqItem } from '@/components/Faq';
import type { MiniMockKind } from '@/components/mockups/MiniMock';
import type { ProtoScreen } from '@/content/design';

export const HERO = {
  eyebrow: 'Personal Relationship Manager',
  lines: ['Capture Contacts.', 'Remember Context.', 'Act at the right time.'] as const,
  lede: 'Linkist brings your contacts, meeting context and relationship opportunities into one place. Capture the people you meet, find who matters, and know what to do next.',
  subline: 'Turn the contacts you collect into relationships and opportunities you can act on.',
  proof: ['Start free, no card required', 'Works with or without an NFC card', 'Every NFC card includes PRM Essential', 'Sign in with email or mobile', 'Ships across the GCC and worldwide'],
} as const;

/** Interactive hero (brief 4): each chip swaps the hero screen and rewrites the lede. The CTA never changes. */
export interface Intent {
  readonly key: string;
  readonly chip: string;
  readonly lede: string;
  readonly screen: ProtoScreen;
  readonly href: string;
}
export const INTENTS: readonly Intent[] = [
  {
    key: 'event',
    chip: 'I just came back from an event',
    lede: 'Capture the people you met with tags and voice notes, let AI Enrichment fill the gaps, and see who fits what you are looking for before the week is out.',
    screen: 'proto-home',
    href: '/use-cases/after-the-event',
  },
  {
    key: 'find',
    chip: 'I need to find the right person',
    lede: 'Describe who you need in plain words. Natural-Language Search and ICP Matching find the people who fit, or a trusted path to them.',
    screen: 'proto-profile',
    href: '/use-cases/find-the-right-person',
  },
  {
    key: 'many',
    chip: 'I have too many relationships to track',
    lede: 'Start the day with Top Actions, get nudged before a follow-up slips, and plan the conversations that matter this week.',
    screen: 'proto-home',
    href: '/use-cases/too-many-relationships',
  },
  {
    key: 'team',
    chip: 'I run a team',
    lede: 'Share contacts across the team, brand every card, and keep the relationship history with the company when people move on.',
    screen: 'proto-share',
    href: '/teams',
  },
];

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
    screen: 'proto-share',
    href: '/features/capture',
  },
  {
    n: 2,
    label: 'Build relationships',
    title: 'Find the people worth your attention.',
    bullets: ['Search using what you remember', 'Define who you are looking for and see who fits', 'See which relationships are active or going quiet', 'Post what you need and find relevant people or trusted paths'],
    outcome: 'know who matters, who fits, and who can help.',
    chips: ['Natural-Language Search', 'ICP Matching', 'Relationship Priority', 'Network Ask'],
    screen: 'proto-profile',
    href: '/features/find',
  },
  {
    n: 3,
    label: 'Act and grow',
    title: 'Know what to do next.',
    bullets: ['Start the day with your most important actions', 'Plan relationships and opportunities for the week', 'Get useful nudges before follow-ups slip away', 'Reach out or ask for a warm introduction'],
    outcome: 'stay on top of the right relationships and act before the moment passes.',
    chips: ['Top Actions', 'Intelligent Nudges', 'Warm Introductions'],
    screen: 'proto-home',
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
    title: 'Smart nudges',
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
  { q: 'Do I need an NFC card to use Linkist PRM?', a: 'No. You can start with the free PRM plan on its own and add a card any time.' },
  { q: 'Does every NFC card include PRM Essential?', a: 'Yes. Every Linkist NFC card includes the PRM Essential plan.' },
  { q: 'What happens to my contacts if I leave my company?', a: 'Your personal contacts stay yours. Team-shared contacts and their relationship history remain with the authorised team, so relationship value stays inside the company.' },
  { q: 'How does Linkist use AI and handle contact data?', a: 'AI enriches incomplete records, matches contacts against your ICPs and helps draft follow-ups. You review what it suggests. Contact data is handled under the privacy policy, written to the UAE Personal Data Protection Law, with encryption in transit and at rest.' },
];

export const COMMUNITY = {
  eyebrow: 'Community',
  title: 'Join the Linkist community',
  body: 'Product notes, launch invitations and networking events in Dubai and online. Occasional, no tracking, unsubscribe any time.',
} as const;
