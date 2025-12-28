import type { Answer } from '@/types/fokus-check';

export interface FokusType {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  superpower: string;
  killer: string;
  whatYouNeed: string;
}

export const FOKUS_TYPES: Record<string, FokusType> = {
  CHAOTIC_VISIONARY: {
    id: 'CHAOTIC_VISIONARY',
    name: 'Der Chaotische Visionär',
    icon: '🎨',
    color: '#f97316', // orange
    description:
      'Ideen hast Du ohne Ende – aber welche Du zuerst umsetzen sollst? Keine Ahnung. Du startest begeistert in neue Projekte, während drei andere halbfertig rumliegen.',
    superpower:
      'Kreativität und Begeisterungsfähigkeit. Du siehst Chancen, wo andere nur Probleme sehen.',
    killer:
      'Zu viele Bälle gleichzeitig in der Luft. Ohne klare Priorisierung versandelst Du in Deiner eigenen Produktivität.',
    whatYouNeed:
      'Ein System, das Deine Kreativität kanalisiert statt erstickt. 3 Projekte-Maximum + wöchentliche Prioritäten-Review.',
  },
  PERFECTIONIST_PLANNER: {
    id: 'PERFECTIONIST_PLANNER',
    name: 'Der Perfektionistische Planer',
    icon: '📋',
    color: '#3b82f6', // blue
    description:
      'Dein System ist durchdacht, Deine To-Do-Liste makellos gepflegt. Aber irgendwie kommst Du nicht ins Tun – weil noch nicht alles perfekt ist.',
    superpower:
      'Strategisches Denken. Du weißt genau, was wichtig ist und hast einen klaren Plan.',
    killer:
      'Analysis Paralysis. Du planst, optimierst, überarbeitest – statt einfach zu starten.',
    whatYouNeed:
      'Permission to ship. 80% fertig ist besser als 100% perfekt und nie veröffentlicht. "Done > Perfect" als Mantra.',
  },
  REACTIVE_FIREFIGHTER: {
    id: 'REACTIVE_FIREFIGHTER',
    name: 'Der Reaktive Feuerwehrmann',
    icon: '🚒',
    color: '#ef4444', // red
    description:
      'Pling! Slack. Pling! E-Mail. Pling! WhatsApp. Du springst von Krise zu Krise, löschst Feuer – und Deine eigenen Prioritäten bleiben liegen.',
    superpower:
      "Reaktionsgeschwindigkeit. Wenn's brennt, bist Du zur Stelle und löst Probleme blitzschnell.",
    killer:
      'Ständige Unterbrechungen. Dein Tag gehört anderen, nicht Dir. Jede Nachricht fühlt sich dringend an.',
    whatYouNeed:
      'Fokus-Blöcke mit knallharten Grenzen. 2x täglich 90 Minuten offline. Alles andere kann 90 Minuten warten.',
  },
  ANALOG_FIGHTER: {
    id: 'ANALOG_FIGHTER',
    name: 'Der Analoge Kämpfer',
    icon: '🔧',
    color: '#6b7280', // gray
    description:
      'Post-Its, Notizzettel, drei verschiedene Apps – und trotzdem verlierst Du den Überblick. Deine Tools kämpfen gegeneinander statt für Dich.',
    superpower:
      'Hands-on-Mentalität. Du arbeitest hart und scheust keinen Einsatz.',
    killer:
      'Tool-Chaos. Du kämpfst mit Deinem System statt es für Dich arbeiten zu lassen. Aufgaben fallen durchs Raster.',
    whatYouNeed:
      'Ein zentrales System statt 5 halbherzige. EINE Quelle der Wahrheit für alle Aufgaben, Projekte und Prioritäten.',
  },
  WORKAHOLIC_NO_SYSTEM: {
    id: 'WORKAHOLIC_NO_SYSTEM',
    name: 'Der Workaholic ohne System',
    icon: '💪',
    color: '#dc2626', // dark red
    description:
      'Du arbeitest härter als alle anderen – und trotzdem fühlst Du Dich wie im Hamsterrad. Mehr Stunden bringen nicht mehr Ergebnis.',
    superpower: 'Unermüdlicher Einsatz. Wenn Du etwas willst, ziehst Du es durch.',
    killer:
      'Hustle ohne Strategie. Du rennst schnell, aber nicht unbedingt in die richtige Richtung. Erschöpfung statt Durchbruch.',
    whatYouNeed:
      'Leverage statt Maloche. Arbeite an den richtigen 20%, nicht härter an den falschen 80%. Plus: Pausen als Feature, nicht Bug.',
  },
  BALANCED_IMPROVER: {
    id: 'BALANCED_IMPROVER',
    name: 'Der Balancierte Entwickler',
    icon: '⚖️',
    color: '#22c55e', // green
    description:
      'Du hast keine dramatischen Schwachstellen – aber auch noch keine Exzellenz in einzelnen Bereichen. Du bist auf dem Weg, brauchst aber den letzten Schliff.',
    superpower:
      'Selbstreflexion. Du kennst Deine Baustellen und bist bereit, daran zu arbeiten.',
    killer:
      'Fehlende Spezialisierung. Du versuchst überall gleichzeitig besser zu werden – und bleibst mittelmäßig.',
    whatYouNeed:
      'Pick ONE Dimension und mache sie exzellent. Dann die nächste. Fokussierte Verbesserung schlägt diffuse Optimierung.',
  },
};

/**
 * Bestimmt den Fokus-Typ basierend auf den Quiz-Antworten
 */
export function determineFokusType(answers: Answer[]): FokusType {
  const scores = answers.reduce(
    (acc, a) => {
      acc[a.questionId] = a.value;
      return acc;
    },
    {} as Record<number, number>
  );

  // Schwache Bereiche (Score <= 2)
  const weaknesses = answers
    .filter((a) => a.value <= 2)
    .map((a) => a.questionId);

  // Starke Bereiche (Score >= 4)
  const strengths = answers.filter((a) => a.value >= 4).map((a) => a.questionId);

  // Pattern-Matching
  if (weaknesses.includes(1) && weaknesses.includes(3)) {
    // Projekte + Prioritäten schwach
    return FOKUS_TYPES.CHAOTIC_VISIONARY;
  }

  if (weaknesses.includes(5) && strengths.includes(3)) {
    // Umsetzung schwach + Prioritäten stark
    return FOKUS_TYPES.PERFECTIONIST_PLANNER;
  }

  if (weaknesses.includes(2) && weaknesses.includes(8)) {
    // Störungen + Fokus schwach
    return FOKUS_TYPES.REACTIVE_FIREFIGHTER;
  }

  if (weaknesses.includes(6) && weaknesses.includes(7)) {
    // Tools + Aufgaben schwach
    return FOKUS_TYPES.ANALOG_FIGHTER;
  }

  if (weaknesses.includes(4) && scores[5] <= 3) {
    // Balance schwach + Umsetzung mittelmäßig
    return FOKUS_TYPES.WORKAHOLIC_NO_SYSTEM;
  }

  // Default: Balanced Improver (keine extremen Schwächen)
  return FOKUS_TYPES.BALANCED_IMPROVER;
}
