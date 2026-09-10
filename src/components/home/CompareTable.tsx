import { COMPARE_HEADERS, COMPARE_ROWS } from '@/content/plans';

/** The plan comparison, feature by feature, from the prototype. Enterprise is interest only. */
export function CompareTable() {
  return (
    <div className="table-wrap" tabIndex={0} role="region" aria-label="Plan comparison table, scrolls sideways on small screens">
      <table className="table min-w-[760px]">
        <thead>
          <tr>
            <th scope="col">Feature</th>
            {COMPARE_HEADERS.map((h) => (
              <th key={h} scope="col" className="text-center">
                {h}
                {h === 'Enterprise' ? <span className="block text-[10px] font-medium">interest only</span> : null}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARE_ROWS.map((r, i) =>
            'group' in r ? (
              <tr key={`g-${i}`} className="table--group">
                <td colSpan={6}>{r.group}</td>
              </tr>
            ) : (
              <tr key={r.label}>
                <th scope="row">{r.label}</th>
                {r.cells.map((c, j) => (
                  <td key={j} className={`text-center ${c === 'Yes' ? 'yes' : c === 'No' ? 'no' : ''}`}>
                    {c}
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
