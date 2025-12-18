import Link from 'next/link';

const footerLinks = {
  angebot: [
    { label: 'Fokus-Audit', href: '/fokus-audit' },
    { label: 'FOKUS: Human-First', href: '/fokus-human' },
    { label: 'FOKUS: System', href: '/fokus-system' },
  ],
  unternehmen: [
    { label: 'Über', href: '/ueber' },
    { label: 'Kontakt', href: '/kontakt' },
  ],
  rechtliches: [
    { label: 'Impressum', href: '/impressum' },
    { label: 'Datenschutz', href: '/datenschutz' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[var(--bg-dark)] border-t border-[var(--border-subtle)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-black text-[var(--text-light)] uppercase tracking-tight">
              SUIGEN
            </Link>
            <p className="mt-4 text-[var(--text-muted)] text-sm leading-relaxed">
              Erst fokussieren, dann automatisieren.
            </p>
            <p className="mt-4 text-[var(--text-muted)] text-sm">
              SUI GENERIS GmbH
            </p>
          </div>

          {/* Angebot */}
          <div>
            <h3 className="font-bold text-[var(--text-light)] mb-4 uppercase tracking-wider text-sm">
              Angebot
            </h3>
            <ul className="space-y-3">
              {footerLinks.angebot.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Unternehmen */}
          <div>
            <h3 className="font-bold text-[var(--text-light)] mb-4 uppercase tracking-wider text-sm">
              Unternehmen
            </h3>
            <ul className="space-y-3">
              {footerLinks.unternehmen.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="font-bold text-[var(--text-light)] mb-4 uppercase tracking-wider text-sm">
              Kontakt
            </h3>
            <ul className="space-y-3 text-sm text-[var(--text-muted)]">
              <li>
                <a
                  href="tel:+4917126470110"
                  className="hover:text-[var(--accent)] transition-colors"
                >
                  0171 264 70 10
                </a>
              </li>
              <li>
                <a
                  href="mailto:thilo@suigeneris.de"
                  className="hover:text-[var(--accent)] transition-colors"
                >
                  thilo@suigeneris.de
                </a>
              </li>
              <li className="pt-2">
                <a
                  href="https://www.linkedin.com/in/thilopfeil/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent)] transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-[var(--border-subtle)]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[var(--text-muted)] text-sm">
              &copy; {new Date().getFullYear()} SUI GENERIS GmbH. Alle Rechte vorbehalten.
            </p>
            <div className="flex space-x-6">
              {footerLinks.rechtliches.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
