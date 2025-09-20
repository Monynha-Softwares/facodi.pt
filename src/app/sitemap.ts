import type { MetadataRoute } from 'next'

const baseUrl = 'https://facodi.pt'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['/', '/sobre', '/projetos', '/contato'] as const
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '/' ? 1 : 0.7
  }))
}
