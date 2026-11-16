'use client';

import Link from 'next/link';
import { Check, Copy, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState, type FormEvent, type InputHTMLAttributes } from 'react';
import { Turnstile } from '@/components/forms/Turnstile';
import { COUNTRIES } from '@/content/countries';
import { J, cta } from '@/content/journeys';
import { EARLY_ACCESS, SOURCE_KEYS } from '@/lib/early-access';
import { track } from '@/lib/tracking';

type Done = { code: string; firstName: string; email: string; emailed: boolean };
type State = { kind: 'idle' } | { kind: 'busy' } | { kind: 'done'; done: Done } | { kind: 'error'; message: string; fields?: Record<string, string> };

/**
 * The claim card and its confirmation (Linkist's early access design, D77). The code comes back from
 * /api/early-access, so it is not in the page; on success the confirmation opens over the page and
 * the card keeps the code, the button and the note once it is closed.
 */
export function ClaimForm() {
  const [state, setState] = useState<State>({ kind: 'idle' });
  const [token, setToken] = useState('');
  const [resetSignal, setResetSignal] = useState(0);
  const onToken = useCallback((t: string) => setToken(t), []);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (state.kind === 'done' && dialog.current && !dialog.current.open) dialog.current.showModal();
  }, [state]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const params = new URLSearchParams(window.location.search);
    const source: Record<string, string> = {};
    for (const k of SOURCE_KEYS) {
      const v = params.get(k);
      if (v) source[k] = v.slice(0, 200);
    }
    const value = (k: string) => String(fd.get(k) ?? '');
    const payload = {
      firstName: value('firstName'),
      lastName: value('lastName'),
      email: value('email'),
      country: value('country'),
      updates: fd.get('updates') === 'on',
      website: value('website'),
      turnstile: token,
      source,
    };
    setState({ kind: 'busy' });
    try {
      const res = await fetch('/api/early-access', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
      const data = (await res.json()) as Partial<Done> & { ok?: boolean; error?: string; errors?: Record<string, string> };
      if (res.ok && data.ok && data.code) {
        setState({ kind: 'done', done: { code: data.code, firstName: data.firstName ?? payload.firstName, email: data.email ?? payload.email, emailed: !!data.emailed } });
        track({ event: 'generate_lead', form_name: 'early_access_uae55' });
      } else {
        setState({ kind: 'error', message: data.error ?? 'Please check the highlighted fields.', fields: data.errors });
        setResetSignal((n) => n + 1);
      }
    } catch {
      setState({ kind: 'error', message: 'Could not reach the server. Try again in a minute.' });
      setResetSignal((n) => n + 1);
    }
  };

  const fe = state.kind === 'error' ? (state.fields ?? {}) : {};
  return (
    <div id="claim" className="ea-claim theme-light" tabIndex={-1}>
      {state.kind === 'done' ? (
        <Confirmation done={state.done} compact />
      ) : (
        <>
          <h2 className="ea-claim__title">Claim your early access</h2>
          <p className="mt-1.5 text-sm text-muted">200 places only. Open until 6 December 2026, or until all places are taken.</p>
          {/* method="post" keeps names and emails out of the address bar if the page's script has not loaded yet. */}
          <form onSubmit={onSubmit} method="post" className="mt-5 flex flex-col gap-4" noValidate>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field name="firstName" label="First name" autoComplete="given-name" maxLength={80} error={fe['firstName']} />
              <Field name="lastName" label="Last name" autoComplete="family-name" maxLength={80} error={fe['lastName']} />
            </div>
            <Field name="email" label="Work email" type="email" autoComplete="email" placeholder="name@company.com" maxLength={200} error={fe['email']} />
            <label className="ea-field">
              <span>Country</span>
              <select name="country" defaultValue={EARLY_ACCESS.defaultCountry} autoComplete="country-name" className="ea-input" aria-invalid={!!fe['country']}>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {fe['country'] ? <span className="ea-error">{fe['country']}</span> : null}
            </label>
            <label className="ea-consent">
              <input type="checkbox" name="updates" />
              Send me Linkist product updates
            </label>
            <Turnstile onToken={onToken} resetSignal={resetSignal} theme="light" />
            {state.kind === 'error' ? (
              <p role="alert" className="text-sm text-bad">
                {state.message}
              </p>
            ) : null}
            <button type="submit" className="btn btn--primary w-full" disabled={state.kind === 'busy'} aria-busy={state.kind === 'busy'}>
              Reveal my offer
            </button>
            <p className="text-center text-xs text-muted">
              By continuing you agree to our{' '}
              <Link href="/legal/privacy" className="underline">
                privacy policy
              </Link>
              .
            </p>
          </form>
        </>
      )}
      <dialog
        ref={dialog}
        className="ea-dialog theme-light"
        aria-labelledby="ea-welcome"
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
      >
        {state.kind === 'done' ? (
          <div className="ea-dialog__panel">
            <button type="button" className="ea-dialog__close" aria-label="Close" onClick={() => dialog.current?.close()}>
              <X size={20} aria-hidden="true" />
            </button>
            <Confirmation done={state.done} titleId="ea-welcome" />
          </div>
        ) : null}
      </dialog>
    </div>
  );
}

function Field({ name, label, error, ...rest }: { name: string; label: string; error?: string | undefined } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="ea-field">
      <span>{label}</span>
      <input name={name} required className="ea-input" aria-invalid={!!error} {...rest} />
      {error ? <span className="ea-error">{error}</span> : null}
    </label>
  );
}

const GETS = ['Founding Member status', 'Early access to new features', 'A direct feedback channel to the Linkist team'] as const;

/** The confirmation's words (Linkist's design, page 6). Compact keeps the code, the button and the note for the card. */
function Confirmation({ done, titleId, compact }: { done: Done; titleId?: string; compact?: boolean }) {
  return (
    <>
      <p className="ea-badge">Founding Member · UAE 55</p>
      <h2 id={titleId} className="ea-welcome">
        Welcome, {done.firstName}. Your early access is confirmed.
      </h2>
      {compact ? null : <p className="mt-5 text-sm font-semibold">Your coupon code</p>}
      <CodeRow code={done.code} />
      {compact ? null : (
        <>
          <p className="mt-6 text-sm font-semibold">What you get</p>
          <ul className="ea-gets-list">
            <li>
              <Check size={16} aria-hidden="true" />
              <span>
                <strong>One year of Linkist Pro, worth USD 100,</strong> at no cost to you
              </span>
            </li>
            {GETS.map((g) => (
              <li key={g}>
                <Check size={16} aria-hidden="true" />
                <span>{g}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">We’ll send you one short feedback survey 2 weeks after you join.</p>
          <p className="mt-5 text-[15px]">Copy your code, then choose Pro at checkout and paste it.</p>
        </>
      )}
      <a href={J.early_access_activate_pro} target="_blank" rel="noopener" {...cta(J.early_access_activate_pro, 'btn btn--primary mt-4 w-full')}>
        Activate my year of Pro
      </a>
      <p className="mt-3 text-center text-xs text-muted">
        {done.emailed ? `We’ve also emailed this code to ${done.email}. ` : ''}Use it by 6 December 2026. No payment details needed.
      </p>
    </>
  );
}

function CodeRow({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const box = useRef<HTMLSpanElement>(null);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // No clipboard access: select the code so it can be copied by hand.
      const range = document.createRange();
      if (!box.current) return;
      range.selectNodeContents(box.current);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  };
  return (
    <div className="ea-code-row">
      <span ref={box} className="ea-code">
        {code}
      </span>
      <button type="button" className="ea-copy" onClick={copy}>
        {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
        {copied ? 'Copied' : 'Copy code'}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Code copied' : ''}
      </span>
    </div>
  );
}
