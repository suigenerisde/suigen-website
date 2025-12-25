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

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Wie kann ich als Unternehmer mehr Zeit gewinnen?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Durch Klarheit über Deine echten Prioritäten. Das Fokus-Audit zeigt Dir in 3 Stunden, welche Aufgaben Du delegieren, eliminieren oder systematisieren kannst. Typisches Ergebnis: 10-15 Stunden pro Woche zurückgewinnen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Was ist ein Fokus-Audit und wie läuft es ab?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ein 3-stündiger Workshop, in dem wir Deine aktuelle Situation analysieren, die echten Engpässe identifizieren und eine konkrete 90-Tage-Roadmap entwickeln. Du bekommst sofort Klarheit - ohne langfristige Verpflichtung.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wie komme ich aus dem Hamsterrad als Geschäftsführer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Indem Du aufhörst, alles selbst zu machen. FOKUS: Human-First hilft Dir, Systeme aufzubauen, die ohne Dich funktionieren. Der erste Schritt: Verstehen, was Dich wirklich aufhält.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wie schnell sehe ich Ergebnisse?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Das Fokus-Audit gibt Dir sofort Klarheit über Deine nächsten Schritte. Bei FOKUS: Human-First siehst Du typischerweise nach 4-6 Wochen erste messbare Ergebnisse.',
        },
      },
      {
        '@type': 'Question',
        name: 'Für wen ist SUIGEN geeignet?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Für Unternehmer mit Ambition, die Marktführer werden oder bleiben wollen. Nicht für alle - nur für die, die wirklich bereit sind, etwas zu verändern.',
        },
      },
      {
        '@type': 'Question',
        name: 'Was unterscheidet SUIGEN von anderen Beratern?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Drei Dinge: Erstens, AI-Erfahrung seit 2014 (nicht erst seit ChatGPT). Zweitens, der Human-First-Ansatz - erst Klarheit für Dich, dann Systeme. Drittens, Umsetzung statt Theorie.',
        },
      },
      {
        '@type': 'Question',
        name: 'Kann ich mein Unternehmen skalieren ohne mehr zu arbeiten?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja. FOKUS: System baut individuelle Fokus-Systeme für Dein Unternehmen. Automatisierung wiederkehrender Prozesse, klare Verantwortlichkeiten, messbare Ergebnisse.',
        },
      },
      {
        '@type': 'Question',
        name: 'Was kostet das Fokus-Audit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Das klären wir im kostenlosen Erstgespräch. Der Preis hängt von Deiner Situation ab. Die meisten Teilnehmer gewinnen die investierte Zeit innerhalb von 4 Wochen mehrfach zurück.',
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
