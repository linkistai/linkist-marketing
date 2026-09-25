import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { MiniMock } from '@/components/mockups/MiniMock';
import { CAPABILITIES } from '@/content/home';
import { FEATURES } from '@/content/features';

/**
 * "What powers Linkist": the four AI capabilities (AI Enrichment, Natural-Language Search, ICP
 * Matching, Intelligent Nudges), each replayed as a mini mockup with example figures and linked to
 * the feature page it belongs to. Shared by the home page and /features so the two always match.
 */
export function CapabilityCards() {
  return (
    <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,270px),1fr))]" data-reveal="rise" data-reveal-stagger="0.08">
      {CAPABILITIES.map((c) => {
        const feature = FEATURES.find((f) => `/features/${f.slug}` === c.href);
        return (
          <article key={c.title} className="capcard">
            <div className="capcard__well">
              <MiniMock mock={c.mock} />
            </div>
            <div className="flex flex-1 flex-col">
              <h3 className="font-display text-[21px] font-semibold tracking-[-0.02em]">{c.title}</h3>
              <p className="mt-2 text-sm leading-normal text-body">{c.body}</p>
              {feature ? (
                <Link href={c.href} className="mt-auto inline-flex min-h-[44px] items-center gap-1.5 pt-3 text-sm font-medium text-coral no-underline transition-colors hover:text-white">
                  In {feature.name} <ArrowRight size={14} aria-hidden="true" />
                </Link>
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}
