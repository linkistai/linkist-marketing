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
  'upgrade-insecure-requests',
].join('; ');

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
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
  async redirects() {
    // The only integration with the product (brief, scope): Start free and Sign in land on the app.
    // The app signs in and registers on one screen at its root ("Sign in or create your account").
    const app = (process.env['NEXT_PUBLIC_APP_URL'] ?? 'https://prm.linkist.ai').replace(/\/$/, '');
    return [
      { source: '/app', destination: app, permanent: false },
      { source: '/sign-in', destination: app, permanent: false },
      { source: '/start', destination: app, permanent: false },
    ];
  },
};

export default nextConfig;
