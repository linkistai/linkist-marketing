import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ClosingBand } from '@/components/ClosingBand';
import { HelpCentre } from '@/components/help/HelpCentre';
import { Section, SectionHead } from '@/components/Section';
import { HELP, HELP_CATEGORIES } from '@/content/help';
import { person } from '@/lib/screens';
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
      <Section tight className="pt-8 sm:pt-10">
        <Breadcrumbs items={[{ label: 'Help centre', href: '/help' }]} />
        <div className="mt-8">
          <SectionHead as="h1" size={1} eyebrow="Help centre" title={<>Answers, <span className="em-coral">with their sources</span>.</>} lede={`${HELP.length} questions in ${HELP_CATEGORIES.length} categories, including the limits Linkist has today. Search as you type; every answer says where it comes from when the app has not confirmed it yet.`} />
          <p className="mt-5 text-sm text-muted">
            Prefer to ask?{' '}
            <Link href="/chat" className="link">
              The assistant answers from these same entries
            </Link>
            . For anything else, email support@linkist.ai.
          </p>
        </div>
      </Section>
      <Section tone="charcoal" tight>
        <HelpCentre />
      </Section>
      <ClosingBand person={person('close-8')} line1="Still stuck?" line2="Ask the assistant, or start free." reassurance="The assistant is automated, not a live agent. Free plan, no card required." />
    </>
  );
}
