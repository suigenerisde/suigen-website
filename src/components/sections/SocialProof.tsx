interface Testimonial {
  quote: string;
  name: string;
  role: string;
  result?: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      'Von 80 auf 40 Stunden pro Woche - und ein System, das mitwächst. Die Kombination aus Human-First und System hat alles verändert.',
    name: 'Case Study',
    role: 'Crea Factory',
    result: '80h auf 40h',
  },
  {
    quote:
      'Endlich Klarheit. Nach dem Fokus-Audit wusste ich genau, wo ich ansetzen muss. Keine Theorie, sondern eine konkrete Roadmap.',
    name: 'Testimonial',
    role: 'Geschäftsführer, IT-Dienstleister',
    result: '3h statt 6 Monate',
  },
];

export function SocialProof() {
  return (
    <section className="bg-[var(--bg-dark)] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="headline-section text-[var(--text-light)]">
            Ergebnisse, die zählen.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card">
              {testimonial.result && (
                <div className="mb-6">
                  <span className="inline-block px-4 py-2 bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-bold rounded uppercase tracking-wider border border-[var(--accent)]/20">
                    {testimonial.result}
                  </span>
                </div>
              )}
              <blockquote className="text-lg text-[var(--text-light)] mb-6 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div>
                <p className="font-semibold text-[var(--text-light)]">{testimonial.name}</p>
                <p className="text-[var(--text-muted)] text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
