import type { MetadataRoute } from 'next';

const baseUrl = 'https://facodi.pt';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['/', '/sobre', '/projetos', '/contato'];
  const lastModified = new Date().toISOString();

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
  }));
}
