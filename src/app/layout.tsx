import type { Metadata, Viewport } from 'next';
import { DM_Sans, Inter, JetBrains_Mono } from 'next/font/google';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import { ChatWidget } from '@/components/chat/ChatWidget';
import { CookieNotice } from '@/components/CookieNotice';
import { MotionProvider } from '@/motion/MotionProvider';
import { CurrencyProvider } from '@/components/Currency';
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
  return (
    <html lang="en-GB" data-theme={THEME} className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        {/* Decides motion before first paint so the hero animates without waiting for hydration (brief 6). On by default for everyone (owner, 25 September 2026, D59); ?motion=off or the footer switch turns it off. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "(function(){try{var f=new URLSearchParams(location.search).get('motion');var s=null;try{s=localStorage.getItem('linkist-motion-2')}catch(e){}document.documentElement.dataset.motion=f==='off'?'off':f==='on'?'on':s==='off'?'off':'on';}catch(e){document.documentElement.dataset.motion='on'}})();",
          }}
        />
        <MotionProvider />
        <SmoothScroll />
        <a href="#main" className="btn btn--primary sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50">
          Skip to content
        </a>
        <Nav />
        <main id="main">
          <CurrencyProvider>{children}</CurrencyProvider>
        </main>
        <Footer />
        <ChatWidget />
        <CookieNotice />
      </body>
    </html>
  );
}
