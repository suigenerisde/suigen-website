import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://suigen.de';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        // AI Crawlers explizit erlauben
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'Google-Extended',
          'Anthropic',
          'Claude-Web',
          'PerplexityBot',
          'Bytespider',
        ],
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
