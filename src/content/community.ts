/**
 * The community page (brief 4, checkpoint 5): the prototype's "Join the Linkist community"
 * sign-up as a page of its own. The channels are the ones the current linkist.ai footer links
 * to (10 September 2026); the promises are limited to what the sign-up delivers today.
 */
export const CHANNELS: readonly { name: string; handle: string; href: string }[] = [
  { name: 'LinkedIn', handle: 'linkist-ai', href: 'https://www.linkedin.com/company/linkist-ai/' },
  { name: 'Instagram', handle: '@linkist.ai', href: 'https://www.instagram.com/linkist.ai/' },
  { name: 'X', handle: '@Linkist_ai', href: 'https://x.com/Linkist_ai' },
];

export const WHAT_YOU_GET: readonly { title: string; body: string }[] = [
  { title: 'Product notes', body: 'What changed and what is coming, in the words of the changelog, when there is something worth saying.' },
  { title: 'New articles', body: 'Guides on networking, NFC cards and relationship management as they are published on the blog.' },
  { title: 'Invitations', body: 'When Linkist runs or joins an event, in Dubai or online, members hear first. There is no fixed calendar yet.' },
];
