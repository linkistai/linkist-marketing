import type { MetadataRoute } from 'next';
import { FEATURES } from '@/content/features';
import { USE_CASES } from '@/content/usecases';
import { getPosts } from '@/lib/blog';
import { SITE_URL } from '@/lib/site';

/** Grows as pages land (docs/sitemap.md). Internal routes stay out. */
export const ROUTES: readonly string[] = [
  '/',
  '/how-it-works',
  '/features',
  ...FEATURES.map((f) => `/features/${f.slug}`),
  '/use-cases',
  ...USE_CASES.map((u) => `/use-cases/${u.slug}`),
  '/nfc-cards',
  '/bundles',
  '/pricing',
  '/teams',
  '/ai',
  '/security',
  '/blogs',
  ...getPosts().map((p) => `/blogs/${p.slug}`),
  '/help',
  '/chat',
  '/changelog',
  '/community',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((path) => ({
    url: `${SITE_URL}${path === '/' ? '' : path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : 0.7,
  }));
}
