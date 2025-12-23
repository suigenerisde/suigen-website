import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum der SUI GENERIS GmbH.',
};

export default function ImpressumPage() {
  return (
    <>
      <Header />
      <main className="bg-[var(--bg-dark)] py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="headline-section text-[var(--text-light)] mb-12">
            Impressum
          </h1>

          <div className="space-y-8 text-[var(--text-muted)]">
            <div>
              <h2 className="text-xl font-bold text-[var(--text-light)] mb-4 uppercase">
                Angaben gemäß § 5 TMG
              </h2>
              <p>
                SUI GENERIS GmbH
                <br />
                Hollerberg 1
                <br />
                61440 Oberursel
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[var(--text-light)] mb-4 uppercase">
                Vertreten durch
              </h2>
              <p>Geschäftsführer: Thilo Pfeil</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[var(--text-light)] mb-4 uppercase">
                Kontakt
              </h2>
              <p>
                Telefon: 0171 264 70 10
                <br />
                E-Mail: thilo@suigeneris.de
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[var(--text-light)] mb-4 uppercase">
                Registereintrag
              </h2>
              <p>
                Eintragung im Handelsregister.
                <br />
                Registergericht: Amtsgericht Bad Homburg v. d. Höhe
                <br />
                Registernummer: HRB 16650
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[var(--text-light)] mb-4 uppercase">
                Umsatzsteuer-ID
              </h2>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a
                Umsatzsteuergesetz:
                <br />
                DE370289430
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[var(--text-light)] mb-4 uppercase">
                Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
              </h2>
              <p>
                Thilo Pfeil
                <br />
                Hollerberg 1
                <br />
                61440 Oberursel
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[var(--text-light)] mb-4 uppercase">
                Streitschlichtung
              </h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur
                Online-Streitbeilegung (OS) bereit:
                <br />
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] hover:text-[var(--accent-light)] transition-colors"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p className="mt-4">
                Wir sind nicht bereit oder verpflichtet, an
                Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
                teilzunehmen.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
