import Link from 'next/link'

interface FokusCheckCTAProps {
  variant?: 'default' | 'minimal'
  className?: string
}

export function FokusCheckCTA({
  variant = 'default',
  className = '',
}: FokusCheckCTAProps) {
  if (variant === 'minimal') {
    return (
      <div className={`my-6 ${className}`}>
        <Link
          href="/fokus-check"
          className="inline-flex items-center gap-2 text-[var(--accent)] hover:underline font-medium"
        >
          Jetzt Fokus-Check starten
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    )
  }

  return (
    <div
      className={`my-10 p-8 rounded-2xl bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent)]/5 border border-[var(--accent)]/20 ${className}`}
    >
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-3">
          Bereit fuer mehr Fokus?
        </h3>
        <p className="text-gray-300 mb-6 max-w-md mx-auto">
          Finde in nur 3 Minuten heraus, wo deine Zeit wirklich bleibt - und was
          du konkret aendern kannst.
        </p>
        <Link
          href="/fokus-check"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--accent)] text-[var(--bg-dark)] font-bold rounded-xl hover:bg-[var(--accent-light)] hover:shadow-[0_0_20px_var(--accent-glow)] transition-all"
        >
          Kostenloser Fokus-Check
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
        <p className="mt-4 text-sm text-gray-500">
          100% kostenlos. Keine Registrierung noetig.
        </p>
      </div>
    </div>
  )
}
