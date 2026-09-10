import type { Metadata } from 'next';
import { Check } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button, StartFree, TextLink } from '@/components/Button';
import { ClosingBand } from '@/components/ClosingBand';
import { Faq } from '@/components/Faq';
import { MiniMock } from '@/components/mockups/MiniMock';
import { Obj, Person } from '@/components/Person';
import { Section, SectionHead } from '@/components/Section';
import { HeroIntro } from '@/motion/HeroIntro';
import { featureBySlug } from '@/content/features';
import { planByKey } from '@/content/plans';
import { object, person } from '@/lib/screens';
import { formatMoney } from '@/lib/glossary';
import { pageMeta } from '@/lib/site';

export const metadata: Metadata = pageMeta(
  'Linkist for teams: relationships that stay with the company',
  'The Team plan: everything in Pro for every user, contact sharing across the team, a centralised admin console, company branding on cards and a team directory. $4 per user a month, minimum 5 users.',
  '/teams',
  { image: '/og/teams.png' },
);

const KEEPS = [
  { title: 'Shared Contacts', body: 'Contacts and their context shared with the authorised team, so a colleague can pick up a relationship with the history in place.' },
  { title: 'Relationship History', body: 'When a person leaves, team-shared contacts and their history stay with the company. Personal contacts stay with the person.' },
  { title: 'Admin console', body: 'Add and remove users, manage who sees what, and keep company branding on every card from one place.' },
  { title: 'Team directory', body: 'Every colleague and their profiles in one directory, so the right introduction happens fast.' },
] as const;

export default function TeamsPage() {
  const team = planByKey('team');
  const f = featureBySlug('teams')!;
  return (
    <>
      <section className="section pt-8 sm:pt-10">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Teams', href: '/teams' }]} />
          <HeroIntro className="mt-8 grid items-center gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <div className="max-w-xl">
              <p className="eyebrow" data-hero-text>
                Linkist for teams
              </p>
              <h1 className="display-1 mt-5" data-hero-text>
                Relationships that <span className="em-coral">stay with the company</span>.
              </h1>
              <p className="lede mt-5" data-hero-text>
                Share contacts across the team, brand every card, and keep the relationship history when someone moves on. Everything in Pro, for every user.
              </p>
              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center" data-hero-text>
                <StartFree />
                <TextLink href="/features/teams">See the Team features</TextLink>
              </div>
              <p className="mt-6 text-sm text-body" data-hero-text>
                {formatMoney(team.monthly, 'USD')} per user a month, or {formatMoney(team.yearly ?? 0, 'USD')} a year. Minimum {team.minUsers} users.
              </p>
            </div>
            <div className="hero-stage relative min-h-[360px]">
              <div className="card card--object mx-auto w-full max-w-md p-6" data-hero-card="1">
                <div className="flex items-center gap-3">
                  <Obj name="team" src={object('team')} size={56} className="card__obj" />
                  <p className="font-semibold">Two contact cards, one shared with the team</p>
                </div>
                <MiniMock mock={f.mock} />
              </div>
              <div className="absolute bottom-0 right-0 hidden h-[80%] w-[200px] lg:block" data-hero-card="2">
                <Person src={person('teams')} alt="A team member holding a phone with Linkist open towards the camera" hero bust sizes="220px" />
              </div>
            </div>
          </HeroIntro>
        </div>
      </section>

      <Section tone="charcoal" glow>
        <SectionHead eyebrow="What stays with the company" title={<>A key person leaves. <span className="em-coral">The relationship does not.</span></>} lede="Important business context often lives inside individual phones, inboxes and memories. The Team plan keeps it where the company can use it." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2" data-reveal="rise" data-reveal-stagger="0.08">
          {KEEPS.map((k) => (
            <div key={k.title} className="card card--hover p-7">
              <h3 className="display-3 text-[21px]">{k.title}</h3>
              <p className="mt-2 text-sm text-body">{k.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="plan">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div data-reveal="rise">
            <p className="eyebrow">The Team plan</p>
            <h2 className="display-2 mt-4">
              Everything in Pro, <span className="em-coral">teamwide</span>.
            </h2>
            <p className="lede mt-4">{team.fit}</p>
            <ul className="mt-6 flex flex-col gap-2 text-md text-body">
              {team.groups.flatMap((g) => g.items).map((i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check size={16} aria-hidden="true" className="mt-1 flex-none text-coral" />
                  {i}
                </li>
              ))}
            </ul>
            <p className="mt-6 flex items-baseline gap-2">
              <span className="font-mono text-4xl font-semibold tabular">{formatMoney(team.monthly, 'USD')}</span>
              <span className="text-body">per user a month</span>
            </p>
            <p className="mt-1 text-sm text-muted">
              {formatMoney(team.yearly ?? 0, 'USD')} a year. Minimum {team.minUsers} users. Prices in US dollars.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <StartFree size="md" />
              <TextLink href="/pricing#compare">Compare PRM plans</TextLink>
            </div>
          </div>
          <div className="card p-7" data-reveal="rise">
            <p className="eyebrow">Enterprise</p>
            <h3 className="display-3 mt-3">Coming later. Interest only today.</h3>
            <p className="mt-3 text-sm text-body">Single sign-on, CRM and HRMS integration, product customisation and dedicated support are planned for Enterprise. There is no plan card to buy yet. If that is what your company needs, tell us and we will keep you posted.</p>
            <div className="mt-6">
              <Button href="mailto:support@linkist.ai?subject=Enterprise%20interest" variant="secondary">
                Register interest
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="charcoal" tight id="faq">
        <SectionHead eyebrow="Questions" title="About teams." />
        <div className="mt-10 max-w-3xl">
          <Faq items={f.faq} jsonLd />
        </div>
      </Section>

      <ClosingBand line1="Keep the relationships." line2="Even when people move on." person={person('close-3')} />
    </>
  );
}
