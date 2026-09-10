import { Button } from '@/components/Button';
import { Person } from '@/components/Person';
import { G } from '@/lib/glossary';
import { START_URL } from '@/lib/site';

/**
 * Closing band (brief 5): a two-line imperative over a near-black panel with a crimson glow, a
 * person standing at the right, one CTA and one reassurance line.
 */
export function ClosingBand({
  line1 = 'Capture the people you meet.',
  line2 = 'Remember why they mattered.',
  reassurance = G.reassurance,
  cta = G.ctaPrimary,
  href = START_URL,
  person,
  personAlt = '',
}: {
  line1?: string;
  line2?: string;
  reassurance?: string;
  cta?: string;
  href?: string;
  person?: string;
  personAlt?: string;
}) {
  return (
    <section className="section section--tight">
      <div className="container">
        <div className="band band--person relative overflow-hidden p-8 text-center sm:p-14 lg:p-20 lg:text-left">
          <div className="relative z-[1] lg:max-w-[58%]">
            <h2 className="display-2 mx-auto max-w-2xl lg:mx-0">
              {line1}
              <br />
              {line2}
            </h2>
            <div className="mt-8 flex justify-center lg:justify-start">
              <Button href={href} variant="primary" size="lg">
                {cta}
              </Button>
            </div>
            <p className="mt-4 text-sm text-body">{reassurance}</p>
          </div>
          {person ? (
            <div className="band__person" aria-hidden="true">
              <Person src={person} alt={personAlt} hero sizes="360px" />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
