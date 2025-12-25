import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { CTA } from '@/components/sections/CTA';
import { DefinitionBox } from '@/components/seo/DefinitionBox';
import { ServiceFAQ } from '@/components/seo/ServiceFAQ';

const fokusAuditFAQs = [
  {
    question: 'Was ist ein Fokus-Audit?',
    answer:
      'Ein Fokus-Audit ist ein 3-stündiger strategischer Workshop für Unternehmer. In dieser Zeit analysieren wir Deine aktuelle Situation, identifizieren die echten Engpässe in Deinem Unternehmen und entwickeln eine konkrete 90-Tage-Roadmap mit priorisierten Maßnahmen.',
  },
  {
    question: 'Wie läuft ein Fokus-Audit ab?',
    answer:
      'Das Fokus-Audit besteht aus drei Phasen: Zuerst analysieren wir Deine aktuelle Situation und Prozesse. Dann identifizieren wir die echten Engpässe - nicht die Symptome, sondern die Ursachen. Abschließend entwickeln wir eine klare Empfehlung mit konkreten nächsten Schritten.',
  },
  {
    question: 'Für wen ist das Fokus-Audit geeignet?',
    answer:
      'Das Fokus-Audit ist für Unternehmer und Geschäftsführer, die mehr Zeit gewinnen wollen, ohne mehr zu arbeiten. Es eignet sich besonders für Führungskräfte, die im Hamsterrad feststecken und Klarheit über ihre echten Prioritäten brauchen.',
  },
  {
    question: 'Was kostet ein Fokus-Audit?',
    answer:
      'Die Investition klären wir im kostenlosen Erstgespräch. Wichtiger als der Preis ist der ROI: Die meisten Teilnehmer gewinnen 8-12 Stunden pro Woche zurück - innerhalb von 4 Wochen.',
  },
  {
    question: 'Was passiert nach dem Fokus-Audit?',
    answer:
      'Nach dem Fokus-Audit hast Du eine klare Roadmap für die nächsten 90 Tage. Du entscheidest selbst, ob Du die Maßnahmen eigenständig umsetzt oder mit FOKUS: Human-First oder FOKUS: System weiterarbeitest. Es gibt keine Verpflichtung.',
  },
];

export const metadata: Metadata = {
  title: 'Fokus-Audit - 3-Stunden-Workshop für Unternehmer | SUIGEN',
  description:
    'Das Fokus-Audit ist ein 3-stündiger Workshop für Unternehmer. Analysiere Deine Situation, identifiziere Engpässe und erhalte eine 90-Tage-Roadmap. Klarheit statt Theorie.',
  keywords: [
    'fokus audit',
    'unternehmer workshop',
    'geschäftsführer coaching',
    'prioritäten setzen',
    'zeitmanagement unternehmer',
    '90 tage roadmap',
    'business analyse',
  ],
};

export default function FokusAuditPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="min-h-[70vh] flex items-center bg-gradient-radial py-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-2 bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-bold rounded uppercase tracking-widest mb-8 border border-[var(--accent)]/20">
                Der Startpunkt für alles
              </span>
              <h1 className="headline-hero text-[var(--text-light)] mb-6">
                Die wichtigsten 3 Stunden
                <br />
                <span className="text-[var(--accent)] text-glow">Deines Jahres.</span>
              </h1>
              <p className="body-text mb-10 max-w-2xl">
                Das Fokus-Audit ist der erste Schritt. In einem 3-stündigen Workshop
                analysieren wir Deine Situation und entwickeln eine konkrete Roadmap.
              </p>
              <Button href="/kontakt" variant="primary" size="lg">
                Erstgespräch buchen
              </Button>
            </div>
          </div>
        </section>

        {/* Definition Box für AI Overviews */}
        <section className="bg-[var(--bg-dark-lighter)] py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <DefinitionBox
              term="ein Fokus-Audit"
              definition="Ein Fokus-Audit ist ein 3-stündiger strategischer Workshop für Unternehmer und Geschäftsführer. Das Ziel: Klarheit über die echten Prioritäten und eine konkrete 90-Tage-Roadmap."
              bulletPoints={[
                'Analyse der aktuellen Unternehmenssituation',
                'Identifikation der echten Engpässe (nicht nur Symptome)',
                'Konkrete Roadmap mit priorisierten Maßnahmen',
                'Typisches Ergebnis: 8-12 Stunden pro Woche zurückgewinnen',
              ]}
            />
          </div>
        </section>

        {/* Nutzen */}
        <section className="bg-[var(--bg-dark-lighter)] py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="headline-section text-[var(--text-light)] mb-16 text-center">
              Dein Nutzen
            </h2>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              <div className="card">
                <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-[var(--accent)] text-2xl">&#10003;</span>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-light)] mb-3 uppercase">
                  Du weißt, worauf Du Dich fokussieren musst
                </h3>
                <p className="text-[var(--text-muted)]">
                  Keine vagen Empfehlungen. Klare Prioritäten, die sofort umsetzbar sind.
                </p>
              </div>
              <div className="card">
                <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-[var(--accent)] text-2xl">&#10003;</span>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-light)] mb-3 uppercase">
                  Du hast eine konkrete Roadmap
                </h3>
                <p className="text-[var(--text-muted)]">
                  Ein Plan für die nächsten 90 Tage. Schritt für Schritt, nicht alles auf einmal.
                </p>
              </div>
              <div className="card">
                <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-[var(--accent)] text-2xl">&#10003;</span>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-light)] mb-3 uppercase">
                  Du weißt, was der nächste Schritt ist
                </h3>
                <p className="text-[var(--text-muted)]">
                  Ob FOKUS: Human-First, FOKUS: System oder etwas anderes - Du entscheidest.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Was passiert */}
        <section className="bg-[var(--bg-dark)] py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="headline-section text-[var(--text-light)] mb-16 text-center">
              Was passiert im Fokus-Audit?
            </h2>
            <div className="max-w-3xl mx-auto">
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-[var(--accent)] rounded-lg flex items-center justify-center text-[var(--bg-dark)] font-black text-xl">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--text-light)] mb-2 uppercase">
                      Analyse Deiner aktuellen Situation
                    </h3>
                    <p className="text-[var(--text-muted)]">
                      Wo stehst Du? Was funktioniert, was nicht? Wir schauen uns Deine
                      Prozesse, Dein Team und Deine Engpässe ehrlich an.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-[var(--accent)] rounded-lg flex items-center justify-center text-[var(--bg-dark)] font-black text-xl">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--text-light)] mb-2 uppercase">
                      Identifikation der echten Engpässe
                    </h3>
                    <p className="text-[var(--text-muted)]">
                      Nicht die offensichtlichen Symptome, sondern die Ursachen.
                      Warum steckst Du im Hamsterrad? Was hält Dich wirklich auf?
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-[var(--accent)] rounded-lg flex items-center justify-center text-[var(--bg-dark)] font-black text-xl">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--text-light)] mb-2 uppercase">
                      Klare Empfehlung für den nächsten Schritt
                    </h3>
                    <p className="text-[var(--text-muted)]">
                      Eine konkrete Roadmap mit priorisierten Maßnahmen.
                      Du entscheidest, was Du davon umsetzt.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fuer wen */}
        <section className="bg-[var(--bg-dark-lighter)] py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="headline-section text-[var(--text-light)] mb-16 text-center">
              Für wen ist das Fokus-Audit?
            </h2>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
              <div className="card">
                <h3 className="text-xl font-bold text-[var(--text-light)] mb-6 uppercase">
                  Das Fokus-Audit ist für Dich, wenn...
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-[var(--accent)] mr-3 text-lg">&#10003;</span>
                    <span className="text-[var(--text-muted)]">Du Unternehmer bist, kein Verwalter</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--accent)] mr-3 text-lg">&#10003;</span>
                    <span className="text-[var(--text-muted)]">Du gezielter wachsen willst, nicht länger arbeiten</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--accent)] mr-3 text-lg">&#10003;</span>
                    <span className="text-[var(--text-muted)]">Du Klarheit willst, keine Theorie</span>
                  </li>
                </ul>
              </div>
              <div className="card">
                <h3 className="text-xl font-bold text-[var(--text-light)] mb-6 uppercase">
                  Das Fokus-Audit ist NICHT für Dich, wenn...
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 text-lg">&#10007;</span>
                    <span className="text-[var(--text-muted)]">Du nach Quick-Fixes suchst</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 text-lg">&#10007;</span>
                    <span className="text-[var(--text-muted)]">Du nicht bereit bist, ehrlich hinzuschauen</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-3 text-lg">&#10007;</span>
                    <span className="text-[var(--text-muted)]">Du 3 Stunden nicht investieren kannst</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Service-spezifische FAQ mit Schema */}
        <ServiceFAQ
          title="Häufige Fragen zum Fokus-Audit"
          faqs={fokusAuditFAQs}
          serviceName="das Fokus-Audit"
        />

        <CTA />
      </main>
      <Footer />
    </>
  );
}
