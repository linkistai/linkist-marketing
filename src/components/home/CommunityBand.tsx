import { TextLink } from '@/components/Button';
import { Newsletter } from '@/components/forms/Newsletter';
import { COMMUNITY } from '@/content/home';

/** "Join the Linkist community": the prototype's rounded panel with an email form, posting to /api/community. */
export function CommunityBand() {
  return (
    <section id="community" className="pb-[clamp(60px,8vw,100px)]">
      <div className="container">
        <div className="grid items-center gap-8 rounded-[32px] border border-[rgba(255,255,255,0.09)] bg-surface p-[clamp(28px,5vw,56px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,360px),1fr))]" data-reveal="rise">
          <div>
            <p className="eyebrow eyebrow--plain">{COMMUNITY.eyebrow}</p>
            <h2 className="mt-3.5 font-display text-[clamp(28px,3vw,40px)] font-semibold leading-[1.05] tracking-[-0.03em]">{COMMUNITY.title}</h2>
            <p className="mt-3 max-w-[480px] text-[15px] leading-relaxed text-body">{COMMUNITY.body}</p>
            <p className="mt-3">
              <TextLink href="/community">What members get</TextLink>
            </p>
          </div>
          <div className="w-full">
            <Newsletter endpoint="/api/community" label="Email address" placeholder="Email address" button="Join" note="No spam. Unsubscribe any time." large />
          </div>
        </div>
      </div>
    </section>
  );
}
