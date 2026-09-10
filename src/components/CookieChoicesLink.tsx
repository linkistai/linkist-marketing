'use client';

/** Re-opens the cookie notice from the footer. */
export function CookieChoicesLink() {
  return (
    <button type="button" className="underline" onClick={() => window.dispatchEvent(new Event('linkist:cookie-choices'))}>
      Cookie choices
    </button>
  );
}
