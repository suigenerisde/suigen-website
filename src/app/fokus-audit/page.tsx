import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { CTA } from '@/components/sections/CTA';

export const metadata: Metadata = {
  title: 'Fokus-Audit',
  description:
    '3 Stunden Klarheit statt 6 Monate Chaos. Das Fokus-Audit ist der Startpunkt für alles.',
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
                Fokus –
                <br />
                <span className="text-[var(--accent)] text-glow">Deine Roadmap.</span>
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

        <CTA />
      </main>
      <Footer />
    </>
  );
}
