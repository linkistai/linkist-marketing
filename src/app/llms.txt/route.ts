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
    `- Plans (USD): ${PLANS.map((p) => `${p.name} ${p.monthly === 0 ? 'free' : `$${p.monthly} a month${p.perUser ? ' per user' : ''}${p.yearly ? `, $${p.yearly} a year` : ''}${p.lifetime ? `, $${p.lifetime} lifetime` : ''}${p.minUsers ? `, minimum ${p.minUsers} users` : ''}`}`).join('; ')}. Enterprise is interest only.`,
    `- NFC cards, one-time prices in AED with an approximate dollar figure, each including PRM Essential: ${CARD_TIERS.map((t) => `${t.name} ${MATERIALS.map((m) => `${m.name} AED ${t.prices.AED[m.key]} (about $${t.prices.USD[m.key]})`).join(', ')}`).join('; ')}. Bundles: Signature Bundle $100 (any Signature card plus 1 year of Pro); Founders Circle Bundle $150 one time (Founders Circle card plus lifetime Pro). Ships within the UAE, shipping included`,
    '- The PRM app: create a free profile at prm.linkist.ai/quick-profile ("Create Free Profile", "Get the App"); sign in at prm.linkist.ai/UnifiedAuth. NFC cards are ordered at prm.linkist.ai/store/start ("Get NFC Card"). An NFC card or sticker you already own is activated at nfctools.linkist.ai (/bring-your-own). The web app runs on any phone; native store apps are in preparation.',
    '- AI features are optional, assistive and switched on with a separate consent; they can be switched off in Privacy Settings. See /ai.',
    '- Contact data is handled under the privacy policy at /legal/privacy (version 1.3, 14 September 2026), written to the UAE Personal Data Protection Law. No GDPR or SOC 2 certification is claimed. See /security.',
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
