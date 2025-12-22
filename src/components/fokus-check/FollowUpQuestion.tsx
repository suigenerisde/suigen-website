'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { FollowUpQuestion as FollowUpQuestionType, FollowUpAnswer } from '@/types/fokus-check';
import { Button } from '@/components/ui/Button';

interface FollowUpQuestionProps {
  question: FollowUpQuestionType;
  parentQuestionId: number;
  onSubmit: (answer: FollowUpAnswer) => void;
  onSkip: () => void;
}

// Web Speech API Types
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
  }
}

export function FollowUpQuestion({
  question,
  parentQuestionId,
  onSubmit,
  onSkip,
}: FollowUpQuestionProps) {
  const [textValue, setTextValue] = useState('');
  const [currentHours, setCurrentHours] = useState(55);
  const [desiredHours, setDesiredHours] = useState(40);
  const [showSkip, setShowSkip] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Check for Speech Recognition support
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setSpeechSupported(!!SpeechRecognition);
  }, []);

  // Skip-Button erst nach 2 Sekunden zeigen (UX-Optimierung)
  useEffect(() => {
    const timer = setTimeout(() => setShowSkip(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Cleanup speech recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const startListening = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'de-DE';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      // Show interim results while speaking, final when done
      if (finalTranscript) {
        setTextValue((prev) => (prev ? prev + ' ' + finalTranscript : finalTranscript).trim());
      } else if (interimTranscript) {
        // Show interim in a lighter way - append to existing
        setTextValue((prev) => {
          const base = prev.replace(/\s*\[.*\]$/, ''); // Remove previous interim
          return base ? `${base} [${interimTranscript}]` : `[${interimTranscript}]`;
        });
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
      // Clean up interim text markers
      setTextValue((prev) => prev.replace(/\s*\[.*\]$/, ''));
    };

    recognition.onend = () => {
      setIsListening(false);
      // Clean up interim text markers
      setTextValue((prev) => prev.replace(/\s*\[.*\]$/, ''));
    };

    recognition.start();
    setIsListening(true);
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  const handleTextSubmit = () => {
    // Clean up any interim markers before submitting
    const cleanText = textValue.replace(/\s*\[.*\]$/, '').trim();
    if (cleanText) {
      onSubmit({
        questionId: question.id,
        parentQuestionId,
        textValue: cleanText,
      });
    } else {
      onSkip();
    }
  };

  const handleDualSliderSubmit = () => {
    onSubmit({
      questionId: question.id,
      parentQuestionId,
      sliderValues: {
        current: currentHours,
        desired: desiredHours,
      },
    });
  };

  const hoursDelta = currentHours - desiredHours;

  return (
    <div className="animate-fade-in">
      {/* Bonus-Badge */}
      <div className="flex justify-center mb-4">
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-medium rounded-full border border-[var(--accent)]/20">
          <span>🎁</span>
          Bonus-Frage (hilft uns Dein Ergebnis zu personalisieren)
        </span>
      </div>

      <h3 className="text-xl md:text-2xl font-bold text-[var(--text-light)] text-center mb-6">
        {question.text}
      </h3>

      {/* Text Input with Voice */}
      {question.type === 'text' && (
        <div className="max-w-md mx-auto">
          <div className="relative">
            <textarea
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              placeholder={question.placeholder}
              className="w-full p-4 pr-14 bg-[var(--bg-dark-card)] border border-[var(--text-muted)]/20 rounded-xl text-[var(--text-light)] placeholder-[var(--text-muted)]/50 focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors resize-none"
              rows={3}
              autoFocus
            />

            {/* Microphone Button */}
            {speechSupported && (
              <button
                type="button"
                onClick={toggleListening}
                className={`absolute right-3 top-3 p-2 rounded-full transition-all ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-[var(--accent)]/10 text-[var(--accent)] hover:bg-[var(--accent)]/20'
                }`}
                title={isListening ? 'Aufnahme stoppen' : 'Spracheingabe starten'}
              >
                {isListening ? (
                  // Stop icon
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <rect x="6" y="6" width="8" height="8" rx="1" />
                  </svg>
                ) : (
                  // Microphone icon
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            )}
          </div>

          {/* Voice hint */}
          {speechSupported && !textValue && !isListening && (
            <p className="text-xs text-[var(--text-muted)]/60 mt-2 text-center flex items-center justify-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                  clipRule="evenodd"
                />
              </svg>
              Tippe oder nutze die Spracheingabe
            </p>
          )}

          {/* Listening indicator */}
          {isListening && (
            <p className="text-xs text-red-400 mt-2 text-center flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              Ich höre zu... Sprich jetzt.
            </p>
          )}

          <div className="mt-4 flex flex-col gap-3">
            <Button onClick={handleTextSubmit} variant="primary" className="w-full">
              Weiter
            </Button>
          </div>
        </div>
      )}

      {/* Dual Slider */}
      {question.type === 'dual-slider' && question.sliderConfig && (
        <div className="max-w-md mx-auto space-y-8">
          {/* IST-Stunden */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[var(--text-muted)] text-sm">
                {question.sliderConfig.label1}
              </label>
              <span className="text-[var(--accent)] font-bold text-lg">
                {currentHours} {question.sliderConfig.unit}
              </span>
            </div>
            <input
              type="range"
              min={question.sliderConfig.min}
              max={question.sliderConfig.max}
              value={currentHours}
              onChange={(e) => setCurrentHours(Number(e.target.value))}
              className="w-full h-2 bg-[var(--bg-dark-card)] rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
            />
            <div className="flex justify-between text-xs text-[var(--text-muted)]/50 mt-1">
              <span>{question.sliderConfig.min}h</span>
              <span>{question.sliderConfig.max}h</span>
            </div>
          </div>

          {/* SOLL-Stunden */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[var(--text-muted)] text-sm">
                {question.sliderConfig.label2}
              </label>
              <span className="text-green-400 font-bold text-lg">
                {desiredHours} {question.sliderConfig.unit}
              </span>
            </div>
            <input
              type="range"
              min={question.sliderConfig.min}
              max={question.sliderConfig.max}
              value={desiredHours}
              onChange={(e) => setDesiredHours(Number(e.target.value))}
              className="w-full h-2 bg-[var(--bg-dark-card)] rounded-lg appearance-none cursor-pointer accent-green-400"
            />
            <div className="flex justify-between text-xs text-[var(--text-muted)]/50 mt-1">
              <span>{question.sliderConfig.min}h</span>
              <span>{question.sliderConfig.max}h</span>
            </div>
          </div>

          {/* Delta-Anzeige */}
          {hoursDelta > 0 && (
            <div className="bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-xl p-4 text-center">
              <p className="text-[var(--text-light)] font-medium">
                <span className="text-[var(--accent)] font-bold text-xl">{hoursDelta} Stunden</span>
                <br />
                <span className="text-sm text-[var(--text-muted)]">
                  pro Woche könntest Du zurückgewinnen
                </span>
              </p>
            </div>
          )}

          <Button onClick={handleDualSliderSubmit} variant="primary" className="w-full">
            Weiter
          </Button>
        </div>
      )}

      {/* Skip Button (erscheint nach 2 Sekunden) */}
      {showSkip && (
        <button
          onClick={onSkip}
          className="mt-6 mx-auto block text-[var(--text-muted)] text-sm hover:text-[var(--text-light)] transition-colors"
        >
          Überspringen
        </button>
      )}
    </div>
  );
}
