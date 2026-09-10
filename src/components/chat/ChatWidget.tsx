'use client';

import { MessageCircle, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Assistant } from './Assistant';

/**
 * Floating assistant on every page except /chat and /system. Same brain as the chat page. The
 * launcher is icon-only on small screens and the footer keeps clearance for it, so it never
 * covers footer links or hero controls (Grownz audit finding).
 */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  if (path === '/chat' || path?.startsWith('/system')) return null;
  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end gap-3" style={{ zIndex: 'var(--z-overlay)' }}>
      {open ? (
        <div className="float float--deep float--card flex h-[min(560px,calc(100dvh-120px))] w-[min(400px,calc(100vw-32px))] flex-col overflow-hidden" role="dialog" aria-label="Linkist assistant">
          <Assistant compact />
        </div>
      ) : null}
      <button type="button" className="btn btn--primary !min-h-[52px] !px-4 sm:!px-5" style={{ boxShadow: 'var(--shadow-glow)' }} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        {open ? <X size={18} aria-hidden="true" /> : <MessageCircle size={18} aria-hidden="true" />}
        <span className="hidden sm:inline">{open ? 'Close' : 'Ask Linkist'}</span>
        <span className="sr-only sm:hidden">{open ? 'Close the assistant' : 'Ask Linkist'}</span>
      </button>
    </div>
  );
}
