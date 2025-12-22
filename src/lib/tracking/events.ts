import { supabase, isSupabaseConfigured } from '../supabase/client';
import type { EventType, Answer, FokusCheckResult } from '@/types/fokus-check';

// n8n Webhook URL für PDF + WhatsApp Versand
const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

// Session ID generieren (bleibt für die gesamte Session)
const generateSessionId = (): string => {
  if (typeof window !== 'undefined') {
    let sessionId = sessionStorage.getItem('fokus_check_session');
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem('fokus_check_session', sessionId);
    }
    return sessionId;
  }
  return crypto.randomUUID();
};

let currentSessionId: string | null = null;

export const getSessionId = (): string => {
  if (!currentSessionId) {
    currentSessionId = generateSessionId();
  }
  return currentSessionId;
};

// Event tracking
export const trackEvent = async (
  eventType: EventType,
  eventData: Record<string, unknown> = {}
): Promise<void> => {
  if (!isSupabaseConfigured()) {
    console.log('[Tracking disabled]', eventType, eventData);
    return;
  }

  try {
    const { error } = await supabase!.from('fokus_check_events').insert({
      session_id: getSessionId(),
      event_type: eventType,
      event_data: eventData,
    });

    if (error) {
      console.error('Tracking error:', error);
    }
  } catch (err) {
    console.error('Tracking failed:', err);
  }
};

// Spezifische Event-Funktionen
export const trackCheckStarted = () =>
  trackEvent('check_started', {
    timestamp: new Date().toISOString(),
    userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
  });

export const trackQuestionViewed = (questionId: number) =>
  trackEvent('question_viewed', {
    questionId,
    timestamp: new Date().toISOString(),
  });

export const trackQuestionAnswered = (
  questionId: number,
  value: number,
  timeSpent: number
) =>
  trackEvent('question_answered', {
    questionId,
    value,
    timeSpent,
    timestamp: new Date().toISOString(),
  });

export const trackCheckCompleted = (score: number, answers: Answer[]) =>
  trackEvent('check_completed', {
    score,
    answers: answers.map((a) => ({
      questionId: a.questionId,
      value: a.value,
      timeSpent: a.timeSpent,
    })),
    timestamp: new Date().toISOString(),
  });

export const trackCheckAbandoned = (
  lastQuestionId: number,
  completedQuestions: number
) =>
  trackEvent('check_abandoned', {
    lastQuestionId,
    completedQuestions,
    timestamp: new Date().toISOString(),
  });

export const trackEmailSubmitted = (email: string, hasPhone: boolean = false) =>
  trackEvent('email_submitted', {
    emailDomain: email.split('@')[1],
    hasPhone,
    timestamp: new Date().toISOString(),
  });

export const trackCtaClicked = (ctaType: string, destination: string) =>
  trackEvent('cta_clicked', {
    ctaType,
    destination,
    timestamp: new Date().toISOString(),
  });

// User erstellen/verknüpfen
export const saveUserAndScore = async (
  email: string,
  score: number,
  answers: Answer[],
  phone?: string,
  name?: string,
  painPoint?: string
): Promise<string | null> => {
  if (!isSupabaseConfigured()) {
    console.log('[Supabase disabled] Would save user:', email, score, phone, name, painPoint);
    return null;
  }

  try {
    // User erstellen oder updaten
    const userData: Record<string, unknown> = {
      email,
      fokus_score: score,
      answers: answers.map((a) => ({
        questionId: a.questionId,
        value: a.value,
        timeSpent: a.timeSpent,
      })),
    };

    // Telefonnummer nur hinzufügen wenn vorhanden
    if (phone) {
      userData.phone = phone;
    }

    // Name nur hinzufügen wenn vorhanden
    if (name) {
      userData.name = name;
    }

    // Pain Point als Metadaten speichern
    if (painPoint) {
      userData.pain_point = painPoint;
    }

    const { data, error } = await supabase!
      .from('fokus_check_users')
      .upsert(userData, { onConflict: 'email' })
      .select('id')
      .single();

    if (error) {
      console.error('Save user error:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
      return null;
    }

    // Events mit User verknüpfen
    if (data?.id) {
      await supabase!
        .from('fokus_check_events')
        .update({ user_id: data.id })
        .eq('session_id', getSessionId());
    }

    return data?.id || null;
  } catch (err) {
    console.error('Save user failed:', err);
    return null;
  }
};

// n8n Webhook für PDF-Generierung und WhatsApp-Versand triggern
export const triggerPdfAndWhatsApp = async (
  email: string,
  phone: string | undefined,
  userName: string,
  result: FokusCheckResult,
  answers: Answer[],
  painPoint?: string
): Promise<boolean> => {
  if (!N8N_WEBHOOK_URL) {
    console.log('[n8n Webhook disabled] Would trigger PDF/WhatsApp:', { email, phone, userName, painPoint });
    return false;
  }

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        phone: phone || null,
        userName,
        painPoint: painPoint || null,
        result: {
          score: result.score,
          maxScore: result.maxScore,
          category: result.category,
          title: result.title,
          description: result.description,
        },
        answers: answers.map((a) => ({
          questionId: a.questionId,
          value: a.value,
          timeSpent: a.timeSpent,
        })),
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      console.error('n8n Webhook error:', response.status, await response.text());
      return false;
    }

    const data = await response.json();
    console.log('n8n Webhook success:', data);
    return true;
  } catch (err) {
    console.error('n8n Webhook failed:', err);
    return false;
  }
};
