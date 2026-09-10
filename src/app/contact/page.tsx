import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ContactForm } from '@/components/forms/ContactForm';
import { Section, SectionHead } from '@/components/Section';
import { ADDRESS_LINES, CONTACT_ROUTES, LEGAL_NAME, PHONE } from '@/content/company';
import { pageMeta } from '@/lib/site';

export const metadata: Metadata = pageMeta(
  'Contact',
  'Support, privacy and data requests, partnerships and teams, press, security. Published addresses, a phone and WhatsApp line, the company address in Dubai South, and a form that reaches a real inbox.',
  '/contact',
  { image: '/og/contact.png' },
);

/** Contact (brief 4): the routes, with published addresses and environment overrides (C12), the form, and the company address. */
export default function ContactPage() {
  return (
    <>
      <Section tight className="pt-8 sm:pt-10">
        <Breadcrumbs items={[{ label: 'Contact', href: '/contact' }]} />
        <div className="mt-8">
          <SectionHead as="h1" size={1} eyebrow="Contact" title={<>Talk to <span className="em-coral">a person</span>.</>} lede="Linkist is self-serve and free to start, so there is no sales call. For everything else, these routes reach a real inbox." />
        </div>
      </Section>
      <Section tone="charcoal" tight>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div className="flex flex-col gap-4">
            {CONTACT_ROUTES.map((r) => (
              <div key={r.key} className="card p-6">
                <h2 className="display-3 text-[22px]">{r.title}</h2>
                <p className="mt-2 text-sm text-body">{r.body}</p>
                {r.to ? (
                  <p className="mt-3 font-mono text-sm">
                    <a href={`mailto:${r.to}`}>{r.to}</a>
                  </p>
                ) : (
                  <p className="mt-3 text-sm text-muted">No dedicated address yet. Use the form with this topic.</p>
                )}
                {r.extra ? <p className="mt-1 text-xs text-muted">{r.extra}</p> : null}
              </div>
            ))}
            <div className="card p-6">
              <h2 className="display-3 text-[22px]">Phone and WhatsApp</h2>
              <p className="mt-2 text-sm text-body">The number the company publishes on linkist.ai.</p>
              <p className="mt-3 flex flex-wrap gap-4 font-mono text-sm">
                <a href={PHONE.tel}>{PHONE.display}</a>
                <a href={PHONE.whatsapp} rel="noopener noreferrer" target="_blank">
                  WhatsApp
                </a>
              </p>
            </div>
            <div className="card p-6">
              <h2 className="display-3 text-[22px]">Post</h2>
              <p className="mt-2 text-sm text-body">
                {LEGAL_NAME}, trading as Linkist
                <br />
                {ADDRESS_LINES[0]}
                <br />
                {ADDRESS_LINES[1]}
              </p>
            </div>
            <p className="text-sm text-muted">
              Before you write, the{' '}
              <Link href="/help" className="underline">
                help centre
              </Link>{' '}
              answers most questions and the{' '}
              <Link href="/chat" className="underline">
                assistant
              </Link>{' '}
              is available around the clock.
            </p>
          </div>
          <div className="card p-6 sm:p-8">
            <h2 className="display-3">Send a message</h2>
            <p className="mt-2 text-sm text-body">Support, teams, partnerships, press, security or the design partner programme. Pick the topic and it lands with the right person.</p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
