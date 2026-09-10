import type { MetadataRoute } from 'next';
import { FEATURES } from '@/content/features';
import { USE_CASES } from '@/content/usecases';
import { getPosts } from '@/lib/blog';
import { getLegal } from '@/lib/legal';
import { SITE_URL } from '@/lib/site';

/** Grows as pages land (docs/sitemap.md). Internal routes and legal drafts stay out. */
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
  '/about',
  '/customers',
  '/contact',
  '/legal',
  ...getLegal()
    .filter((d) => d.status === 'published')
    .map((d) => `/legal/${d.slug}`),
];

/** Real dates where the content has one (articles, legal documents); the build date elsewhere (D27). */
function lastModified(path: string, now: Date): Date {
  const post = path.startsWith('/blogs/') ? getPosts().find((p) => `/blogs/${p.slug}` === path) : undefined;
  if (post) return new Date((post.imported || post.date) + 'T00:00:00Z');
  const doc = path.startsWith('/legal/') ? getLegal().find((d) => `/legal/${d.slug}` === path) : undefined;
  if (doc) return new Date(doc.updated + 'T00:00:00Z');
  return now;
}

function priority(path: string): number {
  if (path === '/') return 1;
  if (/^\/(pricing|nfc-cards|how-it-works|features|use-cases)$/.test(path)) return 0.9;
  if (path.startsWith('/legal')) return 0.3;
  if (path.startsWith('/blogs/')) return 0.6;
  return 0.7;
}

function changeFrequency(path: string): MetadataRoute.Sitemap[number]['changeFrequency'] {
  if (path === '/' || path === '/blogs' || path === '/changelog') return 'weekly';
  if (path.startsWith('/legal')) return 'yearly';
  return 'monthly';
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((path) => ({
    url: `${SITE_URL}${path === '/' ? '' : path}`,
    lastModified: lastModified(path, now),
    changeFrequency: changeFrequency(path),
    priority: priority(path),
  }));
}
