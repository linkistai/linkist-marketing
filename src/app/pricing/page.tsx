import type { Metadata } from 'next';
import Image from 'next/image';
import { StartFree, TextLink } from '@/components/Button';
import { ClosingBand } from '@/components/ClosingBand';
import { Faq } from '@/components/Faq';
import { PageHero } from '@/components/PageHero';
import { SectionHead } from '@/components/Section';
import { Bundles } from '@/components/home/Bundles';
import { CardTiers } from '@/components/home/CardTiers';
import { CompareTable } from '@/components/home/CompareTable';
import { PlanCards } from '@/components/home/PlanCards';
import { ENTERPRISE_NOTE } from '@/content/plans';
import { pageMeta } from '@/lib/site';

export const metadata: Metadata = pageMeta(
  'Pricing: Essential, Enhanced, Pro and Team',
  'Linkist PRM starts free with no card required. Enhanced is $2 a month, Pro $10 a month, Team $5 per user a month with a minimum of 5 users ($25 a month or $300 a year for 5). NFC cards from $20, bundles from $100.',
  '/pricing',
  { image: '/og/pricing.png' },
);

const BILLING_FAQ = [
  { q: 'Do I need a card to start?', a: 'No. Essential is free with no card. Add one any time.' },
  { q: 'How is yearly billed?', a: 'Enhanced: $12 a year or $25 for life. Pro: $100 a year. Team: $300 a year for 5 users (AED 1,000), plus $60 a year per extra user. Paid plans may auto-renew until cancelled.' },
  { q: 'Which currency am I billed in?', a: 'Plans are in US dollars. Cards are priced in AED with an approximate dollar figure. Checkout confirms the billing currency.' },
  { q: 'Can I cancel?', a: 'Yes. Cancel before the renewal date. Paid time runs to the end of its period.' },
  { q: 'Is there an Enterprise plan?', a: 'Not yet. Enterprise, with SSO and CRM and HRMS integration, is coming later.' },
  { q: 'Where do I buy?', a: 'Plans, cards, bundles, AI credits and invoices are all handled at prm.linkist.ai in the browser.' },
] as const;

export default function PricingPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Pricing', href: '/pricing' }]}
        eyebrow="Linkist PRM pricing"
        title={
          <>
            Start free. <span className="em-coral">Add more</span> when you need it.
          </>
        }
        lede="4 plans in US dollars, no NFC card needed. Upgrade for richer contacts, AI matching and follow-up, or teams."
        ctas={
          <>
            <StartFree />
            <TextLink href="#compare">Compare PRM plans</TextLink>
          </>
        }
        side={
          <div className="relative flex h-full w-full items-end justify-center">
            <div className="v2-glow w-[90%]" aria-hidden="true" />
            <Image src="/assets/gen/portrait-cut.webp" alt="" aria-hidden="true" width={896} height={1200} priority sizes="(min-width: 1024px) 400px, 70vw" className="relative w-[min(100%,400px)] [mask-image:linear-gradient(180deg,#000_80%,transparent)]" />
          </div>
        }
      />

      <section className="section !pt-0">
        <div className="container">
          <PlanCards headingLevel={2} />
        </div>
      </section>

      <section id="compare" className="section section--charcoal scroll-mt-[90px]">
        <div className="container">
          <SectionHead eyebrow="Linkist PRM plans comparison" title={<>Compare the plans <span className="em-coral">feature by feature</span>.</>} lede={ENTERPRISE_NOTE} />
          <div className="mt-10">
            <CompareTable />
          </div>
        </div>
      </section>

      <section id="cards" className="section">
        <div className="container">
          <SectionHead eyebrow="NFC card pricing" title={<>Tap. Share. Make the <span className="em-coral">first impression</span> count.</>} lede="One-time prices for Starter and Signature in PVC, wood and metal." center />
          <div className="mt-[clamp(40px,5vw,64px)]">
            <CardTiers cta={{ href: '/nfc-cards', label: 'Explore NFC cards' }} headingLevel={3} />
          </div>
        </div>
      </section>

      <section id="bundles" className="section section--charcoal">
        <div className="container">
          <SectionHead eyebrow="Bundled offers" title={<>The NFC card and PRM Pro <span className="em-coral">together</span>.</>} center />
          <div className="mt-[clamp(40px,5vw,64px)]">
            <Bundles />
          </div>
        </div>
      </section>

      <section id="faq" className="section">
        <div className="container">
          <Faq items={BILLING_FAQ} jsonLd eyebrow="Billing questions" title="Paying, answered." />
        </div>
      </section>

      <ClosingBand line1="Start free today." line2="Upgrade when you need to." />
    </>
  );
}
