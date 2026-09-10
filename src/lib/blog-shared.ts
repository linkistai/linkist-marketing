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
