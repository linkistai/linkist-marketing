# Screen captures

Every product image on the site is a capture of the real product (brief, rule 2) or a labelled design preview cropped from the approved prototype. Nothing is drawn by hand.

## Two hosts

- **The PRM app** at `m.linkist.ai` is mobile-only. Sign-in asks for an email or phone number and sends a verification code. Phone captures are taken at 390 x 844 at 3x.
- **The store and billing hub** at `prm.linkist.ai` sells cards, plans, AI credit top-ups and invoices, and is meant for a big screen. Browser captures are taken at 1280 x 800 at 2x.

## How it works

- `manifest.ts` lists every screen: host, path, viewport, the text that must be visible, and selectors to mask. Paths marked `confirm` are the audit's best guess and are skipped until the owner confirms them in the signed-in walk-through.
- `pnpm capture:login` opens the installed Chrome on both sign-in pages. The owner signs in by hand with the demo account; the script types nothing. The session is saved to `auth/state.json` (gitignored).
- `pnpm capture` visits each screen on the dark theme with animations frozen and writes `raw/<name>-<viewport>.png` here (gitignored) and a copy to `public/screens/`. `log.json` records the URL, time and checksum of every file.
- `pnpm capture --public` captures only the screens that need no account (the app sign-in and the store). Use it to prove the pipeline.
- `pnpm capture:prototype` crops the three phone screens out of the prototype's hero composite into `public/screens/proto-*.png`; `prototype-log.json` records the regions. These are design previews and are only ever shown with the "Design preview" badge.

## Demo account

Captures should come from a dedicated demo account with realistic, non-sensitive data: a few dozen contacts, some tags, an ICP, a nudge or two. Every number on a captured screen becomes a number on the site, so record them in `docs/image-plan.md`. Tell the team which screens must not be captured.
