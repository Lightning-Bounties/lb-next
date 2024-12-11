import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            disallow: process.env.ALLOW_ROBOTS_INDEXING === 'true' ? ''     : '/*',
            allow:    process.env.ALLOW_ROBOTS_INDEXING === 'true' ? '/*'   : '',
        },
        // TODO: add sitemap xml
        // sitemap: 'https://acme.com/sitemap.xml',
    }
}
