'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceFAQProps {
  title?: string;
  faqs: FAQItem[];
  serviceName: string;
}

/**
 * Service-spezifische FAQ Komponente mit JSON-LD Schema
 * Optimiert für AI Overviews und Featured Snippets
 */
export function ServiceFAQ({ title = 'Häufige Fragen', faqs, serviceName }: ServiceFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://suigen.de';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    name: `FAQ: ${serviceName}`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="bg-[var(--bg-dark)] py-24 md:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="headline-section text-[var(--text-light)]">{title}</h2>
          <p className="text-[var(--text-muted)] mt-4">
            Alles, was Du über {serviceName} wissen musst
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <article key={index} className="card !p-0 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-[var(--border-subtle)] transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-[var(--text-light)]">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-[var(--accent)] transition-transform flex-shrink-0 ml-4 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 border-t border-[var(--border-subtle)]">
                  <p className="text-[var(--text-muted)] pt-4">{faq.answer}</p>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
