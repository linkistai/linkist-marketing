import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { ClosingBand } from '@/components/ClosingBand';
import { HelpCentre } from '@/components/help/HelpCentre';
import { J } from '@/content/journeys';
import { pageMeta } from '@/lib/site';

export const metadata: Metadata = pageMeta(
  'Help centre',
  'Linkist support: answers about getting started, capture, profiles and cards, finding the right people, acting on them, teams, plans and billing, and NFC cards and shipping.',
  '/help',
  { image: '/og/help.png' },
);

/** The help centre (brief 4, checkpoint 5): a plain support title and description (owner, 2 October 2026, D71), categories and instant search. */
export default function HelpPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Help centre', href: '/help' }]}
        eyebrow="Help centre"
        title={
          <>
            How can we <span className="em-coral">help</span>?
          </>
        }
        lede="Answers about your account, profiles and cards, plans and billing, and NFC cards and shipping. For anything else, email support@linkist.ai."
      />
      <section className="section !pt-0">
        <div className="container">
          <HelpCentre />
        </div>
      </section>
      <ClosingBand href={J.help_start_now} line1="Still stuck?" line2="Ask the assistant, or start now." reassurance="The assistant is automated. Free, no card needed." />
    </>
  );
}
