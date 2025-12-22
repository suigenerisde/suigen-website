'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Answer, QuizStep } from '@/types/fokus-check';

const STORAGE_KEY = 'fokus-check-progress';
const EXPIRY_HOURS = 24; // Progress expires after 24 hours

interface PersistedState {
  step: QuizStep;
  userName: string;
  currentQuestion: number;
  answers: Answer[];
  savedAt: number; // timestamp
}

interface UseQuizPersistenceReturn {
  // Restored state (null if no valid saved state)
  restoredState: PersistedState | null;
  // Save current progress
  saveProgress: (state: Omit<PersistedState, 'savedAt'>) => void;
  // Clear saved progress
  clearProgress: () => void;
  // Check if there's saved progress
  hasSavedProgress: boolean;
  // Dismiss restored state (user chose not to continue)
  dismissRestoredState: () => void;
}

export function useQuizPersistence(): UseQuizPersistenceReturn {
  const [restoredState, setRestoredState] = useState<PersistedState | null>(null);
  const [hasSavedProgress, setHasSavedProgress] = useState(false);

  // Load saved progress on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: PersistedState = JSON.parse(saved);

        // Check if expired
        const hoursOld = (Date.now() - parsed.savedAt) / (1000 * 60 * 60);
        if (hoursOld < EXPIRY_HOURS && parsed.step !== 'result') {
          // Convert date strings back to Date objects
          parsed.answers = parsed.answers.map(a => ({
            ...a,
            answeredAt: new Date(a.answeredAt),
          }));
          setRestoredState(parsed);
          setHasSavedProgress(true);
        } else {
          // Expired or completed - clear it
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch (e) {
      console.error('Failed to load quiz progress:', e);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const saveProgress = useCallback((state: Omit<PersistedState, 'savedAt'>) => {
    try {
      // Don't save if completed or at intro
      if (state.step === 'result' || state.step === 'intro') {
        return;
      }

      const toSave: PersistedState = {
        ...state,
        savedAt: Date.now(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
      setHasSavedProgress(true);
    } catch (e) {
      console.error('Failed to save quiz progress:', e);
    }
  }, []);

  const clearProgress = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setHasSavedProgress(false);
      setRestoredState(null);
    } catch (e) {
      console.error('Failed to clear quiz progress:', e);
    }
  }, []);

  const dismissRestoredState = useCallback(() => {
    setRestoredState(null);
    // Keep the saved progress in localStorage in case they want to continue later
  }, []);

  return {
    restoredState,
    saveProgress,
    clearProgress,
    hasSavedProgress,
    dismissRestoredState,
  };
}
