/** Blog types and helpers safe for client components (no file system). The loader lives in blog.ts. */
export type BlogCategory = 'nfc' | 'networking' | 'crm' | 'uae' | 'product';

export const CATEGORY_LABELS: Record<BlogCategory, string> = {
  nfc: 'Digital Business Cards & NFC',
  networking: 'Networking',
  crm: 'Relationship Management',
  uae: 'UAE Business',
  product: 'Product Updates',
};

/** The initials shown in the author avatar, as the old site did. */
export const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0] ?? '')
    .join('')
    .slice(0, 2)
    .toUpperCase();

/**
 * The v2 category image used for blog cards and article heroes (handoff README, "Blog covers"):
 * one scene from `public/assets/gen/` per category. The per-article cover stays in the front matter
 * and still feeds the Article JSON-LD and the Open Graph image.
 */
export const CATEGORY_IMAGE: Record<BlogCategory, { src: string; alt: string }> = {
  networking: { src: '/assets/gen/event.webp', alt: 'Professionals talking at an evening networking event in Dubai' },
  uae: { src: '/assets/gen/event.webp', alt: 'Professionals talking at an evening networking event in Dubai' },
  crm: { src: '/assets/gen/uc-many.webp', alt: 'A busy professional walking through an airport checking her phone' },
  nfc: { src: '/assets/gen/hero-tap.webp', alt: 'A hand taps a Linkist NFC card on a phone' },
  product: { src: '/assets/gen/uc-find.webp', alt: 'A professional in a hotel lobby searching on his phone' },
};
