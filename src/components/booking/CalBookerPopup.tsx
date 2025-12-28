'use client';

import { useEffect, useState } from 'react';
import { getCalApi } from '@calcom/embed-react';
import { Button } from '../ui/Button';

/**
 * Cal.com Popup Variant - Ultra performant
 * Lädt Cal.com nur wenn User auf Button klickt
 * Zeigt Kalender als Modal/Popup statt Inline
 */
export function CalBookerPopup() {
  const [cal, setCal] = useState<any>(null);

  useEffect(() => {
    (async function () {
      const calApi = await getCalApi({ namespace: 'fokussiertes-erstgesprach' });

      // Theme konfigurieren
      calApi('ui', {
        theme: 'dark',
        styles: { branding: { brandColor: '#14b8a6' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });

      // Event Listeners
      calApi('on', {
        action: 'bookingSuccessful',
        callback: (e) => {
          console.log('Booking successful:', e.detail);
          // Optional: n8n Webhook triggern oder Analytics
        },
      });

      setCal(calApi);
    })();
  }, []);

  const handleOpenCalendar = () => {
    if (cal) {
      cal('modal', {
        calLink: 'suigen/fokussiertes-erstgesprach',
        config: {
          origin: 'https://cal.suimation.de',
          theme: 'dark',
          layout: 'month_view',
        },
      });
    }
  };

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

        {/* Cal.com Popup Button */}
        <Button
          onClick={handleOpenCalendar}
          disabled={!cal}
          variant="primary"
        >
          {cal ? 'Kalender öffnen' : 'Lädt...'}
        </Button>

        <p className="text-sm text-[var(--text-muted)] mt-6 opacity-60">
          Powered by Cal.com
        </p>
      </div>
    </div>
  );
}
