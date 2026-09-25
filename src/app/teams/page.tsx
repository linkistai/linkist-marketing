import type { Metadata } from 'next';
import Image from 'next/image';
import { Button, StartFree, TextLink } from '@/components/Button';
import { ClosingBand } from '@/components/ClosingBand';
import { Faq } from '@/components/Faq';
import { PageHero } from '@/components/PageHero';
import { Bullets, SectionHead } from '@/components/Section';
import { featureBySlug } from '@/content/features';
import { planByKey } from '@/content/plans';
import { TeamPrice } from '@/components/TeamPrice';
import { pageMeta } from '@/lib/site';

export const metadata: Metadata = pageMeta(
  'Linkist for teams: relationships that stay with the company',
  'The Team plan: everything in Pro for every user, contact sharing across the team, a centralised admin console, company branding on cards and a team directory. $5 (AED 20) per user a month, minimum 5 users.',
  '/teams',
  { image: '/og/teams.png' },
);

const KEEPS = [
  { title: 'Shared Contacts', body: 'Contacts and context shared with the authorised team, history in place.' },
  { title: 'Relationship History', body: 'Team-shared contacts and history stay with the company. Personal contacts stay personal.' },
  { title: 'Admin console', body: 'Users, permissions and card branding in one place.' },
  { title: 'Team directory', body: 'Every colleague and profile in one directory, for fast introductions.' },
] as const;

export default function TeamsPage() {
  const team = planByKey('team');
  const f = featureBySlug('teams')!;
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Teams', href: '/teams' }]}
        eyebrow="Linkist for teams"
        title={
          <>
            Relationships that <span className="em-coral">stay with the company</span>.
          </>
        }
        lede="Shared contacts, branded cards, and history that stays when people move on. Everything in Pro, for every user."
        ctas={
          <>
            <StartFree />
            <TextLink href="/features/teams">See the Team features</TextLink>
          </>
        }
        note={<TeamPrice variant="note" />}
        side={
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px] border border-line">
            <Image src="/assets/gen/uc-leave.webp" alt="A person leaving an office carrying a box of belongings" fill priority sizes="(min-width: 1024px) 560px, 90vw" className="object-cover" />
          </div>
        }
      />

      <section className="section section--charcoal">
        <div className="container">
          <SectionHead eyebrow="What stays with the company" title={<>A key person leaves. <span className="em-coral">The relationship does not.</span></>} lede="Business context lives in personal phones and inboxes. The Team plan keeps it with the company." />
          <ul className="m-0 mt-[clamp(40px,5vw,64px)] grid list-none gap-3.5 p-0 [grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))]" data-reveal="rise" data-reveal-stagger="0.08">
            {KEEPS.map((k, i) => (
              <li key={k.title} className="card flex flex-col gap-9 p-[clamp(22px,2.6vw,32px)]">
                <span aria-hidden="true" className="font-mono text-[13px] text-coral">
                  /{String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="display-3">{k.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-normal text-body">{k.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="plan" className="section">
        <div className="container">
          <div className="grid items-start gap-[clamp(32px,5vw,72px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
            <div data-reveal="rise">
              <p className="eyebrow eyebrow--plain">The Team plan</p>
              <h2 className="display-2 mt-4">
                Everything in Pro, <span className="em-coral">teamwide</span>.
              </h2>
              <p className="lede mt-4">{team.fit}</p>
              <Bullets items={team.groups.flatMap((g) => g.items)} className="mt-6" />
              <TeamPrice variant="block" />
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
                <StartFree label="Start Here" />
                <TextLink href="/pricing#compare">Compare PRM plans</TextLink>
              </div>
            </div>
            <div className="card card--featured p-[clamp(24px,3vw,36px)]" data-reveal="rise">
              <p className="eyebrow eyebrow--plain">Enterprise</p>
              <h3 className="display-3 mt-3 !text-[26px]">Coming later. Interest only today.</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-body">SSO, CRM and HRMS integration, customisation and dedicated support are planned. Nothing to buy yet; tell us if you need it.</p>
              <div className="mt-6">
                <Button href="mailto:support@linkist.ai?subject=Enterprise%20interest" variant="secondary">
                  Register interest
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="section section--charcoal">
        <div className="container">
          <Faq items={f.faq} jsonLd eyebrow="Questions" title="About teams." />
        </div>
      </section>

      <ClosingBand line1="Keep the relationships." line2="Even when people move on." />
    </>
  );
}
