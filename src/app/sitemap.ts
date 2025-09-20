import type { MetadataRoute } from 'next';

const baseUrl = 'https://facodi.pt';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '',
    '/courses',
    '/roadmap',
    '/contact'
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.7
  }));
}
