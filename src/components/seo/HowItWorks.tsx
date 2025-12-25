interface Step {
  title: string;
  description: string;
}

interface HowItWorksProps {
  serviceName: string;
  steps: Step[];
}

/**
 * "So funktioniert's" Komponente mit HowTo Schema
 * Optimiert für AI Overviews und Featured Snippets
 */
export function HowItWorks({ serviceName, steps }: HowItWorksProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://suigen.de';

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `So funktioniert ${serviceName}`,
    description: `Schritt-für-Schritt Anleitung für ${serviceName} bei SUIGEN`,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.title,
      text: step.description,
    })),
    provider: {
      '@type': 'Organization',
      name: 'SUI GENERIS GmbH',
      url: baseUrl,
    },
  };

  return (
    <section className="bg-[var(--bg-dark)] py-24 md:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="headline-section text-[var(--text-light)] mb-16 text-center">
          So funktioniert {serviceName}
        </h2>
        <div className="max-w-3xl mx-auto">
          <ol className="space-y-8">
            {steps.map((step, index) => (
              <li key={index} className="flex gap-6">
                <div className="flex-shrink-0 w-14 h-14 bg-[var(--accent)] rounded-lg flex items-center justify-center text-[var(--bg-dark)] font-black text-xl">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--text-light)] mb-2 uppercase">
                    {step.title}
                  </h3>
                  <p className="text-[var(--text-muted)]">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
