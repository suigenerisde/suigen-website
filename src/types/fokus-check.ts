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

/**
 * The calculated result of a Fokus-Check assessment.
 *
 * Contains the numerical score, category classification, and localized
 * title/description for display to the user.
 */
export interface FokusCheckResult {
  /** The achieved score (number of points earned) */
  score: number;
  /** The maximum possible score */
  maxScore: number;
  /** Result category based on score percentage */
  category: 'excellent' | 'good' | 'moderate' | 'weak' | 'critical';
  /** Localized title for the result (e.g., "Gut aufgestellt") */
  title: string;
  /** Localized description explaining the result */
  description: string;
}

/**
 * Request body for the PDF generation API endpoint.
 *
 * This interface defines the expected payload for POST requests to
 * `/api/fokus-check/generate-pdf`. It includes the quiz results and
 * optional personalization data.
 *
 * @example
 * ```typescript
 * const request: GeneratePDFRequest = {
 *   result: {
 *     score: 35,
 *     maxScore: 50,
 *     category: 'good',
 *     title: 'Gut aufgestellt',
 *     description: 'Du hast bereits einen guten Fokus...'
 *   },
 *   answers: [
 *     { questionId: 1, value: 4, answeredAt: new Date(), timeSpent: 8 }
 *   ],
 *   userName: 'Max Mustermann',  // optional
 *   painPoint: 'Zeitmanagement'  // optional
 * };
 * ```
 *
 * @see {@link FokusCheckResult} for the result object structure
 * @see {@link Answer} for the answer object structure
 * @see docs/api/fokus-check-generate-pdf.md for full API documentation
 */
export interface GeneratePDFRequest {
  /**
   * The calculated Fokus-Check result containing score, category, title, and description.
   * This is required and determines the content and styling of the PDF report.
   */
  result: FokusCheckResult;

  /**
   * Array of user answers to all quiz questions.
   * Each answer includes the question ID, selected value, timestamp, and time spent.
   * Optional follow-up answers are included when triggered by specific responses.
   */
  answers: Answer[];

  /**
   * Optional user name for personalization in the PDF report.
   * When provided, the PDF will include a personalized greeting.
   * @optional
   */
  userName?: string;

  /**
   * Optional pain point or challenge text entered by the user.
   * This free-text field captures what the user identified as their main challenge.
   * @optional
   */
  painPoint?: string;
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
