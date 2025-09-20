import type { MetadataRoute } from 'next';

const baseUrl = 'https://facodi.pt';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/sobre', '/projetos', '/contato'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
