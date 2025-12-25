import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { CTA } from '@/components/sections/CTA';
import { DefinitionBox } from '@/components/seo/DefinitionBox';
import { ServiceFAQ } from '@/components/seo/ServiceFAQ';

const fokusHumanFAQs = [
  {
    question: 'Was ist FOKUS: Human-First?',
    answer:
      'FOKUS: Human-First ist ein Coaching-Programm für Unternehmer, das den Menschen in den Mittelpunkt stellt. Bevor wir automatisieren, schaffen wir Klarheit über Deine Engpässe, Prioritäten und Systeme. Das Ergebnis: 10-15 Stunden pro Woche zurückgewinnen.',
  },
  {
    question: 'Was unterscheidet Human-First von anderen Coaching-Programmen?',
    answer:
      'Der Ansatz "Erst der Mensch, dann die Maschine". Viele Programme starten mit Tools und Automatisierung. Wir starten mit Dir: Was hält Dich wirklich auf? Welche Systeme brauchst Du? Erst dann folgt die Umsetzung.',
  },
  {
    question: 'Welche Stufen gibt es bei FOKUS: Human-First?',
    answer:
      'Es gibt drei Stufen: BASIS (Du hast ein System - persönliche Klarheit), STANDARD (Du + Team - gemeinsame Strukturen) und MASTER (Unternehmen läuft ohne Dich - volle Transformation vom Macher zum Unternehmer).',
  },
  {
    question: 'Wie schnell sehe ich Ergebnisse bei FOKUS: Human-First?',
    answer:
      'Typischerweise nach 4-6 Wochen erste messbare Ergebnisse. Die meisten Teilnehmer berichten von deutlich weniger Arbeitszeit bei gleichem oder besserem Output. Das Fokus-Audit zu Beginn gibt Dir sofort Klarheit.',
  },
  {
    question: 'Brauche ich vorher ein Fokus-Audit?',
    answer:
      'Ja, alle Stufen beinhalten das Fokus-Audit als Startpunkt. Es schafft die Grundlage für alles Weitere und stellt sicher, dass wir an den richtigen Themen arbeiten.',
  },
];

export const metadata: Metadata = {
  title: 'FOKUS: Human-First - Coaching für Unternehmer | SUIGEN',
  description:
    'FOKUS: Human-First ist Coaching für Unternehmer mit dem Prinzip "Erst der Mensch, dann das System". Gewinne 10-15 Stunden pro Woche. Drei Stufen: BASIS, STANDARD, MASTER.',
  keywords: [
    'unternehmer coaching',
    'geschäftsführer entlastung',
    'human first ansatz',
    'work life balance unternehmer',
    'delegation lernen',
    'vom macher zum unternehmer',
    'team führung',
  ],
};

export default function FokusHumanPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="min-h-[70vh] flex items-center bg-gradient-radial py-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-2 bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-bold rounded uppercase tracking-widest mb-8 border border-[var(--accent)]/20">
                FOKUS: Human-First
              </span>
              <h1 className="headline-hero text-[var(--text-light)] mb-6">
                Klarheit für <span className="text-[var(--accent)] text-glow">DICH.</span>
              </h1>
              <p className="text-2xl text-[var(--text-light)] font-semibold mb-4">
                Der Mensch im Zentrum.
              </p>
              <p className="body-text mb-10 max-w-2xl">
                Bevor wir automatisieren, schaffen wir Klarheit. Über Deine Engpässe,
                Deine Prioritäten, Dein System. Erst der Mensch, dann die Maschine.
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
              term="FOKUS: Human-First"
              definition="FOKUS: Human-First ist ein Coaching-Programm von SUIGEN, das Unternehmer in den Mittelpunkt stellt. Das Prinzip: Erst Klarheit für den Menschen, dann Systeme und Automatisierung."
              bulletPoints={[
                'Drei Stufen: BASIS (Du), STANDARD (Du + Team), MASTER (Unternehmen)',
                '10-15 Stunden pro Woche zurückgewinnen',
                'Vom Macher zum Unternehmer - das Unternehmen läuft ohne Dich',
                'Inklusive Fokus-Audit als Startpunkt',
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
                <h3 className="text-3xl font-black text-[var(--accent)] mb-2">
                  10-15h
                </h3>
                <p className="text-xl font-bold text-[var(--text-light)] mb-3 uppercase">
                  pro Woche gewonnen
                </p>
                <p className="text-[var(--text-muted)]">
                  Durch klare Systeme und Strukturen, die funktionieren.
                </p>
              </div>
              <div className="card">
                <h3 className="text-3xl font-black text-[var(--accent)] mb-2">
                  Team
                </h3>
                <p className="text-xl font-bold text-[var(--text-light)] mb-3 uppercase">
                  zieht an einem Strang
                </p>
                <p className="text-[var(--text-muted)]">
                  Klare Rollen, klare Verantwortlichkeiten, klare Kommunikation.
                </p>
              </div>
              <div className="card">
                <h3 className="text-3xl font-black text-[var(--accent)] mb-2">
                  Du
                </h3>
                <p className="text-xl font-bold text-[var(--text-light)] mb-3 uppercase">
                  bist nicht mehr der Engpass
                </p>
                <p className="text-[var(--text-muted)]">
                  Vom Macher zum Unternehmer. Das Unternehmen läuft auch ohne Dich.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Drei Stufen */}
        <section className="bg-[var(--bg-dark)] py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="headline-section text-[var(--text-light)] mb-4 text-center">
              Drei Stufen
            </h2>
            <p className="body-text text-center mb-16 max-w-2xl mx-auto">
              Je nach Deiner Situation wählen wir die passende Stufe.
              Was zu Dir passt, klären wir im Erstgespräch.
            </p>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              <div className="card">
                <h3 className="text-xl font-bold text-[var(--text-light)] mb-2 uppercase">
                  BASIS
                </h3>
                <p className="text-[var(--accent)] font-bold mb-4">DU</p>
                <p className="text-lg text-[var(--text-light)] mb-4">
                  &ldquo;Du hast ein System&rdquo;
                </p>
                <p className="text-[var(--text-muted)]">
                  Für Dich als Person. Dein persönliches Fokus-System,
                  das Dir Klarheit und Struktur gibt.
                </p>
              </div>
              <div className="card !border-[var(--accent)] !border-2">
                <h3 className="text-xl font-bold text-[var(--text-light)] mb-2 uppercase">
                  STANDARD
                </h3>
                <p className="text-[var(--accent)] font-bold mb-4">DU + TEAM</p>
                <p className="text-lg text-[var(--text-light)] mb-4">
                  &ldquo;Ihr habt ein System&rdquo;
                </p>
                <p className="text-[var(--text-muted)]">
                  Für Dich und Dein Team. Gemeinsame Strukturen,
                  klare Kommunikation, alle ziehen an einem Strang.
                </p>
              </div>
              <div className="card">
                <h3 className="text-xl font-bold text-[var(--text-light)] mb-2 uppercase">
                  MASTER
                </h3>
                <p className="text-[var(--accent)] font-bold mb-4">UNTERNEHMEN</p>
                <p className="text-lg text-[var(--text-light)] mb-4">
                  &ldquo;Du bist nicht mehr der Engpass&rdquo;
                </p>
                <p className="text-[var(--text-muted)]">
                  Volle Transformation. Das Unternehmen läuft auch ohne Dich.
                  Vom Macher zum Unternehmer.
                </p>
              </div>
            </div>
            <p className="text-center mt-12 text-[var(--text-muted)]">
              Alle Stufen beinhalten das Fokus-Audit.
            </p>
          </div>
        </section>

        {/* Warum Human-First */}
        <section className="bg-[var(--bg-dark-lighter)] py-24 md:py-32 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent)] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="headline-section text-[var(--text-light)] mb-6">
              Warum Human-First?
            </h2>
            <p className="text-2xl text-[var(--accent)] font-bold mb-6 text-glow">
              &ldquo;Erst der Mensch, dann das System.&rdquo;
            </p>
            <p className="body-text mb-10">
              Ohne Klarheit bringt Automatisierung nichts. Wenn Du nicht weißt,
              was wichtig ist, automatisierst Du nur das Chaos.
              FOKUS: Human-First schafft die Grundlage für alles Weitere.
            </p>
            <Button href="/kontakt" variant="primary" size="lg">
              Erstgespräch buchen
            </Button>
          </div>
        </section>

        {/* Service-spezifische FAQ mit Schema */}
        <ServiceFAQ
          title="Häufige Fragen zu FOKUS: Human-First"
          faqs={fokusHumanFAQs}
          serviceName="FOKUS: Human-First"
        />

        <CTA />
      </main>
      <Footer />
    </>
  );
}
