import type { Answer } from '@/types/fokus-check';

/**
 * Mapping: QuestionId → Stundenverlust pro Woche bei schwacher Ausprägung
 */
const HOUR_LOSS_PER_QUESTION: Record<number, number> = {
  1: 5, // Projekte: Zeitverlust durch Projekt-Hopping
  2: 10, // Störungen: Massiver Verlust durch Unterbrechungen
  3: 4, // Prioritäten: Ineffiziente Aufgabenwahl
  4: 6, // Work-Life-Balance: Erschöpfung → Produktivitätsverlust
  5: 8, // Umsetzung: Prokrastination & Analysis Paralysis
  6: 3, // Tools: Systemkampf statt produktive Arbeit
  7: 4, // Aufgabenverwaltung: Vergessene/doppelte Aufgaben
  8: 10, // Fokuszeit: Fehlende Deep Work = größter Killer
};

/**
 * Labels für jede Frage (für Breakdown)
 */
const QUESTION_LABELS: Record<number, string> = {
  1: 'Projekt-Management',
  2: 'Störungsmanagement',
  3: 'Prioritätensetzung',
  4: 'Work-Life-Balance',
  5: 'Umsetzungsstärke',
  6: 'Tool-Effizienz',
  7: 'Aufgabenverwaltung',
  8: 'Fokuszeit-Schutz',
};

/**
 * Konservativer Stundensatz für Berater/Unternehmer
 */
const HOURLY_RATE = 150;

export interface ROIBreakdown {
  questionId: number;
  label: string;
  score: number;
  hoursLost: number;
  costPerWeek: number;
  costPerMonth: number;
  costPerYear: number;
}

export interface ROICalculation {
  totalHoursLostPerWeek: number;
  totalCostPerWeek: number;
  totalCostPerMonth: number;
  totalCostPerYear: number;
  breakdown: ROIBreakdown[];
  hourlyRate: number;
}

/**
 * Berechnet den ROI-Verlust basierend auf den Quiz-Antworten.
 *
 * Logik:
 * - Nur Antworten mit Score ≤ 3 werden als "schwache Bereiche" gewertet
 * - Jede schwache Antwort hat einen definierten Stundenverlust pro Woche
 * - Kosten werden konservativ mit €150/h kalkuliert
 *
 * @param answers - Die Quiz-Antworten des Users
 * @returns ROI-Kalkulation mit Breakdown nach Bereichen
 */
export function calculateROI(answers: Answer[]): ROICalculation {
  const breakdown: ROIBreakdown[] = [];
  let totalHoursLostPerWeek = 0;

  // Nur schwache Bereiche (Score ≤ 3) berücksichtigen
  const weaknesses = answers.filter((a) => a.value <= 3);

  for (const answer of weaknesses) {
    const hoursLost = HOUR_LOSS_PER_QUESTION[answer.questionId] || 0;
    const costPerWeek = hoursLost * HOURLY_RATE;
    const costPerMonth = costPerWeek * 4.33; // Durchschnittliche Wochen pro Monat
    const costPerYear = costPerWeek * 52;

    breakdown.push({
      questionId: answer.questionId,
      label: QUESTION_LABELS[answer.questionId] || `Frage ${answer.questionId}`,
      score: answer.value,
      hoursLost,
      costPerWeek,
      costPerMonth,
      costPerYear,
    });

    totalHoursLostPerWeek += hoursLost;
  }

  // Sortiere Breakdown nach Kostenimpact (höchster zuerst)
  breakdown.sort((a, b) => b.costPerYear - a.costPerYear);

  const totalCostPerWeek = totalHoursLostPerWeek * HOURLY_RATE;
  const totalCostPerMonth = totalCostPerWeek * 4.33;
  const totalCostPerYear = totalCostPerWeek * 52;

  return {
    totalHoursLostPerWeek,
    totalCostPerWeek,
    totalCostPerMonth,
    totalCostPerYear,
    breakdown,
    hourlyRate: HOURLY_RATE,
  };
}

/**
 * Formatiert eine Zahl als Euro-Betrag (z.B. "15.000 €")
 */
export function formatCurrency(amount: number): string {
  return `${Math.round(amount).toLocaleString('de-DE')} €`;
}

/**
 * Formatiert Stunden (z.B. "12 h")
 */
export function formatHours(hours: number): string {
  return `${hours} h`;
}
