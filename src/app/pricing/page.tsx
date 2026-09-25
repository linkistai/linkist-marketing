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
  'Linkist PRM starts free with no card required. Enhanced is $2 (AED 8) a month, Pro $10 (AED 40), Team $5 (AED 20) per user with a minimum of 5 users. NFC cards from AED 75 ($20), bundles from AED 369 ($100).',
  '/pricing',
  { image: '/og/pricing.png' },
);

const BILLING_FAQ = [
  { q: 'Do I need a card to start?', a: 'No. The Essential plan is free and needs no NFC card. Add a card any time.' },
  { q: 'How is yearly billed?', a: 'Enhanced is $20 (AED 80) a year or $25 for life. Pro is $100 (AED 400) a year. Team is $250 (AED 1,000) a year for 5 users, then $5 a month or $60 a year for each additional user. Paid subscriptions may renew automatically until cancelled, as the terms say.' },
  { q: 'Which currency am I billed in?', a: 'Every price is listed in US dollars and UAE dirhams; the USD / AED switch beside the prices shows either. The store checks out NFC cards in AED, and the checkout shows the billing currency.' },
  { q: 'Can I cancel?', a: 'Yes. You are responsible for cancelling before the renewal date if you do not want a subscription to renew. What you have paid for runs to the end of its period.' },
  { q: 'Is there an Enterprise plan?', a: 'Not yet. Enterprise is coming later and is interest only. Single sign-on, CRM and HRMS integration and product customisation are planned for it.' },
  { q: 'Where do I buy?', a: 'Plans, cards, bundles, AI credit top-ups and invoices are handled in the browser at prm.linkist.ai, so the app stays focused on your relationships.' },
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
        lede="4 plans in US dollars or UAE dirhams, no NFC card required. Upgrade when you need richer contact management, AI matching and follow-up, or team collaboration."
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
          <SectionHead eyebrow="NFC card pricing" title={<>Tap. Share. Make the <span className="em-coral">first impression</span> count.</>} lede="One-time prices for Starter and Signature in PVC, wood and metal. Every card includes PRM Essential." center />
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
          <Faq items={BILLING_FAQ} jsonLd eyebrow="Billing questions" title="Straight answers about paying." />
        </div>
      </section>

      <ClosingBand line1="Start free today." line2="Upgrade when you need to." />
    </>
  );
}
