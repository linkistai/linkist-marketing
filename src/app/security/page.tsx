import type { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { StartFree, TextLink } from '@/components/Button';
import { ClosingBand } from '@/components/ClosingBand';
import { Faq } from '@/components/Faq';
import { Section, SectionHead } from '@/components/Section';
import { HeroIntro } from '@/motion/HeroIntro';
import { CONTACT_DATA, CONTROLLER, CONTROLS, DPO_EMAIL_PUBLISHED, POLICY_DATE, PRIVACY_EMAIL_PUBLISHED, PRIVACY_URL, PROVIDERS, RETENTION, RIGHTS, SECURITY_FAQ, SECURITY_NOT_PUBLISHED, SITE_CONTROLS, SUPPORT_EMAIL_PUBLISHED, TERMS_URL, TRANSFER_SAFEGUARDS } from '@/content/trust';
import { person } from '@/lib/screens';
import { pageMeta } from '@/lib/site';

export const metadata: Metadata = pageMeta(
  'Security and trust',
  'Where your data lives, who can see it, how it is protected, what you can ask for, and what Linkist has not published yet. Written for a sceptical reader from the published policy and terms.',
  '/security',
  { image: '/og/security.png' },
);

const GLANCE = [
  ['Sign-in', 'Email or mobile plus a one-time code. No password.'],
  ['Law', 'UAE Personal Data Protection Law, Federal Decree-Law No. 45 of 2021'],
  ['Controller', CONTROLLER.name + ', Dubai'],
  ['Named provider', 'Stripe, for payments'],
  ['Attestations', 'None claimed'],
] as const;

export default function SecurityPage() {
  return (
    <>
      <section className="section pt-8 sm:pt-10">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Security', href: '/security' }]} />
          <HeroIntro className="mt-8 grid items-center gap-12 lg:grid-cols-[7fr_5fr]">
            <div className="max-w-3xl">
              <p className="eyebrow" data-hero-text>
                Security and trust
              </p>
              <h1 className="display-1 mt-5" data-hero-text>
                Written for a<br />
                <span className="em-coral">sceptical reader</span>.
              </h1>
              <p className="lede mt-6" data-hero-text>
                Where your data lives, who can see it, how it is protected, what you can ask for, and what has not been published yet. Every line comes from the privacy policy and terms of {POLICY_DATE}, or from the product itself, and says which.
              </p>
              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center" data-hero-text>
                <StartFree />
                <TextLink href="#not-yet">What is not published yet</TextLink>
              </div>
            </div>
            <dl className="card divide-y divide-line p-2" data-hero-card="1">
              {GLANCE.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[110px_1fr] gap-3 px-4 py-3 text-sm">
                  <dt className="text-muted">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </HeroIntro>
        </div>
      </section>

      <Section tone="charcoal" id="controls" glow>
        <SectionHead eyebrow="10 controls" title={<>What protects your data, <span className="em-coral">and where it is written</span>.</>} lede="The policy's own list of technical and organisational measures, in plain words, plus what the sign-in screen shows. P is the privacy policy and the number its section." center />
        <ol className="mt-12 grid gap-4 md:grid-cols-2" data-reveal="rise" data-reveal-stagger="0.05">
          {CONTROLS.map((c, i) => (
            <li key={c.title} className="card sweep sweep--neutral lift p-6">
              <div className="flex items-center gap-3">
                <span className="inline-grid h-8 w-8 flex-none place-items-center rounded-full bg-crimson font-mono text-sm font-semibold text-white">{i + 1}</span>
                <h2 className="display-3 text-[20px]">{c.title}</h2>
              </div>
              <p className="mt-3 text-sm text-body">{c.body}</p>
              <p className="mt-3 font-mono text-[11px] text-muted">{c.source}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="providers">
        <SectionHead eyebrow="Who receives data" title={<>10 categories, <span className="em-coral">one name</span>.</>} lede="The policy lists the kinds of provider that process data on Linkist's behalf, under confidentiality and data processing terms. It names Stripe and no one else." center />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5" data-reveal="rise" data-reveal-stagger="0.04">
          {PROVIDERS.map((p) => (
            <li key={p.role} className="card card--sm p-4">
              <p className="text-sm font-semibold">{p.role}</p>
              <p className="mt-1 text-xs text-muted">{p.named ?? 'Not named in the policy'}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="card p-6" data-reveal="rise">
            <h3 className="font-semibold">Transfers outside the UAE</h3>
            <p className="mt-2 text-sm text-body">Some providers may be located outside the United Arab Emirates. Where required, the policy lists these safeguards:</p>
            <ul className="mt-3 flex flex-col gap-1 pl-5 text-sm text-body" style={{ listStyle: 'disc' }}>
              {TRANSFER_SAFEGUARDS.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p className="mt-3 font-mono text-[11px] text-muted">P 15</p>
          </div>
          <div className="card p-6" data-reveal="rise">
            <h3 className="font-semibold">The people in your contacts</h3>
            <ul className="mt-3 flex flex-col gap-2 pl-5 text-sm text-body" style={{ listStyle: 'disc' }}>
              {CONTACT_DATA.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p className="mt-3 font-mono text-[11px] text-muted">P 10, 18</p>
          </div>
        </div>
      </Section>

      <Section tone="lifted" id="retention">
        <SectionHead eyebrow="How long" title={<>Retention, <span className="em-coral">in one table</span>.</>} lede="Condensed from the policy's retention schedule. Longer periods apply only where tax, accounting, dispute or security rules require them." center />
        <div className="table-wrap mx-auto mt-10 max-w-3xl" tabIndex={0} role="region" aria-label="Retention table, scrolls sideways on small screens">
          <table className="table w-full text-sm">
            <thead>
              <tr>
                <th scope="col">Data</th>
                <th scope="col">Kept for</th>
              </tr>
            </thead>
            <tbody>
              {RETENTION.map((r) => (
                <tr key={r.what}>
                  <th scope="row" className="text-left font-medium">
                    {r.what}
                  </th>
                  <td className="text-body">{r.period}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-center font-mono text-[11px] text-muted">P 17, 19</p>
      </Section>

      <Section id="rights">
        <div className="grid gap-10 lg:grid-cols-2">
          <div data-reveal="rise">
            <p className="eyebrow">Your rights</p>
            <h2 className="display-2 mt-4">
              What you can <span className="em-coral">ask for</span>.
            </h2>
            <ul className="mt-6 flex flex-col gap-3">
              {RIGHTS.map((r) => (
                <li key={r} className="flex gap-3 text-md text-body">
                  <ShieldCheck size={18} aria-hidden="true" className="mt-0.5 flex-none text-coral" />
                  {r}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-muted">Linkist aims to answer within 30 days and may verify your identity first. P 18, 19.</p>
          </div>
          <div className="card self-start p-7" data-reveal="rise">
            <p className="eyebrow">Who is responsible</p>
            <p className="mt-4 font-semibold">{CONTROLLER.name}</p>
            <p className="mt-1 text-sm text-body">{CONTROLLER.address}</p>
            <p className="mt-4 text-sm text-body">
              Privacy: {PRIVACY_EMAIL_PUBLISHED}
              <br />
              Data Protection Officer: {DPO_EMAIL_PUBLISHED}
              <br />
              Support: {SUPPORT_EMAIL_PUBLISHED}
            </p>
            <p className="mt-4 text-sm text-body">Governing law: the United Arab Emirates as applied in Dubai. Framework: {CONTROLLER.law}.</p>
            <p className="mt-4 text-sm">
              <a href={PRIVACY_URL} className="underline">
                Privacy policy
              </a>
              <span className="text-muted"> · </span>
              <a href={TERMS_URL} className="underline">
                Terms of service
              </a>
            </p>
            <p className="mt-3 font-mono text-[11px] text-muted">P 2, 3, 24; T 27</p>
          </div>
        </div>
      </Section>

      <Section tone="lifted" id="this-website">
        <SectionHead eyebrow="This website" title={<>What belongs to <span className="em-coral">this site</span>, not the app.</>} lede="The controls above are the product's. These five are the marketing site's own, so nobody confuses the two." center />
        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5" data-reveal="rise" data-reveal-stagger="0.05">
          {SITE_CONTROLS.map((c) => (
            <li key={c.title} className="card card--hover p-5">
              <ShieldCheck size={18} aria-hidden="true" className="text-coral" />
              <h3 className="mt-3 font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-body">{c.body}</p>
              <p className="mt-3 font-mono text-[11px] text-muted">{c.source}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="charcoal" id="not-yet">
        <SectionHead eyebrow="Not published yet" title={<>What Linkist <span className="em-coral">does not claim</span>, in plain words.</>} lede="A trust page that only lists strengths is marketing. These are the gaps today." center />
        <ul className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-2" data-reveal="rise" data-reveal-stagger="0.06">
          {SECURITY_NOT_PUBLISHED.map((n) => (
            <li key={n} className="card flex gap-3 p-5">
              <ShieldCheck size={18} aria-hidden="true" className="mt-0.5 flex-none text-coral" />
              <p className="text-sm text-body">{n}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tight id="faq">
        <SectionHead eyebrow="FAQ" title="Security, answered." center />
        <div className="mx-auto mt-10 max-w-4xl">
          <Faq items={SECURITY_FAQ} name="security-faq" jsonLd />
        </div>
      </Section>

      <ClosingBand person={person('close-7')} line1="Your contacts, your rules." line2="Start with an email or a mobile number." reassurance="No password to leak. Free plan, no card required." />
    </>
  );
}
