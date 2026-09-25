import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import Link from 'next/link';
import { ClosingBand } from '@/components/ClosingBand';
import { HelpCentre } from '@/components/help/HelpCentre';
import { HELP, HELP_CATEGORIES } from '@/content/help';
import { pageMeta } from '@/lib/site';

export const metadata: Metadata = pageMeta(
  'Help centre',
  `${HELP.length} answers in ${HELP_CATEGORIES.length} categories, written from the product, the store and the published policy and terms: getting started, capture, profiles and cards, find, act, teams, plans and billing, NFC cards and shipping, AI and data, security, troubleshooting, and the limits Linkist states plainly.`,
  '/help',
  { image: '/og/help.png' },
);

/** The help centre (brief 4, checkpoint 5): categories, instant search, and the Limits category that states section 3.9 plainly. */
export default function HelpPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Help centre', href: '/help' }]}
        eyebrow="Help centre"
        title={
          <>
            Answers, <span className="em-coral">with their sources</span>.
          </>
        }
        lede={`${HELP.length} answers in ${HELP_CATEGORIES.length} categories, limits included. Search as you type.`}
        note={
          <p className="mt-5 text-sm text-muted">
            Prefer to ask?{' '}
            <Link href="/chat" className="underline underline-offset-4 hover:text-white">
              The assistant answers from these same entries
            </Link>
            . For anything else, email support@linkist.ai.
          </p>
        }
      />
      <section className="section !pt-0">
        <div className="container">
          <HelpCentre />
        </div>
      </section>
      <ClosingBand line1="Still stuck?" line2="Ask the assistant, or start free." reassurance="The assistant is automated. Free, no card needed." />
    </>
  );
}
