import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://facodi.monynha.dev';

  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/sobre', '/projetos', '/contato'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
