import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { StartFree, TextLink } from '@/components/Button';
import { ClosingBand } from '@/components/ClosingBand';
import { PageHero } from '@/components/PageHero';
import { PhoneStage } from '@/components/PhoneStage';
import { Outcome, SectionHead, Tags } from '@/components/Section';
import { PROTO_ALT } from '@/content/design';
import { USE_CASES, useCaseBySlug } from '@/content/usecases';
import { screen } from '@/lib/screens';
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
      <PageHero
        crumbs={[
          { label: 'Use cases', href: '/use-cases' },
          { label: u.short, href: `/use-cases/${u.slug}` },
        ]}
        eyebrow={u.short}
        title={u.title}
        lede={u.problem}
        ctas={
          <>
            <StartFree />
            <TextLink href={u.feature}>The capabilities used</TextLink>
          </>
        }
        side={
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px] border border-line">
            <Image src={u.scene} alt={u.sceneAlt} fill priority sizes="(min-width: 1024px) 560px, 90vw" className="object-cover" />
          </div>
        }
      />

      <section className="section section--charcoal">
        <div className="container">
          <div className="grid items-start gap-[clamp(32px,5vw,72px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
            <div data-reveal="rise">
              <p className="eyebrow eyebrow--plain">With Linkist</p>
              <h2 className="display-2 mt-4">
                What happens, <span className="em-coral">step by step</span>.
              </h2>
              <ol className="m-0 mt-8 flex list-none flex-col gap-2.5 p-0">
                {u.steps.map((st, i) => (
                  <li key={st} className="flex items-start gap-3.5 rounded-[14px] border border-white/[0.06] bg-surface2 px-4 py-3.5 text-[15px] leading-normal">
                    <span className="flex-none pt-0.5 font-mono text-xs text-coral">{String(i + 1).padStart(2, '0')}</span>
                    {st}
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex flex-col gap-5 md:sticky md:top-[110px]" data-reveal="rise">
              <Outcome label="Result">{u.result}</Outcome>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Capabilities used</p>
              <Tags items={u.chips} />
              <TextLink href={u.feature}>Read about these capabilities</TextLink>
              <PhoneStage src={screen(u.screen)} alt={PROTO_ALT[u.screen]} width={240} />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="More situations" title="The other 4." />
          <ul className="m-0 mt-8 grid list-none gap-3 p-0 [grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))]" data-reveal="rise" data-reveal-stagger="0.05">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/use-cases/${o.slug}`} className="card flex h-full items-center justify-between gap-3 p-5 text-[15px] font-medium no-underline">
                  {o.title}
                  <ArrowRight size={16} aria-hidden="true" className="flex-none text-coral" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingBand />
    </>
  );
}
