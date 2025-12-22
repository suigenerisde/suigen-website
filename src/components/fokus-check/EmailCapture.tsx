'use client';

import { useState } from 'react';

interface EmailCaptureProps {
  onSubmit: (email: string) => void;
  isLoading: boolean;
}

export function EmailCapture({ onSubmit, isLoading }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Bitte gib Deine E-Mail-Adresse ein.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Bitte gib eine gültige E-Mail-Adresse ein.');
      return;
    }

    onSubmit(email);
  };

  return (
    <div className="animate-fade-in text-center">
      <div className="mb-6">
        <span className="text-5xl">🎯</span>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-light)] mb-4">
        Fast geschafft!
      </h2>

      <p className="text-[var(--text-muted)] mb-8">
        Wohin sollen wir Dein Ergebnis schicken?
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="deine@email.de"
            className="w-full p-4 rounded-2xl bg-[var(--bg-dark-card)] border-2 border-[var(--text-muted)]/20 text-[var(--text-light)] placeholder:text-[var(--text-muted)]/50 focus:border-[var(--accent)] focus:outline-none transition-colors"
            disabled={isLoading}
          />
          {error && (
            <p className="text-red-400 text-sm mt-2 text-left">{error}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-[var(--accent)] text-white font-bold rounded-full hover:bg-[var(--accent)]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Wird berechnet...
            </>
          ) : (
            <>
              Ergebnis anzeigen
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
            </>
          )}
        </button>
      </form>

      <p className="text-[var(--text-muted)] text-sm mt-6 flex items-center justify-center gap-2">
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
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        Kein Spam.
      </p>
    </div>
  );
}
