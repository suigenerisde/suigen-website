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
      'Fokus-Beratung fuer Unternehmer und Geschaeftsfuehrer. Erst fokussieren, dann automatisieren. AI-Erfahrung seit 2014.',
    url: baseUrl,
    telephone: '+49-171-2647010',
    email: 'thilo@suigeneris.de',
    image: `${baseUrl}/og-image.png`,
    logo: `${baseUrl}/sui-generis-logo.png`,
    priceRange: '$$$$',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Rechnung, Ueberweisung',
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
            description: '3-stuendiger Workshop fuer Klarheit und eine 90-Tage-Roadmap',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'FOKUS: Human-First',
            description: 'Begleitung fuer Unternehmer, um Systeme aufzubauen die ohne sie funktionieren',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'FOKUS: System',
            description: 'Individuelle Fokus-Systeme und Automatisierung fuer Unternehmen',
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

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Wie kann ich als Unternehmer mehr Zeit gewinnen?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Durch Klarheit ueber Deine echten Prioritaeten. Das Fokus-Audit zeigt Dir in 3 Stunden, welche Aufgaben Du delegieren, eliminieren oder systematisieren kannst. Typisches Ergebnis: 10-15 Stunden pro Woche zurueckgewinnen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Was ist ein Fokus-Audit und wie laeuft es ab?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ein 3-stuendiger Workshop, in dem wir Deine aktuelle Situation analysieren, die echten Engpaesse identifizieren und eine konkrete 90-Tage-Roadmap entwickeln. Du bekommst sofort Klarheit - ohne langfristige Verpflichtung.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wie komme ich aus dem Hamsterrad als Geschaeftsfuehrer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Indem Du aufhoerst, alles selbst zu machen. FOKUS: Human-First hilft Dir, Systeme aufzubauen, die ohne Dich funktionieren. Der erste Schritt: Verstehen, was Dich wirklich aufhaelt.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wie schnell sehe ich Ergebnisse?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Das Fokus-Audit gibt Dir sofort Klarheit ueber Deine naechsten Schritte. Bei FOKUS: Human-First siehst Du typischerweise nach 4-6 Wochen erste messbare Ergebnisse.',
        },
      },
      {
        '@type': 'Question',
        name: 'Fuer wen ist SUIGEN geeignet?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Fuer Unternehmer mit Ambition, die Marktfuehrer werden oder bleiben wollen. Nicht fuer alle - nur fuer die, die wirklich bereit sind, etwas zu veraendern.',
        },
      },
      {
        '@type': 'Question',
        name: 'Was unterscheidet SUIGEN von anderen Beratern?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Drei Dinge: Erstens, AI-Erfahrung seit 2014 (nicht erst seit ChatGPT). Zweitens, der Human-First-Ansatz - erst Klarheit fuer Dich, dann Systeme. Drittens, Umsetzung statt Theorie.',
        },
      },
      {
        '@type': 'Question',
        name: 'Kann ich mein Unternehmen skalieren ohne mehr zu arbeiten?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja. FOKUS: System baut individuelle Fokus-Systeme fuer Dein Unternehmen. Automatisierung wiederkehrender Prozesse, klare Verantwortlichkeiten, messbare Ergebnisse.',
        },
      },
      {
        '@type': 'Question',
        name: 'Was kostet das Fokus-Audit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Das klaeren wir im kostenlosen Erstgespraech. Der Preis haengt von Deiner Situation ab. Die meisten Teilnehmer gewinnen die investierte Zeit innerhalb von 4 Wochen mehrfach zurueck.',
        },
      },
    ],
  };

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
