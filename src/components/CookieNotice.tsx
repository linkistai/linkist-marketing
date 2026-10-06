'use client';

import { useEffect, useState } from 'react';
import { CONSENT_KEY, COUNTRY_COOKIE, NOTICE_ONLY, setTagConsent, startTags, trackingHere } from '@/lib/tracking';

type Choice = 'granted' | 'denied';

/**
 * Cookie notice for the tag manager: Google Analytics and the Meta Pixel (D75). Reads a country hint from a
 * cookie the edge can set (`linkist-country`, ISO code): in notice-only markets the tags start unless the
 * visitor switches them off; everywhere else, and when the country is unknown, nothing loads until the
 * visitor allows it. A returning visitor who allowed it starts from the pre-paint script in the layout. The
 * footer link "Cookie choices" re-opens it. Off the live site (previews, local builds) there are no tags and
 * no notice.
 */
export function CookieNotice() {
  const [here, setHere] = useState(false);
  const [noticeOnly, setNoticeOnly] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!trackingHere()) return;
    setHere(true);
    let saved: Choice | null = null;
    try {
      const v = localStorage.getItem(CONSENT_KEY);
      if (v === 'granted' || v === 'denied') saved = v;
    } catch {
      /* storage blocked: ask */
    }
    const m = document.cookie.match(new RegExp(`(?:^|; )${COUNTRY_COOKIE}=([A-Z]{2})`));
    const n = !!m?.[1] && NOTICE_ONLY.includes(m[1]);
    setNoticeOnly(n);
    if (saved === 'granted' || (n && saved !== 'denied')) startTags();
    if (!saved) setOpen(true);
    const onOpen = () => setOpen(true);
    window.addEventListener('linkist:cookie-choices', onOpen);
    return () => window.removeEventListener('linkist:cookie-choices', onOpen);
  }, []);
  if (!here || !open) return null;
  const decide = (c: Choice) => {
    try {
      localStorage.setItem(CONSENT_KEY, c);
    } catch {
      /* ignore */
    }
    if (c === 'granted') startTags();
    else setTagConsent(false);
    setOpen(false);
  };
  return (
    <div role="dialog" aria-label="Cookie choices" className="float float--deep float--card fixed bottom-4 left-4 right-4 mx-auto max-w-xl p-5 text-sm sm:left-auto sm:right-24" style={{ zIndex: 'var(--z-toast)' }}>
      <p className="font-semibold">Cookies for analytics and ads</p>
      <p className="mt-1 text-body">
        {noticeOnly
          ? 'This site uses Google Analytics to see which pages help and the Meta Pixel to measure Linkist ads. You can switch them off here or later from the footer.'
          : 'With your permission, this site uses Google Analytics to see which pages help and the Meta Pixel to measure Linkist ads. Nothing loads until you choose.'}{' '}
        <a href="/legal/privacy" className="underline">
          Privacy
        </a>
        .
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" className="btn btn--primary btn--sm" onClick={() => decide('granted')}>
          {noticeOnly ? 'OK' : 'Allow'}
        </button>
        <button type="button" className="btn btn--secondary btn--sm" onClick={() => decide('denied')}>
          {noticeOnly ? 'Switch off' : 'No thanks'}
        </button>
      </div>
    </div>
  );
}
