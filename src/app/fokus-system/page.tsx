import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { CTA } from '@/components/sections/CTA';

export const metadata: Metadata = {
  title: 'FOKUS: System',
  description:
    'Skalierung für Dein Unternehmen. Dein Unternehmen wächst, ohne dass Du mehr arbeitest.',
};

export default function FokusSystemPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="min-h-[70vh] flex items-center bg-gradient-radial py-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-2 bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-bold rounded uppercase tracking-widest mb-8 border border-[var(--accent)]/20">
                FOKUS: System
              </span>
              <h1 className="headline-hero text-[var(--text-light)] mb-6">
                Skalierung für
                <br />
                <span className="text-[var(--accent)] text-glow">DEIN UNTERNEHMEN.</span>
              </h1>
              <p className="text-2xl text-[var(--text-light)] font-semibold mb-4">
                Dein Unternehmen wächst, ohne dass Du mehr arbeitest.
              </p>
              <p className="body-text mb-10 max-w-2xl">
                Wir bauen keine Tools von der Stange. Wir entwickeln individuelle
                Fokus-Systeme, die zu Deinem Unternehmen passen.
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
                  Prozesse laufen ohne Dich
                </h3>
                <p className="text-[var(--text-muted)]">
                  Automatisierte Workflows, die zuverlässig funktionieren.
                  Tag für Tag, ohne dass Du eingreifen musst.
                </p>
              </div>
              <div className="card">
                <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-[var(--accent)] text-2xl">&#10003;</span>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-light)] mb-3 uppercase">
                  Wiederkehrende Aufgaben automatisiert
                </h3>
                <p className="text-[var(--text-muted)]">
                  Was sich wiederholt, läuft automatisch. Du und Dein Team
                  könnt Euch auf das Wesentliche konzentrieren.
                </p>
              </div>
              <div className="card">
                <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-[var(--accent)] text-2xl">&#10003;</span>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-light)] mb-3 uppercase">
                  Mehr Zeit für das Wesentliche
                </h3>
                <p className="text-[var(--text-muted)]">
                  Zeit für strategische Arbeit, für Kunden, für Dich selbst.
                  Das System arbeitet, Du gestaltest.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Ansatz */}
        <section className="bg-[var(--bg-dark)] py-24 md:py-32 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent)] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="headline-section text-[var(--text-light)] mb-6">
              Unser Ansatz
            </h2>
            <p className="text-2xl text-[var(--accent)] font-bold mb-6 text-glow">
              &ldquo;Erst fokussieren, dann automatisieren.&rdquo;
            </p>
            <p className="body-text">
              Wir bauen keine Tools von der Stange. Jedes Fokus-System ist individuell
              auf Dein Unternehmen zugeschnitten. Von einzelnen Prozessen bis zur
              kompletten Plattform - je nach Bedarf.
            </p>
          </div>
        </section>

        {/* Case Study */}
        <section className="bg-[var(--bg-dark-lighter)] py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="headline-section text-[var(--text-light)] mb-16 text-center">
              Case Study: Crea Factory
            </h2>
            <div className="card max-w-3xl mx-auto !p-8 md:!p-12">
              <blockquote className="text-2xl text-[var(--text-light)] mb-8 leading-relaxed">
                &ldquo;Von 80 auf 40 Stunden - und ein System, das mitwächst.&rdquo;
              </blockquote>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-[var(--accent)] mb-2 uppercase">
                    Phase 1: FOKUS: Human-First
                  </h4>
                  <p className="text-[var(--text-muted)]">
                    Klarheit geschaffen. Von 80 auf 40 Stunden pro Woche.
                    Die Grundlage für alles Weitere.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-[var(--accent)] mb-2 uppercase">
                    Phase 2: FOKUS: System
                  </h4>
                  <p className="text-[var(--text-muted)]">
                    CreaVersum gebaut. Eine komplette Plattform für kreative Arbeit.
                    Prozesse, die skalieren.
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-[var(--border-subtle)]">
                <p className="text-[var(--accent)] font-bold uppercase mb-2">Ergebnis:</p>
                <p className="text-[var(--text-light)]">
                  Mehr Zeit für Kreativarbeit. Ein Unternehmen, das wächst,
                  ohne dass mehr Stunden investiert werden müssen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Fuer wen */}
        <section className="bg-[var(--bg-dark)] py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="headline-section text-[var(--text-light)] mb-16 text-center">
              Für wen ist FOKUS: System?
            </h2>
            <div className="max-w-2xl mx-auto">
              <ul className="space-y-4">
                <li className="card !p-4 flex items-start">
                  <span className="text-[var(--accent)] mr-4 text-xl">&#10003;</span>
                  <span className="text-[var(--text-light)]">
                    Du hast bereits Klarheit (FOKUS: Human-First gemacht oder weißt schon, was Du brauchst)
                  </span>
                </li>
                <li className="card !p-4 flex items-start">
                  <span className="text-[var(--accent)] mr-4 text-xl">&#10003;</span>
                  <span className="text-[var(--text-light)]">
                    Du willst wachsen, ohne mehr zu arbeiten
                  </span>
                </li>
                <li className="card !p-4 flex items-start">
                  <span className="text-[var(--accent)] mr-4 text-xl">&#10003;</span>
                  <span className="text-[var(--text-light)]">
                    Wiederkehrende Prozesse sollen automatisch laufen
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
