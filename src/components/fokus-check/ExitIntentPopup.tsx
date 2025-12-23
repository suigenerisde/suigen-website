'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

import type { QuizStep } from '@/types/fokus-check';

interface ExitIntentPopupProps {
  onContinue: () => void;
  currentStep: QuizStep;
  questionNumber?: number;
  onSaveAndLeave?: () => void; // Callback to save progress before leaving
}

export function ExitIntentPopup({
  onContinue,
  currentStep,
  questionNumber,
  onSaveAndLeave,
}: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShownExitIntent, setHasShownExitIntent] = useState(false);
  const [triggerType, setTriggerType] = useState<'exit' | 'navigation'>('exit');
  const pendingNavigation = useRef<string | null>(null);
  const router = useRouter();

  // Check if popup was already shown this session (for exit intent only)
  useEffect(() => {
    const shown = sessionStorage.getItem('fokus-check-exit-shown');
    if (shown) {
      setHasShownExitIntent(true);
    }
  }, []);

  // Should we block navigation? Only during active quiz steps
  const shouldBlockNavigation =
    currentStep === 'name' || currentStep === 'questions' || currentStep === 'email';

  // Show exit intent popup
  const showExitIntent = useCallback(() => {
    // Don't show on intro, result, invite-code, or access-request steps
    if (
      hasShownExitIntent ||
      currentStep === 'result' ||
      currentStep === 'intro' ||
      currentStep === 'invite-code' ||
      currentStep === 'access-request'
    ) {
      return;
    }

    setTriggerType('exit');
    setIsVisible(true);
    setHasShownExitIntent(true);
    sessionStorage.setItem('fokus-check-exit-shown', 'true');

    // Track exit intent event
    if (
      typeof window !== 'undefined' &&
      (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
    ) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag(
        'event',
        'exit_intent_triggered',
        {
          event_category: 'fokus_check',
          event_label: currentStep,
          value: questionNumber || 0,
        }
      );
    }
  }, [hasShownExitIntent, currentStep, questionNumber]);

  // Handle mouse leaving the window (triggers on any edge)
  const handleMouseLeave = useCallback(
    (_e: MouseEvent) => {
      // Trigger when mouse leaves the browser window (any direction)
      showExitIntent();
    },
    [showExitIntent]
  );

  // Handle visibility change (tab switching)
  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === 'hidden') {
      showExitIntent();
    }
  }, [showExitIntent]);

  // Handle beforeunload (browser close/refresh)
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (shouldBlockNavigation) {
        e.preventDefault();
        // Chrome requires returnValue to be set
        e.returnValue = '';
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [shouldBlockNavigation]);

  // Intercept link clicks for internal navigation
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      if (!shouldBlockNavigation) return;

      const target = e.target as HTMLElement;
      const link = target.closest('a');

      if (link) {
        const href = link.getAttribute('href');

        // Skip external links, anchors, and fokus-check page itself
        if (
          !href ||
          href.startsWith('http') ||
          href.startsWith('#') ||
          href.startsWith('mailto:') ||
          href.startsWith('tel:') ||
          href === '/fokus-check'
        ) {
          return;
        }

        // Prevent navigation and show popup
        e.preventDefault();
        e.stopPropagation();
        pendingNavigation.current = href;
        setTriggerType('navigation');
        setIsVisible(true);

        // Track navigation attempt
        if (
          typeof window !== 'undefined' &&
          (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
        ) {
          (window as unknown as { gtag: (...args: unknown[]) => void }).gtag(
            'event',
            'navigation_blocked',
            {
              event_category: 'fokus_check',
              event_label: href,
              value: questionNumber || 0,
            }
          );
        }
      }
    };

    document.addEventListener('click', handleLinkClick, true);
    return () => document.removeEventListener('click', handleLinkClick, true);
  }, [shouldBlockNavigation, questionNumber]);

  // Handle mouse leaving window and visibility change
  useEffect(() => {
    // mouseleave on document - fires when mouse leaves the browser window
    document.addEventListener('mouseleave', handleMouseLeave);
    // visibilitychange - fires when user switches tabs
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleMouseLeave, handleVisibilityChange]);

  const handleClose = () => {
    setIsVisible(false);
    pendingNavigation.current = null;
  };

  const handleContinueClick = () => {
    setIsVisible(false);
    pendingNavigation.current = null;
    onContinue();

    // Track conversion from exit intent
    if (
      typeof window !== 'undefined' &&
      (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
    ) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag(
        'event',
        triggerType === 'exit' ? 'exit_intent_recovered' : 'navigation_recovered',
        {
          event_category: 'fokus_check',
          event_label: currentStep,
        }
      );
    }
  };

  const handleLeaveAnyway = () => {
    // Save progress if callback provided
    if (onSaveAndLeave) {
      onSaveAndLeave();
    }

    setIsVisible(false);

    // If there's a pending navigation, execute it
    if (pendingNavigation.current) {
      router.push(pendingNavigation.current);
      pendingNavigation.current = null;
    }

    // Track leave
    if (
      typeof window !== 'undefined' &&
      (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
    ) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'quiz_abandoned', {
        event_category: 'fokus_check',
        event_label: currentStep,
        value: questionNumber || 0,
      });
    }
  };

  if (!isVisible) return null;

  // Dynamic content based on step and trigger type
  const getContent = () => {
    if (triggerType === 'navigation') {
      // Navigation-specific content
      switch (currentStep) {
        case 'name':
          return {
            headline: 'Moment mal!',
            subline: 'Du bist gleich soweit. Nur noch schnell Deinen Namen eingeben.',
            cta: 'Check fortsetzen',
            bonus: null,
            leaveText: 'Später weitermachen',
          };
        case 'questions':
          return {
            headline: `Nur noch ${8 - (questionNumber || 1) + 1} Fragen!`,
            subline:
              'Dein Fortschritt wird gespeichert. Aber jetzt bist Du so nah an Deinem Ergebnis!',
            cta: 'Check beenden',
            bonus: 'Dein personalisierter PDF-Report wartet',
            leaveText: 'Fortschritt speichern & gehen',
          };
        case 'email':
          return {
            headline: 'Dein Ergebnis ist fertig!',
            subline: 'Nur noch Deine E-Mail eingeben und Du erhältst Deinen Fokus-Report.',
            cta: 'Ergebnis holen',
            bonus: 'Inkl. konkreter Handlungsempfehlungen',
            leaveText: 'Ohne Ergebnis gehen',
          };
        default:
          return {
            headline: 'Warte!',
            subline: 'Willst Du wirklich gehen?',
            cta: 'Zurück zum Check',
            bonus: null,
            leaveText: 'Trotzdem gehen',
          };
      }
    }

    // Exit intent content (mouse leaving viewport)
    switch (currentStep) {
      case 'intro':
        return {
          headline: 'Warte! Dein Fokus-Score wartet.',
          subline: 'In nur 3 Minuten erfährst Du, wie fokussiert Du wirklich bist.',
          cta: 'Jetzt Fokus-Score berechnen',
          bonus: 'Bonus: Detaillierter PDF-Report per WhatsApp',
          leaveText: 'Nein danke, ich möchte gehen',
        };
      case 'name':
        return {
          headline: 'Fast geschafft!',
          subline: 'Gib noch schnell Deinen Namen ein und starte den Check.',
          cta: 'Weiter zum Check',
          bonus: null,
          leaveText: 'Nein danke, ich möchte gehen',
        };
      case 'questions':
        return {
          headline: `Nur noch ${8 - (questionNumber || 1) + 1} Fragen!`,
          subline: 'Du bist so nah dran an Deinem persönlichen Fokus-Score.',
          cta: 'Check fortsetzen',
          bonus: 'Dein Ergebnis + PDF-Report warten auf Dich',
          leaveText: 'Nein danke, ich möchte gehen',
        };
      case 'email':
        return {
          headline: 'Dein Ergebnis ist bereit!',
          subline: 'Gib Deine E-Mail ein und erhalte Deinen detaillierten Fokus-Report.',
          cta: 'Ergebnis ansehen',
          bonus: 'Inkl. persönlicher Handlungsempfehlungen',
          leaveText: 'Nein danke, ich möchte gehen',
        };
      default:
        return {
          headline: 'Warte!',
          subline: 'Willst Du Deinen Fokus-Score wirklich nicht erfahren?',
          cta: 'Zurück zum Check',
          bonus: null,
          leaveText: 'Nein danke, ich möchte gehen',
        };
    }
  };

  const content = getContent();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className="relative bg-[var(--bg-dark-card)] rounded-3xl p-8 max-w-md mx-4 border border-[var(--accent)]/30 shadow-2xl shadow-[var(--accent)]/10 animate-fade-in">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-light)] transition-colors"
          aria-label="Schließen"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Content */}
        <div className="text-center">
          {/* Icon */}
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--accent)]/10 flex items-center justify-center">
            <span className="text-3xl">{triggerType === 'navigation' ? '🚀' : '🎯'}</span>
          </div>

          <h3 className="text-2xl font-bold text-[var(--text-light)] mb-2">{content.headline}</h3>

          <p className="text-[var(--text-muted)] mb-6">{content.subline}</p>

          <Button onClick={handleContinueClick} variant="primary" size="lg" className="w-full">
            {content.cta}
          </Button>

          {content.bonus && (
            <p className="mt-4 text-sm text-[var(--accent)] flex items-center justify-center gap-2">
              <span>🎁</span>
              {content.bonus}
            </p>
          )}

          <button
            onClick={handleLeaveAnyway}
            className="mt-4 text-[var(--text-muted)] text-sm hover:text-[var(--text-light)] transition-colors"
          >
            {content.leaveText}
          </button>

          {/* Progress saved indicator for navigation blocking */}
          {triggerType === 'navigation' && currentStep === 'questions' && (
            <p className="mt-3 text-xs text-[var(--text-muted)]/60 flex items-center justify-center gap-1">
              <svg
                className="w-3 h-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Dein Fortschritt wird automatisch gespeichert
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
