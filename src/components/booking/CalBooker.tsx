'use client';

import { useEffect } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';

export function CalBooker() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: 'fokussiertes-erstgesprach' });

      // Optional: Event Listeners für Tracking
      cal('on', {
        action: 'bookingSuccessful',
        callback: (e) => {
          console.log('Booking successful:', e.detail);
          // Hier kannst du zusätzliches Tracking einfügen
        },
      });

      // Theme konfigurieren
      cal('ui', {
        theme: 'dark',
        styles: { branding: { brandColor: '#14b8a6' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);

  return (
    <div className="cal-embed-container rounded-xl overflow-hidden animate-fade-in bg-[var(--bg-dark-card)] border border-[var(--border-subtle)]">
      <Cal
        namespace="fokussiertes-erstgesprach"
        calLink="suigen/fokussiertes-erstgesprach"
        config={{
          // Self-hosted Cal.com Instance
          origin: 'https://cal.suimation.de',
          // Theme
          theme: 'dark',
          // Layout Optionen
          layout: 'month_view',
          // Branding
          branding: {
            brandColor: '#14b8a6', // Turquoise accent
          },
        }}
        // Performance Optimierung
        embedJsUrl="https://cal.suimation.de/embed/embed.js"
      />
    </div>
  );
}
