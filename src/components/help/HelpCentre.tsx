'use client';

import Link from 'next/link';
import { Search } from 'lucide-react';
import { useDeferredValue, useMemo, useState } from 'react';
import { HELP, HELP_CATEGORIES, type HelpCategory } from '@/content/help';

const norm = (s: string) => s.toLowerCase();

function Highlight({ text, q }: { text: string; q: string }) {
  if (!q) return <>{text}</>;
  const parts: React.ReactNode[] = [];
  const lower = norm(text);
  const needle = norm(q);
  let i = 0;
  let idx = lower.indexOf(needle);
  let k = 0;
  while (idx >= 0) {
    parts.push(text.slice(i, idx));
    parts.push(
      <mark key={k++} style={{ background: 'color-mix(in srgb, var(--brand-coral) 35%, transparent)', color: 'inherit', borderRadius: 3 }}>
        {text.slice(idx, idx + needle.length)}
      </mark>,
    );
    i = idx + needle.length;
    idx = lower.indexOf(needle, i);
  }
  parts.push(text.slice(i));
  return <>{parts}</>;
}

/** Category sidebar, instant search with highlighting, exclusive accordion per category. */
export function HelpCentre() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<HelpCategory | 'All'>('All');
  const dq = useDeferredValue(q.trim());
  const results = useMemo(() => {
    const needle = norm(dq);
    return HELP.filter((h) => (cat === 'All' || h.category === cat) && (!needle || norm(h.q).includes(needle) || norm(h.a).includes(needle)));
  }, [dq, cat]);
  const counts = useMemo(() => Object.fromEntries(HELP_CATEGORIES.map((c) => [c, HELP.filter((h) => h.category === c).length])), []);
  return (
    <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <label className="relative block">
          <span className="sr-only">Search the help centre</span>
          <Search size={16} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search, for example ICP or shipping" className="w-full rounded-xl border border-line-strong bg-surface py-3 pl-9 pr-3 text-base text-text" autoComplete="off" />
        </label>
        <nav aria-label="Categories" className="mt-4 flex gap-1 overflow-x-auto lg:flex-col" style={{ scrollbarWidth: 'none' }}>
          {(['All', ...HELP_CATEGORIES] as const).map((c) => (
            <button key={c} type="button" onClick={() => setCat(c)} aria-pressed={cat === c} className="flex min-h-[44px] flex-none items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm lg:flex-initial" style={cat === c ? { background: 'var(--color-surface)', boxShadow: 'var(--shadow-card)', fontWeight: 600 } : { color: 'var(--color-muted)' }}>
              <span>{c}</span>
              <span className="font-mono text-xs tabular text-muted">{c === 'All' ? HELP.length : counts[c]}</span>
            </button>
          ))}
        </nav>
      </aside>
      <div className="min-w-0">
        <p className="text-sm text-muted" role="status" aria-live="polite">
          {results.length} {results.length === 1 ? 'answer' : 'answers'}
          {dq ? ` for “${dq}”` : ''}
          {cat !== 'All' ? ` in ${cat}` : ''}
        </p>
        {results.length ? (
          HELP_CATEGORIES.filter((c) => results.some((r) => r.category === c)).map((c) => (
            <section key={c} className="mt-8" aria-labelledby={`help-${c.replace(/\s+/g, '-')}`}>
              <h2 id={`help-${c.replace(/\s+/g, '-')}`} className="display-3">
                {c}
              </h2>
              <div className="faq mt-4">
                {results
                  .filter((r) => r.category === c)
                  .map((r) => (
                    <details key={r.id} id={r.id} name={dq ? undefined : `help-${c}`} open={!!dq}>
                      <summary>
                        <span>
                          <Highlight text={r.q} q={dq} />
                        </span>
                        <span aria-hidden="true">+</span>
                      </summary>
                      <div className="faq__body">
                        <p>
                          <Highlight text={r.a} q={dq} />
                        </p>
                        {r.links?.length ? (
                          <p className="mt-2 flex flex-wrap gap-3 text-sm">
                            {r.links.map((l) =>
                              l.href.startsWith('http') ? (
                                <a key={l.href} href={l.href} className="link">
                                  {l.label}
                                </a>
                              ) : (
                                <Link key={l.href} href={l.href} className="link">
                                  {l.label}
                                </Link>
                              ),
                            )}
                          </p>
                        ) : null}
                      </div>
                    </details>
                  ))}
              </div>
            </section>
          ))
        ) : (
          <div className="card mt-8 p-6">
            <p className="font-semibold">No answer matches that yet.</p>
            <p className="mt-1 text-sm text-muted">Try a shorter word, or ask the assistant. It answers from these same {HELP.length} entries and says so when it does not know.</p>
          </div>
        )}
      </div>
    </div>
  );
}
