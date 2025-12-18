import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Bereit für ein Gespräch? Buche Dein kostenloses Erstgespräch oder ruf direkt an.',
};

export default function KontaktPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="min-h-[50vh] flex items-center bg-gradient-radial py-32">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="headline-hero text-[var(--text-light)] mb-6">
              Bereit?
            </h1>
            <p className="body-text">
              30 Minuten. Kostenlos. Wir klären, ob es passt.
            </p>
          </div>
        </section>

        {/* Calendly Placeholder */}
        <section className="bg-[var(--bg-dark-lighter)] py-24 md:py-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="card min-h-[500px] flex items-center justify-center !p-8 md:!p-12">
              <div className="text-center">
                <p className="text-[var(--text-muted)] mb-4">
                  Calendly-Widget wird hier eingebunden
                </p>
                <p className="text-sm text-[var(--text-muted)]">
                  (Calendly-Embed-Code hier einfügen)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Alternative */}
        <section className="bg-[var(--bg-dark)] py-24 md:py-32">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="headline-section text-[var(--text-light)] mb-12">
              Oder kontaktiere mich direkt
            </h2>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <div className="card text-center">
                <h3 className="font-bold text-[var(--text-light)] mb-4 uppercase">Telefon</h3>
                <a
                  href="tel:+4917126470110"
                  className="text-2xl text-[var(--accent)] hover:text-[var(--accent-light)] transition-colors"
                >
                  0171 264 70 10
                </a>
              </div>
              <div className="card text-center">
                <h3 className="font-bold text-[var(--text-light)] mb-4 uppercase">E-Mail</h3>
                <a
                  href="mailto:thilo@suigeneris.de"
                  className="text-2xl text-[var(--accent)] hover:text-[var(--accent-light)] transition-colors"
                >
                  thilo@suigeneris.de
                </a>
              </div>
            </div>
            <div className="mt-12">
              <a
                href="https://www.linkedin.com/in/sui-generis/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
              >
                LinkedIn: Thilo Pfeil
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
