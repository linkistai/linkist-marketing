'use client';

import { useEffect } from 'react';
import { initReveals } from './reveal';

/**
 * Motion is on by default (brief 6, Grownz D24). The inline script in layout.tsx decides
 * html[data-motion] before first paint from `?motion=on|off` and the footer switch's saved
 * choice; this is the fallback, and it starts the scroll reveals when motion is on.
 */
export function MotionProvider() {
  useEffect(() => {
    const html = document.documentElement;
    if (!html.dataset['motion']) {
      const force = new URLSearchParams(window.location.search).get('motion');
      let saved: string | null = null;
      try {
        saved = localStorage.getItem('linkist-motion');
      } catch {
        /* ignore */
      }
      html.dataset['motion'] = force === 'on' ? 'on' : force === 'off' ? 'off' : saved === 'off' ? 'off' : 'on';
    }
    const on = html.dataset['motion'] === 'on';
    let stop: (() => void) | undefined;
    let cancelled = false;
    if (on)
      void initReveals().then((s) => {
        if (cancelled) s();
        else stop = s;
      });
    return () => {
      cancelled = true;
      stop?.();
    };
  }, []);
  return null;
}
