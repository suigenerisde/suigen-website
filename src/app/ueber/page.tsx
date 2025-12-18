import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { CTA } from '@/components/sections/CTA';

export const metadata: Metadata = {
  title: 'Über',
  description:
    'Thilo Pfeil - Gründer von SUI GENERIS. MBA (LSE). 6 Jahre Vorstand. AI-Erfahrung seit 2014.',
};

export default function UeberPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="min-h-[70vh] flex items-center bg-gradient-radial py-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div>
                <img
                  src="/thilo-pfeil.jpg"
                  alt="Thilo Pfeil - Gründer von SUI GENERIS"
                  className="w-full aspect-square object-cover object-top rounded-lg"
                />
              </div>

              {/* Content */}
              <div>
                <h1 className="headline-hero text-[var(--text-light)] mb-6">
                  Thilo Pfeil
                </h1>
                <p className="text-2xl text-[var(--accent)] font-bold mb-4">
                  Gründer von SUI GENERIS
                </p>
                <p className="body-text mb-8">
                  MBA (London School of Economics). 6 Jahre Vorstand.
                  AI-Erfahrung seit 2014. Vater von einer Tochter.
                </p>
                <Button href="/kontakt" variant="primary">
                  Lass uns kennenlernen
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Geschichte */}
        <section className="bg-[var(--bg-dark-lighter)] py-24 md:py-32">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="headline-section text-[var(--text-light)] mb-12">
              Die Geschichte
            </h2>
            <div className="space-y-6">
              <p className="text-xl text-[var(--text-light)] leading-relaxed">
                &ldquo;Ich habe selbst erlebt, wie es ist, im Hamsterrad zu stecken.
                80 Stunden pro Woche, 20 Tools, und trotzdem das Gefühl, nichts zu schaffen.&rdquo;
              </p>
              <p className="body-text">
                Als Vorstand eines mittelständischen Unternehmens kannte ich das Gefühl:
                Alles ist wichtig, also ist nichts wichtig. Immer mehr Baustellen,
                immer weniger Zeit für das Wesentliche.
              </p>
              <p className="body-text">
                SUIGEN ist das System, das ich mir damals gewünscht hätte.
                Keine weitere Tool-Sammlung, keine Theorie.
                Sondern: Klarheit zuerst, dann das passende System.
              </p>
              <p className="text-xl text-[var(--accent)] font-bold text-glow">
                Erst der Mensch, dann die Maschine.
              </p>
            </div>
          </div>
        </section>

        {/* Der Ansatz */}
        <section className="bg-[var(--bg-dark)] py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="headline-section text-[var(--text-light)] mb-16 text-center">
              Der SUIGEN-Ansatz
            </h2>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[var(--accent)] rounded-lg flex items-center justify-center mx-auto mb-6">
                  <span className="text-[var(--bg-dark)] text-2xl font-black">1</span>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-light)] mb-3 uppercase">
                  FOKUS
                </h3>
                <p className="text-[var(--text-muted)]">
                  Worauf fokussierst Du Dich? Klarheit über die echten Prioritäten.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[var(--accent)] rounded-lg flex items-center justify-center mx-auto mb-6">
                  <span className="text-[var(--bg-dark)] text-2xl font-black">2</span>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-light)] mb-3 uppercase">
                  STEPS
                </h3>
                <p className="text-[var(--text-muted)]">
                  Daraus entwickeln wir die erforderlichen Schritte. Konkret, nicht abstrakt.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[var(--accent)] rounded-lg flex items-center justify-center mx-auto mb-6">
                  <span className="text-[var(--bg-dark)] text-2xl font-black">3</span>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-light)] mb-3 uppercase">
                  UMSETZEN
                </h3>
                <p className="text-[var(--text-muted)]">
                  Mensch und Maschine verschmelzen. Systeme, die zu Dir passen.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Werte */}
        <section className="bg-[var(--bg-dark-lighter)] py-24 md:py-32 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent)] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="headline-section text-[var(--text-light)] mb-16">
              Wofür SUIGEN steht
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold text-[var(--accent)] mb-3 uppercase">
                  Einzigartigkeit
                </h3>
                <p className="text-[var(--text-muted)]">
                  Jeder ist sui generis - einzigartig in seiner Art.
                  Keine Lösungen von der Stange.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--accent)] mb-3 uppercase">
                  Einfachheit
                </h3>
                <p className="text-[var(--text-muted)]">
                  Das Komplizierte einfach machen.
                  Keine Theorie, sondern Ergebnisse.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--accent)] mb-3 uppercase">
                  Spaß
                </h3>
                <p className="text-[var(--text-muted)]">
                  Ernst nehmen - nicht ernst sein.
                  Arbeit darf Freude machen.
                </p>
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
