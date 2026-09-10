import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Assistant } from '@/components/chat/Assistant';
import { Section, SectionHead } from '@/components/Section';
import { HELP } from '@/content/help';
import { SUGGESTED } from '@/lib/knowledge';
import { pageMeta } from '@/lib/site';

export const metadata: Metadata = pageMeta(
  'Ask the assistant',
  'An automated assistant that answers from the help centre and the product facts: plans, NFC cards, ICP Matching, sign-in, AI and data, security. It says when it does not know and hands you to Start free.',
  '/chat',
  { image: '/og/chat.png' },
);

const HOW = [
  ['It reads the help centre', `Every answer comes from the ${HELP.length} help entries and a short sheet of product facts. Nothing else, and never your data.`],
  ['It says when it does not know', 'A question outside those entries gets a plain "I do not know" and a pointer to support@linkist.ai, not a guess.'],
  ['Nothing you type is stored', 'Questions are matched in your browser. When a model is configured on the server it phrases the matched entries and keeps nothing.'],
] as const;

/** The full-page assistant (brief 4, checkpoint 5): the same brain as the floating widget on every page. */
export default function ChatPage() {
  return (
    <>
      <Section tight className="pt-8 sm:pt-10">
        <Breadcrumbs items={[{ label: 'Ask the assistant', href: '/chat' }]} />
        <div className="mt-8">
          <SectionHead as="h1" size={1} eyebrow="Ask the assistant" title={<>Ask anything <span className="em-coral">the help centre knows</span>.</>} lede="Automated, not a live agent. It answers from the same entries as the help centre and hands you to Start free when you are ready." />
        </div>
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <Assistant />
          <aside className="flex flex-col gap-4">
            <div className="card p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.04em] text-muted">Try asking</p>
              <ul className="mt-3 flex flex-col gap-2 text-sm">
                {SUGGESTED.map((s) => (
                  <li key={s} className="text-body">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            {HOW.map(([t, b]) => (
              <div key={t} className="card p-5">
                <p className="font-semibold">{t}</p>
                <p className="mt-1 text-sm text-body">{b}</p>
              </div>
            ))}
            <p className="text-sm text-muted">
              Prefer to browse?{' '}
              <Link href="/help" className="link">
                Open the help centre
              </Link>
            </p>
          </aside>
        </div>
      </Section>
    </>
  );
}
