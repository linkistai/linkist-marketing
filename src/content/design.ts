/**
 * Prototype-derived design previews (brief, rule 2; Grownz D23). None of these is a capture of the
 * live app, so each is shown only inside a phone frame with a "Design preview" badge until real
 * captures from prm.linkist.ai replace them (C2).
 *
 * - `v6-*`: screens of the Linkist PRM v6 prototype (linkist_prm_v6.html), captured in the dark
 *   theme by scripts/capture-v6.ts into public/screens/v6-*.png (owner, 21 September 2026, D51).
 * - `profile-*`: the owner's public-profile samples (Profile and Card Samples folder), resized by
 *   hand into public/screens/profile-*.webp. Every person shown is an example.
 */
export type ProtoScreen =
  | 'v6-home'
  | 'v6-contacts'
  | 'v6-detail'
  | 'v6-connect'
  | 'v6-cards'
  | 'v6-share'
  | 'v6-shareready'
  | 'v6-capture'
  | 'v6-scan'
  | 'v6-quickadd'
  | 'v6-enrich'
  | 'v6-icpbuilder'
  | 'v6-icpdetail'
  | 'v6-askdetail'
  | 'v6-intros'
  | 'v6-health'
  | 'v6-brief'
  | 'v6-exchanges'
  | 'v6-chat'
  | 'v6-snapshot'
  | 'v6-record'
  | 'v6-log'
  | 'profile-zayn'
  | 'profile-maya'
  | 'profile-rhea'
  | 'profile-luca'
  | 'profile-natalie'
  | 'profile-john';

export const PROTO_CAPTIONS: Record<ProtoScreen, string> = {
  'v6-home': 'Home: the network at a glance and the nudges that need action, an ICP match, a relationship going cold, a scheduled call',
  'v6-contacts': 'Contacts: search, Linkist and imported filters, network health, exchanges and the list',
  'v6-detail': 'A contact: role, company, last touch, contact information, interactions and company intelligence',
  'v6-connect': 'Connect: share your card, capture theirs, a pre-meeting brief, record and transcribe, log what happened',
  'v6-cards': 'Profiles: the business card and the profiles behind it',
  'v6-share': 'Share my card: the card, what it shows, and a personal line',
  'v6-shareready': 'Ready when you are: the QR code, WhatsApp, email and the copy link',
  'v6-capture': 'Capture their card: their Linkist QR, a paper card, or what they told you',
  'v6-scan': 'Point at their code',
  'v6-quickadd': 'Who did you meet? Six fields now, the rest whenever',
  'v6-enrich': 'Contact intelligence: what AI Enrichment will fill and what it costs',
  'v6-icpbuilder': 'ICP builder: describe who you are looking for',
  'v6-icpdetail': 'A connection profile: the ideal customer described, activated, and matched',
  'v6-askdetail': 'Network Ask: what you are looking for, posted to your network',
  'v6-intros': 'Introductions: referrals and direct requests, and who is waiting on a connector',
  'v6-health': 'Network health: profile completeness, contacts, companies, countries and where you have depth',
  'v6-brief': 'Pre-meeting brief: what you should know before you walk in',
  'v6-exchanges': 'Exchanges: the details people sent back to you',
  'v6-chat': 'Linker chat: an AI-drafted reply to accept or edit',
  'v6-snapshot': 'Intelligence snapshot: ICP and network fit, individual and company intelligence, public signals',
  'v6-record': 'Record this meeting, transcribed on device',
  'v6-log': 'Log what happened, thirty seconds, done',
  'profile-zayn': 'A public profile: Zayn Rahman, Strategy and Partnerships Director, with social links and About Me',
  'profile-maya': 'A public profile: Maya Middleton, Chief Product Officer',
  'profile-rhea': 'A public profile: Rhea Desai, Head of Strategic Partnerships, with social links and About Me',
  'profile-luca': 'A public profile: Luca Mercer, Partnerships and Experiences Director',
  'profile-natalie': 'A public profile: Natalie Vale, a business student',
  'profile-john': 'A public profile: John Jameson, Marketing Specialist',
};

export const PROTO_ALT: Record<ProtoScreen, string> = Object.fromEntries(Object.entries(PROTO_CAPTIONS).map(([k, v]) => [k, `Design preview. ${v}`])) as Record<ProtoScreen, string>;

export const DESIGN_NOTE = 'Design preview from the approved prototype. Layout, copy and figures can change before the screens ship; every figure shown is an example.';
