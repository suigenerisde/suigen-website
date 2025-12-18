import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://suigen.suimation.de';

  // TEMPORAER DEAKTIVIERT bis Website final ist
  // Zum Aktivieren: disallow: ['/api/', '/_next/'] und allow: '/' setzen
  return {
    rules: [
      {
        userAgent: '*',
        disallow: '/', // Alles blockieren bis fertig
      },
    ],
    // sitemap: `${baseUrl}/sitemap.xml`, // Auch deaktiviert
    host: baseUrl,
  };

  /* AKTIVIEREN WENN FERTIG:
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        // AI Crawlers explizit erlauben
        userAgent: ['GPTBot', 'ChatGPT-User', 'Google-Extended', 'Anthropic', 'Claude-Web', 'PerplexityBot', 'Bytespider'],
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
  */
}
