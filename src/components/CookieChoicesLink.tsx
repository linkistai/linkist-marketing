'use client';

import { useEffect, useState } from 'react';
import { trackingHere } from '@/lib/tracking';

/** Re-opens the cookie notice from the footer; only on the live site, where the tags can run, because elsewhere there is no notice to open (D75). */
export function CookieChoicesLink() {
  const [here, setHere] = useState(false);
  useEffect(() => setHere(trackingHere()), []);
  if (!here) return null;
  return (
    <button type="button" className="inline-flex min-h-[44px] items-center underline" onClick={() => window.dispatchEvent(new Event('linkist:cookie-choices'))}>
      Cookie choices
    </button>
  );
}
