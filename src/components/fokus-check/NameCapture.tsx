'use client';

import { useState } from 'react';

interface NameCaptureProps {
  onSubmit: (name: string) => void;
}

export function NameCapture({ onSubmit }: NameCaptureProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Bitte gib Deinen Namen ein.');
      return;
    }

    if (trimmedName.length < 2) {
      setError('Der Name sollte mindestens 2 Zeichen haben.');
      return;
    }

    onSubmit(trimmedName);
  };

  return (
    <div className="animate-fade-in text-center">
      <div className="mb-6">
        <span className="text-6xl">👋</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-light)] mb-4">
        Bevor wir starten...
      </h1>

      <p className="text-[var(--text-muted)] text-lg mb-8">
        Wie darf ich Dich nennen?
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Dein Vorname"
            autoFocus
            className="w-full p-4 rounded-2xl bg-[var(--bg-dark-card)] border-2 border-[var(--text-muted)]/20 text-[var(--text-light)] placeholder:text-[var(--text-muted)]/50 focus:border-[var(--accent)] focus:outline-none transition-colors text-center text-xl"
          />
          {error && (
            <p className="text-red-400 text-sm mt-2">{error}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-[var(--accent)] text-white font-bold rounded-full hover:bg-[var(--accent)]/90 transition-colors flex items-center justify-center gap-2 text-lg"
        >
          Los geht&apos;s
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
        </button>
      </form>
    </div>
  );
}
