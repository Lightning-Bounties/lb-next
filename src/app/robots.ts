import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            disallow: '/*',
        },
        // TODO: add sitemap xml
        // sitemap: 'https://acme.com/sitemap.xml',
    }
}