import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PROTO_ALT } from '@/content/design';
import { USE_CASES } from '@/content/usecases';
import { crop } from '@/lib/screens';

/**
 * The five use cases as picture cards (D51, from linkist-homepage-v1.html): a 4:3 crop of the
 * prototype screen the use case turns on, then the short title with an arrow. The problem, result
 * and capability tags moved to the use-case pages. Three across, the last two centred beneath.
 */
export function UseCaseGrid() {
  return (
    <ul className="uc-grid" data-reveal="rise" data-reveal-stagger="0.07" aria-label="Five use cases">
      {USE_CASES.map((u) => {
        const src = crop(u.screen);
        return (
          <li key={u.slug} className="uc-grid__item">
            <Link href={`/use-cases/${u.slug}`} className="uc no-underline">
              <div className="uc__shot">
                {src ? <Image src={src} alt={PROTO_ALT[u.screen]} fill sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 90vw" /> : <span className="screen-pending" />}
              </div>
              <h3 className="uc__title">
                {u.short}
                <ArrowRight size={15} aria-hidden="true" className="uc__arrow" />
              </h3>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
