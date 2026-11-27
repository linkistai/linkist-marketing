import { NextRequest } from 'next/server';
import { describe, expect, it } from 'vitest';
import { middleware } from '@/middleware';
import { COUNTRY_COOKIE, NOTICE_ONLY, countryCookie } from './consent-region';
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

describe('UAE visitors counted unless they switch it off (owner, 27 November 2026, D87)', () => {
  it('treats only the UAE as notice-only; the other brief 7 markets stay consent-first until confirmed (C12)', () => {
    expect(NOTICE_ONLY).toEqual(['AE']);
    expect(headScript()).toContain('["AE"].indexOf(m[1])>=0');
  });

  it('sets the country cookie for the UAE, leaves it when it is right, and clears it anywhere else', () => {
    expect(countryCookie('AE', undefined)).toEqual({ set: 'AE' });
    expect(countryCookie(' ae ', undefined)).toEqual({ set: 'AE' });
    expect(countryCookie('AE', 'AE')).toBeNull();
    expect(countryCookie('IN', 'AE')).toEqual({ clear: true });
    expect(countryCookie(null, 'AE')).toEqual({ clear: true });
    for (const c of ['IN', 'US', 'SG', 'AU', 'GB', 'DE', '', null]) expect(countryCookie(c, undefined), String(c)).toBeNull();
  });

  it('writes the cookie at the edge from the country Vercel reports, readable by the notice and for the session only', () => {
    const uae = middleware(new NextRequest('https://www.linkist.ai/early-access', { headers: { 'x-vercel-ip-country': 'AE' } }));
    const set = uae.headers.get('set-cookie') ?? '';
    expect(set).toContain(`${COUNTRY_COOKIE}=AE`);
    expect(set).toMatch(/Path=\//i);
    expect(set).toMatch(/SameSite=lax/i);
    expect(set).toMatch(/Secure/i);
    expect(set).not.toMatch(/HttpOnly|Max-Age|Expires/i);

    const india = middleware(new NextRequest('https://www.linkist.ai/', { headers: { 'x-vercel-ip-country': 'IN' } }));
    expect(india.headers.get('set-cookie')).toBeNull();

    const travelled = middleware(new NextRequest('https://www.linkist.ai/', { headers: { 'x-vercel-ip-country': 'GB', cookie: `${COUNTRY_COOKIE}=AE` } }));
    expect(travelled.headers.get('set-cookie')).toMatch(new RegExp(`${COUNTRY_COOKIE}=;`));
  });
});
