import { NextResponse, type NextRequest } from 'next/server';
import { COUNTRY_COOKIE, countryCookie } from '@/lib/consent-region';

/**
 * The country lookup for the cookie notice (D87). Vercel tells the edge which country a request comes from
 * (`x-vercel-ip-country`). A visitor in a notice-only market, the UAE, gets the `linkist-country` cookie for the
 * browser session; the pre-paint script and the cookie notice read it and start the tags unless the visitor
 * switched them off. Nothing else about the visitor is kept, and the cookie is cleared for anyone outside those
 * markets. Pages only: Next's files, the API and anything with a file extension are skipped.
 */
export function middleware(req: NextRequest): NextResponse {
  const res = NextResponse.next();
  const action = countryCookie(req.headers.get('x-vercel-ip-country'), req.cookies.get(COUNTRY_COOKIE)?.value);
  if (action && 'set' in action) res.cookies.set(COUNTRY_COOKIE, action.set, { path: '/', sameSite: 'lax', secure: true });
  else if (action) res.cookies.delete(COUNTRY_COOKIE);
  return res;
}

export const config = {
  matcher: ['/((?!_next/|api/|.*\\.[A-Za-z0-9]+$).*)'],
};
