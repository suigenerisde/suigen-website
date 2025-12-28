'use client';

import Link from 'next/link';
import type { FokusCheckResult, Answer } from '@/types/fokus-check';
import { MAX_SCORE } from './questions-data';

interface ResultDisplayProps {
  result: FokusCheckResult;
  userName: string;
  answers: Answer[];
  onCtaClick: () => void;
}

const categoryColors = {
  excellent: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    glow: 'shadow-emerald-500/20',
  },
  good: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    text: 'text-green-400',
    glow: 'shadow-green-500/20',
  },
  moderate: {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    text: 'text-yellow-400',
    glow: 'shadow-yellow-500/20',
  },
  weak: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    text: 'text-orange-400',
    glow: 'shadow-orange-500/20',
  },
  critical: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    text: 'text-red-400',
    glow: 'shadow-red-500/20',
  },
};

// Scorebasierte CTA-Texte
const categoryCtas = {
  excellent: {
    headline: 'Bereit für Elite-Performance?',
    subline: 'Du bist bereits top. Im Fokus-Audit finden wir die letzten 20% für maximale Wirkung.',
    buttonText: 'System optimieren lassen',
    secondaryText: 'Direkt zum Fokus-Audit',
    secondaryLink: '/fokus-audit',
  },
  good: {
    headline: 'Bereit für das nächste Level?',
    subline: 'Mit gezielten Optimierungen erreichst Du die Top 10%. Lass uns gemeinsam schauen, wo.',
    buttonText: 'Fokus-Strategie besprechen',
    secondaryText: 'Mehr über das Fokus-Audit',
    secondaryLink: '/fokus-audit',
  },
  moderate: {
    headline: 'Da geht noch mehr!',
    subline: 'Mit dem richtigen System und besseren Tools könntest Du deutlich mehr erreichen.',
    buttonText: 'Kostenloses Erstgespräch',
    secondaryText: 'Wie das Fokus-Audit hilft',
    secondaryLink: '/fokus-audit',
  },
  weak: {
    headline: 'Zeit für Veränderung.',
    subline: 'Deine Systeme bremsen Dich aus. Im Erstgespräch zeige ich Dir, wie Du das änderst.',
    buttonText: 'Jetzt Klarheit schaffen',
    secondaryText: 'Das Fokus-Audit kennenlernen',
    secondaryLink: '/fokus-audit',
  },
  critical: {
    headline: 'Lass uns das retten.',
    subline: 'Dein Fokus braucht dringend Aufmerksamkeit. Ein Reset kann Wunder wirken.',
    buttonText: 'Fokus-Rettung starten',
    secondaryText: 'Wie ein Fokus-Reset funktioniert',
    secondaryLink: '/fokus-audit',
  },
};

// Fokus-Bereiche mit Analyse-Daten
interface FokusBereich {
  id: number;
  name: string;
  icon: string;
  problem: {
    1: string; // Schlechteste Antwort
    3: string; // Mittlere Antwort
  };
  quickwin: string;
  category: 'projekte' | 'unterbrechungen' | 'prioritaeten' | 'arbeitszeit' | 'umsetzung' | 'tools' | 'aufgaben' | 'konzentration';
}

const fokusBereiche: FokusBereich[] = [
  {
    id: 1,
    name: 'Projekte',
    icon: '📁',
    category: 'projekte',
    problem: {
      1: 'Zu viele parallele Projekte (7+)',
      3: 'Grenzwertig viele Projekte (4-6)',
    },
    quickwin: 'Wähle heute 1 Projekt, das Du komplett abschließt, bevor Du ein neues startest.',
  },
  {
    id: 2,
    name: 'Störungen',
    icon: '🔔',
    category: 'unterbrechungen',
    problem: {
      1: 'Ständige Unterbrechungen zerstören Deinen Flow',
      3: 'Regelmäßige Unterbrechungen kosten Produktivität',
    },
    quickwin: 'Führe 2 Stunden "Deep Work" täglich ein - Handy aus, Slack zu, Tür zu.',
  },
  {
    id: 3,
    name: 'Prioritäten',
    icon: '🎯',
    category: 'prioritaeten',
    problem: {
      1: 'Keine klaren Top-3-Prioritäten definiert',
      3: 'Prioritäten sind unklar oder wechseln häufig',
    },
    quickwin: 'Schreibe JETZT Deine Top 3 Prioritäten auf und hänge sie sichtbar auf.',
  },
  {
    id: 4,
    name: 'Balance',
    icon: '⏰',
    category: 'arbeitszeit',
    problem: {
      1: 'Chronische Überarbeitung (50h+/Woche)',
      3: 'Regelmäßige Überstunden belasten Dich',
    },
    quickwin: 'Setze einen harten Feierabend - Dein Körper und Geist brauchen Regeneration.',
  },
  {
    id: 5,
    name: 'Umsetzung',
    icon: '✅',
    category: 'umsetzung',
    problem: {
      1: 'Sehr unzufrieden mit Deiner Umsetzungsquote',
      3: 'Umsetzungsquote könnte besser sein',
    },
    quickwin: 'Nutze die 2-Minuten-Regel: Alles unter 2 Min. sofort erledigen.',
  },
  {
    id: 6,
    name: 'Tools',
    icon: '🛠️',
    category: 'tools',
    problem: {
      1: 'Tools kosten mehr Zeit als sie sparen',
      3: 'Tools funktionieren, aber nicht optimal',
    },
    quickwin: 'Identifiziere Dein nervigste Tool und finde diese Woche eine bessere Alternative.',
  },
  {
    id: 7,
    name: 'Aufgaben',
    icon: '📋',
    category: 'aufgaben',
    problem: {
      1: 'Aufgaben nur im Kopf - kein System',
      3: 'Aufgaben über mehrere Tools verstreut',
    },
    quickwin: 'Sammle ALLE Aufgaben in einem einzigen System - heute noch.',
  },
  {
    id: 8,
    name: 'Fokus',
    icon: '🧠',
    category: 'konzentration',
    problem: {
      1: 'Keine Zeit für Konzentrationstraining',
      3: 'Gelegentliches Training, aber nicht konsequent',
    },
    quickwin: '5 Minuten Meditation morgens - jeden Tag. Starte mit einer App wie Headspace.',
  },
];

// Analysiere Schwachstellen basierend auf Antworten
function analyzeWeaknesses(answers: Answer[]): Array<FokusBereich & { score: number }> {
  const weaknesses: Array<FokusBereich & { score: number }> = [];

  answers.forEach((answer) => {
    const bereich = fokusBereiche.find((b) => b.id === answer.questionId);
    if (bereich && answer.value <= 3) {
      // Nur schwache Antworten (1 oder 3)
      weaknesses.push({
        ...bereich,
        score: answer.value,
      });
    }
  });

  // Sortiere nach Score (schlechteste zuerst)
  return weaknesses.sort((a, b) => a.score - b.score).slice(0, 3);
}

// Analysiere Stärken
function analyzeStrengths(answers: Answer[]): string[] {
  const strengths: string[] = [];

  answers.forEach((answer) => {
    if (answer.value === 5) {
      const bereich = fokusBereiche.find((b) => b.id === answer.questionId);
      if (bereich) {
        strengths.push(bereich.name);
      }
    }
  });

  return strengths.slice(0, 3);
}

export function ResultDisplay({ result, userName, answers, onCtaClick }: ResultDisplayProps) {
  const colors = categoryColors[result.category];
  const cta = categoryCtas[result.category];

  return (
    <div className="animate-fade-in text-center">
      <h2 className="text-xl text-[var(--text-muted)] mb-4">
        {userName ? `${userName}, hier ist Dein Fokus-Score` : 'Dein Fokus-Score'}
      </h2>

      {/* Score Circle */}
      <div
        className={`inline-flex flex-col items-center justify-center w-40 h-40 rounded-full ${colors.bg} ${colors.border} border-4 mb-6 shadow-lg ${colors.glow}`}
      >
        <span className={`text-5xl font-bold ${colors.text}`}>{result.score}</span>
        <span className="text-[var(--text-muted)] text-sm">von {MAX_SCORE}</span>
      </div>

      {/* Title */}
      <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${colors.text}`}>{result.title}</h3>

      {/* Description */}
      <p className="text-[var(--text-muted)] text-lg mb-8 max-w-md mx-auto">{result.description}</p>

      {/* Teaser für detaillierte Analyse */}
      <div className="bg-gradient-to-r from-[var(--accent)]/10 to-transparent border-l-4 border-[var(--accent)] p-4 rounded-r-lg mb-8 text-left">
        <p className="text-[var(--text-light)] font-medium flex items-center gap-2">
          <span className="text-lg">📧</span>
          Deine detaillierte Analyse ist unterwegs!
        </p>
        <p className="text-[var(--text-muted)] text-sm mt-1">
          Mit konkreten Handlungsempfehlungen und Deinem persönlichen Fokus-Report.
        </p>
      </div>

      {/* Fokus-Bereiche Übersicht */}
      <div className="bg-[var(--bg-dark-card)] rounded-3xl p-6 mb-8 border border-[var(--text-muted)]/10">
        <h4 className="text-lg font-bold text-[var(--text-light)] mb-4 flex items-center gap-2">
          <span className="text-xl">📊</span>
          Deine 8 Fokus-Bereiche
        </h4>

        <div className="grid grid-cols-4 gap-3">
          {fokusBereiche.map((bereich) => {
            const answer = answers.find((a) => a.questionId === bereich.id);
            const score = answer?.value || 0;
            const bgColor =
              score >= 5
                ? 'bg-emerald-500/20 border-emerald-500/30'
                : score >= 3
                  ? 'bg-yellow-500/20 border-yellow-500/30'
                  : 'bg-red-500/20 border-red-500/30';

            return (
              <div
                key={bereich.id}
                className={`flex flex-col items-center p-3 rounded-xl border ${bgColor} transition-all`}
                title={bereich.name}
              >
                <span className="text-2xl mb-1">{bereich.icon}</span>
                <span className="text-xs text-[var(--text-muted)] text-center">
                  {bereich.name}
                </span>
                <span
                  className={`text-sm font-bold mt-1 ${
                    score >= 5
                      ? 'text-emerald-400'
                      : score >= 3
                        ? 'text-yellow-400'
                        : 'text-red-400'
                  }`}
                >
                  {score}/5
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Personalized CTA Section */}
      <div className="bg-[var(--bg-dark-card)] rounded-3xl p-6 md:p-8 border border-[var(--accent)]/20">
        <p className="text-[var(--text-light)] font-bold text-xl mb-2">{cta.headline}</p>
        <p className="text-[var(--text-muted)] mb-6">{cta.subline}</p>

        <Link
          href="/kontakt"
          onClick={onCtaClick}
          className="inline-flex items-center gap-2 py-4 px-8 bg-[var(--accent)] text-[var(--bg-dark)] font-bold rounded-full hover:bg-[var(--accent-light)] hover:shadow-[0_0_30px_var(--accent-glow)] transition-all uppercase tracking-wider"
        >
          {cta.buttonText}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>

        <p className="text-[var(--text-muted)] text-sm mt-4">30 Minuten • Kostenlos • Unverbindlich</p>
      </div>

      {/* Alternative: Fokus-Audit */}
      <div className="mt-8 pt-8 border-t border-[var(--text-muted)]/10">
        <p className="text-[var(--text-muted)] text-sm mb-4">Oder direkt loslegen?</p>
        <Link href={cta.secondaryLink} className="text-[var(--accent)] hover:underline font-medium">
          {cta.secondaryText} →
        </Link>
      </div>
    </div>
  );
}
