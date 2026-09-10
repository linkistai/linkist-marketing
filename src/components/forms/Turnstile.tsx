'use client';

import Script from 'next/script';
import { useEffect, useId, useRef } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
    };
  }
}

/**
 * Cloudflare Turnstile widget, rendered only when NEXT_PUBLIC_TURNSTILE_SITE_KEY is set.
 * Tokens are single-use: the widget clears the token when it expires and resets itself whenever
 * `resetSignal` changes (the forms bump it after any failed submission), so a retry never
 * re-sends a consumed token (Grownz D31).
 */
export function Turnstile({ onToken, theme = 'dark', resetSignal = 0 }: { onToken: (token: string) => void; theme?: 'light' | 'dark'; resetSignal?: number }) {
  const siteKey = process.env['NEXT_PUBLIC_TURNSTILE_SITE_KEY'];
  const ref = useRef<HTMLDivElement>(null);
  const widget = useRef<string | undefined>(undefined);
  const id = useId();
  useEffect(() => {
    if (!siteKey || !ref.current) return;
    const tryRender = () => {
      if (window.turnstile && ref.current && !widget.current) {
        widget.current = window.turnstile.render(ref.current, {
          sitekey: siteKey,
          theme,
          callback: onToken,
          'expired-callback': () => onToken(''),
          'error-callback': () => onToken(''),
        });
      }
    };
    tryRender();
    const t = setInterval(tryRender, 400);
    return () => clearInterval(t);
  }, [siteKey, onToken, theme]);
  useEffect(() => {
    if (!resetSignal || !widget.current || !window.turnstile) return;
    window.turnstile.reset(widget.current);
    onToken('');
  }, [resetSignal, onToken]);
  if (!siteKey) return null;
  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
      <div ref={ref} id={id} className="min-h-[65px]" />
    </>
  );
}
