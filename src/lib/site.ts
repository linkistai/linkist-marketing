import type { Metadata } from 'next';

/**
 * An absolute http(s) URL from an environment value, or the fallback. Hosting dashboards let a
 * variable exist with an empty value, and `new URL('')` then breaks the build while Next collects
 * page metadata (seen on the first deployment, 10 September 2026), so empty, blank and unparsable
 * values all fall back. A trailing slash is dropped.
 */
export function coerceUrl(value: string | undefined, fallback: string): string {
  const v = (value ?? '').trim();
  try {
    const u = new URL(v);
    if (u.protocol === 'http:' || u.protocol === 'https:') return v.replace(/\/$/, '');
  } catch {
    /* fall through */
  }
  return fallback.replace(/\/$/, '');
}

/** A non-empty environment string, or undefined. */
export const envString = (value: string | undefined): string | undefined => {
  const v = (value ?? '').trim();
  return v ? v : undefined;
};

/** C1: the marketing domain is not confirmed. linkist.ai is the placeholder until it is. */
export const SITE_URL = coerceUrl(process.env['NEXT_PUBLIC_SITE_URL'], 'https://linkist.ai');
/** The PRM app. Its unified screen signs in and creates an account in one place (D7, D15). */
export const APP_URL = coerceUrl(process.env['NEXT_PUBLIC_APP_URL'], 'https://prm.linkist.ai');
/** "Get the App" and Sign in: the PRM app's unified sign-in and registration screen. */
export const GET_APP_URL = coerceUrl(process.env['NEXT_PUBLIC_GET_APP_URL'], `${APP_URL}/UnifiedAuth`);
/*
 * Call-to-action links are not built here: every button uses its own tracked journey link from
 * src/content/journeys.ts (D69). The site never links to or names the NFC tools site.
 */
/**
 * The native apps are in preparation and have no listings (R3, docs/01-audit.md). The hero's store
 * badges link only once these are set; until then they are shown as coming soon (D50).
 */
export const APP_STORE_URL = envString(process.env['NEXT_PUBLIC_APP_STORE_URL']);
export const PLAY_STORE_URL = envString(process.env['NEXT_PUBLIC_PLAY_STORE_URL']);
/** Sign in lands on the plain unified screen, untagged (D7; C10 and C11 of the CTA link brief). */
export const SIGN_IN_URL = GET_APP_URL;
/**
 * Where static assets such as OG images live: the site's own domain now that linkist.ai serves it
 * (2 October 2026, D70), or NEXT_PUBLIC_ASSET_URL when a deployment needs another host.
 */
export const ASSET_URL = coerceUrl(process.env['NEXT_PUBLIC_ASSET_URL'], SITE_URL);
export const absoluteAsset = (path: string): string => (path.startsWith('http') ? path : `${ASSET_URL}${path}`);
/**
 * Set NEXT_PUBLIC_NOINDEX=true on a preview or on a deployment whose host is not yet the real
 * domain: every page then carries noindex and robots.txt disallows everything (D27).
 */
export const NOINDEX_SITE = /^(1|true|yes)$/i.test((process.env['NEXT_PUBLIC_NOINDEX'] ?? '').trim());
/** Dark ships by default (brief, Design system). Light is the backup theme. */
export const THEME: 'dark' | 'light' = process.env['NEXT_PUBLIC_THEME'] === 'light' ? 'light' : 'dark';
export const SITE_NAME = 'Linkist';
export const TAGLINE = 'Capture Contacts. Remember Context. Act at the right time.';
export const DEFAULT_DESCRIPTION =
  'Linkist is a Personal Relationship Manager: it captures the people you meet, remembers the context, and tells you what to do next. Pair it with an NFC business card or use it on its own. Start free, no card required.';
export const COMPANY = 'RatioX Labs DWC-LLC';
export const SUPPORT_EMAIL = envString(process.env['NEXT_PUBLIC_SUPPORT_EMAIL']);
export const PRIVACY_EMAIL = envString(process.env['NEXT_PUBLIC_PRIVACY_EMAIL']);
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

/**
 * Search results show about 160 characters of a description. Longer ones are cut at the last
 * sentence end inside the limit, or at a word boundary, never mid-word and never with an ellipsis (D28).
 */
export function clampDescription(text: string, max = 160): string {
  const t = text.trim().replace(/\s+/g, ' ');
  if (t.length <= max) return t;
  const head = t.slice(0, max + 1);
  const sentence = Math.max(head.lastIndexOf('. '), head.lastIndexOf('! '), head.lastIndexOf('? '));
  if (sentence >= 60) return head.slice(0, sentence + 1);
  const space = head.lastIndexOf(' ');
  return head.slice(0, space > 0 ? space : max).replace(/[,;:]$/, '') + '.';
}

/** Every page calls this once. Title, description, canonical, Open Graph, Twitter. */
export function pageMeta(title: string, longDescription: string, path: string, opts: PageMetaOptions = {}): Metadata {
  const description = clampDescription(longDescription);
  const url = `${SITE_URL}${path === '/' ? '' : path}`;
  const image = absoluteAsset(opts.image ?? '/og/default.png');
  const fullTitle = path === '/' ? `${SITE_NAME}: ${title}` : `${title} | ${SITE_NAME}`;
  return {
    title: { absolute: fullTitle },
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    robots: opts.noindex || NOINDEX_SITE ? { index: false, follow: !opts.noindex } : { index: true, follow: true },
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
