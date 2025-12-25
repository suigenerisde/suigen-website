'use client';

import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  name: string;
  path: string;
}

// Mapping von Pfaden zu lesbaren Namen
const pathNames: Record<string, string> = {
  '': 'Home',
  'fokus-audit': 'Fokus-Audit',
  'fokus-check': 'Fokus-Check',
  'fokus-human': 'FOKUS: Human-First',
  'fokus-system': 'FOKUS: System',
  'ueber': 'Über Thilo',
  'kontakt': 'Kontakt',
  'impressum': 'Impressum',
  'datenschutz': 'Datenschutz',
};

export function BreadcrumbJsonLd() {
  const pathname = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://suigen.de';

  // Wenn wir auf der Homepage sind, kein Breadcrumb nötig
  if (pathname === '/') {
    return null;
  }

  // Pfad in Segmente aufteilen
  const segments = pathname.split('/').filter(Boolean);

  // Breadcrumb-Items generieren
  const breadcrumbItems: BreadcrumbItem[] = [
    { name: 'Home', path: '/' },
  ];

  let currentPath = '';
  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    const name = pathNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
    breadcrumbItems.push({ name, path: currentPath });
  });

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.path === '/' ? '' : item.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
}
