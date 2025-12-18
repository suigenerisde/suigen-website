'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Ich habe keine Zeit dafür.',
    answer:
      '3 Stunden. Das ist alles, was Du für das Fokus-Audit brauchst. Danach weißt Du genau, worauf Du Dich fokussieren musst - und sparst Dir Monate des Herumtastens.',
  },
  {
    question: 'Was bringt mir das konkret?',
    answer:
      'Klarheit über Deine echten Engpässe. Eine konkrete Roadmap für 90 Tage. Und die Entscheidung, ob und wie es weitergeht - ohne Verpflichtung.',
  },
  {
    question: 'Ist das wieder so ein Coaching?',
    answer:
      'Nein. FOKUS: Human-First ist keine Therapiesitzung. Es geht um konkrete Ergebnisse: Systeme, die funktionieren. Prozesse, die laufen. Zeit, die Du gewinnst.',
  },
  {
    question: 'Wie schnell sehe ich Ergebnisse?',
    answer:
      'Das Fokus-Audit gibt Dir sofort Klarheit. Bei FOKUS: Human-First siehst Du typischerweise nach 4-6 Wochen erste messbare Ergebnisse.',
  },
  {
    question: 'Für wen ist das geeignet?',
    answer:
      'Für Geschäftsführer und Unternehmer mit 1-50 Mitarbeitern, die im Hamsterrad stecken und bereit sind, etwas zu ändern. Nicht für alle - nur für die, die wirklich wollen.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[var(--bg-dark)] py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="headline-section text-[var(--text-light)]">
            Häufige Fragen
          </h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="card !p-0 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-[var(--border-subtle)] transition-colors"
              >
                <span className="font-semibold text-[var(--text-light)]">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-[var(--accent)] transition-transform flex-shrink-0 ml-4 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
