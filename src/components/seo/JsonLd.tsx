export function JsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://suigen.de';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SUI GENERIS GmbH',
    alternateName: 'SUIGEN',
    url: baseUrl,
    logo: `${baseUrl}/sui-generis-logo.png`,
    description:
      'Beratung für Unternehmer: Erst fokussieren, dann automatisieren. FOKUS: Human-First und FOKUS: System.',
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
      streetAddress: 'Hollerberg 1',
      postalCode: '61440',
      addressLocality: 'Oberursel',
      addressRegion: 'Hessen',
      addressCountry: 'DE',
    },
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${baseUrl}/#localbusiness`,
    name: 'SUI GENERIS GmbH',
    alternateName: 'SUIGEN',
    description:
      'Fokus-Beratung für Unternehmer und Geschäftsführer. Erst fokussieren, dann automatisieren. AI-Erfahrung seit 2014.',
    url: baseUrl,
    telephone: '+49-171-2647010',
    email: 'thilo@suigeneris.de',
    image: `${baseUrl}/og-image.png`,
    logo: `${baseUrl}/sui-generis-logo.png`,
    priceRange: '$$$$',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Rechnung, Überweisung',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Hollerberg 1',
      postalCode: '61440',
      addressLocality: 'Oberursel',
      addressRegion: 'Hessen',
      addressCountry: 'DE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '50.2019',
      longitude: '8.5728',
    },
    areaServed: [
      {
        '@type': 'Country',
        name: 'Germany',
      },
      {
        '@type': 'Country',
        name: 'Austria',
      },
      {
        '@type': 'Country',
        name: 'Switzerland',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Fokus-Beratung Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Fokus-Audit',
            description: '3-stündiger Workshop für Klarheit und eine 90-Tage-Roadmap',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'FOKUS: Human-First',
            description: 'Begleitung für Unternehmer, um Systeme aufzubauen die ohne sie funktionieren',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'FOKUS: System',
            description: 'Individuelle Fokus-Systeme und Automatisierung für Unternehmen',
          },
        },
      ],
    },
    knowsLanguage: ['de', 'en'],
    founder: {
      '@type': 'Person',
      name: 'Thilo Pfeil',
    },
    sameAs: ['https://www.linkedin.com/in/sui-generis/'],
  };

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Thilo Pfeil',
    jobTitle: 'Gründer & Fokus-Experte',
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
      'Unternehmensführung',
      'AI und Automatisierung',
      'Produktivität',
      'Deep Work',
      'Geschäftsprozessoptimierung',
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
      'Du weißt, was zu tun ist - du tust es nur nicht. Das Fokus-Audit bringt Klarheit für Unternehmer.',
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
      'Erst fokussieren, dann automatisieren. FOKUS: Human-First und FOKUS: System für Unternehmer.',
    publisher: {
      '@type': 'Organization',
      name: 'SUI GENERIS GmbH',
    },
    inLanguage: 'de-DE',
  };

  // FAQPage Schema wurde entfernt - jede Seite hat jetzt ihr eigenes FAQ Schema
  // via ServiceFAQ Komponente oder HomepageFAQ

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
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
