import type { Metadata, Viewport } from 'next';
import { DM_Sans, Inter, JetBrains_Mono } from 'next/font/google';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import { ChatWidget } from '@/components/chat/ChatWidget';
import { CookieNotice } from '@/components/CookieNotice';
import { MotionProvider } from '@/motion/MotionProvider';
import { CurrencyProvider } from '@/components/Currency';
import { PromoBar, PromoProvider } from '@/components/Promotions';
import { livePromos } from '@/content/promotions';
import { SmoothScroll } from '@/motion/SmoothScroll';
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL, TAGLINE, THEME } from '@/lib/site';
import './globals.css';

// DM Sans for display and headings, Inter for body and UI, JetBrains Mono for figures (brief, Design
// system), self-hosted through next/font. The display face uses font-display optional so a slow
// first load keeps the adjusted fallback instead of reflowing headlines (Grownz D18).
const display = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-display-next', display: 'optional' });
const body = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body-next', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-mono-next', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME}: ${TAGLINE}`, template: `%s | ${SITE_NAME}` },
  description: DEFAULT_DESCRIPTION,
  icons: { icon: '/icon.png', apple: '/apple-icon.png' },
};

export const viewport: Viewport = {
  themeColor: THEME === 'dark' ? '#050505' : '#FFFFFF',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Offers that are on when the page is built (src/content/promotions.ts); the bar's id on <html>
  // gives the header and the first section room for it before the first paint.
  const live = livePromos(new Date());
  const bar = live.find((p) => p.placements.includes('bar'));
  return (
    <html lang="en-GB" data-theme={THEME} data-promo={bar?.id} className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        {/* Before the first paint: motion, on by default for everyone (owner, 25 September 2026, D59; ?motion=off or the footer switch turns it off), and an offer bar the visitor already dismissed stays hidden. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "(function(){try{var f=new URLSearchParams(location.search).get('motion');var s=null;try{s=localStorage.getItem('linkist-motion-2')}catch(e){}document.documentElement.dataset.motion=f==='off'?'off':f==='on'?'on':s==='off'?'off':'on';var p=document.documentElement.dataset.promo;if(p){var x='';try{x=localStorage.getItem('lk-promo-dismissed')||''}catch(e){}if((' '+x+' ').indexOf(' '+p+' ')>=0){delete document.documentElement.dataset.promo}}}catch(e){document.documentElement.dataset.motion='on'}})();",
          }}
        />
        <MotionProvider />
        <SmoothScroll />
        <a href="#main" className="btn btn--primary sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50">
          Skip to content
        </a>
        <CurrencyProvider>
          <PromoProvider live={live}>
            <PromoBar />
            <Nav />
            <main id="main">{children}</main>
            <Footer />
            <ChatWidget />
            <CookieNotice />
          </PromoProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
