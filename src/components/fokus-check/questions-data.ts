import type { Question } from '@/types/fokus-check';

export const questions: Question[] = [
  {
    id: 1,
    text: 'Wie viele aktive Projekte hast Du gerade gleichzeitig?',
    type: 'single',
    options: [
      { label: '1-3 Projekte', value: 5 },
      { label: '4-6 Projekte', value: 3 },
      { label: '7+ Projekte', value: 1 },
    ],
  },
  {
    id: 2,
    text: 'Wie oft wirst Du täglich aus Deiner Arbeit gerissen?',
    type: 'single',
    options: [
      { label: 'Selten', value: 5 },
      { label: 'Manchmal', value: 3 },
      { label: 'Ständig', value: 1 },
    ],
    followUp: {
      triggerValues: [3, 1], // Bei "Manchmal" oder "Ständig"
      question: {
        id: 'q2_followup',
        text: 'Was ist Deine häufigste Unterbrechung?',
        type: 'text',
        placeholder: 'z.B. Slack-Nachrichten, Telefonate, Kollegen...',
      },
    },
  },
  {
    id: 3,
    text: 'Kannst Du spontan Deine Top-3-Prioritäten nennen?',
    type: 'single',
    options: [
      { label: 'Ja, klar', value: 5 },
      { label: 'Ungefähr', value: 3 },
      { label: 'Nein', value: 1 },
    ],
  },
  {
    id: 4,
    text: 'Arbeitest Du regelmäßig mehr als 50h/Woche?',
    type: 'single',
    options: [
      { label: 'Selten', value: 5 },
      { label: 'Oft', value: 3 },
      { label: 'Immer', value: 1 },
    ],
    followUp: {
      triggerValues: [3, 1], // Bei "Oft" oder "Immer"
      question: {
        id: 'q4_followup',
        text: 'Wie viele Stunden arbeitest Du - und wie viele möchtest Du?',
        type: 'dual-slider',
        sliderConfig: {
          label1: 'Aktuell arbeitest Du:',
          label2: 'Du möchtest arbeiten:',
          min: 30,
          max: 80,
          unit: 'h/Woche',
        },
      },
    },
  },
  {
    id: 5,
    text: 'Wie zufrieden bist Du mit Deiner Umsetzungsquote?',
    type: 'slider',
    min: 1,
    max: 5,
  },
  {
    id: 6,
    text: 'Wie gut unterstützen Deine Tools und Systeme Deinen Workflow?',
    type: 'single',
    options: [
      { label: 'Perfekt – sie arbeiten für mich', value: 5 },
      { label: 'Mittelmäßig – ich kämpfe manchmal damit', value: 3 },
      { label: 'Schlecht – sie kosten mich Zeit', value: 1 },
    ],
  },
  {
    id: 7,
    text: 'Hast Du einen klaren Überblick über alle Deine Aufgaben und Deadlines?',
    type: 'single',
    options: [
      { label: 'Ja, alles in einem System', value: 5 },
      { label: 'Teilweise, über mehrere Tools verteilt', value: 3 },
      { label: 'Nein, vieles ist nur im Kopf', value: 1 },
    ],
  },
  {
    id: 8,
    text: 'Trainierst Du aktiv Deine Konzentrationsfähigkeit?',
    type: 'single',
    options: [
      { label: 'Ja, regelmäßig (Meditation, Deep Work, etc.)', value: 5 },
      { label: 'Gelegentlich, wenn ich dran denke', value: 3 },
      { label: 'Nein, keine Zeit dafür', value: 1 },
    ],
  },
];

export const MAX_SCORE = 40;

export const getResultCategory = (
  score: number
): { category: 'excellent' | 'good' | 'moderate' | 'weak' | 'critical'; title: string; description: string } => {
  // 5 Kategorien basierend auf 40 Punkten (8 Fragen × 5 Punkte max)
  if (score >= 34) {
    // 85%+ - Excellent
    return {
      category: 'excellent',
      title: 'Fokus-Meister!',
      description:
        'Beeindruckend! Du hast Deinen Fokus im Griff und Deine Systeme arbeiten für Dich. Du gehörst zu den Top 10%, die wissen, worauf es ankommt.',
    };
  }
  if (score >= 27) {
    // 67-84% - Good
    return {
      category: 'good',
      title: 'Guter Fokus!',
      description:
        'Stark! Du konzentrierst Dich auf das Wesentliche. Mit ein paar Optimierungen an Deinen Systemen erreichst Du das nächste Level.',
    };
  }
  if (score >= 20) {
    // 50-66% - Moderate
    return {
      category: 'moderate',
      title: 'Fokus mit Potenzial.',
      description:
        'Du startest viele Dinge, aber bringst nicht alles zu Ende. Mit dem richtigen System und besseren Tools könntest Du deutlich mehr erreichen.',
    };
  }
  if (score >= 13) {
    // 32-49% - Weak
    return {
      category: 'weak',
      title: 'Fokus braucht Arbeit.',
      description:
        'Du verlierst Dich in zu vielen Baustellen. Deine Systeme bremsen Dich aus, statt Dich zu unterstützen. Zeit für einen strukturierten Ansatz.',
    };
  }
  // 0-31% - Critical
  return {
    category: 'critical',
    title: 'Fokus-Alarm!',
    description:
      'Dein Fokus ist im roten Bereich. Zu viele Projekte, keine klaren Prioritäten, überarbeitete Systeme. Ein Fokus-Reset ist dringend nötig.',
  };
};
