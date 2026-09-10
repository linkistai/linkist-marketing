/**
 * The five use cases from the prototype (brief 4): each is problem, "with Linkist" steps, outcome,
 * the capabilities used and one screen. Em dashes in the prototype copy are rewritten (rule 5).
 */
import type { ProtoScreen } from '@/content/design';

export interface UseCase {
  readonly slug: string;
  readonly short: string;
  readonly title: string;
  readonly problem: string;
  readonly steps: readonly string[];
  readonly result: string;
  readonly chips: readonly string[];
  readonly screen: ProtoScreen;
  readonly description: string;
  readonly feature: string;
}

export const USE_CASES: readonly UseCase[] = [
  {
    slug: 'after-the-event',
    short: 'After the event',
    title: 'You leave an event with 30 new contacts.',
    problem: 'A few conversations mattered. A week later, everyone is just another name in your phone.',
    steps: ['Capture the contacts with relevant tags and voice notes', 'Add missing professional details with AI Enrichment', 'See who fits what you are looking for', 'Prioritise the follow-up'],
    result: 'you leave with opportunities, not a pile of cards.',
    chips: ['AI Enrichment', 'ICP Matching', 'Relationship Priority', 'Top Actions'],
    screen: 'proto-home',
    description: 'How Linkist turns the contacts from an event into a prioritised follow-up list: capture with tags and voice notes, enrich the gaps, see who fits, act first on the ones that matter.',
    feature: '/features/capture',
  },
  {
    slug: 'find-the-right-person',
    short: 'Find the right person',
    title: 'You have a requirement. It could be someone you or your acquaintances know.',
    problem: 'You are looking for a buyer, partner, expert or introduction, but your network is too large to search manually.',
    steps: ['Describe the person or opportunity in natural language', 'Search your network using normal language and remembered context', 'See contacts who fit what you need', 'Find a trusted path when the right person is one connection away'],
    result: 'find the right person before your requirement is cold.',
    chips: ['Natural-Language Search', 'ICP Matching', 'Network Ask', 'Warm Introductions'],
    screen: 'proto-profile',
    description: 'How Linkist finds the buyer, partner, expert or introduction you need inside the network you already have: describe them in plain words and see who fits, or the trusted path to them.',
    feature: '/features/find',
  },
  {
    slug: 'too-many-relationships',
    short: 'Too many to track',
    title: 'You have good relationships but too many to keep track of.',
    problem: 'Follow-ups get delayed. Important people quietly disappear from your radar. Opportunities are remembered a little too late.',
    steps: ['See what deserves your attention today', 'Get nudged when an important relationship needs attention', 'Plan the important conversations for the week', 'Get help drafting the follow-up'],
    result: 'stay on top of the relationships that can actually lead somewhere.',
    chips: ['Top Actions', 'Weekly Planner', 'Intelligent Nudges', 'Smart Signals', 'AI Follow-up'],
    screen: 'proto-home',
    description: 'How Linkist keeps a large network from going quiet: Top Actions for the day, nudges before a follow-up slips, a Weekly Planner and drafted follow-ups.',
    feature: '/features/act',
  },
  {
    slug: 'network-growing-wrong',
    short: 'Growing the wrong way',
    title: 'Your network is growing, in the wrong way.',
    problem: 'More contacts do not automatically mean better opportunities.',
    steps: ['See where your network is strong', 'Spot gaps against the customers or partners you want to reach', 'Know where to build relationships next'],
    result: 'build a network that is aligned to your goals and mutually beneficial.',
    chips: ['Network Strength', 'ICP Matching'],
    screen: 'proto-home',
    description: 'How Linkist shows where your network is strong, where the gaps are against the customers or partners you want, and where to build next.',
    feature: '/features/find',
  },
  {
    slug: 'when-a-key-person-leaves',
    short: 'When a key person leaves',
    title: 'A key person leaves, and the relationship leaves with them.',
    problem: 'Important business context often lives inside individual phones, inboxes and memories.',
    steps: ['Preserve shared relationship history and context', 'Keep authorised team members connected to important contacts', 'Reduce the loss of relationship knowledge when roles change'],
    result: 'keep relationship value inside the company.',
    chips: ['Team Intelligence', 'Shared Contacts', 'Relationship History'],
    screen: 'proto-share',
    description: 'How the Team plan keeps shared contacts and their relationship history with the company when people move on.',
    feature: '/teams',
  },
];

export const useCaseBySlug = (slug: string) => USE_CASES.find((u) => u.slug === slug);
