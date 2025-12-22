'use client';

import { Button } from '@/components/ui/Button';

interface ContinueQuizPromptProps {
  questionNumber: number;
  totalQuestions: number;
  userName: string;
  onContinue: () => void;
  onStartFresh: () => void;
}

export function ContinueQuizPrompt({
  questionNumber,
  totalQuestions,
  userName,
  onContinue,
  onStartFresh,
}: ContinueQuizPromptProps) {
  const progressPercent = Math.round((questionNumber / totalQuestions) * 100);

  return (
    <div className="animate-fade-in">
      {/* Welcome back badge */}
      <span className="inline-block px-4 py-2 bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-bold rounded uppercase tracking-widest mb-8 border border-[var(--accent)]/20">
        Willkommen zurück{userName ? `, ${userName}` : ''}!
      </span>

      <h1 className="headline-hero text-[var(--text-light)] mb-6">
        Dein Check wartet
        <br />
        <span className="text-[var(--accent)] text-glow">auf Dich</span>
      </h1>

      {/* Progress visualization */}
      <div className="bg-[var(--bg-dark-card)] border border-[var(--text-muted)]/20 rounded-2xl p-6 mb-8">
        <div className="flex justify-between text-sm text-[var(--text-muted)] mb-2">
          <span>Dein Fortschritt</span>
          <span className="text-[var(--accent)] font-medium">{progressPercent}%</span>
        </div>

        {/* Progress bar */}
        <div className="h-3 bg-[var(--bg-dark)]/50 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent)]/70 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <p className="text-[var(--text-light)]">
          Du warst bei <span className="font-bold text-[var(--accent)]">Frage {questionNumber}</span> von {totalQuestions}
        </p>
        <p className="text-[var(--text-muted)] text-sm mt-1">
          Nur noch {totalQuestions - questionNumber + 1} Fragen bis zu Deinem Ergebnis
        </p>
      </div>

      {/* CTAs */}
      <div className="space-y-4">
        <Button onClick={onContinue} variant="primary" size="lg" className="w-full">
          Jetzt weitermachen
        </Button>

        <button
          onClick={onStartFresh}
          className="w-full text-[var(--text-muted)] text-sm hover:text-[var(--text-light)] transition-colors py-2"
        >
          Lieber von vorne beginnen
        </button>
      </div>

      {/* Saved progress indicator */}
      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[var(--text-muted)]/60">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
        Deine Antworten wurden automatisch gespeichert
      </div>
    </div>
  );
}
