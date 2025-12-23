import { supabase, isSupabaseConfigured } from '../supabase/client';
import type { EventType, Answer, FokusCheckResult, QuizStep } from '@/types/fokus-check';

// n8n Webhook URLs
const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
const N8N_CONTINUE_LATER_WEBHOOK = 'https://n8n.suimation.de/webhook/fokus-check-continue-later';

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

// Progress State für "Später weitermachen"
interface ProgressState {
  step: QuizStep;
  userName: string;
  currentQuestion: number;
  answers: Answer[];
}

// Fortschritt in Supabase speichern und Magic Link senden
export const saveProgressAndSendLink = async (
  state: ProgressState,
  contact: { email?: string; phone?: string }
): Promise<{ success: boolean; token?: string }> => {
  if (!isSupabaseConfigured()) {
    console.log('[Supabase disabled] Would save progress:', state, contact);
    return { success: false };
  }

  try {
    // Generiere eindeutigen Token
    const token = crypto.randomUUID();

    // State für Supabase vorbereiten (Dates zu Strings)
    const stateForDb = {
      step: state.step,
      userName: state.userName,
      currentQuestion: state.currentQuestion,
      answers: state.answers.map((a) => ({
        questionId: a.questionId,
        value: a.value,
        timeSpent: a.timeSpent,
        answeredAt: a.answeredAt instanceof Date ? a.answeredAt.toISOString() : a.answeredAt,
        followUp: a.followUp,
      })),
    };

    // In Supabase speichern
    const { error } = await supabase!.from('fokus_check_progress').insert({
      token,
      state: stateForDb,
      email: contact.email || null,
      phone: contact.phone || null,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 Tage
    });

    if (error) {
      console.error('Save progress error:', error);
      return { success: false };
    }

    // n8n Webhook für Link-Versand triggern
    try {
      const response = await fetch(N8N_CONTINUE_LATER_WEBHOOK, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          email: contact.email || null,
          phone: contact.phone || null,
          userName: state.userName,
          currentQuestion: state.currentQuestion + 1,
          totalQuestions: 8,
          continueUrl: `https://suigen.de/fokus-check?continue=${token}`,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        console.error('Continue-later webhook error:', response.status);
      }
    } catch (webhookErr) {
      console.error('Continue-later webhook failed:', webhookErr);
      // Nicht als Fehler behandeln - der Link ist trotzdem gespeichert
    }

    return { success: true, token };
  } catch (err) {
    console.error('Save progress failed:', err);
    return { success: false };
  }
};

// Fortschritt aus Supabase laden
export const loadProgress = async (
  token: string
): Promise<{ success: boolean; state?: ProgressState }> => {
  if (!isSupabaseConfigured()) {
    console.log('[Supabase disabled] Would load progress for token:', token);
    return { success: false };
  }

  try {
    const { data, error } = await supabase!
      .from('fokus_check_progress')
      .select('state, expires_at')
      .eq('token', token)
      .single();

    if (error || !data) {
      console.error('Load progress error:', error);
      return { success: false };
    }

    // Prüfen ob abgelaufen
    if (new Date(data.expires_at) < new Date()) {
      console.log('Progress token expired');
      return { success: false };
    }

    // State rekonstruieren
    const state = data.state as ProgressState;

    // Dates zurück konvertieren
    state.answers = state.answers.map((a) => ({
      ...a,
      answeredAt: new Date(a.answeredAt as unknown as string),
    }));

    return { success: true, state };
  } catch (err) {
    console.error('Load progress failed:', err);
    return { success: false };
  }
};

// Fortschritt löschen (nach erfolgreichem Abschluss)
export const deleteProgress = async (token: string): Promise<void> => {
  if (!isSupabaseConfigured()) return;

  try {
    await supabase!.from('fokus_check_progress').delete().eq('token', token);
  } catch (err) {
    console.error('Delete progress failed:', err);
  }
};
