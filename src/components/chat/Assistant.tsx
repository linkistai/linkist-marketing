'use client';

import Link from 'next/link';
import { Bot, Send } from 'lucide-react';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { FALLBACK, SUGGESTED, search, type KnowledgeHit } from '@/lib/knowledge';
import { START_URL } from '@/lib/site';

interface Turn {
  readonly who: 'you' | 'linkist';
  readonly text: string;
  readonly hits?: KnowledgeHit[];
}

/**
 * The site assistant. Retrieval over the help corpus runs in the browser; when /api/chat is
 * configured with a Claude key it phrases the answer, otherwise the best match is shown as is.
 * Always labelled automated. Every answer offers Start free.
 */
export function Assistant({ compact }: { compact?: boolean }) {
  const [turns, setTurns] = useState<Turn[]>([{ who: 'linkist', text: 'Hello. I answer from the help centre and the product facts. Automated, not a live agent. What would you like to know?' }]);
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Braces matter: scrollIntoView returns a Promise in newer Chromium, and React would treat a
    // returned Promise as a cleanup function and crash the page on the next turn (Grownz D31).
    endRef.current?.scrollIntoView({ block: 'nearest' });
  }, [turns]);

  const ask = async (text: string) => {
    const question = text.trim();
    if (!question || busy) return;
    setQ('');
    setTurns((t) => [...t, { who: 'you', text: question }]);
    setBusy(true);
    const hits = search(question, 3);
    let answer = hits.length ? hits[0]!.entry.a : FALLBACK;
    try {
      const res = await fetch('/api/chat', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ question }) });
      if (res.ok) {
        const data = (await res.json()) as { answer?: string };
        if (data.answer) answer = data.answer;
      }
    } catch {
      /* offline or unconfigured: the retrieved answer stands */
    }
    setTurns((t) => [...t, { who: 'linkist', text: answer, hits }]);
    setBusy(false);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void ask(q);
  };

  return (
    <div className={`flex flex-col ${compact ? 'h-full' : 'card min-h-[520px]'}`}>
      <div className="flex items-center gap-2 border-b border-line px-4 py-3 text-sm">
        <span className="chip__icon" aria-hidden="true">
          <Bot size={15} />
        </span>
        <span className="font-semibold">Linkist assistant</span>
        <span className="ml-auto rounded-md bg-surface2 px-2 py-0.5 text-xs text-muted">Automated, not a live agent</span>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-4" role="log" aria-live="polite" aria-relevant="additions">
        <ul className="flex flex-col gap-3">
          {turns.map((t, i) => (
            <li key={i} className={`max-w-[92%] rounded-2xl px-4 py-3 text-sm ${t.who === 'you' ? 'self-end' : 'self-start'}`} style={t.who === 'you' ? { background: 'var(--brand-crimson)', color: '#fff' } : { background: 'var(--color-surface2)' }}>
              <p className="sr-only">{t.who === 'you' ? 'You' : 'Linkist assistant'}</p>
              <p>{t.text}</p>
              {t.hits && t.hits.length > 1 ? (
                <p className="mt-2 flex flex-wrap gap-2 text-xs">
                  <span className="text-muted">Related:</span>
                  {t.hits.slice(1).map((h) => (
                    <button key={h.entry.id} type="button" className="underline" onClick={() => void ask(h.entry.q)}>
                      {h.entry.q}
                    </button>
                  ))}
                </p>
              ) : null}
              {t.hits?.[0]?.entry.links?.length ? (
                <p className="mt-2 flex flex-wrap gap-3 text-xs">
                  {t.hits[0].entry.links.map((l) =>
                    l.href.startsWith('http') ? (
                      <a key={l.href} href={l.href} className="underline">
                        {l.label}
                      </a>
                    ) : (
                      <Link key={l.href} href={l.href} className="underline">
                        {l.label}
                      </Link>
                    ),
                  )}
                </p>
              ) : null}
              {t.who === 'linkist' && i > 0 ? (
                <p className="mt-2 text-xs">
                  <a href={START_URL} className="font-semibold underline">
                    Start free
                  </a>
                  <span className="text-muted"> with an email or a mobile number.</span>
                </p>
              ) : null}
            </li>
          ))}
          {busy ? <li className="self-start rounded-2xl bg-surface2 px-4 py-3 text-sm text-muted">Looking that up</li> : null}
        </ul>
        <div ref={endRef} />
      </div>
      <div className="border-t border-line p-3">
        {turns.length <= 1 ? (
          <div className="mb-3 flex flex-wrap gap-2">
            {SUGGESTED.slice(0, compact ? 3 : 6).map((s) => (
              <button key={s} type="button" className="intent !min-h-[36px] !text-sm" onClick={() => void ask(s)}>
                {s}
              </button>
            ))}
          </div>
        ) : null}
        <form onSubmit={onSubmit} className="flex gap-2">
          <label className="sr-only" htmlFor={compact ? 'chat-q-widget' : 'chat-q'}>
            Your question
          </label>
          <input id={compact ? 'chat-q-widget' : 'chat-q'} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ask about plans, cards, ICP matching" className="min-w-0 flex-1 rounded-xl border border-line-strong bg-surface px-3 py-2.5 text-base text-text" autoComplete="off" />
          <button type="submit" className="btn btn--primary btn--sm" disabled={busy || !q.trim()} aria-label="Send">
            <Send size={16} aria-hidden="true" />
          </button>
        </form>
        <p className="mt-2 text-[11px] text-muted">Answers come from the help centre and the product facts, never from your data. Nothing you type is stored by the site.</p>
      </div>
    </div>
  );
}
