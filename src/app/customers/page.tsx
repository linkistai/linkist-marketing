import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button, TextLink } from '@/components/Button';
import { ClosingBand } from '@/components/ClosingBand';
import { MiniMock, type MiniMockKind } from '@/components/mockups/MiniMock';
import { Section, SectionHead } from '@/components/Section';
import { USE_CASES } from '@/content/usecases';
import { person } from '@/lib/screens';
import { pageMeta } from '@/lib/site';

export const metadata: Metadata = pageMeta(
  'Customers',
  'Linkist names no customer without written consent, and none has given it yet. Here is what the site can show instead, three example networks labelled as examples, and an invitation to be a design partner.',
  '/customers',
  { image: '/og/customers.png' },
);

const SHOW = [
  ['Every product screen labelled', 'Design previews from the approved prototype until the real captures land, each badged, never a mock passed off as the app.'],
  ['The security page, cited', 'The controls, providers, retention and rights from the published policy, with the section beside each, and the gaps listed as gaps.'],
  ['109 help answers with sources', 'Written from the product, the store and the legal documents; each says when the app has not yet confirmed it.'],
  ['A changelog with dates', 'Only events with a public source. No release is given a date it does not have.'],
] as const;

const EXAMPLES: readonly { title: string; who: string; body: string; mock: MiniMockKind }[] = [
  {
    title: 'A founder before a raise',
    who: 'Example, not a customer',
    body: 'Keeps one ICP for angels and one for design partners. After every event the home screen says how many of the new contacts fit either.',
    mock: { kind: 'icp', label: 'ICP chips lighting up on matches', items: ['Fintech', 'Angel', 'Dubai', 'Pre-seed'], count: '8 matches' },
  },
  {
    title: 'A sales lead after a trade show',
    who: 'Example, not a customer',
    body: '60 taps in 2 days, each with a voice note. Top Actions turns them into a week of follow-ups in the order that matters.',
    mock: { kind: 'day', label: 'Top Actions ticking off', items: [['Follow up with Julian', 'GITEX'], ['Send deck to Sara', 'Series A'], ['Coffee with Omar', 'Cooling down']] },
  },
  {
    title: 'A recruiter with three open roles',
    who: 'Example, not a customer',
    body: 'Searches the network in plain words rather than by name, and asks it for a warm path to the people who fit.',
    mock: { kind: 'search', label: 'A search typed in plain words with two results', query: 'product designer who worked at a fintech', results: [['LK', 'Lina Khoury', 'Nadir Fintech, design'], ['RA', 'Rami Aoun', 'Ex-Tabby, product']] },
  },
];

/** Honest proof (brief 3.9, 4): no named customers, what can be shown, example networks labelled as examples, a design-partner invitation. */
export default function CustomersPage() {
  return (
    <>
      <Section tight className="pt-8 sm:pt-10">
        <Breadcrumbs items={[{ label: 'Customers', href: '/customers' }]} />
        <div className="mt-8">
          <SectionHead as="h1" size={1} eyebrow="Customers" title={<>No named customers yet. <span className="em-coral">Here is why.</span></>} lede="Linkist names a customer only with their written consent, and none has given it yet. This page will not invent a quote to fill the space. It shows what can be shown, and asks for help with the rest." />
        </div>
      </Section>

      <Section tone="charcoal">
        <div className="grid gap-10 lg:grid-cols-2">
          <div data-reveal="rise">
            <p className="eyebrow">The honest version</p>
            <h2 className="display-2 mt-4">
              What this site <span className="em-coral">can show</span> today.
            </h2>
            <ul className="mt-6 flex flex-col gap-4">
              {SHOW.map(([t, b]) => (
                <li key={t} className="card p-5">
                  <p className="font-semibold">{t}</p>
                  <p className="mt-1 text-sm text-body">{b}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">The founder story and the team are published when the company confirms them, not before.</p>
          </div>
          <div className="card sweep sweep--featured self-start p-6 sm:p-8" data-reveal="rise">
            <p className="eyebrow">Design partners</p>
            <h2 className="display-3 mt-3">Help shape what ships next.</h2>
            <p className="mt-3 text-body">Linkist is looking for a small number of professionals and teams, in the UAE and beyond, who meet a lot of people and will use Linkist weekly, say what is wrong, and, only if they choose, be named here later.</p>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-body">
              <li>A short call a month, no more.</li>
              <li>A direct line to the team for what you find.</li>
              <li>Nothing is published about you without written consent.</li>
            </ul>
            <p className="mt-4 text-xs text-muted">What partners receive in return is being settled by the company and will be stated here before anyone is asked to commit.</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button href="/contact" variant="primary">
                Ask about the programme
              </Button>
              <TextLink href="/use-cases">See the five use cases</TextLink>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="Example networks" title={<>Three people, <span className="em-coral">three weeks</span>.</>} lede="Written to show what the product does. Every name and figure is an example, not a customer and not a testimonial." center />
        <ul className="mt-12 grid gap-4 md:grid-cols-3" data-reveal="rise" data-reveal-stagger="0.08">
          {EXAMPLES.map((e) => (
            <li key={e.title} className="card flex flex-col gap-4 p-6">
              <div>
                <p className="eyebrow eyebrow--accent text-[11px]">{e.who}</p>
                <h3 className="display-3 mt-2 text-[22px]">{e.title}</h3>
                <p className="mt-2 text-sm text-body">{e.body}</p>
              </div>
              <MiniMock mock={e.mock} className="mt-auto" />
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="lifted" tight>
        <SectionHead eyebrow="The situations" title="Built for five real working days." lede="If one of these is your week, the use case walks through it step by step." />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-reveal="rise" data-reveal-stagger="0.05">
          {USE_CASES.map((u) => (
            <li key={u.slug}>
              <Link href={`/use-cases/${u.slug}`} className="card card--hover block h-full p-5 no-underline">
                <p className="eyebrow eyebrow--accent text-[11px]">{u.short}</p>
                <p className="mt-2 font-semibold">{u.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <ClosingBand person={person('close-12')} line1="Be one of the first." line2="Start with an email or a mobile number." reassurance="Free plan, no card required. Nothing is published about you without consent." />
    </>
  );
}
