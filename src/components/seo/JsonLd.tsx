export function JsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://suigen.suimation.de';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SUI GENERIS GmbH',
    alternateName: 'SUIGEN',
    url: baseUrl,
    logo: `${baseUrl}/sui-generis-logo.png`,
    description:
      'Beratung fuer Unternehmer: Erst fokussieren, dann automatisieren. FOKUS: Human-First und FOKUS: System.',
    foundingDate: '2024',
    founder: {
      '@type': 'Person',
      name: 'Thilo Pfeil',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+49-171-2647010',
      contactType: 'customer service',
      email: 'thilo@suigeneris.de',
      availableLanguage: ['German', 'English'],
    },
    sameAs: ['https://www.linkedin.com/in/sui-generis/'],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'DE',
    },
  };

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Thilo Pfeil',
    jobTitle: 'Gruender & Fokus-Experte',
    description:
      'Fokus-Experte und AI-Pionier seit 2014. MBA (London School of Economics). 6 Jahre Vorstandserfahrung.',
    url: `${baseUrl}/ueber`,
    image: `${baseUrl}/thilo-pfeil.jpg`,
    sameAs: ['https://www.linkedin.com/in/sui-generis/'],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'London School of Economics',
    },
    knowsAbout: [
      'Fokus-Training',
      'Unternehmensfuehrung',
      'AI und Automatisierung',
      'Produktivitaet',
      'Deep Work',
      'Geschaeftsprozessoptimierung',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'SUI GENERIS GmbH',
    },
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Fokus-Audit',
    provider: {
      '@type': 'Organization',
      name: 'SUI GENERIS GmbH',
    },
    description:
      'Du weisst, was zu tun ist - du tust es nur nicht. Das Fokus-Audit bringt Klarheit fuer Unternehmer.',
    url: `${baseUrl}/fokus-audit`,
    serviceType: 'Business Consulting',
    areaServed: {
      '@type': 'Country',
      name: 'Germany',
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'EUR',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SUIGEN',
    url: baseUrl,
    description:
      'Erst fokussieren, dann automatisieren. FOKUS: Human-First und FOKUS: System fuer Unternehmer.',
    publisher: {
      '@type': 'Organization',
      name: 'SUI GENERIS GmbH',
    },
    inLanguage: 'de-DE',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
