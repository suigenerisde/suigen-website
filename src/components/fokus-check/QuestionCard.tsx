'use client';

import { useState } from 'react';
import type { Question } from '@/types/fokus-check';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (value: number) => void;
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
}: QuestionCardProps) {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [sliderValue, setSliderValue] = useState(3);

  const handleOptionClick = (value: number) => {
    setSelectedValue(value);
    // Kurze Verzögerung für visuelles Feedback
    setTimeout(() => onAnswer(value), 300);
  };

  const handleSliderSubmit = () => {
    onAnswer(sliderValue);
  };

  return (
    <div className="animate-fade-in">
      <p className="text-[var(--text-muted)] text-sm mb-2">
        Frage {questionNumber} von {totalQuestions}
      </p>

      <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-light)] mb-8">
        {question.text}
      </h2>

      {question.type === 'single' && question.options && (
        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className={`w-full p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                selectedValue === option.value
                  ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]'
                  : 'border-[var(--text-muted)]/20 bg-[var(--bg-dark-card)] text-[var(--text-light)] hover:border-[var(--accent)]/50'
              }`}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedValue === option.value
                      ? 'border-[var(--accent)] bg-[var(--accent)]'
                      : 'border-[var(--text-muted)]/40'
                  }`}
                >
                  {selectedValue === option.value && (
                    <span className="w-2 h-2 rounded-full bg-white" />
                  )}
                </span>
                {option.label}
              </span>
            </button>
          ))}
        </div>
      )}

      {question.type === 'slider' && (
        <div className="space-y-6">
          <div className="flex justify-between text-sm text-[var(--text-muted)]">
            <span>Gar nicht zufrieden</span>
            <span>Sehr zufrieden</span>
          </div>

          <input
            type="range"
            min={question.min}
            max={question.max}
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
            className="w-full h-2 bg-[var(--bg-dark-card)] rounded-lg appearance-none cursor-pointer accent-[var(--accent)]"
          />

          <div className="flex justify-between">
            {Array.from({ length: (question.max || 5) - (question.min || 1) + 1 }).map(
              (_, i) => (
                <span
                  key={i}
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${
                    sliderValue === i + (question.min || 1)
                      ? 'bg-[var(--accent)] text-white font-bold'
                      : 'text-[var(--text-muted)]'
                  }`}
                >
                  {i + (question.min || 1)}
                </span>
              )
            )}
          </div>

          <button
            onClick={handleSliderSubmit}
            className="w-full py-4 bg-[var(--accent)] text-white font-bold rounded-full hover:bg-[var(--accent)]/90 transition-colors"
          >
            Weiter
          </button>
        </div>
      )}
    </div>
  );
}
