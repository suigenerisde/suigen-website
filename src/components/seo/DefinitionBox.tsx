interface DefinitionBoxProps {
  term: string;
  definition: string;
  bulletPoints?: string[];
}

/**
 * AI Overview optimierte Definition-Box
 * Strukturiert für Featured Snippets und AI-Zitierung
 */
export function DefinitionBox({ term, definition, bulletPoints }: DefinitionBoxProps) {
  return (
    <aside
      className="bg-[var(--bg-dark-lighter)] border-l-4 border-[var(--accent)] p-6 md:p-8 my-8 rounded-r-lg"
      role="complementary"
      aria-label={`Definition: ${term}`}
    >
      <h3 className="text-lg font-bold text-[var(--accent)] mb-3 uppercase tracking-wide">
        Was ist {term}?
      </h3>
      <p className="text-[var(--text-light)] text-lg leading-relaxed mb-4">
        {definition}
      </p>
      {bulletPoints && bulletPoints.length > 0 && (
        <ul className="space-y-2">
          {bulletPoints.map((point, index) => (
            <li key={index} className="flex items-start text-[var(--text-muted)]">
              <span className="text-[var(--accent)] mr-3 flex-shrink-0">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
