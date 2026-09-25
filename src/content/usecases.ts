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
  /** The v2 scene photograph (public/assets/gen) and its alt text. */
  readonly scene: string;
  readonly sceneAlt: string;
}

export const USE_CASES: readonly UseCase[] = [
  {
    slug: 'after-the-event',
    short: 'After the event',
    title: 'You leave an event with 30 new contacts.',
    problem: 'A few mattered. A week later, they are just names in your phone.',
    steps: ['Capture with tags and voice notes', 'Fill gaps with AI Enrichment', 'See who fits your goals', 'Prioritise the follow-up'],
    result: 'Leave with opportunities, not a pile of cards.',
    chips: ['AI Enrichment', 'ICP Matching', 'Relationship Priority', 'Top Actions'],
    screen: 'v6-contacts',
    description: 'How Linkist turns the contacts from an event into a prioritised follow-up list: capture with tags and voice notes, enrich the gaps, see who fits, act first on the ones that matter.',
    feature: '/features/capture',
    scene: '/assets/gen/uc-event.webp',
    sceneAlt: 'A desk at night with a pile of business cards and a phone',
  },
  {
    slug: 'find-the-right-person',
    short: 'Find the right person',
    title: 'You need someone. You, or someone you know, may know them.',
    problem: 'A buyer, partner, expert or intro, hidden in a network too big to search by hand.',
    steps: ['Describe who you need in plain words', 'Search by remembered context', 'See who fits', 'Find a trusted path to them'],
    result: 'Find the right person while the need is still warm.',
    chips: ['Natural-Language Search', 'ICP Matching', 'Network Ask', 'Warm Introductions'],
    screen: 'v6-icpdetail',
    description: 'How Linkist finds the buyer, partner, expert or introduction you need inside the network you already have: describe them in plain words and see who fits, or the trusted path to them.',
    feature: '/features/find',
    scene: '/assets/gen/uc-find.webp',
    sceneAlt: 'A professional in a hotel lobby searching on his phone',
  },
  {
    slug: 'too-many-relationships',
    short: 'Too many to track',
    title: 'Good relationships. Too many to track.',
    problem: 'Follow-ups slip. Key people fade from view. Opportunities surface too late.',
    steps: ['See what needs attention today', 'Get nudged on key relationships', 'Plan the week’s conversations', 'Get help drafting follow-ups'],
    result: 'Stay on top of the relationships that lead somewhere.',
    chips: ['Top Actions', 'Weekly Planner', 'Intelligent Nudges', 'Smart Signals', 'AI Follow-up'],
    screen: 'v6-home',
    description: 'How Linkist keeps a large network from going quiet: Top Actions for the day, nudges before a follow-up slips, a Weekly Planner and drafted follow-ups.',
    feature: '/features/act',
    scene: '/assets/gen/uc-many.webp',
    sceneAlt: 'A busy professional walking through an airport checking her phone',
  },
  {
    slug: 'network-growing-wrong',
    short: 'Growing the wrong way',
    title: 'Your network is growing the wrong way.',
    problem: 'More contacts do not mean better opportunities.',
    steps: ['See where your network is strong', 'Spot gaps against the customers and partners you want', 'Know where to build next'],
    result: 'Build a network aligned with your goals.',
    chips: ['Network Strength', 'ICP Matching'],
    screen: 'v6-health',
    description: 'How Linkist shows where your network is strong, where the gaps are against the customers or partners you want, and where to build next.',
    feature: '/features/find',
    scene: '/assets/gen/uc-grow.webp',
    sceneAlt: 'A crowded conference hall with one person standing still',
  },
  {
    slug: 'when-a-key-person-leaves',
    short: 'When a key person leaves',
    title: 'A key person leaves. The relationship leaves too.',
    problem: 'Business context lives in personal phones, inboxes and memories.',
    steps: ['Keep shared history and context', 'Keep authorised teammates connected', 'Lose less knowledge when roles change'],
    result: 'Keep relationship value inside the company.',
    chips: ['Team Intelligence', 'Shared Contacts', 'Relationship History'],
    screen: 'v6-detail',
    description: 'How the Team plan keeps shared contacts and their relationship history with the company when people move on.',
    feature: '/teams',
    scene: '/assets/gen/uc-leave.webp',
    sceneAlt: 'A person leaving an office carrying a box of belongings',
  },
];

export const useCaseBySlug = (slug: string) => USE_CASES.find((u) => u.slug === slug);
