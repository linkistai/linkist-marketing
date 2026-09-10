'use client';

const GA = process.env['NEXT_PUBLIC_GA_MEASUREMENT_ID'];

/** Re-opens the cookie notice from the footer; absent when no analytics id is configured, because then there is no notice to open. */
export function CookieChoicesLink() {
  if (!GA) return null;
  return (
    <button type="button" className="inline-flex min-h-[44px] items-center underline" onClick={() => window.dispatchEvent(new Event('linkist:cookie-choices'))}>
      Cookie choices
    </button>
  );
}
