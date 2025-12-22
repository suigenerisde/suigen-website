'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/Button';

interface InviteCodeCaptureProps {
  onValidCode: () => void;
  onRequestAccess: () => void;
}

// Gültige Einladungscodes (später ggf. aus DB)
const VALID_CODES = ['FOKUS2026'];

export function InviteCodeCapture({ onValidCode, onRequestAccess }: InviteCodeCaptureProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setIsChecking(true);
      setError('');

      // Kurze Verzögerung für bessere UX
      setTimeout(() => {
        const normalizedCode = code.trim().toUpperCase();

        if (VALID_CODES.includes(normalizedCode)) {
          // Code korrekt - weiter zum Quiz
          onValidCode();
        } else {
          // Code falsch
          setError('Dieser Code ist leider nicht gültig.');
          setIsChecking(false);
        }
      }, 500);
    },
    [code, onValidCode]
  );

  return (
    <div className="animate-fade-in">
      <span className="inline-block px-4 py-2 bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-bold rounded uppercase tracking-widest mb-8 border border-[var(--accent)]/20">
        Exklusiver Zugang
      </span>

      <h1 className="headline-hero text-[var(--text-light)] mb-6">
        Du wurdest zum
        <br />
        <span className="text-[var(--accent)] text-glow">Fokus-Check</span> eingeladen
      </h1>

      <p className="body-text mb-8 max-w-2xl">
        Bitte gib Deinen persönlichen Einladungscode ein, um den Fokus-Check zu starten.
      </p>

      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-6">
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              setError('');
            }}
            placeholder="DEIN-CODE"
            className="w-full px-6 py-4 bg-[var(--bg-dark-card)] border border-[var(--text-muted)]/20 rounded-xl text-[var(--text-light)] text-center text-xl font-mono tracking-widest placeholder:text-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all"
            autoComplete="off"
            autoCapitalize="characters"
          />
          {error && (
            <p className="mt-3 text-red-400 text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={!code.trim() || isChecking}
          className="w-full"
        >
          {isChecking ? 'Wird geprüft...' : 'Code bestätigen'}
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-4 my-8 max-w-md">
        <div className="flex-1 h-px bg-[var(--text-muted)]/20" />
        <span className="text-[var(--text-muted)] text-sm">oder</span>
        <div className="flex-1 h-px bg-[var(--text-muted)]/20" />
      </div>

      {/* Request Access */}
      <div className="max-w-md">
        <p className="text-[var(--text-muted)] mb-4">
          Du hast keinen Einladungscode?
        </p>
        <button
          onClick={onRequestAccess}
          className="w-full px-6 py-4 border border-[var(--accent)]/30 rounded-xl text-[var(--accent)] hover:bg-[var(--accent)]/10 transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"
            />
          </svg>
          Zugang anfragen
        </button>
      </div>

      {/* Trust Indicators */}
      <div className="flex flex-wrap gap-4 md:gap-6 mt-8 text-[var(--text-muted)] text-sm max-w-md">
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4 text-[var(--accent)]" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          Exklusiver Zugang
        </span>
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4 text-[var(--accent)]" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          3 Minuten
        </span>
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4 text-[var(--accent)]" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Kostenlos
        </span>
      </div>
    </div>
  );
}
