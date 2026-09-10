import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button, TextLink } from '@/components/Button';
import { ClosingBand } from '@/components/ClosingBand';
import { Faq } from '@/components/Faq';
import { Section, SectionHead } from '@/components/Section';
import { Bundles } from '@/components/home/Bundles';
import { BUNDLES } from '@/content/plans';
import { person } from '@/lib/screens';
import { APP_URL, pageMeta } from '@/lib/site';

export const metadata: Metadata = pageMeta(
  'Bundles: Signature Bundle and Founders Circle Bundle',
  'The Signature Bundle is any Signature card plus 1 year of PRM Pro for $100. The Founders Circle Bundle is the Founders Circle card plus lifetime Pro for $150, one time. UAE shipping included.',
  '/bundles',
  { image: '/og/bundles.png' },
);

const FAQ = [
  { q: 'What is in the Signature Bundle?', a: 'Any Signature card, in PVC, wood or metal, plus 1 year of PRM Pro, for $100. That is the same $100 as Pro alone for a year.' },
  { q: 'What is in the Founders Circle Bundle?', a: 'The Founders Circle card plus lifetime PRM Pro for a one-time $150, with early-supporter recognition. Availability is limited; the store confirms whether it is still open.' },
  { q: 'What happens after the first year of the Signature Bundle?', a: 'Pro renews at its yearly price of $100 unless you cancel. The card is yours either way and keeps PRM Essential.' },
  { q: 'Is shipping included?', a: 'Card shipping is included in the UAE. Other destinations are confirmed at checkout.' },
] as const;

export default function BundlesPage() {
  return (
    <>
      <Section tight className="pt-8 sm:pt-10">
        <Breadcrumbs items={[{ label: 'Bundles', href: '/bundles' }]} />
        <div className="mt-8">
          <SectionHead as="h1" size={1} eyebrow="Bundled offers" title={<>Get the NFC card and PRM Pro <span className="em-coral">together</span>, and save.</>} lede="Bundles combine the physical Linkist card with the Pro plan in one purchase. You get the full Linkist experience immediately, for less than buying the card and Pro separately." />
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Button href={`${APP_URL}/store`} size="lg">
              Get your card
            </Button>
            <TextLink href="/pricing">Compare PRM plans</TextLink>
          </div>
        </div>
      </Section>

      <Section tone="charcoal" glow>
        <Bundles headingLevel={2} />
      </Section>

      <Section tight id="faq">
        <SectionHead eyebrow="Questions" title={<>About the {BUNDLES.length} bundles.</>} />
        <div className="mt-10 max-w-3xl">
          <Faq items={FAQ} jsonLd />
        </div>
      </Section>

      <ClosingBand line1="A card in your hand." line2="Pro in your pocket." cta="Get your card" href={`${APP_URL}/store`} reassurance="One purchase. UAE shipping included. Prefer to start free? The Essential plan needs no card." person={person('close-2')} />
    </>
  );
}
