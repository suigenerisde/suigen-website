import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FokusCheckQuiz } from '@/components/fokus-check/FokusCheckQuiz';

export const metadata: Metadata = {
  title: 'Fokus-Check | Wie fokussiert bist Du wirklich? | SUIGEN',
  description:
    'Finde in 3 Minuten heraus, wie gut Du Dich auf das Wesentliche konzentrierst. Kostenloser Fokus-Check für Unternehmer und Führungskräfte.',
  openGraph: {
    title: 'Fokus-Check | Wie fokussiert bist Du wirklich?',
    description:
      'Finde in 3 Minuten heraus, wie gut Du Dich auf das Wesentliche konzentrierst.',
    type: 'website',
  },
};

export default function FokusCheckPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section with Quiz */}
        <section className="min-h-screen flex items-center bg-gradient-radial py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <FokusCheckQuiz />
          </div>
        </section>

        {/* Trust Section */}
        <section className="bg-[var(--bg-dark-lighter)] py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-[var(--text-muted)] mb-8">
              Entwickelt von Thilo Pfeil, Gründer von SUI GENERIS
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-[var(--text-muted)]/60 text-sm">
              <span>10+ Jahre Erfahrung</span>
              <span>•</span>
              <span>Human-First Ansatz</span>
              <span>•</span>
              <span>Für Unternehmer & Führungskräfte</span>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-[var(--bg-dark)] py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-light)] text-center mb-12">
              Häufige Fragen
            </h2>

            <div className="space-y-6">
              <div className="bg-[var(--bg-dark-card)] rounded-2xl p-6">
                <h3 className="text-[var(--text-light)] font-bold mb-2">
                  Wie lange dauert der Fokus-Check?
                </h3>
                <p className="text-[var(--text-muted)]">
                  Etwa 3 Minuten. Es sind nur 8 kurze Fragen.
                </p>
              </div>

              <div className="bg-[var(--bg-dark-card)] rounded-2xl p-6">
                <h3 className="text-[var(--text-light)] font-bold mb-2">
                  Was passiert mit meinen Daten?
                </h3>
                <p className="text-[var(--text-muted)]">
                  Deine Antworten werden nur zur Berechnung Deines Scores verwendet.
                  Deine E-Mail nutzen wir ausschließlich, um Dir Dein Ergebnis zu schicken.
                  Kein Spam, versprochen.
                </p>
              </div>

              <div className="bg-[var(--bg-dark-card)] rounded-2xl p-6">
                <h3 className="text-[var(--text-light)] font-bold mb-2">
                  Was bringt mir der Fokus-Score?
                </h3>
                <p className="text-[var(--text-muted)]">
                  Du bekommst eine ehrliche Einschätzung, wie gut Du Dich aktuell fokussieren kannst.
                  Das ist der erste Schritt zur Verbesserung.
                </p>
              </div>

              <div className="bg-[var(--bg-dark-card)] rounded-2xl p-6">
                <h3 className="text-[var(--text-light)] font-bold mb-2">
                  Ist der Check wirklich kostenlos?
                </h3>
                <p className="text-[var(--text-muted)]">
                  Ja, komplett. Der Fokus-Check ist unser Geschenk an Dich.
                  Wenn Du tiefer gehen willst, gibt es das Fokus-Audit.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
