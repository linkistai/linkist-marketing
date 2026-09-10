import { CARD_TIERS, MATERIALS, PLANS } from '@/content/plans';
import { COMPANY, SITE_URL } from '@/lib/site';

/** Organization, SoftwareApplication with one offer per plan in USD, and a Product per card tier with an offer per material. */
export function HomeJsonLd() {
  const data = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Linkist',
      legalName: COMPANY,
      url: SITE_URL,
      logo: `${SITE_URL}/icon-512.png`,
      address: { '@type': 'PostalAddress', streetAddress: 'Dubai South Business Park, Building A3, 3rd Floor', addressLocality: 'Dubai South', addressRegion: 'Dubai', addressCountry: 'AE' },
      sameAs: ['https://linkist.ai', 'https://prm.linkist.ai'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Linkist PRM',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: SITE_URL,
      description: 'A Personal Relationship Manager that captures the people you meet, remembers the context, and tells you what to do next.',
      offers: PLANS.map((p) => ({ '@type': 'Offer', name: `Linkist PRM ${p.name}`, price: p.monthly.toFixed(2), priceCurrency: 'USD', category: 'subscription', url: `${SITE_URL}/pricing` })),
    },
    ...CARD_TIERS.map((t) => ({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: `Linkist ${t.name} NFC card`,
      description: `${t.blurb} Includes PRM Essential.`,
      brand: { '@type': 'Brand', name: 'Linkist' },
      offers: MATERIALS.map((m) => ({ '@type': 'Offer', name: `${t.name}, ${m.name}`, price: t.prices.AED[m.key].toFixed(2), priceCurrency: 'AED', url: `${SITE_URL}/nfc-cards` })),
    })),
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
