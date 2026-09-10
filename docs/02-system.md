# Checkpoint 2: system

Date: 10 September 2026. Scope: tokens wired from the prototype, the component library lifted from Grownz and rebranded, motion primitives, the capture and OG pipelines.

## What was built

A standalone Next.js 15.5 project in `site/` (decision D1): TypeScript strict, App Router, Tailwind v4 mapped onto the token variables, static prerender, Node 22, pnpm 10, port 3200.

**Tokens.** `src/styles/tokens.json` holds the prototype's measured palette, type scale, radii, shadows, gradients and motion durations (D2). `pnpm tokens:build` generates `tokens.css` with the dark theme on `:root` and the light backup on `data-theme="light"`, and records a SHA-256 that `pnpm tokens:check` and a vitest verify. Contrast fixes to the muted grey and small coral text are recorded in D3.

**Brand.** `scripts/brand-build.ts` crops the crimson mark out of the prototype's logo lockup into `public/brand/mark.png` and draws the favicon, Apple icon and PWA icons on the ground colour. The wordmark is set in DM Sans beside the mark.

**Components** in `src/components`: `Logo`, `Nav` (the prototype's centred pill, mobile menu with Escape and breakpoint handling), `Footer` (four columns, community sign-up, motion switch, cookie choices), `Section` with `SectionHead`, `Eyebrow`, `Headline`, `Lede`, `Outcome` and `Tags`, `Button` with `StartFree` and `TextLink`, `ScreenFrame` (phone with container-unit corners and island, laptop-style browser; pending state; design-preview badge), `Person`, `Obj` and `Scene` (resolved at build time, render nothing or a token glyph until assets exist), `FloatingCard` (the prototype's `lk-float` and `lk-float2`), `MetricChip`, `CardStack`, `FeatureTabs` (sticky, keyboard, animated indicator, 250 ms crossfade), `CurrencySwitcher` (USD and AED), `Faq` (exclusive pill accordion with optional FAQPage JSON-LD and an aside), `ClosingBand`, `Breadcrumbs`, `ShareRow` (copy always copies; native share is a separate button), `Toc`, `DesignPreview` and `ProtoRow`, `NfcCard` (the CSS card visualiser), `CookieNotice` with Consent Mode and withdrawal, `Newsletter`, `ContactForm` and `Turnstile` (widget reset after failure), the chat `Assistant` and `ChatWidget` (relevance-gated retrieval, launcher icon-only on phones, footer clearance), `HelpCentre`, and `MiniMock` with twelve variants (D12).

**Home components** in `src/components/home`: `HeroInteractive` (four intent chips), `JourneyDeck` (three screens fanning on entry), `UseCaseFan` (snap strip on phones, tilted fan on desktop), `CapabilityGrid`, `PlanCards`, `CardTiers`, `Bundles` (every figure derived from the price data), `CompareTable`, `CommunityBand`, `JsonLd`.

**Motion** in `src/motion`: a pre-paint script decides `html[data-motion]` from `?motion=` and the saved switch, default on (D11); `reveal.ts` lazy-loads GSAP and ScrollTrigger for once-only reveals; `HeroIntro` staggers hero text and cards with CSS; `SmoothScroll` runs Lenis on fine pointers and stops at once when the switch is off; `Counter`. Every mini mockup and floating card pauses off-screen and freezes at its end state when motion is off.

**Styles** in `src/styles`: `interactions.css` (gradient ring sweep, lift, intent chips, segmented tabs, deck, fan strip, card pair, closing band, NFC visualiser, design-preview row), `mockups.css` (the mini mockup sequences), `extras.css` (objects on cards, free-standing people, hero glow, laptop frame, footer clearance).

**Content as data** in `src/content`: `home.ts`, `plans.ts` (plans, cards, bundles, comparison rows, card options, shipping regions), `features.ts`, `usecases.ts`, `help.ts` (48 starter entries in 12 categories), `design.ts`, `og.ts`.

**Library** in `src/lib`: `site.ts` (`pageMeta`, `absoluteAsset`, the app and store URLs), `glossary.ts`, `screens.ts` (build-time resolvers for captures and generated assets), `forms.ts` (defensive JSON parsing, 16 KB cap, per-address rate limit, Turnstile, Resend), `knowledge.ts` (retrieval with a relevance gate), `markdown.ts`.

**Pipelines** in `scripts` and `captures`: `capture-login.ts` (the owner signs in by hand on both hosts; nothing is typed by the script), `capture.ts` (two hosts, dark theme, masks, checksum log; unconfirmed paths skipped), `capture-prototype.ts` (the three prototype screens as design previews), `og.ts` (1200 x 630 with DM Sans and Inter, a phone at the right, a person when one exists), `a11y.ts`, `review.ts`, `review-slices.ts`, `brand-build.ts`, `tokens-build.ts`.

**Security and forms.** CSP and the other headers in `next.config.ts`; `/api/lead`, `/api/subscribe`, `/api/community` and `/api/chat` answer 400 to malformed bodies, 429 past the per-address limit, 503 with honest copy when unconfigured; the chat route retrieves its own context server-side.

## What was verified, with evidence

| Check | Result |
| --- | --- |
| `pnpm typecheck`, `pnpm lint`, `pnpm test` | Clean. 7 tests pass (tokens checksum and palette, markdown renderer). |
| `pnpm build` | 31 static routes plus 4 API routes; home is 10 kB of route JS on a 102 kB shared bundle (128 kB first load). |
| `pnpm review` at 390 and 1440 on all 18 routes | No horizontal scroll, no page errors, 0 problems. One overflow found and fixed (the hero glow overhung the container by 1 px). |
| `pnpm a11y` at 390 and 1440 on all routes plus `/system` | 0 serious or critical axe problems after one contrast fix (a header sub-label on the comparison table); heading order, one H1 and one main on every page; keyboard pass shows visible focus and a name on every stop. |
| Motion | Hero stagger, deck fan, floating drift, mini mockups and Lenis run with motion on; `?motion=off` freezes every sequence at its end state. |

## What was decided

D1 to D14 in `docs/decision-log.md`.

## Blocked on the client

- C2, one sign-in on this machine for the capture pipeline and the app walk-through; C3, logo vectors and card photographs; C4, the image plan budget; C5, the billing currency and confirmed prices.

## Honest gaps

- No real capture exists yet; every phone frame is a prototype design preview or a pending state.
- No people, 3D objects or FAQ scenes exist yet; the slots are built and resolve at build time.
- The Magnific balance check was refused by the session's permission classifier, so the image plan is priced from the Grownz cost records.
- Cross-browser passes on Safari, Firefox, Edge, iOS Safari and Android Chrome were not run here; the CSS uses `color-mix`, container units and `@property`, which degrade to static rings and fixed radii where unsupported.
