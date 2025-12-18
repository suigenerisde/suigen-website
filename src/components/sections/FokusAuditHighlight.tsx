import { Button } from '@/components/ui/Button';

export function FokusAuditHighlight() {
  return (
    <section className="bg-[var(--bg-dark-lighter)] py-24 md:py-32 relative overflow-hidden">
      {/* Gold glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent)] opacity-[0.05] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-bold rounded uppercase tracking-widest mb-8 border border-[var(--accent)]/20">
            ALLES startet hier
          </span>
          <h2 className="headline-section text-[var(--text-light)] mb-6">
            Das Fokus-Audit
          </h2>
          <p className="text-2xl md:text-3xl text-[var(--accent)] font-bold mb-6 text-glow">
            In 3 Stunden weißt Du, worauf Du Dich fokussieren musst.
          </p>
          <p className="body-text mb-10 max-w-2xl mx-auto">
            In einem 3-stündigen Workshop analysieren wir Deine Situation,
            identifizieren die echten Engpässe und entwickeln eine konkrete Roadmap
            für die nächsten 90 Tage.
          </p>
          <Button href="/fokus-audit" variant="primary" size="lg">
            Mehr zum Fokus-Audit
          </Button>
        </div>
      </div>
    </section>
  );
}
