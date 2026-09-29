import Image from 'next/image';

/**
 * The tap scene on /nfc-cards (owner, 29 September 2026): what the other person sees. Natalie
 * Vale's Signature card sweeps in and touches the top of a phone at rest, the NFC rings fire, and
 * her public profile opens from the point of the tap: in the light theme on one tap, the dark theme
 * on the next. The profiles are the v12 prototype's own preview (pnpm capture:v12 profile).
 * Motion off: the card rests at the top of the phone over her profile, light.
 */
export function TapProfile() {
  return (
    <div
      className="tapmoment relative flex w-full justify-center py-6"
      role="img"
      aria-label="A Linkist NFC card taps a phone and the card owner's profile opens on it, in the light theme and then the dark theme. Natalie Vale is an example."
      data-reveal="rise"
    >
      <div className="v2-glow w-[min(100%,440px)]" aria-hidden="true" />
      <div className="relative w-full max-w-[260px]" aria-hidden="true">
        <div className="phone !max-w-none">
          <div className="phone__notch" />
          <div className="phone__screen">
            <div className="tapmoment__lock">
              <div className="tapmoment__status">
                <span>15:45</span>
                <span className="tapmoment__glyphs">
                  <i />
                  <i />
                  <b />
                </span>
              </div>
              <p className="tapmoment__clock">15:45</p>
              <p className="tapmoment__date">Tuesday 29 September</p>
            </div>
            <Image src="/screens/v12-profile-natalie-light.webp" alt="" fill sizes="260px" className="tapmoment__profile tapmoment__profile--light" />
            <Image src="/screens/v12-profile-natalie-dark.webp" alt="" fill sizes="260px" className="tapmoment__profile tapmoment__profile--dark" />
          </div>
        </div>
        <div className="tapmoment__card">
          <Image src="/assets/cards/sample-natalie-2x.webp" alt="" width={1200} height={761} sizes="170px" className="h-auto w-full" />
        </div>
        <span className="tapmoment__rings">
          <span />
          <span />
          <span />
        </span>
      </div>
    </div>
  );
}
