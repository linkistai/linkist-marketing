import { Check } from 'lucide-react';
import { COMPARE_HEADERS, COMPARE_ROWS } from '@/content/plans';

/**
 * The plan comparison, feature by feature (v2): a scrollable region at least 860 px wide with a
 * sticky header, groups as full-width rows, ticks and dashes for yes and no (with text for
 * screen readers), and the Pro column tinted. Enterprise is interest only.
 */
export function CompareTable() {
  const pro = COMPARE_HEADERS.indexOf('Pro');
  const cell = (c: string) =>
    c === 'Yes' ? (
      <>
        <Check size={16} strokeWidth={2.5} aria-hidden="true" className="inline text-coral" />
        <span className="sr-only">Yes</span>
      </>
    ) : c === 'No' ? (
      <>
        <span aria-hidden="true" className="text-faint">
          –
        </span>
        <span className="sr-only">No</span>
      </>
    ) : (
      c
    );
  return (
    <div className="table-wrap compare" tabIndex={0} role="region" aria-label="Plan comparison table, scrolls sideways on small screens">
      <table className="table min-w-[860px]">
        <thead>
          <tr>
            <th scope="col">Feature</th>
            {COMPARE_HEADERS.map((h, j) => (
              <th key={h} scope="col" className={`text-center font-mono !text-[12px] uppercase !tracking-[0.1em] ${j === pro ? 'compare__pro' : ''}`}>
                {h}
                {h === 'Enterprise' ? <span className="block font-body text-[10px] normal-case tracking-normal text-muted">interest only</span> : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARE_ROWS.map((r, i) =>
            'group' in r ? (
              <tr key={`g-${i}`} className="table--group">
                <td colSpan={COMPARE_HEADERS.length + 1}>{r.group}</td>
              </tr>
            ) : (
              <tr key={r.label}>
                <th scope="row">{r.label}</th>
                {r.cells.map((c, j) => (
                  <td key={j} className={`text-center !text-[13px] ${j === pro ? 'compare__pro' : ''}`}>
                    {cell(c)}
                  </td>
                ))}
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}
