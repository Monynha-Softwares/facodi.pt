import type { MetadataRoute } from 'next';

const baseUrl = 'https://facodi.pt';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/sobre`, lastModified: new Date() },
    { url: `${baseUrl}/projetos`, lastModified: new Date() },
    { url: `${baseUrl}/contato`, lastModified: new Date() }
  ];
}
