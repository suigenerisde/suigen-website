'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/Button';

interface PainPointQuestionProps {
  userName: string;
  onSubmit: (painPoint: string) => void;
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

export function PainPointQuestion({
  userName,
  onSubmit,
  onSkip,
}: PainPointQuestionProps) {
  const [textValue, setTextValue] = useState('');
  const [showSkip, setShowSkip] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Check for Speech Recognition support
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setSpeechSupported(!!SpeechRecognition);
  }, []);

  // Skip-Button erst nach 3 Sekunden zeigen
  useEffect(() => {
    const timer = setTimeout(() => setShowSkip(true), 3000);
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

      if (finalTranscript) {
        setTextValue((prev) => (prev ? prev + ' ' + finalTranscript : finalTranscript).trim());
      } else if (interimTranscript) {
        setTextValue((prev) => {
          const base = prev.replace(/\s*\[.*\]$/, '');
          return base ? `${base} [${interimTranscript}]` : `[${interimTranscript}]`;
        });
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
      setTextValue((prev) => prev.replace(/\s*\[.*\]$/, ''));
    };

    recognition.onend = () => {
      setIsListening(false);
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

  const handleSubmit = () => {
    const cleanText = textValue.replace(/\s*\[.*\]$/, '').trim();
    if (cleanText) {
      onSubmit(cleanText);
    } else {
      onSkip();
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Progress hint */}
      <div className="flex justify-center mb-4">
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-medium rounded-full border border-[var(--accent)]/20">
          <span>💬</span>
          Letzte Frage - hilft uns, Dir besser zu helfen
        </span>
      </div>

      <h3 className="text-xl md:text-2xl font-bold text-[var(--text-light)] text-center mb-2">
        {userName ? `${userName}, eine letzte Frage:` : 'Eine letzte Frage:'}
      </h3>

      <h2 className="text-2xl md:text-3xl font-bold text-[var(--accent)] text-center mb-6">
        Was bremst Dich gerade am meisten aus?
      </h2>

      <p className="text-[var(--text-muted)] text-center mb-8 max-w-md mx-auto">
        Welches Problem oder welche Herausforderung kostet Dich aktuell die meiste Energie?
      </p>

      {/* Text Input with Voice */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <textarea
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            placeholder="Z.B. Ich verzettele mich ständig in E-Mails und komme nicht zu meinen eigentlichen Aufgaben..."
            className="w-full p-4 pr-14 bg-[var(--bg-dark-card)] border border-[var(--text-muted)]/20 rounded-xl text-[var(--text-light)] placeholder-[var(--text-muted)]/50 focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors resize-none"
            rows={4}
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
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <rect x="6" y="6" width="8" height="8" rx="1" />
                </svg>
              ) : (
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

        <div className="mt-6 flex flex-col gap-3">
          <Button onClick={handleSubmit} variant="primary" className="w-full">
            Weiter zum Ergebnis
          </Button>
        </div>
      </div>

      {/* Skip Button */}
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
