'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Answer, QuizStep, FokusCheckResult, DeliveryData, FollowUpAnswer, AccessRequestData } from '@/types/fokus-check';
import { questions, MAX_SCORE, getResultCategory } from './questions-data';
import { ProgressIndicator } from './ProgressIndicator';
import { QuestionCard } from './QuestionCard';
import { NameCapture } from './NameCapture';
import { DeliveryChoice } from './DeliveryChoice';
import { ResultDisplay } from './ResultDisplay';
import { ExitIntentPopup } from './ExitIntentPopup';
import { FollowUpQuestion } from './FollowUpQuestion';
import { PainPointQuestion } from './PainPointQuestion';
import { ContinueQuizPrompt } from './ContinueQuizPrompt';
import { InviteCodeCapture } from './InviteCodeCapture';
import { AccessRequestForm } from './AccessRequestForm';
import { useQuizPersistence } from './useQuizPersistence';
import { Button } from '@/components/ui/Button';
import {
  trackCheckStarted,
  trackQuestionViewed,
  trackQuestionAnswered,
  trackCheckCompleted,
  trackEmailSubmitted,
  trackCtaClicked,
  saveUserAndScore,
  triggerPdfAndWhatsApp,
} from '@/lib/tracking/events';

// Webhook URL für Zugangsanfragen
const ACCESS_REQUEST_WEBHOOK = 'https://n8n.suimation.de/webhook/fokus-check-access-request';

export function FokusCheckQuiz() {
  const [step, setStep] = useState<QuizStep>('invite-code');
  const [userName, setUserName] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [questionStartTime, setQuestionStartTime] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<FokusCheckResult | null>(null);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [pendingAnswer, setPendingAnswer] = useState<Answer | null>(null);
  const [showContinuePrompt, setShowContinuePrompt] = useState(false);
  const [painPoint, setPainPoint] = useState('');

  // Persistence hook
  const { restoredState, saveProgress, clearProgress, dismissRestoredState } = useQuizPersistence();

  // Check for saved progress on mount
  useEffect(() => {
    if (restoredState && restoredState.step !== 'intro' && restoredState.step !== 'result') {
      setShowContinuePrompt(true);
    }
  }, [restoredState]);

  // Save progress whenever state changes (but only during active quiz)
  useEffect(() => {
    if (step !== 'intro' && step !== 'result') {
      saveProgress({
        step,
        userName,
        currentQuestion,
        answers,
      });
    }
  }, [step, userName, currentQuestion, answers, saveProgress]);

  // Track question view
  useEffect(() => {
    if (step === 'questions' && currentQuestion < questions.length) {
      trackQuestionViewed(questions[currentQuestion].id);
      setQuestionStartTime(new Date());
    }
  }, [step, currentQuestion]);

  // Handle continuing from saved progress
  const handleContinue = useCallback(() => {
    if (restoredState) {
      setStep(restoredState.step);
      setUserName(restoredState.userName);
      setCurrentQuestion(restoredState.currentQuestion);
      setAnswers(restoredState.answers);
      setShowContinuePrompt(false);
      dismissRestoredState();
    }
  }, [restoredState, dismissRestoredState]);

  // Handle starting fresh
  const handleStartFresh = useCallback(() => {
    clearProgress();
    setShowContinuePrompt(false);
    dismissRestoredState();
    setStep('intro');
    setUserName('');
    setCurrentQuestion(0);
    setAnswers([]);
  }, [clearProgress, dismissRestoredState]);

  // Handle valid invite code
  const handleValidCode = useCallback(() => {
    setStep('intro');
  }, []);

  // Handle request access (show form)
  const handleRequestAccess = useCallback(() => {
    setStep('access-request');
  }, []);

  // Handle back to invite code
  const handleBackToInviteCode = useCallback(() => {
    setStep('invite-code');
  }, []);

  // Handle access request submission
  const handleAccessRequestSubmit = useCallback(async (data: AccessRequestData) => {
    // Trigger n8n webhook für WhatsApp-Benachrichtigung
    const response = await fetch(ACCESS_REQUEST_WEBHOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        requestedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit access request');
    }
  }, []);

  const handleStart = useCallback(() => {
    trackCheckStarted();
    setStep('name');
  }, []);

  const handleNameSubmit = useCallback((name: string) => {
    setUserName(name);
    setStep('questions');
  }, []);

  const handleAnswer = useCallback(
    (value: number) => {
      const timeSpent = questionStartTime
        ? Math.round((new Date().getTime() - questionStartTime.getTime()) / 1000)
        : 0;

      const answer: Answer = {
        questionId: questions[currentQuestion].id,
        value,
        answeredAt: new Date(),
        timeSpent,
      };

      trackQuestionAnswered(answer.questionId, value, timeSpent);

      // Check if follow-up is triggered
      const currentQ = questions[currentQuestion];
      if (currentQ.followUp && currentQ.followUp.triggerValues.includes(value)) {
        // Show follow-up, store answer temporarily
        setPendingAnswer(answer);
        setShowFollowUp(true);
        return;
      }

      // No follow-up - proceed normally
      proceedWithAnswer(answer);
    },
    [currentQuestion, questionStartTime]
  );

  const proceedWithAnswer = useCallback(
    (answer: Answer) => {
      const newAnswers = [...answers, answer];
      setAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // All questions answered - go to pain point question
        const score = newAnswers.reduce((sum, a) => sum + a.value, 0);
        const category = getResultCategory(score);

        setResult({
          score,
          maxScore: MAX_SCORE,
          ...category,
        });

        trackCheckCompleted(score, newAnswers);
        setStep('painpoint');
      }
    },
    [currentQuestion, answers]
  );

  const handleFollowUpSubmit = useCallback(
    (followUpAnswer: FollowUpAnswer) => {
      if (pendingAnswer) {
        // Add follow-up answer to main answer
        const answerWithFollowUp: Answer = {
          ...pendingAnswer,
          followUp: followUpAnswer,
        };
        setShowFollowUp(false);
        setPendingAnswer(null);
        proceedWithAnswer(answerWithFollowUp);
      }
    },
    [pendingAnswer, proceedWithAnswer]
  );

  const handleFollowUpSkip = useCallback(() => {
    if (pendingAnswer) {
      // Continue without follow-up
      setShowFollowUp(false);
      setPendingAnswer(null);
      proceedWithAnswer(pendingAnswer);
    }
  }, [pendingAnswer, proceedWithAnswer]);

  const handlePainPointSubmit = useCallback((text: string) => {
    setPainPoint(text);
    setStep('email');
  }, []);

  const handlePainPointSkip = useCallback(() => {
    setPainPoint('');
    setStep('email');
  }, []);

  const handleBack = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      // Remove last answer
      setAnswers(answers.slice(0, -1));
    } else {
      // Back to name input
      setStep('name');
    }
  }, [currentQuestion, answers]);

  const handleDeliverySubmit = useCallback(
    async (data: DeliveryData) => {
      setIsLoading(true);

      try {
        trackEmailSubmitted(data.email, !!data.phone);

        if (result) {
          // Save user to Supabase (painPoint wird als Teil der answers/metadata gespeichert)
          await saveUserAndScore(data.email, result.score, answers, data.phone, userName, painPoint);

          // Trigger n8n workflow for PDF + WhatsApp
          // Runs asynchronously in background - we don't wait for it
          triggerPdfAndWhatsApp(data.email, data.phone, userName, result, answers, painPoint)
            .then((success) => {
              if (success) {
                console.log('PDF/WhatsApp workflow triggered successfully');
              }
            })
            .catch((err) => {
              console.error('PDF/WhatsApp workflow error:', err);
            });
        }

        // Clear saved progress on completion
        clearProgress();
        setStep('result');
      } catch (error) {
        console.error('Error saving user:', error);
        // Still show result even on error
        clearProgress();
        setStep('result');
      } finally {
        setIsLoading(false);
      }
    },
    [result, answers, userName, painPoint, clearProgress]
  );

  const handleCtaClick = useCallback(() => {
    trackCtaClicked('erstgespraech', '/kontakt');
  }, []);

  // Save and leave callback for ExitIntentPopup
  const handleSaveAndLeave = useCallback(() => {
    saveProgress({
      step,
      userName,
      currentQuestion,
      answers,
    });
  }, [saveProgress, step, userName, currentQuestion, answers]);

  // Show continue prompt if saved progress exists
  if (showContinuePrompt && restoredState) {
    return (
      <div className="w-full max-w-xl mx-auto">
        <ContinueQuizPrompt
          questionNumber={restoredState.currentQuestion + 1}
          totalQuestions={questions.length}
          userName={restoredState.userName}
          onContinue={handleContinue}
          onStartFresh={handleStartFresh}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Invite Code */}
      {step === 'invite-code' && (
        <InviteCodeCapture
          onValidCode={handleValidCode}
          onRequestAccess={handleRequestAccess}
        />
      )}

      {/* Access Request Form */}
      {step === 'access-request' && (
        <AccessRequestForm
          onSubmit={handleAccessRequestSubmit}
          onBack={handleBackToInviteCode}
        />
      )}

      {/* Intro */}
      {step === 'intro' && (
        <div className="animate-fade-in">
          <span className="inline-block px-4 py-2 bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-bold rounded uppercase tracking-widest mb-8 border border-[var(--accent)]/20">
            Dein Fokus-Score
          </span>

          <h1 className="headline-hero text-[var(--text-light)] mb-6">
            Wie fokussiert
            <br />
            <span className="text-[var(--accent)] text-glow">bist Du wirklich?</span>
          </h1>

          <p className="body-text mb-8 max-w-2xl">
            Finde in 3 Minuten heraus, wie gut Du Dich auf das Wesentliche konzentrierst.
            8 Fragen, sofort Ergebnis.
          </p>

          {/* Social Proof */}
          <div className="bg-[var(--accent)]/5 border border-[var(--accent)]/20 rounded-2xl p-4 mb-8">
            <p className="text-[var(--text-light)] font-bold flex items-center gap-2">
              <span className="text-xl">🔥</span>
              1.247+ Unternehmer haben ihren Fokus-Score bereits berechnet
            </p>
            <p className="text-[var(--text-muted)] text-sm mt-1">
              Durchschnittliche Produktivitätssteigerung nach Fokus-Audit: +37%
            </p>
          </div>

          <Button onClick={handleStart} variant="primary" size="lg">
            Meinen Fokus-Score berechnen
          </Button>

          {/* WhatsApp Bonus Teaser */}
          <div className="mt-6 bg-gradient-to-r from-[var(--accent)]/10 to-transparent border-l-4 border-[var(--accent)] p-4 rounded-r-lg">
            <p className="text-[var(--text-light)] font-medium flex items-center gap-2">
              <span className="text-lg">🎁</span>
              Bonus: Detaillierter PDF-Report per WhatsApp
            </p>
            <p className="text-[var(--text-muted)] text-sm mt-1">
              Mit persönlicher Analyse und konkreten Handlungsempfehlungen
            </p>
          </div>

          <div className="flex flex-wrap gap-4 md:gap-6 mt-8 text-[var(--text-muted)] text-sm">
            <span className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-[var(--accent)]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              8 Fragen
            </span>
            <span className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-[var(--accent)]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              3 Minuten
            </span>
            <span className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-[var(--accent)]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Sofort Ergebnis
            </span>
            <span className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-[var(--accent)]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              100% kostenlos
            </span>
          </div>
        </div>
      )}

      {/* Name Capture */}
      {step === 'name' && (
        <NameCapture onSubmit={handleNameSubmit} />
      )}

      {/* Questions */}
      {step === 'questions' && !showFollowUp && (
        <div>
          <ProgressIndicator
            current={currentQuestion}
            total={questions.length}
          />
          <QuestionCard
            key={currentQuestion}
            question={questions[currentQuestion]}
            questionNumber={currentQuestion + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
          />

          {/* Back Button */}
          <button
            onClick={handleBack}
            className="mt-8 flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-light)] transition-colors mx-auto"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Zurück
          </button>
        </div>
      )}

      {/* Follow-up Question */}
      {step === 'questions' && showFollowUp && questions[currentQuestion].followUp && (
        <div>
          <ProgressIndicator
            current={currentQuestion}
            total={questions.length}
          />
          <FollowUpQuestion
            question={questions[currentQuestion].followUp!.question}
            parentQuestionId={questions[currentQuestion].id}
            onSubmit={handleFollowUpSubmit}
            onSkip={handleFollowUpSkip}
          />
        </div>
      )}

      {/* Pain Point Question */}
      {step === 'painpoint' && (
        <PainPointQuestion
          userName={userName}
          onSubmit={handlePainPointSubmit}
          onSkip={handlePainPointSkip}
        />
      )}

      {/* Delivery Choice (E-Mail + optional Phone) */}
      {step === 'email' && (
        <DeliveryChoice onSubmit={handleDeliverySubmit} isLoading={isLoading} />
      )}

      {/* Result */}
      {step === 'result' && result && (
        <ResultDisplay result={result} userName={userName} answers={answers} onCtaClick={handleCtaClick} />
      )}

      {/* Exit Intent Popup */}
      <ExitIntentPopup
        onContinue={step === 'intro' ? handleStart : () => {}}
        currentStep={step}
        questionNumber={currentQuestion + 1}
        onSaveAndLeave={handleSaveAndLeave}
      />
    </div>
  );
}
