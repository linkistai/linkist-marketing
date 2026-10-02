import type { NextConfig } from 'next';

/**
 * Content Security Policy for the marketing site (brief 7, Grownz D31). The pages are prerendered,
 * so there is no per-request nonce; scripts are limited to this origin plus Google Analytics and
 * Cloudflare Turnstile, and inline scripts are allowed because Next.js hydration and the motion
 * pre-paint script are inline. Fonts are self-hosted through next/font, so no font host is listed.
 * Add a host here before loading anything new from a third party, or it is blocked silently.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.googletagmanager.com https://*.google-analytics.com",
  "font-src 'self' data:",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://challenges.cloudflare.com",
  "frame-src https://challenges.cloudflare.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  // Off only for a local http QA run (CSP_NO_UPGRADE=true): WebKit upgrades even localhost otherwise.
  ...(process.env['CSP_NO_UPGRADE'] === 'true' ? [] : ['upgrade-insecure-requests']),
].join('; ');

/*
 * The old shortcut addresses forward to tracked journeys (CTA link brief C07 to C09, 1 October 2026). Copied
 * from src/content/journeys.ts, which journeys.test.ts checks these against; utm_medium=redirect is intended.
 */
const REDIRECT_START = 'https://prm.linkist.ai/UnifiedAuth?intent=individual&utm_source=linkist_ai&utm_medium=redirect&utm_campaign=website_cta&utm_content=redirect_start';
const REDIRECT_APP = 'https://prm.linkist.ai/UnifiedAuth?intent=individual&utm_source=linkist_ai&utm_medium=redirect&utm_campaign=website_cta&utm_content=redirect_app';
const REDIRECT_GET_CARD = 'https://prm.linkist.ai/store/start?utm_source=linkist_ai&utm_medium=redirect&utm_campaign=website_cta&utm_content=redirect_get_card';

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { formats: ['image/avif', 'image/webp'] },
  async headers() {
    return [
      { source: '/(.*)', headers: securityHeaders },
      // The vercel.app address serves the same build as linkist.ai; it stays out of search (D70).
      { source: '/(.*)', has: [{ type: 'host', value: '(?<sub>.+)\\.vercel\\.app' }], headers: [{ key: 'X-Robots-Tag', value: 'noindex' }] },
    ];
  },
  async redirects() {
    // The only integration with the product (brief, scope): /sign-in lands on the PRM app's plain unified
    // screen; /app, /start and /get-card forward to tracked journeys (D69). The brief's /learn path lives at /blogs, the old site's URL (D18).
    // Empty or unparsable values fall back, as in src/lib/site.ts (a dashboard can hold an empty variable).
    const url = (value: string | undefined, fallback: string) => {
      const v = (value ?? '').trim();
      try {
        if (/^https?:$/.test(new URL(v).protocol)) return v.replace(/\/$/, '');
      } catch {
        /* fall through */
      }
      return fallback.replace(/\/$/, '');
    };
    const app = url(process.env['NEXT_PUBLIC_APP_URL'], 'https://prm.linkist.ai');
    const appAuth = url(process.env['NEXT_PUBLIC_GET_APP_URL'], `${app}/UnifiedAuth`);
    return [
      { source: '/app', destination: REDIRECT_APP, permanent: false },
      { source: '/sign-in', destination: appAuth, permanent: false },
      { source: '/start', destination: REDIRECT_START, permanent: false },
      { source: '/get-card', destination: REDIRECT_GET_CARD, permanent: false },
      { source: '/learn', destination: '/blogs', permanent: true },
      { source: '/learn/:slug', destination: '/blogs/:slug', permanent: true },
      { source: '/blog', destination: '/blogs', permanent: true },
      // The company's published legal addresses and the old site's store pages (D31).
      { source: '/privacy', destination: '/legal/privacy', permanent: true },
      { source: '/terms', destination: '/legal/terms', permanent: true },
      { source: '/choose-plan', destination: '/pricing', permanent: true },
      { source: '/digital-business-card', destination: '/nfc-cards', permanent: true },
      // Addresses of the earlier linkist.ai sites that search engines still list (2 October 2026, D70).
      { source: '/nfc', destination: '/nfc-cards', permanent: true },
      { source: '/stories', destination: '/blogs', permanent: true },
      { source: '/stories/:slug*', destination: '/blogs', permanent: true },
      { source: '/feed', destination: '/blogs', permanent: true },
      // AI and your data is hidden for now (owner, 29 September 2026): read the Terms and Privacy instead.
      { source: '/ai', destination: '/legal/terms', permanent: false },
      // Customers, Changelog and Security are off the website (owner, 29 September 2026).
      { source: '/customers', destination: '/about', permanent: false },
      { source: '/changelog', destination: '/blogs', permanent: false },
      { source: '/security', destination: '/legal/privacy', permanent: false },
    ];
  },
};

export default nextConfig;
