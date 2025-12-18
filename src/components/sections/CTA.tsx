import { Button } from '@/components/ui/Button';

export function CTA() {
  return (
    <section className="bg-[var(--bg-dark-lighter)] py-24 md:py-32 relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--accent)] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="headline-section text-[var(--text-light)] mb-6">
          Bereit für Fokus?
        </h2>
        <p className="body-text mb-10 max-w-2xl mx-auto">
          30 Minuten. Kostenlos. Wir klären, ob es passt - und was der nächste
          Schritt für Dich sein könnte.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/kontakt" variant="primary" size="lg">
            Erstgespräch buchen
          </Button>
        </div>
        <p className="mt-10 text-[var(--text-muted)] text-sm">
          Oder ruf direkt an:{' '}
          <a
            href="tel:+4917126470110"
            className="text-[var(--accent)] hover:text-[var(--accent-light)] transition-colors"
          >
            0171 264 70 10
          </a>
        </p>
      </div>
    </section>
  );
}
