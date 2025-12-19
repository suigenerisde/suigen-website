'use client';

export function CalBooker() {
  return (
    <div className="cal-embed-container rounded-xl overflow-hidden">
      <iframe
        src="https://cal.suimation.de/suigen/fokussiertes-erstgesprach?embed=true&theme=dark"
        className="w-full border-0"
        style={{
          minHeight: '700px',
          colorScheme: 'dark'
        }}
        title="Termin buchen"
        loading="lazy"
      />
    </div>
  );
}
