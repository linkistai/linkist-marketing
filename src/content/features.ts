/**
 * Feature pages (brief 4): capture, find, act, profiles, teams. Every claim traces to the Product
 * Truth Sheet (brief 3.3) and the prototype's plan comparison; each carries a confirm-list item
 * until the Phase 1 audit. Headlines have one coral phrase; ledes are one sentence; tab bodies are
 * under 30 words; the proof is a real screen named in `screen` (captures/manifest.ts), shown as
 * "capture pending" until it exists, or a labelled prototype preview.
 */
import type { FaqItem } from '@/components/Faq';
import type { MiniMockKind } from '@/components/mockups/MiniMock';

export interface FeatureTabContent {
  readonly key: string;
  readonly title: string;
  readonly body: string;
  readonly screen: string;
  readonly kind: 'phone' | 'browser';
  readonly alt: string;
  readonly plan?: 'Enhanced' | 'Pro' | 'Team';
}

export interface FeaturePage {
  readonly slug: string;
  readonly name: string;
  readonly stage: string;
  readonly title: string;
  readonly description: string;
  readonly headline: readonly [string, string, string];
  readonly lede: string;
  readonly heroScreen: string;
  readonly heroAlt: string;
  readonly chips: readonly { label: string; value: string }[];
  readonly tabs: readonly FeatureTabContent[];
  readonly planNote: string;
  readonly faq: readonly FaqItem[];
  readonly hubBlurb: string;
  readonly object: string;
  readonly mock: MiniMockKind;
}

export const FEATURES: readonly FeaturePage[] = [
  {
    slug: 'capture',
    name: 'Capture',
    stage: 'Capture and share',
    title: 'Capture: NFC, QR, card scan, import, AI Enrichment and voice notes',
    description: 'Every way to get a contact into Linkist with its context: an NFC tap, a QR code, a business-card scan, phone, CSV and VCF import, voice notes, tags and AI Enrichment for the gaps.',
    headline: ['Save the contact. ', 'Save the context', '.'],
    lede: 'Capture people any way they arrive, note where you met and what mattered, and let AI Enrichment fill in the rest.',
    heroScreen: 'proto-share',
    heroAlt: 'Share Contact screen with a QR code and Tap to Link',
    chips: [
      { label: 'Ways to capture', value: '6' },
      { label: 'Card scans on Pro', value: 'Unlimited' },
      { label: 'Import formats', value: 'Phone, CSV, VCF' },
    ],
    tabs: [
      { key: 'tap', title: 'NFC tap and QR', body: 'Tap a Linkist card to a phone, or show your QR code. The other person gets your live profile and you keep the meeting.', screen: 'share-phone', kind: 'phone', alt: 'Share Contact screen' },
      { key: 'scan', title: 'Card scan', body: 'Point the camera at a paper business card and it becomes a contact record. 5 a month on Essential, 20 on Enhanced, unlimited on Pro.', screen: 'scan-phone', kind: 'phone', alt: 'Card scan screen' },
      { key: 'import', title: 'Import and add', body: 'Bring your phone contacts, a CSV or a VCF file, or add a person by hand. Tags and a voice note keep the context with them.', screen: 'import-phone', kind: 'phone', alt: 'Contact import screen' },
      { key: 'enrich', title: 'AI Enrichment', body: 'An incomplete record gets its missing professional details filled in. You see what was added and can change it.', screen: 'enrich-phone', kind: 'phone', alt: 'AI Enrichment on a contact record', plan: 'Pro' },
    ],
    planNote: 'NFC, QR, import and manual add are in every plan. Card scans are limited by plan. AI Enrichment, lead capture forms and export start at Enhanced or Pro as listed on the pricing page.',
    faq: [
      { q: 'Does the other person need Linkist to receive my card?', a: 'No. A tap or a QR scan opens your live profile in their browser and they can save your details. If they use Linkist too, the meeting is captured on both sides.' },
      { q: 'What does the card scan read?', a: 'The name, company, role, phone, email and address printed on a paper business card, into fields you can correct before saving.' },
      { q: 'Can I record a voice note at the stand?', a: 'Yes. Record where you met and what mattered while it is fresh; it stays with the contact.' },
    ],
    hubBlurb: 'NFC tap, QR, card scan, import, voice notes and AI Enrichment.',
    object: 'capture',
    mock: { kind: 'tap', label: 'A card tapping a phone, then the profile is shared' },
  },
  {
    slug: 'find',
    name: 'Find',
    stage: 'Build relationships',
    title: 'Find: Natural-Language Search, ICP Matching, Relationship Priority, Network Ask',
    description: 'Search your network with what you remember, define who you are looking for and see who fits, watch which relationships are warming or cooling, and post what you need.',
    headline: ['Find the people ', 'worth your attention', '.'],
    lede: 'Search in plain words, define who you are looking for, see who fits, and know which relationships are going quiet.',
    heroScreen: 'proto-profile',
    heroAlt: 'A public profile page found through search',
    chips: [
      { label: 'Search', value: 'Plain words' },
      { label: 'Matching', value: 'Against your ICPs' },
      { label: 'Relationship states', value: 'Warming, cooling, cold' },
    ],
    tabs: [
      { key: 'search', title: 'Natural-Language Search', body: 'Type what you remember: the fintech founder from GITEX, the designer who mentioned Riyadh. Linkist searches names, notes and context together.', screen: 'search-phone', kind: 'phone', alt: 'Natural-Language Search screen' },
      { key: 'icp', title: 'ICP Matching', body: 'Describe your ideal customer, partner or hire once. Linkist shows which contacts fit and how many strong matches you already have.', screen: 'icp-phone', kind: 'phone', alt: 'ICP Matches screen', plan: 'Pro' },
      { key: 'priority', title: 'Relationship Priority', body: 'Relationship Health shows who is warming up, cooling down and cold, so attention goes where it is needed.', screen: 'health-phone', kind: 'phone', alt: 'Relationship Health screen' },
      { key: 'ask', title: 'Network Ask', body: 'Post what you need. Linkist finds relevant people in your network, or a trusted path to someone one connection away.', screen: 'ask-phone', kind: 'phone', alt: 'Network Ask screen', plan: 'Pro' },
    ],
    planNote: 'Search and Relationship Priority are part of the app for every plan with notes and tags. ICP Matching, Network Ask and Network Strength are part of Pro and Team.',
    faq: [
      { q: 'What is an ICP?', a: 'An ideal customer profile: who you are looking for, described once. Linkist compares your contacts against it and shows the matches.' },
      { q: 'How does Linkist decide a relationship is cooling?', a: 'From activity: when you last met, wrote or were nudged. Relationship Health groups contacts into warming up, cooling down and cold.' },
      { q: 'Can other people see my Network Ask?', a: 'A Network Ask searches your own network and trusted paths through it. Who sees it is confirmed on the app audit and stated here plainly.' },
    ],
    hubBlurb: 'Natural-Language Search, ICP Matching, Relationship Priority and Network Ask.',
    object: 'search',
    mock: { kind: 'icp', label: 'ICP chips lighting up on matches', items: ['Fintech', 'Founder', 'Dubai', 'Series A'], count: '12 matches' },
  },
  {
    slug: 'act',
    name: 'Act',
    stage: 'Act and grow',
    title: 'Act: Top Actions, Weekly Planner, Intelligent Nudges, Warm Introductions, AI Follow-up',
    description: 'Start the day with the actions that matter, plan the week, get nudged before a follow-up slips, ask for a warm introduction and let AI draft the message.',
    headline: ['Know what ', 'to do next', '.'],
    lede: 'The day opens with your most important actions, the week has a plan, and nothing slips without a nudge.',
    heroScreen: 'proto-home',
    heroAlt: 'Home screen with a nudge to follow up with Julian from GITEX',
    chips: [
      { label: 'Every morning', value: 'Top Actions' },
      { label: 'Every week', value: 'Weekly Planner' },
      { label: 'Before it slips', value: 'A nudge' },
    ],
    tabs: [
      { key: 'top', title: 'Top Actions', body: 'The most important things to do today, on the home screen, ordered by what deserves attention.', screen: 'actions-phone', kind: 'phone', alt: 'Top Actions on the home screen', plan: 'Pro' },
      { key: 'nudges', title: 'Intelligent Nudges and Smart Signals', body: 'You met Julian at GITEX. Want to follow up? A nudge arrives before the moment passes, and signals tell you what changed.', screen: 'nudge-phone', kind: 'phone', alt: 'A nudge card', plan: 'Pro' },
      { key: 'planner', title: 'Weekly Planner', body: 'Plan the relationships and opportunities to work on this week, then tick them off.', screen: 'planner-phone', kind: 'phone', alt: 'Weekly Planner screen' },
      { key: 'intros', title: 'Warm Introductions and AI Follow-up', body: 'Ask for an introduction through someone you both know, and let Linkist draft the follow-up from the context you saved.', screen: 'intro-phone', kind: 'phone', alt: 'Warm introduction request', plan: 'Pro' },
    ],
    planNote: 'Top Actions, Intelligent Nudges, Warm Introductions, AI Follow-up, the AI voice notetaker and the deal-tracking mini-CRM are part of Pro and Team.',
    faq: [
      { q: 'Does Linkist send messages for me?', a: 'No. It drafts. You read, change and send.' },
      { q: 'How often do nudges arrive?', a: 'When something deserves attention: a follow-up you have not made, a relationship going quiet, a signal about a contact. Not on a schedule.' },
      { q: 'What is the deal-tracking mini-CRM?', a: 'A light pipeline for the opportunities behind your relationships, on Pro and Team. It is not a full sales CRM and does not try to be.' },
    ],
    hubBlurb: 'Top Actions, Weekly Planner, nudges, signals, Warm Introductions and AI Follow-up.',
    object: 'nudge',
    mock: { kind: 'day', label: 'Top Actions ticking off', items: [['Follow up with Julian', 'GITEX'], ['Reply to Sara about the intro', 'Fintech'], ['Book coffee with Omar', 'Cooling down']] },
  },
  {
    slug: 'profiles',
    name: 'Profiles and cards',
    stage: 'Capture and share',
    title: 'Profiles and cards: digital business card, personal URL, templates, sharing',
    description: 'A live digital business card with your photo, a personal URL, up to 5 profiles, templates and a branded QR code, shared by tap, QR, link, email or SMS.',
    headline: ['One live profile. ', 'Every way to share it', '.'],
    lede: 'Your digital business card updates wherever it has been shared. Add a personal URL, more profiles and your branding as you grow.',
    heroScreen: 'proto-profile',
    heroAlt: 'A public Linkist profile page',
    chips: [
      { label: 'Profiles on Pro', value: '5' },
      { label: 'Personal URL', value: 'linkist.ai/me/you' },
      { label: 'Share by', value: 'Tap, QR, link, email, SMS' },
    ],
    tabs: [
      { key: 'card', title: 'Digital business card', body: 'Photo, name, role, company and the links that matter. One template on Essential, 3 on Enhanced, full customisation on Pro.', screen: 'profile-phone', kind: 'phone', alt: 'Digital business card' },
      { key: 'url', title: 'Personal URL', body: 'A memorable address of your own under linkist.ai/me. It is on your card, in your email signature and on the QR code.', screen: 'url-phone', kind: 'phone', alt: 'Personal URL settings', plan: 'Enhanced' },
      { key: 'profiles', title: 'Several profiles', body: 'A personal profile and business profiles for the hats you wear: 1 on Essential, 3 on Enhanced, 5 on Pro. Switch which one a card shares.', screen: 'profiles-phone', kind: 'phone', alt: 'Profiles list', plan: 'Enhanced' },
      { key: 'share', title: 'Sharing and wallet', body: 'Share by NFC tap, QR code, link, email or SMS, and add the card to Apple Wallet or Google Wallet.', screen: 'share-phone', kind: 'phone', alt: 'Share Contact screen' },
    ],
    planNote: 'Essential includes the digital card, 1 profile, 1 template and QR, URL, email and SMS sharing. Enhanced adds the personal URL, unlimited fields, 3 profiles, 3 templates and a branded QR. Pro adds 5 profiles and full customisation.',
    faq: [
      { q: 'What if I change jobs?', a: 'Edit the profile once. Every card, QR code and link you have ever shared shows the new details.' },
      { q: 'Can I have a personal and a business profile?', a: 'Yes, from Enhanced: 1 personal and 2 business profiles. Pro allows 5.' },
      { q: 'Is the profile public?', a: 'The profile you share is public at its address. What it shows is up to you, field by field.' },
    ],
    hubBlurb: 'Digital business card, personal URL, several profiles, templates and sharing.',
    object: 'profile',
    mock: { kind: 'share', label: 'A profile shared to two people', front: ['Olivia Jones', 'Student of Fine Arts, NYU Abu Dhabi'], back: ['Saved by Omar K.', 'Met at Art Dubai'] },
  },
  {
    slug: 'teams',
    name: 'Teams',
    stage: 'Act and grow',
    title: 'Teams: shared contacts, admin console, company branding, team directory',
    description: 'The Team plan for companies: contact sharing across the team, a centralised admin console, company branding on every card, a team directory, and relationship history that stays with the company.',
    headline: ['Relationships that ', 'stay with the company', '.'],
    lede: 'Share contacts across the team, brand every card, and keep the relationship history when someone moves on.',
    heroScreen: 'proto-home',
    heroAlt: 'Home screen with ICP matches and Network Pulse',
    chips: [
      { label: 'Minimum', value: '5 users' },
      { label: 'Per user', value: '$4 a month' },
      { label: 'Includes', value: 'Everything in Pro' },
    ],
    tabs: [
      { key: 'shared', title: 'Shared Contacts', body: 'Contacts and their context are shared with the authorised team, so a colleague can pick up a relationship with the history in place.', screen: 'team-shared-browser', kind: 'browser', alt: 'Shared contacts in the team view', plan: 'Team' },
      { key: 'admin', title: 'Admin console', body: 'Add and remove users, manage who sees what, and keep company branding on every card from one place.', screen: 'team-admin-browser', kind: 'browser', alt: 'Admin console', plan: 'Team' },
      { key: 'directory', title: 'Team directory', body: 'Every colleague and their profiles in one directory, so the right person can be introduced fast.', screen: 'team-directory-browser', kind: 'browser', alt: 'Team directory', plan: 'Team' },
    ],
    planNote: 'The Team plan is $4 per user a month or $200 a year, with a minimum of 5 users. It includes everything in Pro for every user.',
    faq: [
      { q: 'What happens to contacts when someone leaves?', a: 'Their personal contacts stay theirs. Team-shared contacts and the relationship history remain with the authorised team.' },
      { q: 'Can we brand the cards?', a: 'Yes. Company-wide branding on cards is part of the Team plan and managed from the admin console.' },
      { q: 'Is there an Enterprise plan?', a: 'Not yet. Enterprise is interest only; single sign-on and CRM or HRMS integration are planned for it. Contact us to talk.' },
    ],
    hubBlurb: 'Shared contacts, admin console, company branding and a team directory.',
    object: 'team',
    mock: { kind: 'share', label: 'Two contact cards sliding apart, one shared with the team', front: ['Julian Baptiste', 'Nadir Fintech'], back: ['Shared with Sales', 'History kept'] },
  },
];

export const featureBySlug = (slug: string) => FEATURES.find((f) => f.slug === slug);
