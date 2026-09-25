import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { StartFree, TextLink } from '@/components/Button';
import { ClosingBand } from '@/components/ClosingBand';
import { Faq } from '@/components/Faq';
import { FeatureTabs } from '@/components/FeatureTabs';
import { PageHero } from '@/components/PageHero';
import { ScreenFrame } from '@/components/ScreenFrame';
import { SectionHead } from '@/components/Section';
import { PROTO_ALT, type ProtoScreen } from '@/content/design';
import { FEATURES, featureBySlug } from '@/content/features';
import { isPreview, screen } from '@/lib/screens';
import { pageMeta } from '@/lib/site';

export const dynamicParams = false;
export function generateStaticParams() {
  return FEATURES.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const f = featureBySlug(slug);
  if (!f) return {};
  return pageMeta(f.title, f.description, `/features/${f.slug}`, { image: `/og/features-${f.slug}.png` });
}

export default async function FeaturePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const f = featureBySlug(slug);
  if (!f) notFound();
  const tabs = f.tabs.map((t) => {
    const preview = isPreview(t.screen);
    return {
      key: t.key,
      title: t.title,
      body: t.body,
      plan: t.plan,
      screen: (
        <div className="relative flex justify-center py-4">
          <div className="v2-glow w-[min(100%,440px)]" aria-hidden="true" />
          {t.kind === 'phone' ? (
            <div className="relative w-full max-w-[280px]">
              <ScreenFrame kind="phone" src={screen(t.screen)} alt={preview ? PROTO_ALT[t.screen as ProtoScreen] : t.alt} preview={preview} full={preview} className="!max-w-none" />
            </div>
          ) : (
            <ScreenFrame kind="browser" src={screen(t.screen)} alt={t.alt} preview={preview} />
          )}
        </div>
      ),
    };
  });
  const others = FEATURES.filter((o) => o.slug !== f.slug);
  return (
    <>
      <PageHero
        crumbs={[
          { label: 'Features', href: '/features' },
          { label: f.name, href: `/features/${f.slug}` },
        ]}
        eyebrow={f.stage}
        title={
          <>
            {f.headline[0]}
            <span className="em-coral">{f.headline[1]}</span>
            {f.headline[2]}
          </>
        }
        lede={f.lede}
        ctas={
          <>
            <StartFree />
            <TextLink href="#inside">See it on real screens</TextLink>
          </>
        }
        note={
          <ul className="mt-7 flex flex-wrap gap-2.5" aria-label="Key facts">
            {f.chips.map((c) => (
              <li key={c.label} className="factchip">
                <span className="factchip__label">{c.label}</span>
                <span className="factchip__value">{c.value}</span>
              </li>
            ))}
          </ul>
        }
        side={
          <div className={`relative w-full overflow-hidden rounded-[28px] border border-line ${f.scene.square ? 'aspect-square bg-bg-alt' : 'aspect-[4/3]'}`}>
            <Image src={f.scene.src} alt={f.scene.alt} fill priority sizes="(min-width: 1024px) 560px, 90vw" className={f.scene.square ? 'object-contain p-6' : 'object-cover'} />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(5,5,5,.6))]" aria-hidden="true" />
          </div>
        }
      />

      <section id="inside" className="section section--charcoal scroll-mt-[90px]">
        <div className="container">
          <SectionHead eyebrow="What is inside" title={<>What {f.name} does, <span className="em-coral">screen by screen</span>.</>} />
          <div className="mt-10">
            <FeatureTabs tabs={tabs} label={`${f.name} features`} />
          </div>
          <p className="mt-10 max-w-3xl text-[13px] leading-normal text-muted">{f.planNote}</p>
        </div>
      </section>

      <section id="faq" className="section">
        <div className="container">
          <Faq items={f.faq} jsonLd eyebrow="Questions" title={<>About {f.name}.</>} />
          <div className="mt-[clamp(48px,6vw,80px)]" data-reveal="rise">
            <p className="eyebrow eyebrow--plain">More features</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/features/${o.slug}`} className="pilltab !gap-2 no-underline">
                    {o.name}
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ClosingBand />
    </>
  );
}
