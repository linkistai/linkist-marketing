'use client';

import { useEffect, useState } from 'react';

const KEY = 'linkist-motion';

/**
 * Footer switch for motion (brief 6, Grownz D24). Motion is on by default; this lets a visitor
 * turn it off for this site, remembered on the device. `?motion=off` does the same for one visit.
 * Switching off stops smooth scrolling at once (SmoothScroll watches the attribute).
 */
export function MotionToggle() {
  const [on, setOn] = useState<boolean | null>(null);
  useEffect(() => {
    setOn(document.documentElement.dataset['motion'] === 'on');
  }, []);
  const set = (next: boolean) => {
    document.documentElement.dataset['motion'] = next ? 'on' : 'off';
    try {
      localStorage.setItem(KEY, next ? 'on' : 'off');
    } catch {
      /* ignore */
    }
    setOn(next);
    if (next) window.location.reload();
  };
  if (on === null) return null;
  return (
    <button type="button" className="underline" aria-pressed={on} onClick={() => set(!on)}>
      Motion: {on ? 'on' : 'off'}
    </button>
  );
}
