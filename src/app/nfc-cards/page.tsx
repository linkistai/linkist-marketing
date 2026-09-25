import type { Metadata } from 'next';
import Image from 'next/image';
import { Button, TextLink } from '@/components/Button';
import { ClosingBand } from '@/components/ClosingBand';
import { Faq } from '@/components/Faq';
import { NfcCardLayers } from '@/components/NfcCardLayers';
import { PageHero } from '@/components/PageHero';
import { PhoneStage } from '@/components/PhoneStage';
import { SectionHead } from '@/components/Section';
import { CardTiers } from '@/components/home/CardTiers';
import { PROTO_ALT } from '@/content/design';
import { CARD_OPTIONS, CARD_TIERS, SHIPPING_REGIONS } from '@/content/plans';
import { screen } from '@/lib/screens';
import { NFC_TOOLS_URL, STORE_URL, pageMeta } from '@/lib/site';

export const metadata: Metadata = pageMeta(
  'NFC cards: Starter and Signature in PVC, wood and metal',
  'A Linkist NFC card opens your live profile with one tap. Starter from AED 75 ($20), Signature with your name and logo from AED 95 ($25), in PVC, cherry wood or brushed metal. Every NFC card includes PRM Essential. Ships within the UAE.',
  '/nfc-cards',
  { image: '/og/nfc-cards.png' },
);

const TAP = [
  { title: 'Tap', body: 'Hold the card to an NFC phone. They need no app.' },
  { title: 'Your profile opens', body: 'Your live digital card: photo, details, links.' },
  { title: 'They keep your details', body: 'Your details land in their phone. If they use Linkist, both of you keep the meeting.' },
  { title: 'It stays current', body: 'Update once. Every card you ever tapped shows the change.' },
] as const;

const FAQ = [
  { q: 'Does the other person need Linkist?', a: 'No. A tap opens your profile in their browser.' },
  { q: 'Which phones work?', a: 'Most recent iPhones and Android phones. Your QR code covers the rest.' },
  { q: 'What is the difference between Starter and Signature?', a: 'Signature adds your name and logo. Both come in PVC, wood or metal with PRM Essential.' },
  { q: 'Which currency are cards priced in?', a: 'AED and US dollars; the USD / AED switch shows either. The store checks out in AED.' },
  { q: 'Is shipping included?', a: 'Yes, within the UAE. Other countries are not served yet.' },
  { q: 'Can I use an NFC card I already own?', a: 'Yes, free, at nfctools.linkist.ai. Encoding needs an Android phone.' },
  { q: 'Can I return an NFC card?', a: 'Yes, within 7 days, if it is defective, misprinted or differs from your order.' },
] as const;

/** Product with an AggregateOffer across the six store prices (AED 75 to 240). */
const PRODUCT_LD = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Linkist NFC card',
  description: 'An NFC business card that opens your live Linkist profile with one tap. Starter or Signature, in PVC, cherry wood or brushed metal. Every card includes PRM Essential.',
  brand: { '@type': 'Brand', name: 'Linkist' },
  offers: { '@type': 'AggregateOffer', priceCurrency: 'AED', lowPrice: Math.min(...CARD_TIERS.flatMap((t) => Object.values(t.prices.AED))), highPrice: Math.max(...CARD_TIERS.flatMap((t) => Object.values(t.prices.AED))), offerCount: 6, availability: 'https://schema.org/InStock', areaServed: 'AE' },
};

export default function NfcCardsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PRODUCT_LD) }} />
      <PageHero
        crumbs={[{ label: 'NFC cards', href: '/nfc-cards' }]}
        eyebrow="Linkist NFC cards"
        title={
          <>
            Tap. Share. Make the <span className="em-coral">first impression</span> count.
          </>
        }
        lede="A card that opens your live profile on any NFC phone, or by QR, and remembers the meeting. Includes PRM Essential."
        ctas={
          <>
            <Button href={STORE_URL} size="lg">
              Get your NFC card
            </Button>
            <TextLink href="#tiers">See NFC card pricing</TextLink>
          </>
        }
        side={
          <div className="relative flex w-full flex-col items-center">
            <div className="v2-glow w-[90%]" aria-hidden="true" />
            <NfcCardLayers className="relative" />
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-body">Inside a Linkist NFC card</p>
          </div>
        }
      />

      <section className="section section--charcoal">
        <div className="container">
          <SectionHead eyebrow="What a tap does" title={<>One tap replaces <span className="em-coral">the whole ritual</span>.</>} lede="No typing, no paper." center />
          <div className="mt-[clamp(40px,5vw,64px)] grid items-center gap-[clamp(32px,5vw,72px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
            <ol className="m-0 grid list-none gap-3.5 p-0 sm:grid-cols-2" data-reveal="rise" data-reveal-stagger="0.08">
              {TAP.map((t, i) => (
                <li key={t.title} className="card flex flex-col gap-7 p-[clamp(22px,2.6vw,28px)]">
                  <span aria-hidden="true" className="font-mono text-[13px] text-coral">
                    /{String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Step {i + 1}</p>
                    <h3 className="display-3 mt-1">{t.title}</h3>
                    <p className="mt-2 text-sm leading-normal text-body">{t.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="tapmoment relative flex justify-center" data-reveal="rise">
              <PhoneStage src={screen('v6-share')} alt={PROTO_ALT['v6-share']} width={260} />
              {/* The tap moment: a card comes in, touches the top of the phone, and the NFC rings fire at the touch. */}
              <div className="tapmoment__card" aria-hidden="true">
                <Image src="/assets/cards/card-metal.webp" alt="" width={1200} height={780} sizes="170px" className="h-auto w-full" />
              </div>
              <span className="tapmoment__rings" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="tiers" className="section scroll-mt-[90px]">
        <div className="container">
          <SectionHead eyebrow="NFC card pricing" title={<>Two tiers, <span className="em-coral">three materials</span>.</>} lede="Signature adds your name and logo. One-time prices, PRM Essential included." center />
          <div className="mt-[clamp(40px,5vw,64px)]">
            <CardTiers cta={{ href: '/bundles', label: 'See the bundles' }} />
          </div>
          <ul className="m-0 mt-12 grid list-none gap-3.5 p-0 [grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))]" data-reveal="rise" data-reveal-stagger="0.06">
            {CARD_OPTIONS.map((o) => (
              <li key={o.material} className="card p-[22px]">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-coral">{o.finish}</p>
                <h3 className="display-3 mt-2">{o.material}</h3>
                <p className="mt-2 text-sm text-body">
                  {o.colours.join(' or ')}. {o.patterns.length > 1 ? `${o.patterns.join(', ')} patterns.` : `${o.patterns[0]} finish.`}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="byo" className="section section--charcoal">
        <div className="container">
          <div className="grid items-center gap-[clamp(32px,5vw,72px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
            <div data-reveal="rise">
              <p className="eyebrow eyebrow--plain">Bring your own NFC</p>
              <h2 className="display-2 mt-4">
                Already have an NFC card? <span className="em-coral">Make it live, free.</span>
              </h2>
              <p className="lede mt-5">Tap a card or sticker you own and Linkist writes your live profile onto it.</p>
              <p className="mt-4 text-[13px] text-muted">Free forever. Encoding needs Android; the profile works everywhere.</p>
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
                <Button href={NFC_TOOLS_URL} variant="secondary">
                  Activate the NFC card you already have
                </Button>
                <TextLink href="/bring-your-own">How bring-your-own works</TextLink>
              </div>
            </div>
            <ul className="m-0 grid list-none gap-3.5 p-0 sm:grid-cols-2" data-reveal="rise" data-reveal-stagger="0.1">
              {[
                ['An NFC card or sticker', 'Tap it. Linkist reads the chip, then writes your profile.'],
                ['Change it forever', 'One permanent address. A new role never needs a new card.'],
              ].map(([t, b], i) => (
                <li key={t} className="card flex flex-col gap-7 p-6">
                  <span aria-hidden="true" className="font-mono text-[13px] text-coral">
                    /{String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="display-3">{t}</h3>
                    <p className="mt-2 text-sm text-body">{b}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="shipping" className="section">
        <div className="container">
          <SectionHead eyebrow="Shipping" title={<>Ships within <span className="em-coral">the UAE</span>.</>} lede="Free across the UAE. Other countries are not served yet." />
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Shipping region" data-reveal="fade">
            {SHIPPING_REGIONS.map((r) => (
              <li key={r} className="tag">
                {r}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="faq" className="section section--charcoal">
        <div className="container">
          <Faq items={FAQ} jsonLd eyebrow="Questions" title="About the cards." />
        </div>
      </section>

      <ClosingBand image="tap" line1="Order a card, or start without one." line2="PRM Essential included." cta="Get your NFC card" href={STORE_URL} reassurance="Free UAE shipping. Essential needs no card." />
    </>
  );
}
