/**
 * Help centre corpus (brief 4, checkpoint 5). Every answer is one to three sentences and traces
 * to a source: the product's public screens and store (walked through on 10 September 2026,
 * docs/01-audit.md), the privacy policy and terms of service (version 1.1, 1 June 2026), the
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

const PRIVACY = { label: 'Privacy policy', href: 'https://www.linkist.ai/privacy' };
const TERMS = { label: 'Terms of service', href: 'https://www.linkist.ai/terms' };

export const HELP: readonly HelpEntry[] = [
  // Getting started
  e('Getting started', 'How do I create an account?', 'Press Get the App. The PRM app opens its unified screen at prm.linkist.ai/UnifiedAuth: enter your email or mobile number, accept the terms, confirm you are 18 or older and press Continue. Signing in and creating an account are the same screen.', [{ label: 'Get the App', href: '/start' }]),
  e('Getting started', 'Do I need a password?', 'No. The sign-in screens ask for your email address or mobile number and send a one-time code that expires. There is no password to remember or leak.'),
  e('Getting started', 'Where do I sign in?', 'The PRM app signs in at prm.linkist.ai/UnifiedAuth, which is where Get the App and Sign in lead. The NFC card product has its own sign-in at m.linkist.ai/login, which is where Get NFC Card leads.', [{ label: 'Get NFC Card', href: '/get-card' }]),
  e('Getting started', 'Should I use my email or my mobile number?', 'Either works. The card product’s sign-in screen suggests email for people outside the UAE and India, because the code arrives more smoothly by email there.'),
  e('Getting started', 'Do I need a card to start?', 'No. The Essential plan is free and needs no NFC card. You can add a card any time.', [{ label: 'Pricing', href: '/pricing' }]),
  e('Getting started', 'Is Linkist free?', 'The Essential plan is free for as long as you like. Enhanced, Pro and Team are paid, and every NFC card includes PRM Essential.', [{ label: 'Compare PRM plans', href: '/pricing#compare' }]),
  e('Getting started', 'What is a Personal Relationship Manager?', 'A PRM organises relationships rather than deals. Your contacts, meeting context, priorities and follow-ups live in one place, focused on who matters and what deserves action.', [{ label: 'How it works', href: '/how-it-works' }]),
  e('Getting started', 'How is Linkist different from a contact app or a CRM?', 'Contact apps store people and CRMs manage deals. Linkist helps you manage relationships: who matters, who fits what you are looking for, and what to do next.'),
  e('Getting started', 'What are the three stages?', 'Capture and share, Build relationships, Act and grow. Capture the people you meet, find the ones worth your attention, then know what to do next.', [{ label: 'How it works', href: '/how-it-works' }]),
  e('Getting started', 'Is there an iPhone or Android app?', 'Linkist is a web app that lives on your phone. The product says native apps for the App Store and Google Play are in final preparation; this answer changes the day they are listed.'),
  e('Getting started', 'Do I have to be 18?', 'Yes. The terms of service require users to be at least 18, and the sign-in screen asks you to confirm it.', [TERMS]),
  e('Getting started', 'Can I use Linkist on behalf of my company?', 'Yes. The terms say you confirm you are authorised to bind the company, and that you are responsible for complying with privacy and employment rules when you use Linkist for it.', [TERMS]),

  // Capture
  e('Capture', 'How do I add a contact?', 'Through an NFC tap, a QR code, a business-card scan, your phone contacts, a CSV or VCF file, or by typing it in.', [{ label: 'Capture', href: '/features/capture' }]),
  e('Capture', 'What does the card scan do?', 'It reads a paper business card with the camera and turns it into a contact record. Essential includes 5 scans a month, Enhanced 20, Pro and Team unlimited.'),
  e('Capture', 'Can I import my existing contacts?', 'Yes. Import from your phone address book or from a CSV or VCF export of another tool. Importing is optional and you confirm you have the right to bring those contacts in.', [PRIVACY]),
  e('Capture', 'What can I save with a contact?', 'The privacy policy lists what the product keeps: notes about where and how you met, follow-up reminders, tags, interaction history, connection context, groups and relationship status or priority.', [PRIVACY]),
  e('Capture', 'What are voice notes for?', 'Recording where you met and what mattered while it is fresh, so the context is saved with the contact.'),
  e('Capture', 'What is AI Enrichment?', 'It fills in missing professional details on an incomplete record from public or professional sources, where you have enabled it. Part of Pro and Team.', [{ label: 'AI and your data', href: '/ai' }]),
  e('Capture', 'Does the other person need Linkist to give me their details?', 'No. When someone taps your card or scans your code they see your live profile and can send their own details; if they use Linkist too, the meeting is captured on both sides.'),
  e('Capture', 'Can I export my contacts?', 'The plan comparison lists export from Enhanced upwards. Separately, the privacy policy gives every user the right to their data in a machine-readable format.', [{ label: 'Security', href: '/security' }]),

  // Profiles and cards
  e('Profiles and cards', 'What is a digital business card?', 'A live profile with your photo and details that you share by QR code, link, email or SMS. Every plan includes one, and it updates wherever it has been shared.', [{ label: 'Profiles and cards', href: '/features/profiles' }]),
  e('Profiles and cards', 'What can my profile show?', 'Job title, company, department or role, a biography, a photograph, a company logo, website links, your LinkedIn address and other professional or social links you choose to add.', [PRIVACY]),
  e('Profiles and cards', 'How many profiles can I have?', 'Essential has 1 personal profile. Enhanced has 3 (1 personal, 2 business). Pro has 5. Team gives each user 5.'),
  e('Profiles and cards', 'Can I get a personal URL?', 'Yes, on Enhanced and above. The public profile address takes the form linkist.ai/me/yourname.'),
  e('Profiles and cards', 'Is my profile public?', 'Anyone with your link, QR code or card can open what you publish on it, so review what the profile shows. The terms make you responsible for the content you publish.', [TERMS]),
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
  e('Find', 'What is Network Strength?', 'A read of how strong your network is overall, listed in the product’s capabilities and described in the privacy policy as network scoring. Part of the optional AI features.'),

  // Act
  e('Act', 'What are Top Actions?', 'The most important things to do today, listed when you open Linkist. Part of Pro and Team.', [{ label: 'Act', href: '/features/act' }]),
  e('Act', 'What is the Weekly Planner?', 'A view for planning the relationships and opportunities you want to move this week, so follow-ups are scheduled rather than remembered.'),
  e('Act', 'What is a nudge?', 'A timely prompt before a follow-up slips, such as a reminder that you met someone at an event and have not followed up.'),
  e('Act', 'What are Smart Signals?', 'Changes that deserve a reaction, noticed for you: the privacy policy lists them among the outputs of the optional AI features.', [{ label: 'AI and your data', href: '/ai' }]),
  e('Act', 'What is a warm introduction?', 'An introduction through someone you both know, found by Linkist when the person you need is one connection away.'),
  e('Act', 'Can Linkist draft my follow-up?', 'Yes. AI Follow-up drafts a message from the context you saved. You review and send it; Linkist never sends on your behalf.'),
  e('Act', 'Can I turn notifications off?', 'Yes. Non-essential push notifications need your consent under the privacy policy, and you can withdraw it in your settings. Codes, order and security messages still arrive because the service needs them.', [PRIVACY]),

  // Teams
  e('Teams', 'What does the Team plan add?', 'Everything in Pro for every user, contact sharing across the team, a centralised admin console, company branding on cards and a team directory. Minimum 5 users.', [{ label: 'Teams', href: '/teams' }]),
  e('Teams', 'What happens to contacts when someone leaves?', 'Personal contacts stay with the person. Team-shared contacts and their relationship history remain with the authorised team, so relationship value stays inside the company.'),
  e('Teams', 'Who manages a team?', 'An administrator, through the centralised admin console listed in the plan comparison: members, shared contacts and company branding on every card.'),
  e('Teams', 'Can a team member keep private contacts?', 'Yes. Sharing is per contact, so personal relationships stay personal and only shared contacts are visible to the team.'),
  e('Teams', 'How is a team billed?', 'Per user, with a minimum of 5 users, monthly or yearly. The pricing page shows the figures.', [{ label: 'Pricing', href: '/pricing' }]),

  // Plans and billing
  e('Plans and billing', 'What do the plans cost?', 'Essential is free. Enhanced is $2 a month, $12 a year or $25 for life. Pro is $10 a month or $100 a year. Team is $4 per user a month or $200 a year, with a minimum of 5 users.', [{ label: 'Pricing', href: '/pricing' }]),
  e('Plans and billing', 'Which plan has ICP Matching?', 'Pro and Team. Enhanced adds profiles, templates and lead capture; Pro adds the AI and relationship intelligence features.'),
  e('Plans and billing', 'Is there an Enterprise plan?', 'Not yet. Enterprise is coming later and is interest only today. Single sign-on and CRM or HRMS integration are listed for it.'),
  e('Plans and billing', 'Which currency am I billed in?', 'The store prices the cards in AED and shows an approximate US dollar figure beside each one. The terms say prices are displayed in USD unless stated otherwise, so check the currency at checkout.', [TERMS]),
  e('Plans and billing', 'Where do I manage my subscription?', 'In the billing hub at prm.linkist.ai, which handles plans, AI credit top-ups, invoices and card orders.'),
  e('Plans and billing', 'Do subscriptions renew automatically?', 'Unless stated otherwise at checkout, paid subscriptions renew until you cancel. Cancel before the renewal date if you do not want the next period.', [TERMS]),
  e('Plans and billing', 'Can the price of my plan change?', 'The terms allow changes with reasonable notice where the law requires it. A billing period you have already paid for is not affected unless you agree or the law requires it.', [TERMS]),
  e('Plans and billing', 'Is VAT included?', 'The store shows VAT upfront. Taxes, duties and shipping depend on the product and the delivery country and are shown at checkout.'),
  e('Plans and billing', 'Who processes payments?', 'Third-party payment providers such as Stripe. Linkist does not store full card numbers.', [PRIVACY]),
  e('Plans and billing', 'What are AI credits?', 'Some AI actions draw on credits, sold as top-ups in the billing hub. What one credit buys is not published yet; the app shows the figure when you buy.', [{ label: 'AI and your data', href: '/ai' }]),
  e('Plans and billing', 'Where are my invoices?', 'In the billing hub at prm.linkist.ai. The privacy policy notes that payment and invoice records are kept for the period UAE tax rules require.'),

  // NFC cards and shipping
  e('NFC cards and shipping', 'Which NFC cards are there?', 'Starter, with no customisation, at AED 75 in PVC, AED 95 in cherry wood or AED 195 in brushed metal, about $20, $26 and $53. Signature, with your name and logo, at AED 95, 115 or 225, about $26, $31 and $61. Every card includes PRM Essential.', [{ label: 'NFC cards', href: '/nfc-cards' }]),
  e('NFC cards and shipping', 'Which materials, colours and patterns?', 'PVC in white or black with four patterns (Minimal, Geometric, Wave and Crystal), cherry wood, and brushed metal in silver or black with the same four patterns.'),
  e('NFC cards and shipping', 'What is printed on a Signature card?', 'Your name and logo. The terms list names, titles, company details, logos, colours and QR codes as the content a custom card can carry, and you are responsible for it being accurate and yours to use.', [TERMS]),
  e('NFC cards and shipping', 'What does a tap do?', 'The card opens your live profile on the other person’s phone. They save your details and, if they use Linkist, you keep the context of the meeting too.'),
  e('NFC cards and shipping', 'Does the card work with every phone?', 'It needs a phone with NFC switched on. The terms say NFC depends on compatible devices, settings, operating system restrictions and correct use, and do not guarantee every device. Cards can also carry a QR code as a fallback.', [TERMS]),
  e('NFC cards and shipping', 'Where does Linkist ship?', 'The store lists 16 shipping regions: the UAE, Saudi Arabia, Bahrain, Kuwait, Oman, Qatar, India, the United Kingdom, the United States, Canada, Australia, Pakistan, the Philippines, Egypt, Jordan and Lebanon. Shipping is included in the UAE; elsewhere the cost is shown at checkout.'),
  e('NFC cards and shipping', 'How long does delivery take?', 'Delivery times are shown in the store at checkout for your country and are not published here. Custom cards are made to order.'),
  e('NFC cards and shipping', 'Is shipping included?', 'Card shipping is included in the UAE. Shipping to other countries is confirmed at checkout.'),
  e('NFC cards and shipping', 'Can I change or cancel an order?', 'Ask within 24 hours of ordering. Because cards are custom made, a change is not guaranteed once production has started.', [TERMS]),
  e('NFC cards and shipping', 'Can I return a card?', 'Custom products are returnable where the product is defective, there was a production error, or it differs materially from the confirmed order. Contact support within 7 days of delivery; approved refunds usually take 5 to 10 business days.', [TERMS]),
  e('NFC cards and shipping', 'Can I use an NFC card or sticker I already own?', 'Yes, free. The store has a bring-your-own route: tap the card or sticker on your phone and Linkist writes your live profile onto it, or paste an existing profile link and your Linkist profile builds itself. Encoding a chip needs an Android phone; the profile then works on every device.'),
  e('NFC cards and shipping', 'What are the bundles?', 'The Signature Bundle is any Signature card plus 1 year of Pro for $100. The Founders Circle Bundle is the Founders Circle card plus lifetime Pro for $150, one time.', [{ label: 'Bundles', href: '/bundles' }]),
  e('NFC cards and shipping', 'What is the Founders Circle?', 'A limited early-supporter offer described on linkist.ai: a card, a Founders Circle badge, lifetime Pro and early-member perks. Whether it is still open is confirmed with the team; the bundle page says so when it closes.'),

  // AI and data
  e('AI and data', 'What does the AI do?', 'It enriches incomplete records, matches contacts against your ICPs, scores relationships and your network, notices Smart Signals, suggests introductions, drafts follow-ups and summarises contacts. It suggests; you decide.', [{ label: 'AI and your data', href: '/ai' }]),
  e('AI and data', 'Do I have to use the AI features?', 'No. They are optional and switched on with a separate consent, not bundled with the terms. Linkist works as a relationship manager without them.', [PRIVACY]),
  e('AI and data', 'How do I switch the AI off?', 'In Privacy Settings in your account, or by writing to privacy@linkist.ai. Withdrawing consent does not undo processing that already happened.'),
  e('AI and data', 'What does the AI read?', 'Profile data, contact details, your notes, connection history, interaction context and professional information, plus public or professional sources for enrichment where enabled and lawful.', [PRIVACY]),
  e('AI and data', 'Can the AI be wrong?', 'Yes. AI outputs are generated from available data and can be inaccurate or out of date. Review them before you act, as the terms say.'),
  e('AI and data', 'Does the AI decide anything for me?', 'No. Outputs are assistive, and the privacy policy says Linkist does not use AI to make legally binding decisions about users.'),
  e('AI and data', 'How long are AI results kept?', 'AI enrichment outputs are kept for up to 6 months or until you delete your account, unless refreshed, deleted or legally retained.', [PRIVACY]),
  e('AI and data', 'Which AI model does Linkist use?', 'Not published. The privacy policy names the category, AI and large language model providers where AI features are enabled, not the company. Ask privacy@linkist.ai.'),
  e('AI and data', 'What happens to the contacts I import?', 'They are used only for the features you choose and are not sold. Linkist does not send marketing to imported contacts unless they opt in themselves, as the privacy policy sets out.', [PRIVACY]),
  e('AI and data', 'Can someone in my contacts object?', 'Yes. Anyone whose details were added to Linkist can ask for access, correction, restriction or deletion at privacy@linkist.ai.'),
  e('AI and data', 'Does Linkist sell my data?', 'No. The privacy policy states that personal data is not sold; it is shared only with the providers needed to run the service, under processing terms.', [PRIVACY]),

  // Security
  e('Security', 'Where is my data held?', 'The privacy policy states encryption in transit and at rest where appropriate, and that some service providers may be outside the UAE, with safeguards for those transfers. The hosting provider and region are not published yet.', [{ label: 'Security', href: '/security' }]),
  e('Security', 'Which law applies to my data?', 'The privacy policy is written under the UAE Personal Data Protection Law, Federal Decree-Law No. 45 of 2021. RatioX Labs DWC-LLC is the company behind Linkist and the data controller.'),
  e('Security', 'Who do I contact about privacy?', 'privacy@linkist.ai for requests and questions, and dpo@linkist.ai for the Data Protection Officer. Linkist aims to answer within 30 days and may verify your identity first.'),
  e('Security', 'How is my account protected?', 'Sign-in uses a one-time code sent to your email or mobile number, so there is no password to steal. The policy lists code expiry, secure token handling, access controls, audit logging and monitoring.', [PRIVACY]),
  e('Security', 'Can I see, correct or export my data?', 'Yes. The privacy policy gives you the rights to access, correction and portability in a machine-readable format, through the app or privacy@linkist.ai.'),
  e('Security', 'How do I delete my account?', 'Request deletion through the app, the website or by emailing privacy@linkist.ai. Account data is deleted or anonymised within up to 30 days, except what tax, fraud, dispute or legal rules require Linkist to keep.'),
  e('Security', 'Can I object to profiling?', 'Yes. You can object to automated profiling and switch the optional AI features off in Privacy Settings, or by writing to privacy@linkist.ai.'),
  e('Security', 'What happens if there is a data breach?', 'The policy says a breach is assessed, contained and remediated, and that the authority and affected people are notified where the law requires it.'),
  e('Security', 'How long are logs kept?', 'Security and audit logs are usually kept up to 12 months and troubleshooting logs up to 90 days, unless an investigation or a legal matter needs them longer.'),
  e('Security', 'How do I report a security problem?', 'Write to support@linkist.ai. A dedicated security address will be published on the security page when it exists.'),

  // Troubleshooting
  e('Troubleshooting', 'My card taps but nothing opens.', 'Make sure NFC is on and hold the card near the top of the phone for a second. Some cases block NFC. If it still fails, email support@linkist.ai with your phone model.'),
  e('Troubleshooting', 'I did not receive the sign-in code.', 'Check the address or number you typed, then your spam folder, and wait a minute before asking for another. Outside the UAE and India, email is the smoother route for the code.'),
  e('Troubleshooting', 'My profile shows old details.', 'Edit the profile in the app; the card and QR point at the live version, so the change appears on the next tap or scan. Ask the other person to refresh if their browser kept an old copy.'),
  e('Troubleshooting', 'The card scan read a field wrongly.', 'Correct the field before saving; the scan fills the fields and you have the last word. Good light and a flat card help.'),
  e('Troubleshooting', 'I cannot find a contact I know I saved.', 'Search with what you remember, such as the event or the company, rather than the exact name. Natural-Language Search is built for that.'),
  e('Troubleshooting', 'A card I brought myself opens someone else’s profile.', 'The chip still carries its old link. Encode it again through the bring-your-own route with an Android phone and it will open your Linkist profile.'),
  e('Troubleshooting', 'The site assistant did not answer my question.', 'It is automated and answers only from this help centre and the product facts; it says so when it does not know. Email support@linkist.ai for anything else.'),
  e('Troubleshooting', 'Which browsers work?', 'Linkist is a web app, so any current browser on a phone or a computer works. The billing hub is a normal website.'),

  // Limits and roadmap
  e('Limits and roadmap', 'Are there store apps?', 'Not linked from the product today. Linkist is a web app on your phone until the listings are live; the product says native apps are in final preparation.'),
  e('Limits and roadmap', 'Is Enterprise available?', 'No. It is interest only. Contact us if you want to talk about it.'),
  e('Limits and roadmap', 'Are there integrations or an API?', 'Not today. CRM and HRMS integration and single sign-on are listed for the future Enterprise plan.'),
  e('Limits and roadmap', 'Is Linkist GDPR or SOC 2 certified?', 'This site does not claim either. Linkist publishes a privacy policy under the UAE data protection law and states its security measures there; certifications appear here only with evidence.'),
  e('Limits and roadmap', 'Are there customer case studies?', 'Not yet. Linkist names customers only with their written consent.'),
  e('Limits and roadmap', 'Is Linkist available in other languages?', 'The product and this site are in English. Other languages are not announced.'),
  e('Limits and roadmap', 'Which model powers the AI, and what does a credit cost?', 'Neither is published yet. The AI page lists both as open questions and will say when they are answered.', [{ label: 'AI and your data', href: '/ai' }]),
  e('Limits and roadmap', 'What does this help centre not cover yet?', 'The signed-in app screen by screen. Answers about exact steps inside the app are confirmed during the app audit, and each one says so until then.'),
];
