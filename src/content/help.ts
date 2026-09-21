/**
 * Help centre corpus (brief 4, checkpoint 5). Every answer is one to three sentences and traces
 * to a source: the product's public screens and store (walked through on 10 September 2026,
 * docs/01-audit.md), the Linkist Terms and Privacy (version 1.0, effective 7 September 2026; T is Part 1, P is Part 2), the
 * prototype's plan comparison, or the owner's instructions (D15). Where the signed-in app has
 * not been seen yet (C2) the answer says what is confirmed and what is not. The Limits category
 * states the known gaps of section 3.9 plainly. British English, no em dashes, digits for numbers.
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

const PRIVACY = { label: 'Privacy (Part 2)', href: '/legal/privacy' };
const TERMS = { label: 'Terms and Privacy', href: '/legal/terms' };

export const HELP: readonly HelpEntry[] = [
  // Getting started
  e('Getting started', 'How do I create an account?', 'Press Create Free Profile or Get the App. The PRM app opens its quick-profile page at prm.linkist.ai/quick-profile, where the free profile and the account that goes with it are created. Sign in afterwards at prm.linkist.ai/UnifiedAuth with your email or mobile number.', [{ label: 'Get the App', href: '/start' }]),
  e('Getting started', 'Do I need a password?', 'No. The sign-in screens ask for your email address or mobile number and send a one-time code that expires. There is no password to remember or leak.'),
  e('Getting started', 'Where do I sign in?', 'The PRM app signs in at prm.linkist.ai/UnifiedAuth, which is where Sign in leads. Get NFC Card opens the store at prm.linkist.ai/store/start.', [{ label: 'Get NFC Card', href: '/get-card' }]),
  e('Getting started', 'Should I use my email or my mobile number?', 'Either works. The card product’s sign-in screen suggests email for people outside the UAE and India, because the code arrives more smoothly by email there.'),
  e('Getting started', 'Do I need a card to start?', 'No. The Essential plan is free and needs no NFC card. You can add a card any time.', [{ label: 'Pricing', href: '/pricing' }]),
  e('Getting started', 'Is Linkist free?', 'The Essential plan is free for as long as you like. Enhanced, Pro and Team are paid, and every NFC card includes PRM Essential.', [{ label: 'Compare PRM plans', href: '/pricing#compare' }]),
  e('Getting started', 'What is a Personal Relationship Manager?', 'A PRM organises relationships rather than deals. Your contacts, meeting context, priorities and follow-ups live in one place, focused on who matters and what deserves action.', [{ label: 'How it works', href: '/how-it-works' }]),
  e('Getting started', 'How is Linkist different from a contact app or a CRM?', 'Contact apps store people and CRMs manage deals. Linkist helps you manage relationships: who matters, who fits what you are looking for, and what to do next.'),
  e('Getting started', 'What are the three stages?', 'Capture and share, Build relationships, Act and grow. Capture the people you meet, find the ones worth your attention, then know what to do next.', [{ label: 'How it works', href: '/how-it-works' }]),
  e('Getting started', 'Is there an iPhone or Android app?', 'Linkist is a web app that lives on your phone. The product says native apps for the App Store and Google Play are in final preparation; this answer changes the day they are listed.'),
  e('Getting started', 'Do I have to be 18?', 'Yes. The terms require users to be at least 18 (T 3), and the sign-in screen asks you to confirm it.', [TERMS]),
  e('Getting started', 'Can I use Linkist on behalf of my company?', 'Yes. On the Teams plan the person who buys Teams agrees to the terms for the company and confirms they are allowed to, and the company is then responsible for everyone it adds (T 13.1). Linkist Enterprise is sold under a separate signed agreement (T 1).', [TERMS]),

  // Capture
  e('Capture', 'How do I add a contact?', 'Through an NFC tap, a QR code, a business-card scan, your phone contacts, a CSV or VCF file, or by typing it in.', [{ label: 'Capture', href: '/features/capture' }]),
  e('Capture', 'What does the card scan do?', 'It reads a paper business card with the camera and turns it into a contact record. Essential includes 5 scans a month, Enhanced 20, Pro and Team unlimited.'),
  e('Capture', 'Can I import my existing contacts?', 'Yes. Import from your phone address book or from a CSV or VCF export of another tool. Importing is optional and you confirm you have the right to bring those contacts in.', [PRIVACY]),
  e('Capture', 'What can I save with a contact?', 'The document lists contacts you save, scan or import, where you met, and your notes, reminders and tags (P 2). Photos of scanned business cards are deleted after 30 days unless you keep them with the contact.', [PRIVACY]),
  e('Capture', 'What are voice notes for?', 'Recording where you met and what mattered while it is fresh, so the context is saved with the contact.'),
  e('Capture', 'What is AI Enrichment?', 'It fills in missing professional details on an incomplete record from public or professional sources, where you have enabled it. Part of Pro and Team.', [{ label: 'AI and your data', href: '/ai' }]),
  e('Capture', 'Does the other person need Linkist to give me their details?', 'No. When someone taps your card or scans your code they see your live profile and can send their own details; if they use Linkist too, the meeting is captured on both sides.'),
  e('Capture', 'Can I export my contacts?', 'The plan comparison lists export from Enhanced upwards. Separately, the document gives every user the right to see and download their data (P 11), and to download it before closing the account (T 15).', [{ label: 'Security', href: '/security' }]),

  // Profiles and cards
  e('Profiles and cards', 'What is a digital business card?', 'A live profile with your photo and details that you share by QR code, link, email or SMS. Every plan includes one, and it updates wherever it has been shared.', [{ label: 'Profiles and cards', href: '/features/profiles' }]),
  e('Profiles and cards', 'What can my profile show?', 'Job title, company, department or role, a biography, a photograph, a company logo, website links, your LinkedIn address and other professional or social links you choose to add.', [PRIVACY]),
  e('Profiles and cards', 'How many profiles can I have?', 'Essential has 1 personal profile. Enhanced has 3 (1 personal, 2 business). Pro has 5. Team gives each user 5.'),
  e('Profiles and cards', 'Can I get a personal URL?', 'Yes, on Enhanced and above. The public profile address takes the form linkist.ai/me/yourname.'),
  e('Profiles and cards', 'Is my profile public?', 'Anyone with your link, QR code or card can see the parts of your profile you make public; you choose what is public (T 11). You are responsible for making your profile accurate and lawful (T 5).', [TERMS]),
  e('Profiles and cards', 'Can I change my profile after my card is printed?', 'Yes. The card points at your live profile, so edits appear the next time anyone taps or scans it. Nothing needs reprinting.'),
  e('Profiles and cards', 'What is a lead capture form?', 'A form on your profile where a visitor leaves their details for you. The plan comparison lists it from Enhanced upwards.'),
  e('Profiles and cards', 'What is a branded QR?', 'A QR code styled with your branding that opens your profile. Listed from Enhanced upwards, with 3 card templates.'),
  e('Profiles and cards', 'Can I add my card to Apple Wallet or Google Wallet?', 'The plan comparison lists wallet passes on every plan. The exact steps are confirmed during the app audit.'),

  // Find
  e('Find', 'What is Natural-Language Search?', 'Search your network with what you remember, in normal words, rather than an exact name. For example, the fintech founder you met at GITEX.', [{ label: 'Find', href: '/features/find' }]),
  e('Find', 'What is an ICP?', 'An ideal customer profile: a description of who you are looking for. ICP Matching shows which contacts fit it and, on the home screen, how many matches were found. Part of Pro and Team.'),
  e('Find', 'Where does ICP Matching get its information?', 'From the profile data, contact details, notes and history you keep in Linkist, plus enrichment from public or professional sources where you have enabled it. It is an optional AI feature with its own consent.', [{ label: 'AI and your data', href: '/ai' }]),
  e('Find', 'What is Network Ask?', 'Post what you need and Linkist finds relevant people in your network, or a trusted path to someone one connection away. Part of Pro and Team.'),
  e('Find', 'What does Relationship Priority show?', 'Which relationships are warming up, cooling down or cold, so you know who needs attention.'),
  e('Find', 'What are Network Pulse and Opportunity Radar?', 'Two panels on the home screen in the approved design: Network Pulse reads the health of your network as a whole and Opportunity Radar surfaces people and moments worth acting on. Both are confirmed against the app during the audit.'),
  e('Find', 'What is Network Strength?', 'A read of how strong your network is overall, listed in the product’s capabilities. One of the scores the optional AI features produce (T 9, P 2).'),

  // Act
  e('Act', 'What are Top Actions?', 'The most important things to do today, listed when you open Linkist. Part of Pro and Team.', [{ label: 'Act', href: '/features/act' }]),
  e('Act', 'What is the Weekly Planner?', 'A view for planning the relationships and opportunities you want to move this week, so follow-ups are scheduled rather than remembered.'),
  e('Act', 'What is a nudge?', 'A timely prompt before a follow-up slips, such as a reminder that you met someone at an event and have not followed up.'),
  e('Act', 'What are Smart Signals?', 'Changes that deserve a reaction, noticed for you: the follow-ups the optional AI features suggest (T 9). Every suggestion shows how confident it is and why (P 6).', [{ label: 'AI and your data', href: '/ai' }]),
  e('Act', 'What is a warm introduction?', 'An introduction through someone you both know, found by Linkist when the person you need is one connection away.'),
  e('Act', 'Can Linkist draft my follow-up?', 'Yes. AI Follow-up drafts a message from the context you saved. You review and send it; Linkist never sends on your behalf.'),
  e('Act', 'Can I turn notifications off?', 'Yes. Each optional use is asked for separately and can be changed at any time in Settings, Privacy (P 5). Service messages such as codes, order and security notices still arrive because the service needs them (P 3).', [PRIVACY]),

  // Teams
  e('Teams', 'What does the Team plan add?', 'Everything in Pro for every user, contact sharing across the team, a centralised admin console, company branding on cards and a team directory. Minimum 5 users.', [{ label: 'Teams', href: '/teams' }]),
  e('Teams', 'What happens to contacts when someone leaves?', 'Personal contacts stay with the person. Team-shared contacts and their relationship history remain with the authorised team, so relationship value stays inside the company.'),
  e('Teams', 'Who manages a team?', 'An administrator, through the centralised admin console listed in the plan comparison: members, shared contacts and company branding on every card.'),
  e('Teams', 'Can a team member keep private contacts?', 'Yes. Sharing is per contact, so personal relationships stay personal and only shared contacts are visible to the team.'),
  e('Teams', 'How is a team billed?', '$5 per user a month with a minimum of 5 users: $25 a month or $300 a year for 5 users (AED 100 or AED 1,000), then $5 a month or $60 a year for each additional user.', [{ label: 'Pricing', href: '/pricing' }]),

  // Plans and billing
  e('Plans and billing', 'What do the plans cost?', 'Essential is free. Enhanced is $2 a month, $12 a year or $25 for life. Pro is $10 a month or $100 a year. Team is $5 per user a month with a minimum of 5 users: $25 a month or $300 a year for 5 users, then $5 a month or $60 a year for each additional user.', [{ label: 'Pricing', href: '/pricing' }]),
  e('Plans and billing', 'Which plan has ICP Matching?', 'Pro and Team. Enhanced adds profiles, templates and lead capture; Pro adds the AI and relationship intelligence features.'),
  e('Plans and billing', 'Is there an Enterprise plan?', 'Not yet. Enterprise is coming later and is interest only today. Single sign-on and CRM or HRMS integration are listed for it.'),
  e('Plans and billing', 'Which currency am I billed in?', 'The store prices the cards in AED and shows an approximate US dollar figure beside each one. The terms say prices are shown on the Pricing page and at checkout, with taxes added where they apply (T 12), so check the currency at checkout.', [TERMS]),
  e('Plans and billing', 'Where do I manage my subscription?', 'In the billing hub at prm.linkist.ai, which handles plans, AI credit top-ups, invoices and card orders.'),
  e('Plans and billing', 'Do subscriptions renew automatically?', 'Unless stated otherwise at checkout, paid subscriptions renew until you cancel. Cancel before the renewal date if you do not want the next period.', [TERMS]),
  e('Plans and billing', 'Can the price of my plan change?', 'Yes, with at least 30 days’ notice; a price increase applies from your next renewal (T 12). Yearly plans get a renewal reminder at least 30 days before.', [TERMS]),
  e('Plans and billing', 'Who processes payments?', 'Third-party payment providers such as Stripe. Linkist does not store full card numbers.', [PRIVACY]),
  e('Plans and billing', 'What are AI credits?', 'Some AI actions draw on credits, sold as top-ups in the billing hub. What one credit buys is not published yet; the app shows the figure when you buy.', [{ label: 'AI and your data', href: '/ai' }]),
  e('Plans and billing', 'Where are my invoices?', 'In the billing hub at prm.linkist.ai. The document keeps payments and invoices as long as tax and accounting law requires (P 10).'),

  // NFC cards and shipping
  e('NFC cards and shipping', 'Which NFC cards are there?', 'Starter, with no customisation, at AED 75 in PVC, AED 95 in cherry wood or AED 195 in brushed metal, about $20, $26 and $53. Signature, with your name and logo, at AED 95, 115 or 225, about $26, $31 and $61. Every card includes PRM Essential.', [{ label: 'NFC cards', href: '/nfc-cards' }]),
  e('NFC cards and shipping', 'Which materials, colours and patterns?', 'PVC in white or black with four patterns (Minimal, Geometric, Wave and Crystal), cherry wood, and brushed metal in silver or black with the same four patterns.'),
  e('NFC cards and shipping', 'What is printed on a Signature NFC card?', 'Your name and logo. You are responsible for the names, titles and logos printed on your card and for checking the proof before printing (T 14). Orders can be changed or cancelled within 24 hours; after printing starts it may not be possible.', [TERMS]),
  e('NFC cards and shipping', 'What does a tap do?', 'The NFC card opens your live profile on the other person’s phone. They save your details and, if they use Linkist, you keep the context of the meeting too.'),
  e('NFC cards and shipping', 'Does the NFC card work with every phone?', 'It needs a phone with NFC switched on. The terms do not promise that NFC will work on every phone, and Linkist is not responsible for wear, bending, heat, phone cases or phones that cannot read NFC (T 14, 16). Cards can also carry a QR code as a fallback.', [TERMS]),
  e('NFC cards and shipping', 'Where does Linkist ship?', 'Within the United Arab Emirates, with shipping included. Other countries are not served yet.'),
  e('NFC cards and shipping', 'How long does delivery take?', 'Delivery times are shown in the store at checkout and are not published here. Custom NFC cards are made to order.'),
  e('NFC cards and shipping', 'Is shipping included?', 'Yes. NFC cards ship within the UAE with shipping included. Other countries are not served yet.'),
  e('NFC cards and shipping', 'Can I change or cancel an order?', 'Ask within 24 hours of ordering. Because cards are custom made, a change is not guaranteed once production has started.', [TERMS]),
  e('NFC cards and shipping', 'Can I return an NFC card?', 'Custom products are returnable where the product is defective, there was a production error, or it differs materially from the confirmed order. Contact support within 7 days of delivery; approved refunds usually take 5 to 10 business days.', [TERMS]),
  e('NFC cards and shipping', 'Can I use an NFC card or sticker I already own?', 'Yes, free. At nfctools.linkist.ai, tap the card or sticker on your phone and Linkist writes your live profile onto it. Encoding a chip needs an Android phone; the profile then works on every device.'),
  e('NFC cards and shipping', 'What are the bundles?', 'The Signature Bundle is any Signature NFC card plus 1 year of Pro for $100. The Founders Circle Bundle is the Founders Circle NFC card plus lifetime Pro for $150, one time.', [{ label: 'Bundles', href: '/bundles' }]),
  e('NFC cards and shipping', 'What is the Founders Circle?', 'A limited early-supporter offer described on linkist.ai: an NFC card, a Founders Circle badge, lifetime Pro and early-member perks. Whether it is still open is confirmed with the team; the bundle page says so when it closes.'),

  // AI and data
  e('AI and data', 'What does the AI do?', 'It enriches incomplete records, matches contacts against your ICPs, scores relationships and your network, notices Smart Signals, suggests introductions, drafts follow-ups and summarises contacts. It suggests; you decide.', [{ label: 'AI and your data', href: '/ai' }]),
  e('AI and data', 'Do I have to use the AI features?', 'No. AI features are off until you switch them on, and you can switch them off at any time (T 9, P 5). Linkist works as a relationship manager without them.', [PRIVACY]),
  e('AI and data', 'How do I switch the AI off?', 'In Privacy Settings in your account, or by writing to privacy@linkist.ai. Withdrawing consent does not undo processing that already happened.'),
  e('AI and data', 'What does the AI read?', 'Profile data, contact details, your notes, connection history, interaction context and professional information, plus public or professional sources for enrichment where enabled and lawful.', [PRIVACY]),
  e('AI and data', 'Can the AI be wrong?', 'Yes. The terms say AI can be wrong: check suggestions before you rely on them, and a message drafted by AI becomes your message when you send it (T 9). Every result shows how confident it is and why (P 6).'),
  e('AI and data', 'Does the AI decide anything for me?', 'No. Results are suggestions, scores and summaries you check first, and the document says Linkist does not use AI to make decisions that seriously affect people (P 6).'),
  e('AI and data', 'How long are AI results kept?', 'AI enrichment outputs are kept for up to 6 months or until you delete your account, unless refreshed, deleted or legally retained.', [PRIVACY]),
  e('AI and data', 'Which AI model does Linkist use?', 'Not published. The document lists AI among the service-provider categories and points to a providers list at linkist.ai/legal/providers, which is not published yet (P 8). Ask privacy@linkist.ai.'),
  e('AI and data', 'What happens to the contacts I import?', 'You decide how they are used, and you must have a fair and lawful reason to keep them (T 7). Linkist stores and protects them, never sells them, and never sends them marketing or automatic invitations (T 5, 11; P 7).', [PRIVACY]),
  e('AI and data', 'Can someone in my contacts object?', 'Yes. Anyone whose details were saved can email privacy@linkist.ai to learn what AI information was added about them, have it deleted or corrected, ask that no more is added, or have the request passed to you (P 7).'),
  e('AI and data', 'Does Linkist sell my data?', 'No. The document says Linkist never sells personal data; it is shared only with the service providers that run Linkist, who may use it only for that, and with your company on Teams, apps you connect, and authorities where the law requires (P 8).', [PRIVACY]),

  // Security
  e('Security', 'Where is my data held?', 'The document names encryption, access controls, secure login, activity logs and monitoring (P 12), and says service providers may be in other countries, with data protection agreements and encryption when data moves (P 9). The hosting provider and region are not published yet.', [{ label: 'Security', href: '/security' }]),
  e('Security', 'Which law applies to my data?', 'The terms are governed by the laws of the United Arab Emirates as applied in Dubai, and a consumer keeps the protection of the mandatory laws of the country where they live (T 19). Where the law of your country gives you more protection, you have it (Part 2). RatioX Labs DWC-LLC runs Linkist and is responsible for your account, login, billing and security records (P 1).'),
  e('Security', 'Who do I contact about privacy?', 'privacy@linkist.ai for requests and questions, and dpo@linkist.ai for the Data Protection Officer (P 16). Linkist may need to confirm who you are and replies within 30 days, or sooner if your local law requires (P 11).'),
  e('Security', 'How is my account protected?', 'Sign-in uses a one-time code sent to your email or mobile number, so there is no password to steal. The document names encryption, access controls, secure login, activity logs and monitoring, and asks you to keep your login safe (P 12).', [PRIVACY]),
  e('Security', 'Can I see, correct or export my data?', 'Yes. You can ask to see, download, correct or delete your data, in Settings, Privacy or at privacy@linkist.ai (P 11).'),
  e('Security', 'How do I delete my account?', 'Close your account at any time in Settings, after downloading your data if you want it (T 15). Your account, profile and contacts are kept while the account is open, then up to 30 days; payments and invoices stay as long as tax and accounting law requires (P 10).'),
  e('Security', 'Can I object to profiling?', 'Yes. You can object to automated profiling and switch the optional AI features off in Privacy Settings, or by writing to privacy@linkist.ai.'),
  e('Security', 'What happens if there is a data breach?', 'The document says a breach is contained quickly and the authorities and the people affected are told where the law requires (P 14). A company on Teams is told within 48 hours of a breach affecting team contacts (T 13.7).'),
  e('Security', 'How long are logs kept?', 'Security and audit logs are usually kept up to 12 months and troubleshooting logs up to 90 days, unless an investigation or a legal matter needs them longer.'),
  e('Security', 'How do I report a security problem?', 'Write to support@linkist.ai. A dedicated security address will be published on the security page when it exists.'),

  // Troubleshooting
  e('Troubleshooting', 'My card taps but nothing opens.', 'Make sure NFC is on and hold the NFC card near the top of the phone for a second. Some cases block NFC. If it still fails, email support@linkist.ai with your phone model.'),
  e('Troubleshooting', 'I did not receive the sign-in code.', 'Check the address or number you typed, then your spam folder, and wait a minute before asking for another. Outside the UAE and India, email is the smoother route for the code.'),
  e('Troubleshooting', 'My profile shows old details.', 'Edit the profile in the app; the NFC card and QR point at the live version, so the change appears on the next tap or scan. Ask the other person to refresh if their browser kept an old copy.'),
  e('Troubleshooting', 'The card scan read a field wrongly.', 'Correct the field before saving; the scan fills the fields and you have the last word. Good light and a flat card help.'),
  e('Troubleshooting', 'I cannot find a contact I know I saved.', 'Search with what you remember, such as the event or the company, rather than the exact name. Natural-Language Search is built for that.'),
  e('Troubleshooting', 'A card I brought myself opens someone else’s profile.', 'The chip still carries its old link. Encode it again through the bring-your-own route with an Android phone and it will open your Linkist profile.'),
  e('Troubleshooting', 'The site assistant did not answer my question.', 'It is automated and answers only from this help centre and the product facts; it says so when it does not know. Email support@linkist.ai for anything else.'),
  e('Troubleshooting', 'Which browsers work?', 'Linkist is a web app, so any current browser on a phone or a computer works. The billing hub is a normal website.'),

  // Limits and roadmap
  e('Limits and roadmap', 'Are there store apps?', 'Not linked from the product today. Linkist is a web app on your phone until the listings are live; the product says native apps are in final preparation.'),
  e('Limits and roadmap', 'Is Enterprise available?', 'No. It is interest only. Contact us if you want to talk about it.'),
  e('Limits and roadmap', 'Are there integrations or an API?', 'Not today. CRM and HRMS integration and single sign-on are listed for the future Enterprise plan.'),
  e('Limits and roadmap', 'Is Linkist GDPR or SOC 2 certified?', 'This site does not claim either. The Terms and Privacy state the security measures and say no system is perfectly secure (P 12); certifications appear here only with evidence.'),
  e('Limits and roadmap', 'Are there customer case studies?', 'Not yet. Linkist names customers only with their written consent.'),
  e('Limits and roadmap', 'Is Linkist available in other languages?', 'The product and this site are in English. Other languages are not announced.'),
  e('Limits and roadmap', 'Which model powers the AI, and what does a credit cost?', 'Neither is published yet. The AI page lists both as open questions and will say when they are answered.', [{ label: 'AI and your data', href: '/ai' }]),
  e('Limits and roadmap', 'What does this help centre not cover yet?', 'The signed-in app screen by screen. Answers about exact steps inside the app are confirmed during the app audit, and each one says so until then.'),
];
