'use client';

import { useCallback, useState, type FormEvent } from 'react';
import { Turnstile } from './Turnstile';

/**
 * One-field email sign-up, used for the community band (posting to /api/community) and the footer
 * (posting to /api/subscribe). Renders the Turnstile widget when the site key is set and resets it
 * after any failure. Honest failure when the route is unconfigured (503 becomes a plain message).
 */
export function Newsletter({ endpoint = '/api/subscribe', label = 'Product notes by email', button = 'Subscribe', placeholder = 'you@example.com', note = 'Occasional, no tracking, unsubscribe any time.', large }: { endpoint?: string; label?: string; button?: string; placeholder?: string; note?: string; large?: boolean }) {
  const [state, setState] = useState<'idle' | 'busy' | 'done' | 'error'>('idle');
  const [msg, setMsg] = useState('');
  const [token, setToken] = useState('');
  const [resetSignal, setResetSignal] = useState(0);
  const onToken = useCallback((t: string) => setToken(t), []);
  const id = endpoint.replace(/[^a-z]/g, '') + '-email';
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setState('busy');
    try {
      const res = await fetch(endpoint, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...Object.fromEntries(fd.entries()), turnstile: token }) });
      const data = (await res.json()) as { ok?: boolean; error?: string; errors?: Record<string, string> };
      if (res.ok && data.ok) setState('done');
      else {
        setState('error');
        setMsg(data.error ?? data.errors?.['email'] ?? 'Could not sign you up.');
        setResetSignal((n) => n + 1);
      }
    } catch {
      setState('error');
      setMsg('Could not reach the server.');
      setResetSignal((n) => n + 1);
    }
  };
  if (state === 'done')
    return (
      <p className="text-sm font-medium" role="status" style={{ color: 'var(--brand-green)' }}>
        Thanks. You are on the list.
      </p>
    );
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2" noValidate>
      <label htmlFor={id} className={large ? 'sr-only' : 'text-xs font-semibold uppercase tracking-[0.04em] text-muted'}>
        {label}
      </label>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="flex flex-col gap-2 sm:flex-row">
        <input id={id} name="email" type="email" required placeholder={placeholder} className={`min-w-0 flex-1 rounded-full border px-5 text-base text-text ${large ? 'min-h-[50px]' : 'min-h-[42px]'}`} style={{ background: 'var(--color-surface)', borderColor: 'var(--color-line-strong)' }} />
        <button type="submit" className={`btn btn--primary ${large ? '' : 'btn--sm'}`} disabled={state === 'busy'}>
          {state === 'busy' ? 'Sending' : button}
        </button>
      </div>
      <Turnstile onToken={onToken} theme="dark" resetSignal={resetSignal} />
      {state === 'error' ? (
        <p role="alert" className="text-xs" style={{ color: 'var(--color-accent-ink)' }}>
          {msg}
        </p>
      ) : (
        <p className="text-xs text-muted">{note}</p>
      )}
    </form>
  );
}
