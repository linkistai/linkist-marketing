'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { CTA_CLASS } from '@/content/journeys';
import { track } from '@/lib/tracking';

/**
 * Events for the tag manager on top of its own page-load events (D75). The site moves between its pages
 * without a full reload, so each move pushes `virtual_page_view` (the first page is the container's own
 * page view); every forward call to action pushes `cta_button_click` with its placement tag. Nothing is
 * pushed unless the container runs with the visitor's consent.
 */
export function Tracking() {
  const pathname = usePathname();
  const last = useRef<string | null>(null);
  useEffect(() => {
    if (last.current === null || last.current === pathname) {
      last.current = pathname;
      return;
    }
    last.current = pathname;
    // A moment later, so the new page's title is in place.
    const t = window.setTimeout(() => track({ event: 'virtual_page_view', page_path: location.pathname + location.search, page_location: location.href, page_title: document.title }), 60);
    return () => window.clearTimeout(t);
  }, [pathname]);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = e.target instanceof Element ? e.target.closest(`a.${CTA_CLASS}`) : null;
      if (!(a instanceof HTMLAnchorElement)) return;
      track({ event: CTA_CLASS, cta_name: a.dataset['cta'], cta_text: (a.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 100), cta_url: a.href, page_path: location.pathname });
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);
  return null;
}
