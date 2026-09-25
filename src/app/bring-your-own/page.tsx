import type { Metadata } from 'next';
import { ArrowRight, Brain, Inbox, Nfc, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import { Button, TextLink } from '@/components/Button';
import { ClosingBand } from '@/components/ClosingBand';
import { Faq } from '@/components/Faq';
import { PageHero } from '@/components/PageHero';
import { NFC_TOOLS_URL, pageMeta } from '@/lib/site';

export const metadata: Metadata = pageMeta(
  'Bring your own NFC',
  'Already have an NFC card or sticker? Linkist takes it over in about a minute, free. You keep the hardware and get the intelligence.',
  '/bring-your-own',
  { image: '/og/bring-your-own.png' },
);

/**
 * Bring your own (D51, from linkist-bring-your-own-nfc-v1.html): the page behind "Already have an
 * NFC card? Bring your own" in the hero. One path, an NFC card or sticker, and one final button, both
 * opening the NFC tools site, which reads and writes the chip. The prototype's second path, an
 * existing profile link, was dropped: it only collected sign-up information (owner, 21 September 2026).
 */
const PATHS = [
  {
    key: 'nfc',
    icon: Nfc,
    title: 'An NFC card or sticker',
    body: 'Tap it to see what is on the chip, then write your Linkist profile:',
    list: [
      ['Already have a Linkist profile?', 'Write it straight to the card.'],
      ['Starting fresh?', 'Create your Linkist digital profile first, then write it.'],
    ],
    href: NFC_TOOLS_URL,
  },
] as const;

const FEATURES = [
  { icon: RefreshCw, title: 'Change it forever', body: 'One permanent address. A new role never needs a new card.' },
  { icon: Inbox, title: 'Keep who you meet', body: 'Everyone who taps you lands in your exchange inbox.' },
  { icon: Brain, title: 'It remembers', body: 'Linkist keeps the context, not just the details.' },
] as const;

const FAQ = [
  { q: 'Does it cost anything?', a: 'No. Free forever, no payment details. Every profile includes PRM Essential.' },
  { q: 'Which cards and stickers work?', a: 'Any writable NTAG-type NFC card or sticker. The tools site checks the chip first.' },
  { q: 'Do I need a particular phone?', a: 'Encoding needs an Android phone with NFC. The profile then opens on every phone.' },
  { q: 'What happens to the old link on the card?', a: 'It is replaced by your Linkist address, which you can update any time without touching the card.' },
] as const;

export default function BringYourOwnPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: 'NFC cards', href: '/nfc-cards' },
          { label: 'Bring your own NFC', href: '/bring-your-own' },
        ]}
        eyebrow="Bring your own NFC"
        title={
          <>
            Already have a NFC card or sticker? <span className="em-coral">Bring it. We will make it live.</span>
          </>
        }
        lede="Nothing to buy. Linkist takes over the card or sticker you own in about a minute. Keep the hardware, get the intelligence."
        ctas={
          <>
            <Button href={NFC_TOOLS_URL} size="lg">
              Activate what I already have
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <TextLink href="/nfc-cards">Or get a Linkist NFC card</TextLink>
          </>
        }
        note={<p className="mt-4 text-[13px] text-muted">Free forever · No payment details · Encode on Android, works everywhere</p>}
        side={
          <div className="relative aspect-[4/5] w-[min(100%,440px)] overflow-hidden rounded-[28px] border border-line">
            <Image src="/assets/gen/hero-tap.webp" alt="A hand tapping an NFC card to a phone" fill priority sizes="(min-width: 1024px) 440px, 90vw" className="object-cover" />
          </div>
        }
      />

      <section id="paths" className="section section--charcoal">
        <div className="container">
          <div className="mx-auto grid max-w-2xl gap-5" data-reveal="rise">
            {PATHS.map((p) => (
              <a key={p.key} href={p.href} className="card flex flex-col p-8 no-underline">
                <span aria-hidden="true" className="font-mono text-[13px] text-coral">
                  /01
                </span>
                <h2 className="display-3 mt-6">{p.title}</h2>
                <p className="mt-3 text-sm text-body">{p.body}</p>
                {p.list.length > 0 ? (
                  <ul className="mt-4 flex flex-col gap-2 text-sm text-body">
                    {p.list.map(([lead, rest]) => (
                      <li key={lead} className="flex gap-2">
                        <span aria-hidden="true" className="mt-2 h-1 w-1 flex-none rounded-full bg-red-bright" />
                        <span>
                          <strong className="font-medium text-white">{lead}</strong> {rest}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-coral">
                  Start with this <ArrowRight size={14} aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
          <ul className="m-0 mt-12 grid list-none gap-3.5 p-0 [grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))]" data-reveal="rise" data-reveal-stagger="0.08">
            {FEATURES.map((f, i) => (
              <li key={f.title} className="card flex flex-col gap-7 p-[clamp(22px,2.6vw,28px)]">
                <span aria-hidden="true" className="font-mono text-[13px] text-coral">
                  /{String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="display-3">{f.title}</h3>
                  <p className="mt-2 text-sm text-body">{f.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="faq" className="section">
        <div className="container">
          <Faq items={FAQ} jsonLd eyebrow="Questions" title="Before you tap." />
        </div>
      </section>

      <ClosingBand line1="Keep the card." line2="Get the intelligence." cta="Activate what I already have" href={NFC_TOOLS_URL} reassurance="Free forever. Works with the card or sticker you own." />
    </>
  );
}
