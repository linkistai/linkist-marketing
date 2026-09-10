import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Linkist',
    short_name: 'Linkist',
    description: 'Capture Contacts. Remember Context. Act at the right time.',
    start_url: '/',
    display: 'browser',
    background_color: '#141413',
    theme_color: '#141413',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
