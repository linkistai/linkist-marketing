/**
 * Google Tag Manager with the marketing team's container (GTM-P8RPQ6RG: the GA4 tag G-77QMEQVJXH and the
 * Meta Pixel), D75. It starts only after the visitor allows it in the cookie notice, or in a notice-only
 * market unless they switch it off, and only on the live site, so previews and local builds never send data.
 * One boot script serves both the pre-paint check in <head> (a returning visitor who already allowed it) and
 * the cookie notice (the moment someone allows it). The container's noscript iframe is left out: it would run
 * without consent and only serves browsers with JavaScript off.
 */
import { SITE_URL } from '@/lib/site';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    /** The container has started on this page. */
    __linkistGtm?: boolean;
    /** The visitor switched the tags off on this page after they started. */
    __linkistGtmOff?: boolean;
  }
}

export const GTM_ID = process.env['NEXT_PUBLIC_GTM_ID']?.trim() || 'GTM-P8RPQ6RG';

/** Where the cookie notice keeps the visitor's choice, and the country hint the edge can set. */
export const CONSENT_KEY = 'linkist-consent';
export const COUNTRY_COOKIE = 'linkist-country';
/** Markets where a notice is enough (brief 7, market list to confirm). Everyone else, and unknown, is consent-gated. */
export const NOTICE_ONLY: readonly string[] = ['AE', 'IN', 'US', 'SG', 'AU'];

/** Hosts the container runs on: the live site with and without www, or a comma list in NEXT_PUBLIC_GTM_HOSTS for a QA build. */
export const GTM_HOSTS: readonly string[] = (() => {
  const raw = process.env['NEXT_PUBLIC_GTM_HOSTS']?.trim();
  if (raw) return raw.split(',').map((h) => h.trim()).filter(Boolean);
  const apex = new URL(SITE_URL).hostname.replace(/^www\./, '');
  return [`www.${apex}`, apex];
})();

/** Starts the container once: Consent Mode defaults (granted, since it only runs with consent), the gtm.js start event and the container script. */
export function bootJs(id: string = GTM_ID): string {
  return `if(!window.__linkistGtm){window.__linkistGtm=true;window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){dataLayer.push(arguments)};gtag('consent','default',{analytics_storage:'granted',ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'});dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtm.js?id=${id}';document.head.appendChild(s);}`;
}

/** The pre-paint script for <head>: on the live site, start the container straight away for a visitor whose choice already allows it. */
export function headScript(): string {
  return `(function(){try{if(${JSON.stringify(GTM_HOSTS)}.indexOf(location.hostname)<0)return;var c=null;try{c=localStorage.getItem('${CONSENT_KEY}')}catch(e){}var m=document.cookie.match(/(?:^|; )${COUNTRY_COOKIE}=([A-Z]{2})/);var n=!!m&&${JSON.stringify(NOTICE_ONLY)}.indexOf(m[1])>=0;if(c==='granted'||(n&&c!=='denied')){${bootJs()}}}catch(e){}})();`;
}

/** Whether this page is on a host where the container may run. */
export function trackingHere(): boolean {
  return typeof window !== 'undefined' && GTM_HOSTS.includes(window.location.hostname);
}

/** Starts the container when the visitor allows it; on a page where it already runs, switches the tags back on. */
export function startTags(): void {
  if (!trackingHere()) return;
  if (window.__linkistGtm) {
    setTagConsent(true);
    return;
  }
  window.__linkistGtmOff = false;
  const s = document.createElement('script');
  s.text = bootJs();
  document.head.appendChild(s);
}

/** The visitor changed their mind on a page where the container already runs: Consent Mode for Google, the Pixel's own switch for Meta. */
export function setTagConsent(granted: boolean): void {
  if (typeof window === 'undefined' || !window.__linkistGtm) return;
  const v = granted ? 'granted' : 'denied';
  window.gtag?.('consent', 'update', { analytics_storage: v, ad_storage: v, ad_user_data: v, ad_personalization: v });
  window.fbq?.('consent', granted ? 'grant' : 'revoke');
  window.__linkistGtmOff = !granted;
}

/** Pushes an event for the tag manager, only while the container runs with the visitor's consent. */
export function track(event: Record<string, unknown>): void {
  if (typeof window === 'undefined' || !window.__linkistGtm || window.__linkistGtmOff) return;
  window.dataLayer?.push(event);
}
