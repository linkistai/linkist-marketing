'use client';

import { MessageCircle, X } from 'lucide-react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

/** The assistant and its help corpus load only when the panel opens, so no page pays for them up front (checkpoint 8, Lighthouse). */
const Assistant = dynamic(() => import('./Assistant').then((m) => m.Assistant), {
  ssr: false,
  loading: () => <p className="p-4 text-sm text-muted">Opening the assistant</p>,
});

/**
 * Floating assistant on every page except /chat and /system. Same brain as the chat page. The
 * launcher is icon-only on small screens and the footer keeps clearance for it at every width, so
 * it never covers footer links or hero controls (Grownz audit finding). On phones it appears after
 * the first scroll so it does not sit on the fold's last button. Keyboard: opening moves focus to
 * the question, Escape or Close returns it to the launcher, and the panel follows the launcher in
 * the tab order (it is drawn above it with a reversed column).
 */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(true);
  const launcher = useRef<HTMLButtonElement>(null);
  const path = usePathname();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen((was) => {
          if (was) launcher.current?.focus();
          return false;
        });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    // Phones: wait for the first scroll so the launcher does not cover the last control above the fold.
    const small = window.matchMedia('(max-width: 639px)').matches;
    if (!small) return;
    setShown(window.scrollY > 120);
    const onScroll = () => {
      if (window.scrollY > 120) {
        setShown(true);
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (open) document.getElementById('chat-q-widget')?.focus();
  }, [open]);

  if (path === '/chat' || path?.startsWith('/system')) return null;
  const close = () => {
    setOpen(false);
    launcher.current?.focus();
  };
  return (
    <div className={`fixed bottom-4 right-4 flex flex-col-reverse items-end gap-3 ${shown || open ? '' : 'hidden'}`} style={{ zIndex: 'var(--z-overlay)' }}>
      <button ref={launcher} type="button" className="btn btn--primary !min-h-[52px] !px-4 sm:!px-5" style={{ boxShadow: 'var(--shadow-glow)' }} aria-expanded={open} aria-controls="assistant-panel" onClick={() => (open ? close() : setOpen(true))}>
        {open ? <X size={18} aria-hidden="true" /> : <MessageCircle size={18} aria-hidden="true" />}
        <span className="hidden sm:inline">{open ? 'Close' : 'Ask Linkist'}</span>
        <span className="sr-only sm:hidden">{open ? 'Close the assistant' : 'Ask Linkist'}</span>
      </button>
      {open ? (
        <div id="assistant-panel" className="float float--deep float--card flex h-[min(560px,calc(100dvh-120px))] w-[min(400px,calc(100vw-32px))] flex-col overflow-hidden" role="dialog" aria-label="Linkist assistant">
          <Assistant compact />
        </div>
      ) : null}
    </div>
  );
}
