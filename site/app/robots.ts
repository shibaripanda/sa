import type { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_LINK || 'http://localhost:4000'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl.replace(/\/$/, '')}/sitemap.xml`,
  }
}