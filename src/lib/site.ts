import type { Metadata } from 'next';

/** C1: the marketing domain is not confirmed. linkist.ai is the placeholder until it is. */
export const SITE_URL = (process.env['NEXT_PUBLIC_SITE_URL'] ?? 'https://linkist.ai').replace(/\/$/, '');
/** The PRM app. Its unified screen signs in and creates an account in one place (D7, D15). */
export const APP_URL = (process.env['NEXT_PUBLIC_APP_URL'] ?? 'https://prm.linkist.ai').replace(/\/$/, '');
/** The NFC card product: profiles, card activation and the card-holder sign-in (D15). */
export const CARD_APP_URL = (process.env['NEXT_PUBLIC_CARD_APP_URL'] ?? 'https://m.linkist.ai').replace(/\/$/, '');
/** "Get the App": the PRM app's unified sign-in and registration screen. */
export const GET_APP_URL = process.env['NEXT_PUBLIC_GET_APP_URL'] ?? `${APP_URL}/UnifiedAuth`;
/** "Get NFC Card": the card product's sign-in, as the owner directed on 10 September 2026. */
export const GET_CARD_URL = process.env['NEXT_PUBLIC_GET_CARD_URL'] ?? `${CARD_APP_URL}/login`;
/** Sign in and Start free both land on the PRM app's unified screen (D7). */
export const SIGN_IN_URL = GET_APP_URL;
export const START_URL = GET_APP_URL;
/**
 * Where static assets such as OG images really live. The canonical domain (SITE_URL) is a
 * placeholder until C1 is answered, so social previews must point at the deployment that
 * serves the files: NEXT_PUBLIC_ASSET_URL if set, else Vercel's production host, else SITE_URL.
 */
export const ASSET_URL = (process.env['NEXT_PUBLIC_ASSET_URL'] ?? (process.env['VERCEL_PROJECT_PRODUCTION_URL'] ? `https://${process.env['VERCEL_PROJECT_PRODUCTION_URL']}` : SITE_URL)).replace(/\/$/, '');
export const absoluteAsset = (path: string): string => (path.startsWith('http') ? path : `${ASSET_URL}${path}`);
/** Dark ships by default (brief, Design system). Light is the backup theme. */
export const THEME: 'dark' | 'light' = process.env['NEXT_PUBLIC_THEME'] === 'light' ? 'light' : 'dark';
export const SITE_NAME = 'Linkist';
export const TAGLINE = 'Capture Contacts. Remember Context. Act at the right time.';
export const DEFAULT_DESCRIPTION =
  'Linkist is a Personal Relationship Manager: it captures the people you meet, remembers the context, and tells you what to do next. Pair it with an NFC business card or use it on its own. Start free, no card required.';
export const COMPANY = 'RatioX Labs DWC-LLC';
export const SUPPORT_EMAIL = process.env['NEXT_PUBLIC_SUPPORT_EMAIL'];
export const PRIVACY_EMAIL = process.env['NEXT_PUBLIC_PRIVACY_EMAIL'];
/** The company's current legal documents live on linkist.ai until the site's legal hub ships. */
export const EXTERNAL_PRIVACY_URL = 'https://linkist.ai/privacy';
export const EXTERNAL_TERMS_URL = 'https://linkist.ai/terms';

export interface PageMetaOptions {
  readonly type?: 'website' | 'article';
  readonly image?: string;
  readonly noindex?: boolean;
  readonly publishedTime?: string;
  readonly modifiedTime?: string;
  readonly locale?: string;
}

/** Every page calls this once. Title, description, canonical, Open Graph, Twitter. */
export function pageMeta(title: string, description: string, path: string, opts: PageMetaOptions = {}): Metadata {
  const url = `${SITE_URL}${path === '/' ? '' : path}`;
  const image = absoluteAsset(opts.image ?? '/og/default.png');
  const fullTitle = path === '/' ? `${SITE_NAME}: ${title}` : `${title} | ${SITE_NAME}`;
  return {
    title: { absolute: fullTitle },
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    robots: opts.noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: opts.type ?? 'website',
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      url,
      locale: opts.locale ?? 'en_GB',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      ...(opts.type === 'article' ? { publishedTime: opts.publishedTime, modifiedTime: opts.modifiedTime } : {}),
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [image] },
  };
}
