import { TextLink } from '@/components/Button';
import { Newsletter } from '@/components/forms/Newsletter';
import { COMMUNITY } from '@/content/home';

/** "Join the Linkist community": the prototype's rounded panel with an email form, posting to /api/community. */
export function CommunityBand() {
  return (
    <section id="community" className="section section--tight">
      <div className="container">
        <div className="card flex flex-col gap-8 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between" style={{ borderRadius: 'var(--radius-3xl)' }} data-reveal="rise">
          <div className="max-w-xl">
            <p className="eyebrow">{COMMUNITY.eyebrow}</p>
            <h2 className="display-2 mt-3 text-[28px] sm:text-[32px]">{COMMUNITY.title}</h2>
            <p className="mt-3 text-sm text-body">{COMMUNITY.body}</p>
            <p className="mt-3 text-sm">
              <TextLink href="/community">What members get</TextLink>
            </p>
          </div>
          <div className="w-full max-w-md">
            <Newsletter endpoint="/api/community" label="Email address" placeholder="Email address" button="Join" note="No spam. Unsubscribe any time." large />
          </div>
        </div>
      </div>
    </section>
  );
}
