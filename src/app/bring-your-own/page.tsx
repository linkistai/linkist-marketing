import type { Metadata } from 'next';
import { ArrowRight, Brain, Inbox, Nfc, RefreshCw } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button, TextLink } from '@/components/Button';
import { ClosingBand } from '@/components/ClosingBand';
import { Faq } from '@/components/Faq';
import { ScreenFrame } from '@/components/ScreenFrame';
import { Section } from '@/components/Section';
import { PROTO_ALT } from '@/content/design';
import { person, screen } from '@/lib/screens';
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
    body: 'Tap it on your phone to see what is on the chip today. Then write your Linkist profile onto it:',
    list: [
      ['Already have a Linkist profile?', 'Write it straight to the card.'],
      ['Starting fresh?', 'Create your Linkist digital profile first, then write it.'],
    ],
    href: NFC_TOOLS_URL,
  },
] as const;

const FEATURES = [
  { icon: RefreshCw, title: 'Change it forever', body: 'Your details live behind one permanent address, so a new role never means a new card.' },
  { icon: Inbox, title: 'Keep who you meet', body: 'Everyone who taps you arrives in your exchange inbox instead of vanishing.' },
  { icon: Brain, title: 'It remembers', body: 'Linkist holds the context of the conversation, not just the contact details.' },
] as const;

const FAQ = [
  { q: 'Does it cost anything?', a: 'No. Bringing your own card or sticker is free forever and asks for no payment details. Every profile includes the PRM Essential plan.' },
  { q: 'Which cards and stickers work?', a: 'Any NFC card or sticker with a writable NTAG-type chip, which covers the cards most other digital-card brands ship. The NFC tools site reads the chip first and tells you if it cannot be written.' },
  { q: 'Do I need a particular phone?', a: 'Encoding a chip needs an Android phone with NFC. The profile written onto the card then opens on every phone, iPhone included.' },
  { q: 'What happens to the old link on the card?', a: 'It is replaced by your Linkist address. Anyone who taps the card from then on sees your live Linkist profile, and you can change what it shows at any time without touching the card again.' },
] as const;

export default function BringYourOwnPage() {
  return (
    <>
      <Section tight className="pt-8 sm:pt-10">
        <Breadcrumbs items={[{ label: 'NFC cards', href: '/nfc-cards' }, { label: 'Bring your own NFC', href: '/bring-your-own' }]} />
        <div className="mt-8 grid items-center gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div>
            <p className="eyebrow">Bring your own NFC</p>
            <h1 className="display-1 mt-5">
              Already have a NFC card or sticker?
              <br />
              <span className="em-coral">Bring it. We will make it live.</span>
            </h1>
            <p className="lede mt-6 max-w-2xl">You do not need to buy anything to start. If you already own an NFC card or sticker, Linkist takes it over in about a minute. You keep the hardware. You get the intelligence.</p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Button href={NFC_TOOLS_URL} size="lg">
                Activate what I already have
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
              <TextLink href="/nfc-cards">Or get a Linkist NFC card</TextLink>
            </div>
            <p className="mt-4 text-sm text-muted">Free forever · No payment details · Encoding a chip needs an Android phone; your profile works on every device</p>
          </div>
          <div className="flex justify-center" data-reveal="rise">
            <div className="w-full max-w-[280px]">
              <ScreenFrame kind="phone" src={screen('v6-shareready')} alt={PROTO_ALT['v6-shareready']} preview full priority />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="charcoal" id="paths">
        <div className="mx-auto grid max-w-2xl gap-5" data-reveal="rise" data-reveal-stagger="0.1">
          {PATHS.map((p) => (
            <a key={p.key} href={p.href} className="card lift flex flex-col p-8 no-underline">
              <span className="chip__icon" aria-hidden="true">
                <p.icon size={16} />
              </span>
              <h2 className="display-3 mt-6">{p.title}</h2>
              <p className="mt-3 text-sm text-body">{p.body}</p>
              {p.list.length > 0 ? (
                <ul className="mt-4 flex flex-col gap-2 text-sm text-body">
                  {p.list.map(([lead, rest]) => (
                    <li key={lead} className="flex gap-2">
                      <span aria-hidden="true" className="mt-2 h-1 w-1 flex-none rounded-full bg-crimson" />
                      <span>
                        <strong className="font-medium text-text">{lead}</strong> {rest}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
              <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-medium">
                Start with this <ArrowRight size={14} aria-hidden="true" className="text-coral" />
              </span>
            </a>
          ))}
        </div>
        <div className="mx-auto mt-12 grid max-w-4xl gap-8 border-t border-line pt-10 sm:grid-cols-3" data-reveal="rise" data-reveal-stagger="0.08">
          {FEATURES.map((f) => (
            <div key={f.title}>
              <f.icon size={18} aria-hidden="true" className="text-crimson" />
              <h3 className="mt-3 text-md font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-body">{f.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tight id="faq">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">Questions</p>
          <h2 className="display-2 mt-4">Before you tap.</h2>
          <div className="mt-8">
            <Faq items={FAQ} jsonLd />
          </div>
        </div>
      </Section>

      <ClosingBand line1="Keep the card." line2="Get the intelligence." cta="Activate what I already have" href={NFC_TOOLS_URL} reassurance="Free forever. No payment details. Works with the NFC card or sticker you already own." person={person('close-2')} />
    </>
  );
}
