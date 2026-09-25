import type { Metadata } from 'next';
import Image from 'next/image';
import { StartFree, TextLink } from '@/components/Button';
import { ClosingBand } from '@/components/ClosingBand';
import { DesignPreview } from '@/components/DesignPreview';
import { Faq } from '@/components/Faq';
import { PageHero } from '@/components/PageHero';
import { PhoneStage } from '@/components/PhoneStage';
import { PreviewNote } from '@/components/PreviewNote';
import { Bullets, Outcome, Tags } from '@/components/Section';
import { PROTO_ALT } from '@/content/design';
import { FAQ, STAGES } from '@/content/home';
import { screen } from '@/lib/screens';
import { pageMeta } from '@/lib/site';

export const metadata: Metadata = pageMeta(
  'How Linkist works: capture, build, act',
  'The three-stage journey in depth. Capture the people you meet with their context, find the ones worth your attention, and know what to do next, each stage on a real screen.',
  '/how-it-works',
  { image: '/og/how-it-works.png' },
);

export default function HowItWorksPage() {
  const faq = FAQ.slice(0, 5);
  return (
    <>
      <PageHero
        crumbs={[{ label: 'How it works', href: '/how-it-works' }]}
        eyebrow="How Linkist works"
        title={
          <>
            Three stages. <span className="em-coral">One place</span> for every relationship.
          </>
        }
        lede="Capture and share, build relationships, act and grow. Each stage feeds the next."
        ctas={
          <>
            <StartFree />
            <TextLink href="#stage-1">Start at stage 1</TextLink>
          </>
        }
        side={
          <div className="relative w-[min(100%,520px)]">
            <div className="v2-glow left-[-10%] top-[-10%] w-[120%]" aria-hidden="true" />
            <Image src="/assets/gen/hero-tap.webp" alt="A hand tapping a Linkist NFC card on a phone that shows the Linkist app" width={928} height={1152} priority sizes="(min-width: 1024px) 520px, 90vw" className="home-hero__photo v2-float relative" />
          </div>
        }
      />

      {STAGES.map((s, i) => (
        <section key={s.n} id={`stage-${s.n}`} className={`section scroll-mt-[90px] ${i % 2 === 0 ? 'section--charcoal' : ''}`}>
          <div className="container">
            <div className="grid items-center gap-[clamp(32px,5vw,72px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
              <div className={`min-w-0 ${i % 2 ? 'md:order-2' : ''}`} data-reveal="rise">
                <p className="eyebrow eyebrow--plain">
                  {s.n} · {s.label}
                </p>
                <h2 className="display-2 mt-4">{s.title}</h2>
                <Bullets items={s.bullets} className="mt-[22px]" />
                <div className="mt-[22px]">
                  <Outcome>{s.outcome}</Outcome>
                </div>
                <Tags items={s.chips} className="mt-[18px]" />
                <div className="mt-6">
                  <TextLink href={s.href}>{featureName(s.href)} in full</TextLink>
                </div>
              </div>
              <div className="min-w-0" data-reveal="rise">
                <PhoneStage src={screen(s.screen)} alt={PROTO_ALT[s.screen]} priority={i === 0} />
              </div>
            </div>
            <PreviewNote />
          </div>
        </section>
      ))}

      <DesignPreview
        id="design"
        eyebrow="From the approved design"
        title={
          <>
            The screens behind the <span className="em-coral">three stages</span>.
          </>
        }
        body="Share by QR, WhatsApp, email or link; describe who you want and see who fits; open on the nudges that need action."
        items={[
          { screen: 'v6-shareready', title: 'Share by tap, QR, link, WhatsApp or email' },
          { screen: 'v6-icpdetail', title: 'Describe your ideal contact once and see who matches' },
          { screen: 'v6-home', title: 'A home screen that says what to do next' },
        ]}
      />

      <section id="faq" className="section section--charcoal">
        <div className="container">
          <Faq items={faq} jsonLd eyebrow="Questions" title="Straight answers." />
        </div>
      </section>

      <ClosingBand line1="Capture the people you meet." line2="Then act at the right time." />
    </>
  );
}

/** '/features/find' becomes 'Find'. */
function featureName(href: string): string {
  const slug = href.split('/').pop() ?? '';
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}
