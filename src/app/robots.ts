import type { MetadataRoute } from 'next';

const baseUrl = 'https://facodi.pt';

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: '*',
      allow: '/'
    }
  ],
  sitemap: `${baseUrl}/sitemap.xml`
});

export default robots;
