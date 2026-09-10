import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Hash } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { StartFree, TextLink } from '@/components/Button';
import { ClosingBand } from '@/components/ClosingBand';
import { Faq } from '@/components/Faq';
import { FeatureTabs } from '@/components/FeatureTabs';
import { MetricChip } from '@/components/MetricChip';
import { MiniMock } from '@/components/mockups/MiniMock';
import { Obj, Person } from '@/components/Person';
import { ScreenFrame } from '@/components/ScreenFrame';
import { Section, SectionHead } from '@/components/Section';
import { HeroIntro } from '@/motion/HeroIntro';
import { PROTO_ALT, type ProtoScreen } from '@/content/design';
import { FEATURES, featureBySlug } from '@/content/features';
import { isPreview, object, person, screen } from '@/lib/screens';
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
  const heroPreview = isPreview(f.heroScreen);
  const tabs = f.tabs.map((t) => {
    const preview = isPreview(t.screen);
    return {
      key: t.key,
      title: t.plan ? `${t.title} · ${t.plan}` : t.title,
      body: t.body,
      screen: (
        <div className="flex justify-center py-4">
          {t.kind === 'phone' ? (
            <ScreenFrame kind="phone" src={screen(t.screen)} alt={preview ? PROTO_ALT[t.screen as ProtoScreen] : t.alt} preview={preview} full={preview} />
          ) : (
            <ScreenFrame kind="browser" src={screen(t.screen)} alt={t.alt} preview={preview} />
          )}
        </div>
      ),
    };
  });
  const others = FEATURES.filter((o) => o.slug !== f.slug).slice(0, 3);
  return (
    <>
      <section className="section pt-8 sm:pt-10">
        <div className="container">
          <Breadcrumbs items={[{ label: 'Features', href: '/features' }, { label: f.name, href: `/features/${f.slug}` }]} />
          <HeroIntro className="mt-8 grid items-center gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)]">
            <div className="max-w-xl">
              <p className="eyebrow" data-hero-text>
                {f.name} · {f.stage}
              </p>
              <h1 className="display-1 mt-5" data-hero-text>
                {f.headline[0]}
                <span className="em-coral">{f.headline[1]}</span>
                {f.headline[2]}
              </h1>
              <p className="lede mt-5" data-hero-text>
                {f.lede}
              </p>
              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center" data-hero-text>
                <StartFree />
                <TextLink href="#inside">See it on real screens</TextLink>
              </div>
              <ul className="mt-8 flex flex-wrap gap-2" data-hero-text aria-label="Key facts">
                {f.chips.map((c) => (
                  <li key={c.label}>
                    <MetricChip icon={Hash} label={c.label} value={c.value} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="hero-stage relative min-h-[420px]">
              <div data-hero-card="1" className="mx-auto w-full max-w-[300px]">
                <ScreenFrame kind="phone" src={screen(f.heroScreen)} alt={heroPreview ? PROTO_ALT[f.heroScreen as ProtoScreen] : f.heroAlt} priority preview={heroPreview} full={heroPreview} />
              </div>
              <div className="absolute bottom-0 right-4 hidden h-[88%] w-[220px] lg:block" data-hero-card="2">
                <Person src={person(`feature-${f.slug}`)} alt="A person holding a phone with Linkist open towards the camera" hero bust sizes="240px" />
              </div>
            </div>
          </HeroIntro>
        </div>
      </section>

      <Section tone="charcoal" id="inside">
        <SectionHead eyebrow="What is inside" title={<>What {f.name} does, <span className="em-coral">screen by screen</span>.</>} />
        <div className="mt-12">
          <FeatureTabs tabs={tabs} label={`${f.name} features`} />
        </div>
        <p className="mt-8 max-w-3xl text-sm text-body">{f.planNote}</p>
      </Section>

      <Section id="live" glow>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div data-reveal="rise">
            <p className="eyebrow">See it move</p>
            <h2 className="display-2 mt-4">
              What it feels like, <span className="em-coral">in motion</span>.
            </h2>
            <p className="lede mt-4">A flow replayed with example figures. Nothing here is an app screen; the screens above are the real ones or labelled previews.</p>
          </div>
          <div className="card card--object mx-auto w-full max-w-md p-6" data-reveal="rise">
            <div className="flex items-center gap-3">
              <Obj name={f.object} src={object(f.object)} size={56} className="card__obj" />
              <p className="font-semibold">{f.name}</p>
            </div>
            <MiniMock mock={f.mock} />
          </div>
        </div>
      </Section>

      <Section tone="charcoal" tight id="faq">
        <SectionHead eyebrow="Questions" title={<>About {f.name}.</>} />
        <div className="mt-10 max-w-3xl">
          <Faq items={f.faq} jsonLd />
        </div>
        <div className="mt-8 flex flex-wrap gap-6">
          {others.map((o) => (
            <TextLink key={o.slug} href={`/features/${o.slug}`}>
              Next: {o.name}
            </TextLink>
          ))}
        </div>
      </Section>

      <ClosingBand person={person(`close-${f.slug}`)} />
    </>
  );
}
