import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Datenschutz',
  description: 'Datenschutzerklärung der SUI GENERIS GmbH.',
};

export default function DatenschutzPage() {
  return (
    <>
      <Header />
      <main className="bg-[var(--bg-dark)] py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="headline-section text-[var(--text-light)] mb-12">
            Datenschutzerklärung
          </h1>

          <div className="space-y-8 text-[var(--text-muted)]">
            <div>
              <h2 className="text-xl font-bold text-[var(--text-light)] mb-4 uppercase">
                1. Datenschutz auf einen Blick
              </h2>

              <h3 className="text-lg font-semibold text-[var(--text-light)] mt-6 mb-3">
                Allgemeine Hinweise
              </h3>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber,
                was mit Ihren personenbezogenen Daten passiert, wenn Sie diese
                Website besuchen. Personenbezogene Daten sind alle Daten, mit
                denen Sie persönlich identifiziert werden können.
              </p>

              <h3 className="text-lg font-semibold text-[var(--text-light)] mt-6 mb-3">
                Datenerfassung auf dieser Website
              </h3>
              <p>
                <strong className="text-[var(--text-light)]">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong>
                <br />
                Die Datenverarbeitung auf dieser Website erfolgt durch den
                Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum
                dieser Website entnehmen.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[var(--text-light)] mb-4 uppercase">
                2. Hosting
              </h2>
              <p>
                Diese Website wird extern gehostet. Die personenbezogenen Daten,
                die auf dieser Website erfasst werden, werden auf den Servern des
                Hosters gespeichert.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[var(--text-light)] mb-4 uppercase">
                3. Allgemeine Hinweise und Pflichtinformationen
              </h2>

              <h3 className="text-lg font-semibold text-[var(--text-light)] mt-6 mb-3">
                Datenschutz
              </h3>
              <p>
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen
                Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten
                vertraulich und entsprechend den gesetzlichen
                Datenschutzvorschriften sowie dieser Datenschutzerklärung.
              </p>

              <h3 className="text-lg font-semibold text-[var(--text-light)] mt-6 mb-3">
                Hinweis zur verantwortlichen Stelle
              </h3>
              <p>
                Die verantwortliche Stelle für die Datenverarbeitung auf dieser
                Website ist:
              </p>
              <p className="mt-2">
                SUI GENERIS GmbH
                <br />
                Thilo Pfeil
                <br />
                E-Mail: thilo@suigeneris.de
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[var(--text-light)] mb-4 uppercase">
                4. Analyse-Tools
              </h2>
              <p>
                Diese Website nutzt Plausible Analytics, einen
                datenschutzfreundlichen Webanalyse-Dienst. Plausible erhebt keine
                personenbezogenen Daten, verwendet keine Cookies und erfüllt alle
                Anforderungen der DSGVO.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[var(--text-light)] mb-4 uppercase">
                5. Terminbuchung (Calendly)
              </h2>
              <p>
                Für die Terminbuchung nutzen wir den Dienst Calendly. Wenn Sie
                einen Termin buchen, werden die von Ihnen eingegebenen Daten
                (Name, E-Mail, ggf. Telefonnummer) an Calendly übermittelt und
                dort verarbeitet.
              </p>
              <p className="mt-4">
                Weitere Informationen finden Sie in der Datenschutzerklärung von
                Calendly:
                <br />
                <a
                  href="https://calendly.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] hover:text-[var(--accent-light)] transition-colors"
                >
                  https://calendly.com/privacy
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[var(--text-light)] mb-4 uppercase">
                6. Ihre Rechte
              </h2>
              <p>
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über
                Herkunft, Empfänger und Zweck Ihrer gespeicherten
                personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht,
                die Berichtigung oder Löschung dieser Daten zu verlangen.
              </p>
              <p className="mt-4">
                Bei Fragen zum Datenschutz können Sie sich jederzeit an uns
                wenden.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
