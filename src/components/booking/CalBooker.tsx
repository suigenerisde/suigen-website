'use client';

import { useState } from 'react';
import { Button } from '../ui/Button';

export function CalBooker() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoad = () => {
    setIsLoading(true);
    // Small delay to show loading state
    setTimeout(() => {
      setIsLoaded(true);
      setIsLoading(false);
    }, 100);
  };

  if (!isLoaded) {
    return (
      <div className="cal-embed-placeholder rounded-xl overflow-hidden bg-[var(--bg-dark-card)] border border-[var(--border-subtle)]">
        <div
          className="flex flex-col items-center justify-center py-20 px-8 text-center"
          style={{ minHeight: '500px' }}
        >
          <div className="w-16 h-16 bg-[var(--accent)]/10 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-8 h-8 text-[var(--accent)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-[var(--text-light)] mb-3">
            Termin buchen
          </h3>
          <p className="text-[var(--text-muted)] mb-8 max-w-md">
            Wähle einen passenden Termin für Dein kostenloses 30-Minuten Erstgespräch.
          </p>
          <Button
            onClick={handleLoad}
            disabled={isLoading}
            variant="primary"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
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
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Lädt...
              </>
            ) : (
              'Kalender öffnen'
            )}
          </Button>
          <p className="text-sm text-[var(--text-muted)] mt-6 opacity-60">
            Powered by Cal.com
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="cal-embed-container rounded-xl overflow-hidden animate-fade-in">
      <iframe
        src="https://cal.suimation.de/suigen/fokussiertes-erstgesprach?embed=true&theme=dark"
        className="w-full border-0"
        style={{
          minHeight: '700px',
          colorScheme: 'dark'
        }}
        title="Termin buchen"
      />
    </div>
  );
}
