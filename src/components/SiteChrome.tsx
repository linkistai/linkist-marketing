'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

/** Landing pages for ads that carry their own short header and footer (D77). */
export const LANDING_PATHS: readonly string[] = ['/early-access'];

/** The site's offer bar, menu, footer and assistant: shown everywhere except on the landing pages. */
export function SiteChrome({ children }: { children: ReactNode }) {
  return LANDING_PATHS.includes(usePathname()) ? null : children;
}
