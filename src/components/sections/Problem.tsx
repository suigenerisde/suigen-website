export function Problem() {
  const problems = [
    {
      title: 'Du kannst nicht Nein sagen',
      description: 'Jede Anfrage ist dringend. Jede Idee wird angefangen. Für Dich bleibt nichts übrig.',
    },
    {
      title: 'Du entscheidest nicht',
      description: 'Wer keine Priorität setzt, macht alles – und nichts richtig.',
    },
    {
      title: 'Du suchst die Lösung im falschen Ort',
      description: 'Kein Tool ersetzt Klarheit. Keins.',
    },
  ];

  return (
    <section className="bg-[var(--bg-dark-lighter)] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="headline-section text-[var(--text-light)]">
            Kommt Dir das bekannt vor?
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {problems.map((problem, index) => (
            <div key={index} className="card group">
              <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[var(--accent)]/20 transition-colors">
                <span className="text-[var(--accent)] font-bold text-lg">{index + 1}</span>
              </div>
              <h3 className="text-xl font-bold text-[var(--text-light)] mb-3 uppercase tracking-wide">
                {problem.title}
              </h3>
              <p className="text-[var(--text-muted)]">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
