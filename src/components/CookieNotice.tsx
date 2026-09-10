'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { EXTERNAL_PRIVACY_URL } from '@/lib/site';

const KEY = 'linkist-consent';
const GA = process.env['NEXT_PUBLIC_GA_MEASUREMENT_ID'];
/** Markets where a notice is enough (brief 7, market list to confirm). Everyone else, and unknown, is consent-gated. */
const NOTICE_ONLY = new Set(['AE', 'IN', 'US', 'SG', 'AU']);

type Choice = 'granted' | 'denied' | null;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Tells an already-loaded GA4 to stop or start. Unmounting the script tags is not enough once
 * gtag.js is running, so the choice is also pushed through Consent Mode and the property's
 * disable flag, which stops hits immediately (Grownz D31).
 */
function applyConsent(c: Exclude<Choice, null>) {
  if (!GA || typeof window === 'undefined') return;
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA}`] = c === 'denied';
  window.dataLayer = window.dataLayer ?? [];
  const gtag = window.gtag ?? ((...args: unknown[]) => window.dataLayer!.push(args));
  gtag('consent', 'update', { analytics_storage: c, ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
}

/**
 * Cookie notice and GA4 loader. Reads a country hint from a cookie the edge can set
 * (`linkist-country`, ISO code). Analytics loads only after consent, or immediately in notice-only
 * markets. The footer link "Cookie choices" re-opens it. No GA id, no script, no notice.
 */
export function CookieNotice() {
  const [choice, setChoice] = useState<Choice>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY) as Choice;
      if (saved === 'granted' || saved === 'denied') setChoice(saved);
      const m = document.cookie.match(/(?:^|; )linkist-country=([A-Z]{2})/);
      setCountry(m?.[1] ?? null);
      if (!saved) setOpen(true);
    } catch {
      setOpen(true);
    }
    const onOpen = () => setOpen(true);
    window.addEventListener('linkist:cookie-choices', onOpen);
    return () => window.removeEventListener('linkist:cookie-choices', onOpen);
  }, []);
  if (!GA) return null;
  const noticeOnly = !!country && NOTICE_ONLY.has(country);
  const load = choice === 'granted' || (noticeOnly && choice !== 'denied');
  const decide = (c: Exclude<Choice, null>) => {
    try {
      localStorage.setItem(KEY, c);
    } catch {
      /* ignore */
    }
    applyConsent(c);
    setChoice(c);
    setOpen(false);
  };
  return (
    <>
      {load ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">{`window['ga-disable-${GA}']=false;window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});gtag('js',new Date());gtag('config','${GA}',{anonymize_ip:true});`}</Script>
        </>
      ) : null}
      {open ? (
        <div role="dialog" aria-label="Cookie choices" className="float float--deep float--card fixed bottom-4 left-4 right-4 mx-auto max-w-xl p-5 text-sm sm:left-auto sm:right-24" style={{ zIndex: 'var(--z-toast)' }}>
          <p className="font-semibold">Analytics cookies</p>
          <p className="mt-1 text-body">
            {noticeOnly ? 'This site uses Google Analytics to understand which pages help. You can switch it off here or later from the footer.' : 'This site uses Google Analytics only if you allow it. Nothing loads until you choose.'}{' '}
            <a href={EXTERNAL_PRIVACY_URL} className="underline">
              Privacy policy
            </a>
            .
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className="btn btn--primary btn--sm" onClick={() => decide('granted')}>
              {noticeOnly ? 'OK' : 'Allow analytics'}
            </button>
            <button type="button" className="btn btn--secondary btn--sm" onClick={() => decide('denied')}>
              {noticeOnly ? 'Switch off' : 'No thanks'}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
