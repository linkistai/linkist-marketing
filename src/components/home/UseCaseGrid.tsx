import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Outcome, Tags } from '@/components/Section';
import { USE_CASES } from '@/content/usecases';

/**
 * The five use cases as a settled grid (D17): three cards across, then two wider ones, each
 * rising into view in turn. One column on phones, two on tablets with the fifth card full width.
 */
export function UseCaseGrid() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6" data-reveal="rise" data-reveal-stagger="0.07" aria-label="Five use cases">
      {USE_CASES.map((u, i) => (
        <li key={u.slug} className={`flex ${i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'} ${i === 4 ? 'sm:col-span-2' : ''}`}>
          <Link href={`/use-cases/${u.slug}`} className="card card--sm sweep sweep--neutral lift flex w-full flex-col p-6 no-underline">
            <p className="eyebrow eyebrow--accent text-[11px]">{u.short}</p>
            <h3 className="display-3 mt-3 text-[20px]">{u.title}</h3>
            <p className="mt-2 text-sm text-body">{u.problem}</p>
            <div className="mt-4">
              <Outcome label="Result">{u.result}</Outcome>
            </div>
            <span className="flex-1" />
            <Tags items={u.chips.slice(0, 3)} className="mt-4" />
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-coral">
              Read the use case <ArrowRight size={14} aria-hidden="true" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
