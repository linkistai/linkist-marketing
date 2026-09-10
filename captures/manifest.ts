/**
 * Every product screen the site uses, captured from the real product (brief, rule 2).
 * Two hosts: the PRM app at m.linkist.ai (mobile-only, phone captures at 390 x 844 at 3x) and the
 * store and billing hub at prm.linkist.ai (browser captures at 1280 x 800 at 2x).
 * `waitFor` is text the screen must show before the shot; `mask` hides personal data.
 * Paths marked `confirm` are the audit's best guess and are skipped until the owner confirms them
 * in the signed-in walk-through (docs/confirm-list.md).
 */
export interface Shot {
  readonly name: string;
  readonly host: 'app' | 'store';
  readonly path: string;
  readonly viewport: 'phone' | 'browser' | 'both';
  readonly waitFor: string;
  readonly fullPage?: boolean;
  readonly mask?: readonly string[];
  readonly public?: boolean;
  readonly confirm?: boolean;
}

export const HOSTS = {
  app: (process.env['CAPTURE_APP_URL'] ?? 'https://m.linkist.ai').replace(/\/$/, ''),
  store: (process.env['CAPTURE_BASE_URL'] ?? 'https://prm.linkist.ai').replace(/\/$/, ''),
} as const;

export const VIEWPORTS = {
  phone: { width: 390, height: 844, deviceScaleFactor: 3 },
  browser: { width: 1280, height: 800, deviceScaleFactor: 2 },
} as const;

/** Elements that carry the account holder's identity on every app screen (selectors to confirm). */
const IDENTITY = ['[data-testid="avatar"]', 'img[alt*="avatar" i]'];

export const SHOTS: readonly Shot[] = [
  // Public, needs no account: proves the pipeline.
  { name: 'app-signin', host: 'app', path: '/login', viewport: 'phone', waitFor: 'Sign in to your account', public: true },
  { name: 'store-landing', host: 'store', path: '/', viewport: 'browser', waitFor: 'Your card', public: true },
  { name: 'store', host: 'store', path: '/store', viewport: 'both', waitFor: 'Choose your Linkist', public: true },
  // Signed in. The dashboard path appears in the app's own sign-in return URL.
  { name: 'home', host: 'app', path: '/profile-dashboard', viewport: 'phone', waitFor: 'Welcome', mask: IDENTITY, confirm: true },
  { name: 'contacts', host: 'app', path: '/contacts', viewport: 'phone', waitFor: 'Contacts', mask: IDENTITY, confirm: true },
  { name: 'contact', host: 'app', path: '/contacts', viewport: 'phone', waitFor: 'Notes', mask: IDENTITY, confirm: true },
  { name: 'search', host: 'app', path: '/search', viewport: 'phone', waitFor: 'Search', mask: IDENTITY, confirm: true },
  { name: 'icp', host: 'app', path: '/icp', viewport: 'phone', waitFor: 'ICP', mask: IDENTITY, confirm: true },
  { name: 'health', host: 'app', path: '/relationships', viewport: 'phone', waitFor: 'Relationship', mask: IDENTITY, confirm: true },
  { name: 'ask', host: 'app', path: '/network-ask', viewport: 'phone', waitFor: 'Ask', mask: IDENTITY, confirm: true },
  { name: 'actions', host: 'app', path: '/actions', viewport: 'phone', waitFor: 'Top Actions', mask: IDENTITY, confirm: true },
  { name: 'nudge', host: 'app', path: '/nudges', viewport: 'phone', waitFor: 'Nudge', mask: IDENTITY, confirm: true },
  { name: 'planner', host: 'app', path: '/planner', viewport: 'phone', waitFor: 'Planner', mask: IDENTITY, confirm: true },
  { name: 'intro', host: 'app', path: '/introductions', viewport: 'phone', waitFor: 'Introduction', mask: IDENTITY, confirm: true },
  { name: 'share', host: 'app', path: '/share', viewport: 'phone', waitFor: 'Share', mask: IDENTITY, confirm: true },
  { name: 'scan', host: 'app', path: '/scan', viewport: 'phone', waitFor: 'Scan', mask: IDENTITY, confirm: true },
  { name: 'import', host: 'app', path: '/import', viewport: 'phone', waitFor: 'Import', mask: IDENTITY, confirm: true },
  { name: 'enrich', host: 'app', path: '/contacts', viewport: 'phone', waitFor: 'Enrich', mask: IDENTITY, confirm: true },
  { name: 'profile', host: 'app', path: '/profile', viewport: 'phone', waitFor: 'Profile', mask: IDENTITY, confirm: true },
  { name: 'profiles', host: 'app', path: '/profiles', viewport: 'phone', waitFor: 'Profiles', mask: IDENTITY, confirm: true },
  { name: 'url', host: 'app', path: '/settings', viewport: 'phone', waitFor: 'URL', mask: IDENTITY, confirm: true },
  { name: 'store-account', host: 'store', path: '/store/account', viewport: 'browser', waitFor: 'Plan', mask: IDENTITY, confirm: true },
  { name: 'team-shared', host: 'store', path: '/team', viewport: 'browser', waitFor: 'Team', mask: IDENTITY, confirm: true },
  { name: 'team-admin', host: 'store', path: '/team/admin', viewport: 'browser', waitFor: 'Admin', mask: IDENTITY, confirm: true },
  { name: 'team-directory', host: 'store', path: '/team/directory', viewport: 'browser', waitFor: 'Directory', mask: IDENTITY, confirm: true },
];
