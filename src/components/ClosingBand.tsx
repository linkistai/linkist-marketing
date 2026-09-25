import Image from 'next/image';
import { Button } from '@/components/Button';
import { G } from '@/lib/glossary';
import { START_URL } from '@/lib/site';

/**
 * The v2 closing band: a 36 px panel lit by a red glow from the lower right. Left, a two-line H2
 * with the second line in red, one primary CTA and a reassurance line; right, a floating cutout,
 * decorative: the metal, wood and PVC cards by default, the person cutout on the home page, or
 * `tap`, the hand tapping a card on a phone with NFC rings (owner, 25 September 2026, /nfc-cards).
 * (`person` and `personAlt` are kept for callers of the v1 band and are ignored.)
 */
export function ClosingBand({
  line1 = 'Capture the people you meet.',
  line2 = 'Remember why they mattered.',
  reassurance = G.reassurance,
  cta = G.ctaPrimary,
  href = START_URL,
  image = 'cards',
}: {
  line1?: string;
  line2?: string;
  reassurance?: string;
  cta?: string;
  href?: string;
  image?: 'cards' | 'portrait' | 'tap';
  person?: string;
  personAlt?: string;
}) {
  return (
    <section className="pb-[clamp(80px,10vw,120px)] pt-[clamp(40px,6vw,80px)]">
      <div className="container">
        <div className="closing" data-reveal="rise" data-image={image}>
          <div className="relative z-[2]">
            <h2 className="display-2 !text-[clamp(34px,4.6vw,64px)]">
              {line1}
              <br />
              <span className="em-coral">{line2}</span>
            </h2>
            <div className="mt-8">
              <Button href={href} variant="primary" size="lg">
                {cta}
              </Button>
            </div>
            <p className="mt-4 text-sm text-body">{reassurance}</p>
          </div>
          <div className="closing__art" aria-hidden="true">
            {image === 'portrait' ? (
              <Image src="/assets/gen/portrait-cut.webp" alt="" width={896} height={1200} sizes="(min-width: 1024px) 440px, 60vw" className="closing__portrait" />
            ) : image === 'tap' ? (
              <div className="closing__tap">
                <Image src="/assets/gen/cards-cut.webp" alt="" width={1024} height={1024} sizes="160px" className="closing__tap-cards v2-float" style={{ ['--float-dur' as string]: '10s' }} />
                <div className="closing__tap-photo v2-float" style={{ ['--float-dur' as string]: '7s' }}>
                  <Image src="/assets/gen/hero-tap.webp" alt="" width={928} height={1152} sizes="(min-width: 1024px) 400px, 70vw" className="home-hero__photo h-full w-auto" />
                  <span className="v2-ripple absolute left-[53%] top-[33%] h-0 w-0" style={{ ['--ripple-gap' as string]: '0.5s' }}>
                    <span />
                    <span />
                    <span />
                  </span>
                </div>
              </div>
            ) : (
              <Image src="/assets/gen/cards-cut.webp" alt="" width={1024} height={1024} sizes="(min-width: 1024px) 340px, 60vw" className="closing__cards v2-float" style={{ ['--float-dur' as string]: '9s' }} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
