import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/legal/'],
    },
    sitemap: 'https://inmobiliariaelite.es/sitemap.xml',
  }
}
