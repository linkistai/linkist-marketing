import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { MiniMock } from '@/components/mockups/MiniMock';
import { Obj } from '@/components/Person';
import { CAPABILITIES } from '@/content/home';
import { object } from '@/lib/screens';

/** "What powers Linkist": four cards, each with a 3D object slot and an animated mini mockup (Grownz D26). */
export function CapabilityGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-reveal="rise" data-reveal-stagger="0.08">
      {CAPABILITIES.map((c) => (
        <Link key={c.title} href={c.href} className="card card--object sweep sweep--neutral lift flex flex-col p-6 no-underline">
          <div className="flex items-start justify-between gap-3">
            <h3 className="display-3 text-[21px]">{c.title}</h3>
            <Obj name={c.object} src={object(c.object)} size={64} className="card__obj -mr-2 -mt-2 flex-none" />
          </div>
          <p className="mt-2 text-sm text-body">{c.body}</p>
          <MiniMock mock={c.mock} />
          <span className="flex-1" />
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-coral">
            See how it works <ArrowRight size={14} aria-hidden="true" />
          </span>
        </Link>
      ))}
    </div>
  );
}
