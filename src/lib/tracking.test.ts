import { describe, expect, it } from 'vitest';
import { CONSENT_KEY, GTM_HOSTS, GTM_ID, bootJs, headScript } from './tracking';

describe('Google Tag Manager start (D75)', () => {
  it('runs the marketing team container on the live hosts only', () => {
    expect(GTM_ID).toBe('GTM-P8RPQ6RG');
    expect(GTM_HOSTS).toEqual(['www.linkist.ai', 'linkist.ai']);
  });

  it('starts once, with Consent Mode set before the container loads', () => {
    const js = bootJs();
    expect(js.startsWith('if(!window.__linkistGtm)')).toBe(true);
    expect(js.indexOf("gtag('consent','default'")).toBeLessThan(js.indexOf('gtm.js?id=GTM-P8RPQ6RG'));
  });

  it('starts from <head> only for a visitor whose choice allows it, and only on a live host', () => {
    const js = headScript();
    expect(js).toContain('["www.linkist.ai","linkist.ai"].indexOf(location.hostname)<0');
    expect(js).toContain(`localStorage.getItem('${CONSENT_KEY}')`);
    expect(js).toContain("if(c==='granted'||(n&&c!=='denied'))");
    expect(() => new Function(js)).not.toThrow();
  });
});
