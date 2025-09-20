import type { MetadataRoute } from 'next';

const routes = ['/', '/sobre', '/projetos', '/contato'];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://facodi.monynha.dev';
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: route === '/' ? 1 : 0.6,
  }));
}
