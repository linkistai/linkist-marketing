import type { Metadata } from 'next';
import { ArrowRight, Brain, Inbox, Nfc, RefreshCw } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button } from '@/components/Button';
import { ClosingBand } from '@/components/ClosingBand';
import { Faq } from '@/components/Faq';
import { NFC_TOOLS_URL, pageMeta } from '@/lib/site';

export const metadata: Metadata = pageMeta(
  'Bring your own NFC',
  'Already have an NFC card or sticker? Linkist takes it over in about a minute, free. You keep the hardware and get the intelligence.',
  '/bring-your-own',
  { image: '/og/bring-your-own.png' },
);

/**
 * Bring your own NFC, laid out after the owner's reference (linkist-bring-your-own-nfc-v1.html,
 * 25 September 2026): the heading in two tones, one path card, three reasons in a row, then the
 * one button with its small print. The path opens the NFC tools site, which reads and writes the
 * chip. The reference's second path, an existing profile link, stays out: it only collected
 * sign-up information (owner, 21 September 2026).
 */
const PATH = {
  icon: Nfc,
  title: 'An NFC card or sticker',
  body: 'Tap it on your phone. We will show you what is on the chip, then write your live Linkist profile onto it.',
  href: NFC_TOOLS_URL,
} as const;

const FEATURES = [
  { icon: RefreshCw, title: 'Change it forever', body: 'Your details live behind one permanent address, so a new role never means a new card.' },
  { icon: Inbox, title: 'Keep who you meet', body: 'Everyone who taps you arrives in your exchange inbox instead of vanishing.' },
  { icon: Brain, title: 'It remembers', body: 'Linkist holds the context of the conversation, not just the contact details.' },
] as const;

const FAQ = [
  { q: 'Does it cost anything?', a: 'No. Free forever, no payment details. Every profile includes PRM Essential.' },
  { q: 'Which cards and stickers work?', a: 'Any writable NTAG-type NFC card or sticker. The tools site checks the chip first.' },
  { q: 'Do I need a particular phone?', a: 'Encoding needs an Android phone with NFC. The profile then opens on every phone.' },
  { q: 'What happens to the old link on the card?', a: 'It is replaced by your Linkist address, which you can update any time without touching the card.' },
] as const;

export default function BringYourOwnPage() {
  const Icon = PATH.icon;
  return (
    <>
      <section className="page-hero" aria-labelledby="page-title">
        <div className="container">
          <div className="mb-7">
            <Breadcrumbs
              items={[
                { label: 'NFC cards', href: '/nfc-cards' },
                { label: 'Bring your own NFC', href: '/bring-your-own' },
              ]}
            />
          </div>
          <p className="eyebrow eyebrow--pulse" data-hero-text>
            Bring your own NFC · Free
          </p>
          <h1 id="page-title" className="display-1 mt-5 max-w-[1000px]" data-hero-text>
            Already have a NFC card or sticker? <span className="text-muted">Bring it. We will make it live.</span>
          </h1>
          <p className="lede mt-6 max-w-[760px]" data-hero-text>
            You do not need to buy anything to start. If you already own an NFC card or sticker, Linkist takes it over in about a minute. You keep the hardware. You get the intelligence.
          </p>

          <a href={PATH.href} className="card card--panel group mt-[clamp(40px,5vw,56px)] flex max-w-[600px] flex-col p-[clamp(24px,3vw,32px)] no-underline transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-[rgba(238,80,100,0.35)]" data-reveal="rise">
            <span aria-hidden="true" className="grid h-14 w-14 place-items-center rounded-2xl border border-line bg-surface2 text-soft">
              <Icon size={22} />
            </span>
            <h2 className="mt-7 font-display text-[24px] font-semibold tracking-[-0.02em] text-white">{PATH.title}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-body">{PATH.body}</p>
            <span className="mt-7 inline-flex min-h-[24px] items-center gap-1.5 text-sm font-semibold text-white transition-colors group-hover:text-coral">
              Start with this <ArrowRight size={15} aria-hidden="true" />
            </span>
          </a>

          <ul className="m-0 mt-[clamp(40px,5vw,56px)] grid list-none gap-x-10 gap-y-8 border-t border-line p-0 pt-[clamp(32px,4vw,48px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))]" data-reveal="rise" data-reveal-stagger="0.08">
            {FEATURES.map((f) => {
              const FIcon = f.icon;
              return (
                <li key={f.title} className="flex gap-4">
                  <FIcon size={20} aria-hidden="true" className="mt-0.5 flex-none text-red-bright" />
                  <div>
                    <h3 className="text-[17px] font-semibold text-white">{f.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-body">{f.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-[clamp(40px,5vw,56px)] flex flex-wrap items-center gap-x-6 gap-y-4" data-reveal="rise">
            <Button href={NFC_TOOLS_URL} size="lg">
              Activate what I already have
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <p className="text-[13px] text-muted">Free forever · No payment details · Encoding a chip needs an Android phone, your profile works on every device</p>
          </div>
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
