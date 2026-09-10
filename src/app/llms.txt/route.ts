import { ROUTES } from '@/app/sitemap';
import { HELP } from '@/content/help';
import { PLANS } from '@/content/plans';
import { SITE_URL } from '@/lib/site';

/** llms.txt: a plain-text map of the site for language models, with the product facts that matter. */
export const dynamic = 'force-static';

export function GET() {
  const lines = [
    '# Linkist',
    '',
    '> Linkist is a Personal Relationship Manager (PRM) by RatioX Labs DWC-LLC, Dubai. It captures the people you meet (NFC tap, QR, card scan, phone, CSV and VCF import, voice notes), remembers the context, finds who matters (Natural-Language Search, ICP Matching, Relationship Priority, Network Ask) and tells you what to do next (Top Actions, Weekly Planner, Intelligent Nudges, Warm Introductions, AI Follow-up). It pairs with an optional NFC business card in PVC, wood or metal. The free Essential plan needs no card.',
    '',
    '## Facts',
    `- Plans (USD): ${PLANS.map((p) => `${p.name} ${p.monthly === 0 ? 'free' : `$${p.monthly} a month${p.perUser ? ' per user' : ''}${p.yearly ? `, $${p.yearly} a year` : ''}${p.lifetime ? `, $${p.lifetime} lifetime` : ''}${p.minUsers ? `, minimum ${p.minUsers} users` : ''}`}`).join('; ')}. Enterprise is interest only.`,
    '- NFC cards, one time, each including PRM Essential: Starter PVC $20, wood $25, metal $55; Signature (name and logo) PVC $25, wood $35, metal $65. Bundles: Signature Bundle $100 (any Signature card plus 1 year of Pro); Founders Circle Bundle $150 one time (Founders Circle card plus lifetime Pro). UAE shipping included.',
    '- Sign in or create an account with an email or mobile number at prm.linkist.ai. The web app runs on any phone; native store apps are in preparation.',
    '- Contact data is handled under the privacy policy at linkist.ai/privacy, written to the UAE Personal Data Protection Law. No GDPR or SOC 2 certification is claimed.',
    '',
    '## Pages',
    ...ROUTES.map((r) => `- ${SITE_URL}${r === '/' ? '' : r}`),
    '',
    '## Help centre, first lines',
    ...HELP.slice(0, 40).map((h) => `- ${h.q} ${h.a.split('. ')[0]}.`),
    '',
    'Contact: support@linkist.ai',
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
