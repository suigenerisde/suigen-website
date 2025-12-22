// Fokus-Check Types

export interface FollowUpQuestion {
  id: string; // z.B. "q2_followup"
  text: string;
  type: 'text' | 'dual-slider' | 'single';
  placeholder?: string;
  // Für dual-slider
  sliderConfig?: {
    label1: string; // z.B. "Aktuell arbeitest Du:"
    label2: string; // z.B. "Du möchtest arbeiten:"
    min: number;
    max: number;
    unit: string; // z.B. "Stunden/Woche"
  };
  // Für single choice
  options?: QuestionOption[];
}

export interface Question {
  id: number;
  text: string;
  type: 'single' | 'slider';
  options?: QuestionOption[];
  min?: number;
  max?: number;
  // Follow-up Konfiguration
  followUp?: {
    triggerValues: number[]; // Bei welchen Antwort-Werten wird Follow-up gezeigt
    question: FollowUpQuestion;
  };
}

export interface QuestionOption {
  label: string;
  value: number;
}

export interface FollowUpAnswer {
  questionId: string; // z.B. "q2_followup"
  parentQuestionId: number; // Die Haupt-Frage ID
  textValue?: string; // Für Text-Antworten
  sliderValues?: { current: number; desired: number }; // Für Dual-Slider
  singleValue?: number; // Für Single-Choice
}

export interface Answer {
  questionId: number;
  value: number;
  answeredAt: Date;
  timeSpent: number; // Sekunden
  followUp?: FollowUpAnswer; // Optional: Follow-up Antwort
}

export interface FokusCheckResult {
  score: number;
  maxScore: number;
  category: 'excellent' | 'good' | 'moderate' | 'weak' | 'critical';
  title: string;
  description: string;
}

export interface FokusCheckUser {
  id: string;
  email: string;
  phone?: string; // WhatsApp Nummer (internationales Format ohne +)
  createdAt: Date;
  fokusScore: number | null;
  answers: Answer[] | null;
  source: string;
}

export interface DeliveryData {
  email: string;
  phone?: string;
}

export interface TrackingEvent {
  sessionId: string;
  userId?: string;
  eventType: EventType;
  eventData: Record<string, unknown>;
  createdAt: Date;
}

export type EventType =
  | 'check_started'
  | 'question_viewed'
  | 'question_answered'
  | 'check_completed'
  | 'check_abandoned'
  | 'email_submitted'
  | 'cta_clicked';

// Quiz State
export type QuizStep = 'invite-code' | 'access-request' | 'intro' | 'name' | 'questions' | 'painpoint' | 'email' | 'result';

// Access Request Data (für Zugangsanfragen)
export interface AccessRequestData {
  name: string;
  email: string;
  phone: string;
}

export interface QuizState {
  step: QuizStep;
  currentQuestion: number;
  answers: Answer[];
  email: string;
  sessionId: string;
  startedAt: Date | null;
}
