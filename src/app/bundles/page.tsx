import type { Metadata } from 'next';
import Image from 'next/image';
import { Button, TextLink } from '@/components/Button';
import { ClosingBand } from '@/components/ClosingBand';
import { Faq } from '@/components/Faq';
import { PageHero } from '@/components/PageHero';
import { Bundles } from '@/components/home/Bundles';
import { BUNDLES } from '@/content/plans';
import { STORE_URL, pageMeta } from '@/lib/site';

export const metadata: Metadata = pageMeta(
  'Bundles: Signature Bundle and Founders Circle Bundle',
  'The Signature Bundle is any Signature NFC card plus 1 year of PRM Pro for $100. The Founders Circle Bundle is the Founders Circle NFC card plus lifetime Pro for $150, one time. Ships within the UAE, shipping included.',
  '/bundles',
  { image: '/og/bundles.png' },
);

const FAQ = [
  { q: 'What is in the Signature Bundle?', a: 'Any Signature card plus 1 year of Pro, for $100, the price of Pro alone.' },
  { q: 'What is in the Founders Circle Bundle?', a: 'The Founders Circle card plus lifetime Pro for a one-time $150. Limited availability.' },
  { q: 'What happens after the first year of the Signature Bundle?', a: 'Pro renews at $100 a year unless you cancel. The card keeps PRM Essential.' },
  { q: 'Is shipping included?', a: 'Yes, within the UAE.' },
] as const;

export default function BundlesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Bundles', href: '/bundles' }]}
        eyebrow="Bundled offers"
        title={
          <>
            Get the NFC card and PRM Pro <span className="em-coral">together</span>, and save.
          </>
        }
        lede="Your card and Pro in one purchase, for less than buying both."
        ctas={
          <>
            <Button href={STORE_URL} size="lg">
              Get your NFC card
            </Button>
            <TextLink href="/pricing">Compare PRM plans</TextLink>
          </>
        }
        side={
          <div className="relative w-[min(100%,480px)]">
            <div className="v2-glow left-[-10%] top-[-10%] w-[120%]" aria-hidden="true" />
            <Image src="/assets/gen/hero-tap.webp" alt="A hand tapping a Linkist NFC card on a phone" width={928} height={1152} priority sizes="(min-width: 1024px) 480px, 90vw" className="home-hero__photo v2-float relative" />
          </div>
        }
      />

      <section className="section !pt-0">
        <div className="container">
          <Bundles headingLevel={2} />
        </div>
      </section>

      <section id="faq" className="section section--charcoal">
        <div className="container">
          <Faq items={FAQ} jsonLd eyebrow="Questions" title={<>About the {BUNDLES.length} bundles.</>} />
        </div>
      </section>

      <ClosingBand line1="An NFC card in your hand." line2="Pro in your pocket." cta="Get your NFC card" href={STORE_URL} reassurance="One purchase, free UAE shipping. Essential needs no card." />
    </>
  );
}
