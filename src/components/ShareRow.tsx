'use client';

import { Check, Link2, Mail, Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * Share row: Copy link always copies (the Grownz audit found the old one opened a share sheet
 * instead), LinkedIn and email, and a separate Share button where the browser offers native sharing.
 */
export function ShareRow({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);
  useEffect(() => {
    setCanShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function');
  }, []);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  };
  const share = async () => {
    try {
      await navigator.share({ url, title });
    } catch {
      /* dismissed */
    }
  };
  const text = encodeURIComponent(`${title} ${url}`);
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm" aria-label="Share">
      <span className="text-muted">Share</span>
      <button type="button" className="btn btn--ghost btn--sm" onClick={copy}>
        {copied ? <Check size={16} aria-hidden="true" /> : <Link2 size={16} aria-hidden="true" />}
        {copied ? 'Copied' : 'Copy link'}
      </button>
      <a className="btn btn--ghost btn--sm" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">
        <Share2 size={16} aria-hidden="true" /> LinkedIn
      </a>
      <a className="btn btn--ghost btn--sm" href={`mailto:?subject=${encodeURIComponent(title)}&body=${text}`}>
        <Mail size={16} aria-hidden="true" /> Email
      </a>
      {canShare ? (
        <button type="button" className="btn btn--ghost btn--sm" onClick={share}>
          <Share2 size={16} aria-hidden="true" /> Share
        </button>
      ) : null}
    </div>
  );
}
