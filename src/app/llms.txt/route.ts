import { ROUTES } from '@/app/sitemap';
import { HELP } from '@/content/help';
import { CARD_TIERS, MATERIALS, PLANS } from '@/content/plans';
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
    `- Plans (USD, AED in brackets): ${PLANS.map((p) => `${p.name} ${p.monthly === 0 ? 'free' : `$${p.monthly} (AED ${p.aed.monthly}) a month${p.perUser ? ' per user' : ''}${p.team ? `, $${p.team.usd.yearly} (AED ${p.team.aed.yearly.toLocaleString('en-AE')}) a year for ${p.minUsers} users` : p.yearly ? `, $${p.yearly} (AED ${p.aed.yearly}) a year` : ''}${p.lifetime ? `, $${p.lifetime} lifetime` : ''}${p.minUsers ? `, minimum ${p.minUsers} users` : ''}`}`).join('; ')}. Enterprise is interest only.`,
    `- NFC cards, one-time prices in AED and USD, each including PRM Essential: ${CARD_TIERS.map((t) => `${t.name} ${MATERIALS.map((m) => `${m.name} AED ${t.prices.AED[m.key]} ($${t.prices.USD[m.key]})`).join(', ')}`).join('; ')}. Bundles: Signature Bundle AED 369 ($100), any Signature card plus 1 year of Pro; Founders Circle Bundle AED 549 ($150) one time, Founders Circle card plus lifetime Pro. Ships within the UAE, shipping included`,
    '- The PRM app: create a free profile at prm.linkist.ai/quick-profile ("Create Free Profile", "Get the App"); sign in at prm.linkist.ai/UnifiedAuth. NFC cards are ordered at prm.linkist.ai/store/start ("Get NFC Card"). An NFC card or sticker you already own is activated at nfctools.linkist.ai (/bring-your-own). The web app runs on any phone; native store apps are in preparation.',
    '- AI features are off until switched on and can be switched off at any time; every result shows its confidence. See /ai.',
    '- Contact data is handled under the Linkist Terms and Privacy, version 1.0, effective 7 September 2026, at /legal/terms (Part 2, Privacy, on its own at /legal/privacy). Governed by UAE law as applied in Dubai. No GDPR or SOC 2 certification is claimed. See /security.',
    '- The blog at /blogs carries the articles published on linkist.ai/blogs, unchanged.',
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
