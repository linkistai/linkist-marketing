import type { MetadataRoute } from 'next';
import { NOINDEX_SITE, SITE_URL } from '@/lib/site';

/**
 * Internal routes stay out of search. With NEXT_PUBLIC_NOINDEX=true (a preview or a deployment
 * on a host that is not yet the real domain, D27) the whole site asks not to be indexed, so a
 * preview never competes with linkist.ai for the same pages.
 */
export default function robots(): MetadataRoute.Robots {
  if (NOINDEX_SITE) return { rules: [{ userAgent: '*', disallow: '/' }], host: SITE_URL };
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/system', '/api/', '/legal/cookie-policy', '/legal/acceptable-use', '/legal/refund-and-shipping', '/legal/sub-processors', '/legal/security-overview', '/legal/accessibility', '/legal/company-information', '/legal/contact-data-notice'] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
