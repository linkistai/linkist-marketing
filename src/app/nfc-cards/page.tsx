import type { Metadata } from 'next';
import { Link2, Nfc, QrCode, RefreshCw, UserCheck } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button, TextLink } from '@/components/Button';
import { ClosingBand } from '@/components/ClosingBand';
import { Faq } from '@/components/Faq';
import { NfcCard } from '@/components/NfcCard';
import { MiniMock } from '@/components/mockups/MiniMock';
import { ScreenFrame } from '@/components/ScreenFrame';
import { Section, SectionHead } from '@/components/Section';
import { CardTiers } from '@/components/home/CardTiers';
import { HeroIntro } from '@/motion/HeroIntro';
import { PROTO_ALT } from '@/content/design';
import { CARD_OPTIONS, MATERIALS, SHIPPING_REGIONS } from '@/content/plans';
import { person, screen } from '@/lib/screens';
import { APP_URL, pageMeta } from '@/lib/site';

export const metadata: Metadata = pageMeta(
  'NFC cards: Starter and Signature in PVC, wood and metal',
  'A Linkist NFC card opens your live profile with one tap. Starter from AED 75 (about $20), Signature with your name and logo from AED 95 (about $26), in PVC, cherry wood or brushed metal. Every card includes PRM Essential.',
  '/nfc-cards',
  { image: '/og/nfc-cards.png' },
);

const TAP = [
  { icon: Nfc, title: 'Tap', body: 'Hold the card to any modern phone. No app is needed on their side.' },
  { icon: UserCheck, title: 'Your profile opens', body: 'Your live digital business card, with your photo, details and links.' },
  { icon: QrCode, title: 'They save you', body: 'One tap saves your details. If they use Linkist, the meeting is captured on both sides.' },
  { icon: RefreshCw, title: 'It stays current', body: 'Change your role or number once. Every card you ever tapped shows the new details.' },
] as const;

const FAQ = [
  { q: 'Does the other person need Linkist?', a: 'No. A tap opens your profile in their phone browser. If they use Linkist, both of you keep the context.' },
  { q: 'Which phones work?', a: 'Any phone with NFC, which is most iPhones and Android phones sold in recent years. The QR code on your profile covers the rest.' },
  { q: 'What is the difference between Starter and Signature?', a: 'Starter has no customisation. Signature carries your name and logo. Both come in PVC, cherry wood or brushed metal and both include PRM Essential.' },
  { q: 'Which currency are cards priced in?', a: 'The store prices in AED and shows an approximate dollar figure beside each card. VAT is shown upfront at checkout.' },
  { q: 'Is shipping included?', a: 'Card shipping is included in the UAE. The store ships to 16 regions across the GCC and worldwide; elsewhere the cost is shown at checkout.' },
  { q: 'Can I use a card I already own?', a: 'Yes, free. Tap your existing NFC card or sticker on your phone and Linkist writes your live profile onto it, or paste an old profile link. Encoding a chip needs an Android phone.' },
  { q: 'Can I return a card?', a: 'Custom products are returnable where the product is defective, there was a production error, or it differs materially from the confirmed order, within 7 days of delivery.' },
] as const;

export default function NfcCardsPage() {
  return (
    <>
      <section className="section pt-8 sm:pt-10">
        <div className="container">
          <Breadcrumbs items={[{ label: 'NFC cards', href: '/nfc-cards' }]} />
          <HeroIntro className="mt-8 grid items-center gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)]">
            <div className="max-w-xl">
              <p className="eyebrow" data-hero-text>
                Linkist NFC cards
              </p>
              <h1 className="display-1 mt-5" data-hero-text>
                Tap. Share. Make the <span className="em-coral">first impression</span> count.
              </h1>
              <p className="lede mt-5" data-hero-text>
                A card that opens your live professional profile on any phone, and remembers the meeting for you. Every card includes PRM Essential.
              </p>
              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center" data-hero-text>
                <Button href={`${APP_URL}/store`} size="lg">
                  Get your card
                </Button>
                <TextLink href="#tiers">Compare Starter and Signature</TextLink>
              </div>
            </div>
            <div className="hero-stage relative">
              <div className="grid grid-cols-3 items-end gap-4 px-2 sm:px-6" data-hero-card="1">
                {MATERIALS.map((m, i) => (
                  <div key={m.key} style={{ transform: `translateY(${i === 1 ? -24 : 0}px)` }}>
                    <NfcCard material={m.key} tier="signature" name="Olivia Jones" meta="NYU Abu Dhabi" />
                    <p className="mt-3 text-center text-xs font-semibold uppercase tracking-[0.04em] text-body">{m.name}</p>
                  </div>
                ))}
              </div>
              <p className="disclaimer mt-6 text-center">Drawn from the design tokens. Product photographs replace these renders.</p>
            </div>
          </HeroIntro>
        </div>
      </section>

      <Section tone="charcoal" glow>
        <SectionHead eyebrow="What a tap does" title={<>One tap replaces <span className="em-coral">the whole ritual</span>.</>} lede="No fumbling, no typing, no paper that gets thrown away." center />
        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <ol className="grid gap-4 sm:grid-cols-2" data-reveal="rise" data-reveal-stagger="0.08">
            {TAP.map((t, i) => (
              <li key={t.title} className="card card--sm p-6">
                <span className="chip__icon" aria-hidden="true">
                  <t.icon size={14} />
                </span>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.04em] text-muted">Step {i + 1}</p>
                <h3 className="display-3 mt-1 text-[20px]">{t.title}</h3>
                <p className="mt-2 text-sm text-body">{t.body}</p>
              </li>
            ))}
          </ol>
          <div className="flex flex-col items-center gap-6" data-reveal="rise">
            <div className="w-full max-w-[260px]">
              <ScreenFrame kind="phone" src={screen('proto-share')} alt={PROTO_ALT['proto-share']} preview full />
            </div>
            <div className="card w-full max-w-sm p-5">
              <p className="font-semibold">The tap moment</p>
              <MiniMock mock={{ kind: 'tap', label: 'A card tapping a phone, then the profile is shared' }} />
            </div>
          </div>
        </div>
      </Section>

      <Section id="tiers">
        <SectionHead eyebrow="Starter and Signature" title={<>Two tiers, <span className="em-coral">three materials</span>.</>} lede="Starter has no customisation. Signature carries your name and logo. One-time prices; every card includes PRM Essential." center />
        <div className="mt-12">
          <CardTiers cta={{ href: '/bundles', label: 'See the bundles' }} />
        </div>
        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3" data-reveal="rise" data-reveal-stagger="0.06">
          {CARD_OPTIONS.map((o) => (
            <div key={o.material} className="card card--sm p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">{o.finish}</p>
              <h3 className="display-3 mt-1 text-[20px]">{o.material}</h3>
              <p className="mt-2 text-sm text-body">
                {o.colours.join(' or ')}. {o.patterns.length > 1 ? `${o.patterns.join(', ')} patterns.` : `${o.patterns[0]} finish.`}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="lifted" id="byo">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div data-reveal="rise">
            <p className="eyebrow">Bring your own</p>
            <h2 className="display-2 mt-4">
              Already have a card? <span className="em-coral">Make it live, free.</span>
            </h2>
            <p className="lede mt-4">Keep your hardware and put Linkist on it. Tap an NFC card or sticker you already own and Linkist writes your live profile onto it, or paste an old profile link and your Linkist profile builds itself.</p>
            <p className="mt-4 text-sm text-muted">Free forever, no payment details. Encoding a chip needs an Android phone; the profile then works on every device.</p>
            <div className="mt-6">
              <Button href={`${APP_URL}/store`} variant="secondary">
                Activate what you already have
              </Button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2" data-reveal="rise" data-reveal-stagger="0.1">
            <div className="card card--sm p-6">
              <span className="chip__icon" aria-hidden="true">
                <Nfc size={14} />
              </span>
              <h3 className="display-3 mt-3 text-[20px]">An NFC card or sticker</h3>
              <p className="mt-2 text-sm text-body">Tap it on your phone. Linkist shows what is on the chip, then writes your live profile onto it.</p>
            </div>
            <div className="card card--sm p-6">
              <span className="chip__icon" aria-hidden="true">
                <Link2 size={14} />
              </span>
              <h3 className="display-3 mt-3 text-[20px]">Any existing profile link</h3>
              <p className="mt-2 text-sm text-body">A Linktree, a personal site, an old card link. Paste it and your Linkist profile builds itself.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section tight id="shipping">
        <SectionHead eyebrow="Shipping" title={<>Ships across the GCC <span className="em-coral">and worldwide</span>.</>} lede="Card shipping is included in the UAE. The store lists 16 regions; elsewhere the cost is shown at checkout with VAT upfront." />
        <ul className="mt-8 flex flex-wrap gap-2" aria-label="Shipping regions" data-reveal="fade">
          {SHIPPING_REGIONS.map((r) => (
            <li key={r} className="tag">
              {r}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="charcoal" tight id="faq">
        <SectionHead eyebrow="Questions" title="About the cards." />
        <div className="mt-10 max-w-3xl">
          <Faq items={FAQ} jsonLd />
        </div>
      </Section>

      <ClosingBand line1="Order a card, or start without one." line2="Every card includes PRM Essential." cta="Get your card" href={`${APP_URL}/store`} reassurance="UAE shipping included. Prefer to start free? The Essential plan needs no card." person={person('close-1')} />
    </>
  );
}
