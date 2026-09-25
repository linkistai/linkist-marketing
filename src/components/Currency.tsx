'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Currency } from '@/lib/glossary';

const KEY = 'lk-currency';
const Ctx = createContext<{ currency: Currency; setCurrency: (c: Currency) => void }>({ currency: 'AED', setCurrency: () => {} });

/**
 * One currency for every price on the site (owner, 25 September 2026): AED by default, USD on
 * request. Every switch shares it, so choosing USD in the plan cards also changes the NFC card
 * tiers and the bundles, and the choice is remembered on this device.
 */
export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, set] = useState<Currency>('AED');
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(KEY);
      if (saved === 'USD' || saved === 'AED') set(saved);
    } catch {
      /* storage blocked: keep the default */
    }
  }, []);
  const setCurrency = useCallback((c: Currency) => {
    set(c);
    try {
      window.localStorage.setItem(KEY, c);
    } catch {
      /* storage blocked: the choice lasts for this page */
    }
  }, []);
  return <Ctx.Provider value={{ currency, setCurrency }}>{children}</Ctx.Provider>;
}

export const useCurrency = () => useContext(Ctx);

/** The USD / AED pill switch from the owner's reference: the chosen currency sits in a red pill. */
export function CurrencySwitch({ className = '', label = 'Show prices in' }: { className?: string; label?: string }) {
  const { currency, setCurrency } = useCurrency();
  return (
    <div role="group" aria-label={label} className={`curswitch ${className}`}>
      {(['USD', 'AED'] as const).map((c) => (
        <button key={c} type="button" className="curswitch__btn" aria-pressed={currency === c} onClick={() => setCurrency(c)}>
          {c}
        </button>
      ))}
    </div>
  );
}
