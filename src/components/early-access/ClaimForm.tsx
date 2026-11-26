'use client';

import Link from 'next/link';
import { Check, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState, type FormEvent, type InputHTMLAttributes, type MouseEvent as ReactMouseEvent } from 'react';
import { Turnstile } from '@/components/forms/Turnstile';
import { CTA_CLASS, J, cta } from '@/content/journeys';
import { EARLY_ACCESS, SOURCE_KEYS, activationUrl, type Closed } from '@/lib/early-access';
import { track } from '@/lib/tracking';

type Done = { name: string; email: string; emailed: boolean };
type State =
  | { kind: 'idle' }
  | { kind: 'busy' }
  | { kind: 'done'; done: Done }
  | { kind: 'closed'; closed: Closed }
  | { kind: 'error'; message: string; fields?: Record<string, string> };

/**
 * The claim card and its confirmation (Linkist's early access design, D77; Liju's notes v2.1 and RatioX Labs'
 * hand-off, D79). A claim sends the name and email to /api/early-access. On success the confirmation opens over
 * the page, and once it is closed the card keeps the next step and the button, which opens the app in this tab
 * with the coupon applied and the email filled in. When the places are gone or the date has passed, the card
 * says so instead of showing the form.
 */
export function ClaimForm({ closed }: { closed: Closed | null }) {
  const [state, setState] = useState<State>(closed ? { kind: 'closed', closed } : { kind: 'idle' });
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
      name: value('name'),
      email: value('email'),
      updates: fd.get('updates') === 'on',
      website: value('website'),
      turnstile: token,
      source,
    };
    setState({ kind: 'busy' });
    try {
      const res = await fetch('/api/early-access', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
      const data = (await res.json()) as Partial<Done> & { ok?: boolean; error?: string; errors?: Record<string, string>; closed?: Closed };
      if (res.ok && data.ok && data.email) {
        setState({ kind: 'done', done: { name: data.name ?? payload.name, email: data.email, emailed: !!data.emailed } });
        track({ event: 'generate_lead', form_name: 'early_access_uae55' });
      } else if (res.status === 410 && data.closed) {
        setState({ kind: 'closed', closed: data.closed });
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
      {state.kind === 'closed' ? (
        <ClosedCard closed={state.closed} />
      ) : state.kind === 'done' ? (
        <Confirmation done={state.done} compact />
      ) : (
        <>
          {/* The card's words follow the owner's mockup (26 November 2026, D83). */}
          <h2 className="ea-claim__title">Claim your Founding Member place</h2>
          <p className="mt-1.5 text-sm text-muted">Open to the first 55 eligible sign-ups. Claim by 31 December 2026 or before all places are taken.</p>
          {/* method="post" keeps names and emails out of the address bar if the page's script has not loaded yet. */}
          <form onSubmit={onSubmit} method="post" className="mt-5 flex flex-col gap-4" noValidate>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            <Field name="name" label="Name" autoComplete="given-name" maxLength={80} error={fe['name']} />
            <Field name="email" label="Email" type="email" autoComplete="email" placeholder="name@company.com" maxLength={200} error={fe['email']} />
            <div className="ea-field">
              <label htmlFor="ea-country">Country of residence</label>
              <input id="ea-country" value={EARLY_ACCESS.country} readOnly className="ea-input ea-input--fixed" aria-describedby="ea-country-hint" />
              <span id="ea-country-hint" className="ea-hint">
                This offer is for professionals based in the UAE.
              </span>
            </div>
            <label className="ea-consent">
              <input type="checkbox" name="updates" />
              Send me Linkist product updates
            </label>
            <Turnstile onToken={onToken} resetSignal={resetSignal} theme="light" />
            <p className="text-sm text-muted">Enter your details on Linkist’s registration page.</p>
            {state.kind === 'error' ? (
              <p role="alert" className="text-sm text-bad">
                {state.message}
              </p>
            ) : null}
            <button type="submit" className="btn btn--primary w-full" disabled={state.kind === 'busy'} aria-busy={state.kind === 'busy'}>
              Claim my year of Pro
            </button>
            <p className="text-center text-xs text-muted">
              By continuing you agree to our{' '}
              <Link href="/legal/terms" className="underline">
                Terms of Use
              </Link>{' '}
              and{' '}
              <Link href="/legal/privacy" className="underline">
                Privacy Policy
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

/** The card once claims stop (Liju's notes v2.1, section 13): full, with a way to Pro, or closed. */
function ClosedCard({ closed }: { closed: Closed }) {
  return (
    <>
      <h2 className="ea-claim__title">{closed.title}</h2>
      {closed.text ? <p className="mt-2 text-[15px] text-muted">{closed.text}</p> : null}
      {closed.state === 'full' ? (
        <a href={J.early_access_full_see_plans} {...cta(J.early_access_full_see_plans, 'btn btn--primary mt-5 w-full')}>
          See Pro plans
        </a>
      ) : null}
    </>
  );
}

const GETS = ['Founding Member status', 'Early access to new features', 'A direct feedback channel to the Linkist team'] as const;

/** The confirmation's words (Linkist's design, with Liju's notes v2.1, section 11). Compact keeps the next step, the button and the note for the card. */
function Confirmation({ done, titleId, compact }: { done: Done; titleId?: string; compact?: boolean }) {
  return (
    <>
      <p className="ea-badge">Founding Member · UAE 55</p>
      <h2 id={titleId} className="ea-welcome">
        Welcome, {done.name}. Your early access is confirmed.
      </h2>
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
        </>
      )}
      <p className="mt-5 text-[15px]">Next, create your Linkist account and verify this email with a 6-digit code. Your Pro year is linked to this email.</p>
      <ActivateButton email={done.email} />
      <p className="mt-3 text-center text-xs text-muted">
        {done.emailed ? `We’ve also emailed this to ${done.email}. ` : ''}Use it by 31 December 2026. No payment details needed.
      </p>
    </>
  );
}

/**
 * Activate my year of Pro, in this tab (RatioX Labs' hand-off, D79). The href is the link without the email, so
 * the tags on this page, which read links and clicks, never see it; a plain click goes to the same link with the
 * email added. A click with a modifier key opens the plain link, and the app asks for the email there.
 */
function ActivateButton({ email }: { email: string }) {
  const onClick = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    window.location.assign(activationUrl('popup', email));
  };
  return (
    <a href={activationUrl('popup')} onClick={onClick} className={`btn btn--primary mt-4 w-full ${CTA_CLASS}`} data-cta="early_access_activate_pro">
      Activate my year of Pro
    </a>
  );
}
