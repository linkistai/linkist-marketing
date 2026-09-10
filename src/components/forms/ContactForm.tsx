'use client';

import { useCallback, useState, type FormEvent } from 'react';
import { Turnstile } from './Turnstile';

type State = { kind: 'idle' } | { kind: 'busy' } | { kind: 'done' } | { kind: 'error'; message: string; fields?: Record<string, string> };

/** Talk to us: support, partnerships, press, security, enterprise interest. Honest failure states; 503 becomes a plain message. */
export function ContactForm({ defaultTopic = 'support' }: { defaultTopic?: string }) {
  const [state, setState] = useState<State>({ kind: 'idle' });
  const [token, setToken] = useState('');
  const [resetSignal, setResetSignal] = useState(0);
  const onToken = useCallback((t: string) => setToken(t), []);
  const field = 'w-full rounded-xl border border-line-strong bg-surface px-3 py-3 text-base text-text';
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    setState({ kind: 'busy' });
    try {
      const res = await fetch('/api/lead', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...payload, turnstile: token }) });
      const data = (await res.json()) as { ok?: boolean; error?: string; errors?: Record<string, string> };
      if (res.ok && data.ok) setState({ kind: 'done' });
      else {
        setState({ kind: 'error', message: data.error ?? 'Please check the highlighted fields.', fields: data.errors });
        setResetSignal((n) => n + 1);
      }
    } catch {
      setState({ kind: 'error', message: 'Could not reach the server. Try again in a minute.' });
      setResetSignal((n) => n + 1);
    }
  };
  if (state.kind === 'done')
    return (
      <div className="card p-6" role="status">
        <p className="font-semibold">Thank you. It has been sent.</p>
        <p className="mt-1 text-sm text-muted">We reply from a real inbox, usually within 2 working days.</p>
      </div>
    );
  const fe = state.kind === 'error' ? (state.fields ?? {}) : {};
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm font-semibold">
          Your name
          <input name="name" required maxLength={120} className={field} aria-invalid={!!fe['name']} />
          {fe['name'] ? <span className="text-xs font-normal text-bad">{fe['name']}</span> : null}
        </label>
        <label className="flex flex-col gap-1 text-sm font-semibold">
          Your email
          <input name="email" type="email" required maxLength={200} className={field} aria-invalid={!!fe['email']} />
          {fe['email'] ? <span className="text-xs font-normal text-bad">{fe['email']}</span> : null}
        </label>
      </div>
      <label className="flex flex-col gap-1 text-sm font-semibold">
        Topic
        <select name="topic" defaultValue={defaultTopic} className={field}>
          <option value="support">Support</option>
          <option value="teams">Teams and Enterprise interest</option>
          <option value="partnership">Partnerships</option>
          <option value="press">Press</option>
          <option value="security">Security</option>
          <option value="other">Something else</option>
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm font-semibold">
        Message
        <textarea name="message" required minLength={10} maxLength={4000} rows={5} className={field} aria-invalid={!!fe['message']} />
        {fe['message'] ? <span className="text-xs font-normal text-bad">{fe['message']}</span> : null}
      </label>
      <Turnstile onToken={onToken} resetSignal={resetSignal} />
      {state.kind === 'error' ? (
        <p role="alert" className="text-sm text-bad">
          {state.message}
        </p>
      ) : null}
      <button type="submit" className="btn btn--primary self-start" disabled={state.kind === 'busy'}>
        {state.kind === 'busy' ? 'Sending' : 'Send'}
      </button>
      <p className="text-xs text-muted">No sales call follows. Do not put other people’s personal details in this form.</p>
    </form>
  );
}
