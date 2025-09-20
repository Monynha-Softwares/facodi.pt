import type { MetadataRoute } from 'next';

const baseUrl = 'https://facodi.pt';

const routes = ['/', '/sobre', '/projetos', '/contato'];

const sitemap = (): MetadataRoute.Sitemap =>
  routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date()
  }));

export default sitemap;
