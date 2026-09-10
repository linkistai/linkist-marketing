/**
 * Help centre corpus. Checkpoint 3 ships the starter set written from the prototype, the public
 * pages and the app's sign-in screen; checkpoint 5 grows it to 80 to 120 entries from the
 * audited app. Every answer is one to three sentences. The Limits category states the known
 * gaps of section 3.9 plainly. British English, no em dashes, digits for numbers.
 */
export interface HelpEntry {
  readonly id: string;
  readonly category: HelpCategory;
  readonly q: string;
  readonly a: string;
  readonly links?: readonly { label: string; href: string }[];
}

export const HELP_CATEGORIES = [
  'Getting started',
  'Capture',
  'Profiles and cards',
  'Find',
  'Act',
  'Teams',
  'Plans and billing',
  'NFC cards and shipping',
  'AI and data',
  'Security',
  'Troubleshooting',
  'Limits and roadmap',
] as const;
export type HelpCategory = (typeof HELP_CATEGORIES)[number];

const e = (category: HelpCategory, q: string, a: string, links?: readonly { label: string; href: string }[]): HelpEntry => ({
  id: q
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60),
  category,
  q,
  a,
  links,
});

export const HELP: readonly HelpEntry[] = [
  // Getting started
  e('Getting started', 'How do I create an account?', 'Open the app at prm.linkist.ai, enter your email or mobile number, accept the terms and confirm you are 18 or older, then press Continue. Signing in and creating an account are the same screen.', [{ label: 'Start free', href: '/start' }]),
  e('Getting started', 'Do I need a password?', 'The sign-in screen asks for your email or mobile number and a Continue button. The step after that is confirmed during the app audit and this answer will say exactly what it is.'),
  e('Getting started', 'Do I need a card to start?', 'No. The Essential plan is free and needs no NFC card. You can add a card any time.', [{ label: 'Pricing', href: '/pricing' }]),
  e('Getting started', 'What is a Personal Relationship Manager?', 'A PRM organises relationships rather than deals. Your contacts, meeting context, priorities and follow-ups live in one place, focused on who matters and what deserves action.', [{ label: 'How it works', href: '/how-it-works' }]),
  e('Getting started', 'How is Linkist different from a contact app or a CRM?', 'Contact apps store people and CRMs manage deals. Linkist helps you manage relationships: who matters, who fits what you are looking for, and what to do next.'),
  e('Getting started', 'What are the three stages?', 'Capture and share, Build relationships, Act and grow. Capture the people you meet, find the ones worth your attention, then know what to do next.', [{ label: 'How it works', href: '/how-it-works' }]),
  e('Getting started', 'Is there an iPhone or Android app?', 'Linkist is a web app at prm.linkist.ai that lives on your phone. Store listings are not linked from the product today; this answer changes the day they are.'),

  // Capture
  e('Capture', 'How do I add a contact?', 'Through an NFC tap, a QR code, a business-card scan, your phone contacts, a CSV or VCF file, or by typing it in.', [{ label: 'Capture', href: '/features/capture' }]),
  e('Capture', 'What does the card scan do?', 'It reads a paper business card with the camera and turns it into a contact record. Essential includes 5 scans a month, Enhanced 20, Pro and Team unlimited.'),
  e('Capture', 'Can I import my existing contacts?', 'Yes. Import from your phone address book or from a CSV or VCF export of another tool.'),
  e('Capture', 'What are voice notes for?', 'Recording where you met and what mattered while it is fresh, so the context is saved with the contact.'),
  e('Capture', 'What is AI Enrichment?', 'It fills in missing professional details on an incomplete record. Part of Pro and Team.', [{ label: 'AI', href: '/features/capture' }]),

  // Profiles and cards
  e('Profiles and cards', 'What is a digital business card?', 'A live profile with your photo and details that you share by QR code, link, email or SMS. Every plan includes one, and it updates wherever it has been shared.', [{ label: 'Profiles and cards', href: '/features/profiles' }]),
  e('Profiles and cards', 'How many profiles can I have?', 'Essential has 1 personal profile. Enhanced has 3 (1 personal, 2 business). Pro has 5. Team gives each user 5.'),
  e('Profiles and cards', 'Can I get a personal URL?', 'Yes, on Enhanced and above. The public profile address takes the form linkist.ai/me/yourname.'),
  e('Profiles and cards', 'Can I add my card to Apple Wallet or Google Wallet?', 'The plan comparison lists wallet passes on every plan. The exact steps are confirmed during the app audit.'),

  // Find
  e('Find', 'What is Natural-Language Search?', 'Search your network with what you remember, in normal words, rather than an exact name. For example, the fintech founder you met at GITEX.', [{ label: 'Find', href: '/features/find' }]),
  e('Find', 'What is an ICP?', 'An ideal customer profile: a description of who you are looking for. ICP Matching shows which contacts fit it and, on the home screen, how many matches were found. Part of Pro and Team.'),
  e('Find', 'What is Network Ask?', 'Post what you need and Linkist finds relevant people in your network, or a trusted path to someone one connection away. Part of Pro and Team.'),
  e('Find', 'What does Relationship Priority show?', 'Which relationships are warming up, cooling down or cold, so you know who needs attention.'),

  // Act
  e('Act', 'What are Top Actions?', 'The most important things to do today, listed when you open Linkist. Part of Pro and Team.', [{ label: 'Act', href: '/features/act' }]),
  e('Act', 'What is a nudge?', 'A timely prompt before a follow-up slips, such as a reminder that you met someone at an event and have not followed up.'),
  e('Act', 'What is a warm introduction?', 'An introduction through someone you both know, found by Linkist when the person you need is one connection away.'),
  e('Act', 'Can Linkist draft my follow-up?', 'Yes. AI Follow-up drafts a message from the context you saved. You review and send it.'),

  // Teams
  e('Teams', 'What does the Team plan add?', 'Everything in Pro for every user, contact sharing across the team, a centralised admin console, company branding on cards and a team directory. Minimum 5 users.', [{ label: 'Teams', href: '/teams' }]),
  e('Teams', 'What happens to contacts when someone leaves?', 'Personal contacts stay with the person. Team-shared contacts and their relationship history remain with the authorised team, so relationship value stays inside the company.'),

  // Plans and billing
  e('Plans and billing', 'What do the plans cost?', 'Essential is free. Enhanced is $2 a month, $12 a year or $25 for life. Pro is $10 a month or $100 a year. Team is $4 per user a month or $200 a year, with a minimum of 5 users.', [{ label: 'Pricing', href: '/pricing' }]),
  e('Plans and billing', 'Which plan has ICP matching?', 'Pro and Team. Enhanced adds profiles, templates and lead capture; Pro adds the AI and relationship intelligence features.'),
  e('Plans and billing', 'Is there an Enterprise plan?', 'Not yet. Enterprise is coming later and is interest only today. Single sign-on and CRM or HRMS integration are listed for it.'),
  e('Plans and billing', 'Which currency am I billed in?', 'The store prices the cards in AED and shows an approximate US dollar figure beside each one. Plan prices are listed in US dollars. VAT is shown upfront at checkout.'),

  // NFC cards and shipping
  e('NFC cards and shipping', 'Which NFC cards are there?', 'Starter, with no customisation, at AED 75 in PVC, AED 95 in cherry wood or AED 195 in brushed metal, about $20, $26 and $53. Signature, with your name and logo, at AED 95, 115 or 225, about $26, $31 and $61. PVC and metal come in white or black with four patterns. Every card includes PRM Essential.', [{ label: 'NFC cards', href: '/nfc-cards' }]),
  e('NFC cards and shipping', 'Where does Linkist ship?', 'The store lists 16 shipping regions: the UAE, Saudi Arabia, Bahrain, Kuwait, Oman, Qatar, India, the United Kingdom, the United States, Canada, Australia, Pakistan, the Philippines, Egypt, Jordan and Lebanon. Shipping is included in the UAE; elsewhere the cost is shown at checkout.'),
  e('NFC cards and shipping', 'Can I use an NFC card or sticker I already own?', 'Yes, free. The store has a bring-your-own route: tap the card or sticker on your phone and Linkist writes your live profile onto it, or paste an existing profile link and your Linkist profile builds itself. Encoding a chip needs an Android phone; the profile then works on every device.'),
  e('NFC cards and shipping', 'What does a tap do?', 'The card opens your live profile on the other person’s phone. They save your details and, if they use Linkist, you keep the context of the meeting too.'),
  e('NFC cards and shipping', 'Is shipping included?', 'Card shipping is included in the UAE. Shipping to other countries is confirmed at checkout.'),
  e('NFC cards and shipping', 'Can I return a card?', 'Custom products are returnable where the product is defective, there was a production error, or it differs materially from the confirmed order. Contact support within 7 days of delivery.', [{ label: 'Terms', href: 'https://linkist.ai/terms' }]),
  e('NFC cards and shipping', 'What are the bundles?', 'The Signature Bundle is any Signature card plus 1 year of Pro for $100. The Founders Circle Bundle is the Founders Circle card plus lifetime Pro for $150, one time.', [{ label: 'Bundles', href: '/bundles' }]),

  // AI and data
  e('AI and data', 'What does the AI do?', 'It enriches incomplete records, matches contacts against your ICPs, scores leads, drafts follow-ups and transcribes voice notes. It suggests; you decide.'),
  e('AI and data', 'Can the AI be wrong?', 'Yes. AI outputs are generated from available data and can be inaccurate or out of date. Review them before you act, as the terms say.'),
  e('AI and data', 'What happens to the contacts I import?', 'They are stored for you and not sold. Linkist does not send marketing to imported contacts unless they opt in themselves, as the privacy policy sets out.', [{ label: 'Privacy policy', href: 'https://linkist.ai/privacy' }]),

  // Security
  e('Security', 'Where is my data held?', 'The privacy policy states encryption in transit and at rest and that some service providers may be outside the UAE. Named regions are confirmed for the security page.'),
  e('Security', 'Which law applies to my data?', 'The privacy policy is written under the UAE Personal Data Protection Law, Federal Decree-Law No. 45 of 2021. RatioX Labs DWC-LLC is the company behind Linkist.'),
  e('Security', 'How do I delete my account?', 'Request deletion through the app, the website or by emailing privacy@linkist.ai. Account data is kept for up to 30 days after deletion.'),

  // Troubleshooting
  e('Troubleshooting', 'My card taps but nothing opens.', 'Make sure NFC is on and hold the card near the top of the phone for a second. Some cases block NFC. If it still fails, email support@linkist.ai with your phone model.'),
  e('Troubleshooting', 'I did not receive the sign-in message.', 'Check the address or number you typed, then your spam folder. Wait a minute before asking for another.'),

  // Limits and roadmap
  e('Limits and roadmap', 'Are there store apps?', 'Not linked from the product today. Linkist is a web app on your phone until the listings are live.'),
  e('Limits and roadmap', 'Is Enterprise available?', 'No. It is interest only. Contact us if you want to talk about it.'),
  e('Limits and roadmap', 'Is Linkist GDPR or SOC 2 certified?', 'This site does not claim either. Linkist publishes a privacy policy under the UAE data protection law and states its security measures there; certifications appear here only with evidence.'),
  e('Limits and roadmap', 'Are there customer case studies?', 'Not yet. Linkist names customers only with their written consent.'),
];
