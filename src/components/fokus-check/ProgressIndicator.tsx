'use client';

interface ProgressIndicatorProps {
  current: number;
  total: number;
}

export function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            index < current
              ? 'bg-[var(--accent)]'
              : index === current
              ? 'bg-[var(--accent)] scale-125'
              : 'bg-[var(--text-muted)]/30'
          }`}
        />
      ))}
    </div>
  );
}
