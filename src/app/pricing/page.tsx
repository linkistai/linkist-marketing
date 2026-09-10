import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ClosingBand } from '@/components/ClosingBand';
import { Faq } from '@/components/Faq';
import { Person } from '@/components/Person';
import { Section, SectionHead } from '@/components/Section';
import { Bundles } from '@/components/home/Bundles';
import { CardTiers } from '@/components/home/CardTiers';
import { CompareTable } from '@/components/home/CompareTable';
import { PlanCards } from '@/components/home/PlanCards';
import { ENTERPRISE_NOTE } from '@/content/plans';
import { person } from '@/lib/screens';
import { pageMeta } from '@/lib/site';

export const metadata: Metadata = pageMeta(
  'Pricing: Essential, Enhanced, Pro and Team',
  'Linkist PRM starts free with no card required. Enhanced is $2 a month, Pro $10 a month, Team $4 per user a month with a minimum of 5 users. NFC cards from $20, bundles from $100.',
  '/pricing',
  { image: '/og/pricing.png' },
);

const BILLING_FAQ = [
  { q: 'Do I need a card to start?', a: 'No. The Essential plan is free and needs no NFC card. Add a card any time.' },
  { q: 'How is yearly billed?', a: 'Enhanced is $12 a year or $25 for life. Pro is $100 a year. Team is $200 a year. Paid subscriptions may renew automatically until cancelled, as the terms say.' },
  { q: 'Which currency am I billed in?', a: 'Plan prices are listed in US dollars. The store prices the cards in AED and shows an approximate dollar figure beside each; the terms say prices are displayed in USD unless stated otherwise, so the billing currency is being confirmed and the checkout shows it. VAT is shown upfront.' },
  { q: 'Can I cancel?', a: 'Yes. You are responsible for cancelling before the renewal date if you do not want a subscription to renew. What you have paid for runs to the end of its period.' },
  { q: 'Is there an Enterprise plan?', a: 'Not yet. Enterprise is coming later and is interest only. Single sign-on, CRM and HRMS integration and product customisation are planned for it.' },
  { q: 'Where do I buy?', a: 'Plans, cards, bundles, AI credit top-ups and invoices are handled in the browser at prm.linkist.ai, so the app stays focused on your relationships.' },
] as const;

export default function PricingPage() {
  return (
    <>
      <Section tight className="pt-8 sm:pt-10">
        <Breadcrumbs items={[{ label: 'Pricing', href: '/pricing' }]} />
        <div className="mt-8 grid items-end gap-8 lg:grid-cols-[1fr_340px]">
          <SectionHead as="h1" size={1} eyebrow="Linkist PRM pricing" title={<>Start free. <span className="em-coral">Add more</span> when you need it.</>} lede="4 plans in US dollars, no NFC card required. Upgrade when you need richer contact management, AI matching and follow-up, or team collaboration." />
          <div className="hidden h-[340px] lg:block">
            <Person src={person('pricing')} alt="A person holding a phone with Linkist open towards the camera" hero bust priority sizes="340px" />
          </div>
        </div>
        <div className="mt-12">
          <PlanCards headingLevel={2} />
        </div>
      </Section>

      <Section tone="charcoal" id="compare">
        <SectionHead eyebrow="Linkist PRM plans comparison" title={<>Compare the plans <span className="em-coral">feature by feature</span>.</>} lede={ENTERPRISE_NOTE} />
        <div className="mt-10">
          <CompareTable />
        </div>
      </Section>

      <Section id="cards">
        <SectionHead eyebrow="Linkist NFC cards" title={<>Tap. Share. Make the <span className="em-coral">first impression</span> count.</>} lede="One-time prices for Starter and Signature in PVC, wood and metal. Every card includes PRM Essential." center />
        <div className="mt-12">
          <CardTiers cta={{ href: '/nfc-cards', label: 'Explore NFC cards' }} headingLevel={3} />
        </div>
      </Section>

      <Section tone="lifted" id="bundles">
        <SectionHead eyebrow="Bundled offers" title={<>The card and PRM Pro <span className="em-coral">together</span>.</>} center />
        <div className="mt-12">
          <Bundles />
        </div>
      </Section>

      <Section tone="charcoal" tight id="faq">
        <SectionHead eyebrow="Billing questions" title="Straight answers about paying." />
        <div className="mt-10 max-w-3xl">
          <Faq items={BILLING_FAQ} jsonLd />
        </div>
      </Section>

      <ClosingBand person={person('close-6')} line1="Start free today." line2="Upgrade when your network asks for it." />
    </>
  );
}
