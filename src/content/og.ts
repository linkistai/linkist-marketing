/** Open Graph images per page (scripts/og.ts renders them into public/og). Add one per route. */
export interface OgPage {
  readonly slug: string;
  readonly title: string;
  readonly eyebrow: string;
  /** A real capture or design preview from public/screens, drawn in a phone at the right. */
  readonly screen?: string;
  /** Cut-out from public/assets/people (<name>-2x.webp), drawn at the right edge when it exists. */
  readonly person?: string;
  /** A picture under public (blog covers), drawn as a rounded card at the right. */
  readonly image?: string;
}

export const OG_PAGES: readonly OgPage[] = [
  { slug: 'default', title: 'Capture Contacts. Remember Context. Act at the right time.', eyebrow: 'Personal Relationship Manager', screen: 'proto-home' },
  { slug: 'home', title: 'Capture Contacts. Remember Context. Act at the right time.', eyebrow: 'Personal Relationship Manager', screen: 'proto-home' },
  { slug: 'how-it-works', title: 'Capture and share. Build relationships. Act and grow.', eyebrow: 'How Linkist works', screen: 'proto-share' },
  { slug: 'features', title: 'Simple to use. Smarter underneath.', eyebrow: 'Features', screen: 'proto-home' },
  { slug: 'features-capture', title: 'Save the contact. Save the context.', eyebrow: 'Capture', screen: 'proto-share' },
  { slug: 'features-find', title: 'Find the people worth your attention.', eyebrow: 'Find', screen: 'proto-profile' },
  { slug: 'features-act', title: 'Know what to do next.', eyebrow: 'Act', screen: 'proto-home' },
  { slug: 'features-profiles', title: 'One live profile. Every way to share it.', eyebrow: 'Profiles and cards', screen: 'proto-profile' },
  { slug: 'features-teams', title: 'Relationships that stay with the company.', eyebrow: 'Teams', screen: 'proto-home' },
  { slug: 'use-cases', title: 'Built for real working days.', eyebrow: 'Use cases', screen: 'proto-home' },
  { slug: 'nfc-cards', title: 'Tap. Share. Make the first impression count.', eyebrow: 'Linkist NFC cards', screen: 'proto-share' },
  { slug: 'bundles', title: 'The NFC card and PRM Pro together.', eyebrow: 'Bundled offers', screen: 'proto-share' },
  { slug: 'pricing', title: 'Start free. Add more when you need it.', eyebrow: 'Linkist PRM pricing', screen: 'proto-home' },
  { slug: 'teams', title: 'Relationships that stay with the company.', eyebrow: 'Linkist for teams', screen: 'proto-home' },
  { slug: 'ai', title: 'What the AI does. What it sees. How to switch it off.', eyebrow: 'AI and your data', screen: 'proto-home' },
  { slug: 'security', title: 'Written for a sceptical reader.', eyebrow: 'Security and trust' },
  { slug: 'blogs', title: 'Network smarter, not harder.', eyebrow: 'Linkist Insights', image: '/blog/linkedin-profile-vs-digital-identity/cover.jpg' },
  { slug: 'help', title: 'Answers, with their sources.', eyebrow: 'Help centre' },
  { slug: 'chat', title: 'Ask anything the help centre knows.', eyebrow: 'Ask the assistant' },
  { slug: 'changelog', title: 'What changed, by date.', eyebrow: 'Changelog' },
  { slug: 'community', title: 'Join the Linkist community.', eyebrow: 'Community' },
  { slug: 'legal', title: 'The documents, dated.', eyebrow: 'Legal' },
  { slug: 'contact', title: 'Talk to a person.', eyebrow: 'Contact' },
  { slug: 'about', title: 'Made in Dubai for the people you meet.', eyebrow: 'About Linkist' },
  { slug: 'customers', title: 'No named customers yet. Here is why.', eyebrow: 'Customers' },
];
