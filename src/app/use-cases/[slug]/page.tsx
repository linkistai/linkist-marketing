import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { StartFree, TextLink } from '@/components/Button';
import { ClosingBand } from '@/components/ClosingBand';
import { ScreenFrame } from '@/components/ScreenFrame';
import { Outcome, Section, SectionHead, Tags } from '@/components/Section';
import { HeroIntro } from '@/motion/HeroIntro';
import { PROTO_ALT } from '@/content/design';
import { USE_CASES, useCaseBySlug } from '@/content/usecases';
import { person, screen } from '@/lib/screens';
import { pageMeta } from '@/lib/site';

export const dynamicParams = false;
export function generateStaticParams() {
  return USE_CASES.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const u = useCaseBySlug(slug);
  if (!u) return {};
  return pageMeta(`Use case: ${u.short}`, u.description, `/use-cases/${u.slug}`, { image: '/og/use-cases.png' });
}

export default async function UseCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const u = useCaseBySlug(slug);
  if (!u) notFound();
  const others = USE_CASES.filter((o) => o.slug !== u.slug);
  return (
    <>
      <section className="section pt-8 sm:pt-10">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Use cases', href: '/use-cases' }, { label: u.short, href: `/use-cases/${u.slug}` }]} />
          <HeroIntro className="mt-8 grid items-center gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <div className="max-w-2xl">
              <p className="eyebrow" data-hero-text>
                Use case · {u.short}
              </p>
              <h1 className="display-1 mt-5" data-hero-text>
                {u.title}
              </h1>
              <p className="lede mt-5" data-hero-text>
                {u.problem}
              </p>
              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center" data-hero-text>
                <StartFree />
                <TextLink href={u.feature}>The capabilities used</TextLink>
              </div>
            </div>
            <div className="hero-stage relative flex justify-center" data-hero-card="1">
              <div className="w-full max-w-[280px]">
                <ScreenFrame kind="phone" src={screen(u.screen)} alt={PROTO_ALT[u.screen]} preview full priority />
              </div>
            </div>
          </HeroIntro>
        </div>
      </section>

      <Section tone="charcoal" glow>
        <div className="grid gap-10 lg:grid-cols-2">
          <div data-reveal="rise">
            <p className="eyebrow">With Linkist</p>
            <h2 className="display-2 mt-4">
              What happens, <span className="em-coral">step by step</span>.
            </h2>
            <ol className="mt-8 flex flex-col gap-4">
              {u.steps.map((s, i) => (
                <li key={s} className="flex gap-4">
                  <span className="mt-0.5 inline-grid h-8 w-8 flex-none place-items-center rounded-full bg-crimson font-mono text-sm font-semibold text-white">{i + 1}</span>
                  <p className="text-md text-body">{s}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="card flex flex-col gap-5 p-7 self-start" data-reveal="rise">
            <Outcome label="Result">{u.result}</Outcome>
            <p className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">Capabilities used</p>
            <Tags items={u.chips} accent />
            <TextLink href={u.feature}>Read about these capabilities</TextLink>
          </div>
        </div>
      </Section>

      <Section tight>
        <SectionHead eyebrow="More situations" title="The other four." />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2" data-reveal="rise" data-reveal-stagger="0.05">
          {others.map((o) => (
            <li key={o.slug}>
              <TextLink href={`/use-cases/${o.slug}`}>{o.title}</TextLink>
            </li>
          ))}
        </ul>
      </Section>

      <ClosingBand person={person('close-5')} />
    </>
  );
}
