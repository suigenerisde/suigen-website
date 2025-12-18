import { Button } from '@/components/ui/Button';

export function TwoColumns() {
  return (
    <section className="bg-[var(--bg-dark)] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="headline-section text-[var(--text-light)] mb-4">
            Zwei Säulen. Ein Ziel.
          </h2>
          <p className="body-text max-w-2xl mx-auto">
            Erst fokussieren, dann automatisieren.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Human-First */}
          <div className="card group">
            <div className="mb-6">
              <span className="text-sm font-bold text-[var(--accent)] uppercase tracking-widest">
                FOKUS:
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-light)] mt-2 uppercase">
                Human-First
              </h3>
            </div>
            <p className="text-lg text-[var(--text-light)] font-semibold mb-4">
              Klarheit für DICH.
            </p>
            <p className="text-[var(--text-muted)] mb-6">
              Der Mensch im Zentrum. Bevor wir automatisieren, schaffen wir Klarheit.
              Über Deine Engpässe, Deine Prioritäten, Dein System.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <span className="text-[var(--accent)] mr-3 text-lg">&#10003;</span>
                <span className="text-[var(--text-muted)]">10-15 Stunden pro Woche gewonnen</span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--accent)] mr-3 text-lg">&#10003;</span>
                <span className="text-[var(--text-muted)]">Dein Team zieht an einem Strang</span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--accent)] mr-3 text-lg">&#10003;</span>
                <span className="text-[var(--text-muted)]">Du bist nicht mehr der Engpass</span>
              </li>
            </ul>
            <Button href="/fokus-human" variant="secondary">
              Mehr erfahren
            </Button>
          </div>

          {/* System */}
          <div className="card group">
            <div className="mb-6">
              <span className="text-sm font-bold text-[var(--accent)] uppercase tracking-widest">
                FOKUS:
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-light)] mt-2 uppercase">
                System
              </h3>
            </div>
            <p className="text-lg text-[var(--text-light)] font-semibold mb-4">
              Skalierung für DEIN UNTERNEHMEN.
            </p>
            <p className="text-[var(--text-muted)] mb-6">
              Das System im Zentrum. Wir bauen individuelle Fokus-Systeme,
              die zu Deinem Unternehmen passen. Keine Tools von der Stange.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <span className="text-[var(--accent)] mr-3 text-lg">&#10003;</span>
                <span className="text-[var(--text-muted)]">Prozesse laufen ohne Dich</span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--accent)] mr-3 text-lg">&#10003;</span>
                <span className="text-[var(--text-muted)]">Wiederkehrende Aufgaben automatisiert</span>
              </li>
              <li className="flex items-start">
                <span className="text-[var(--accent)] mr-3 text-lg">&#10003;</span>
                <span className="text-[var(--text-muted)]">Mehr Zeit für das Wesentliche</span>
              </li>
            </ul>
            <Button href="/fokus-system" variant="secondary">
              Mehr erfahren
            </Button>
          </div>
        </div>

        {/* Arrow between columns (desktop only) */}
        <div className="hidden md:flex justify-center mt-12">
          <div className="flex items-center text-[var(--text-muted)]">
            <span className="text-sm uppercase tracking-wider">Human-First</span>
            <svg className="w-8 h-8 mx-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <span className="text-sm uppercase tracking-wider">System</span>
          </div>
        </div>
      </div>
    </section>
  );
}
