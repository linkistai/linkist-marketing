'use client';

import { CURRENCIES, type Currency } from '@/lib/glossary';

/** USD or AED display for the NFC cards and bundles (the prototype's cardCurrency switch). */
export function CurrencySwitcher({ value, onChange, label = 'Currency' }: { value: Currency; onChange: (c: Currency) => void; label?: string }) {
  return (
    <div className="seg" role="group" aria-label={label}>
      {CURRENCIES.map((c) => (
        <button key={c} type="button" className="seg__btn" aria-pressed={value === c} onClick={() => onChange(c)}>
          {c}
        </button>
      ))}
    </div>
  );
}
