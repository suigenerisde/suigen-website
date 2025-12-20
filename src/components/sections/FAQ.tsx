'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Wie kann ich als Unternehmer mehr Zeit gewinnen?',
    answer:
      'Durch Klarheit über Deine echten Prioritäten. Das Fokus-Audit zeigt Dir in 3 Stunden, welche Aufgaben Du delegieren, eliminieren oder systematisieren kannst. Typisches Ergebnis: 10-15 Stunden pro Woche zurückgewinnen.',
  },
  {
    question: 'Was ist ein Fokus-Audit und wie läuft es ab?',
    answer:
      'Ein 3-stündiger Workshop, in dem wir Deine aktuelle Situation analysieren, die echten Engpässe identifizieren und eine konkrete 90-Tage-Roadmap entwickeln. Du bekommst sofort Klarheit - ohne langfristige Verpflichtung.',
  },
  {
    question: 'Wie komme ich aus dem Hamsterrad als Geschäftsführer?',
    answer:
      'Indem Du aufhörst, alles selbst zu machen. FOKUS: Human-First hilft Dir, Systeme aufzubauen, die ohne Dich funktionieren. Der erste Schritt: Verstehen, was Dich wirklich aufhält.',
  },
  {
    question: 'Wie schnell sehe ich Ergebnisse?',
    answer:
      'Das Fokus-Audit gibt Dir sofort Klarheit über Deine nächsten Schritte. Bei FOKUS: Human-First siehst Du typischerweise nach 4-6 Wochen erste messbare Ergebnisse - weniger Arbeitszeit bei gleichem oder besserem Output.',
  },
  {
    question: 'Für wen ist SUIGEN geeignet?',
    answer:
      'Für Unternehmer mit Ambition, die Marktführer werden oder bleiben wollen. Nicht für alle - nur für die, die wirklich bereit sind, etwas zu verändern.',
  },
  {
    question: 'Was unterscheidet SUIGEN von anderen Beratern?',
    answer:
      'Drei Dinge: Erstens, AI-Erfahrung seit 2014 (nicht erst seit ChatGPT). Zweitens, der Human-First-Ansatz - erst Klarheit für Dich, dann Systeme. Drittens, Umsetzung statt Theorie.',
  },
  {
    question: 'Kann ich mein Unternehmen skalieren ohne mehr zu arbeiten?',
    answer:
      'Ja. FOKUS: System baut individuelle Fokus-Systeme für Dein Unternehmen. Automatisierung wiederkehrender Prozesse, klare Verantwortlichkeiten, messbare Ergebnisse. Das Ziel: Wachstum ohne Mehrarbeit.',
  },
  {
    question: 'Was kostet das Fokus-Audit?',
    answer:
      'Das klären wir im kostenlosen Erstgespräch. Der Preis hängt von Deiner Situation ab. Wichtiger: Der ROI. Die meisten Teilnehmer gewinnen die investierte Zeit innerhalb von 4 Wochen mehrfach zurück.',
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
