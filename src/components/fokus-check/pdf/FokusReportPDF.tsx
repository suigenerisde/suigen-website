import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import type { Answer, FokusCheckResult } from '@/types/fokus-check';
import { questions, MAX_SCORE } from '../questions-data';
import { RadarChart } from './RadarChart';

// Farben passend zur Website
const colors = {
  bgDark: '#1a2634',
  bgCard: '#243242',
  textLight: '#ffffff',
  textMuted: '#8896a6',
  accent: '#14b8a6',
  green: '#22c55e',
  yellow: '#eab308',
  red: '#ef4444',
  orange: '#f97316',
};

// Styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.bgDark,
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 24,
  },
  badge: {
    backgroundColor: colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  badgeText: {
    color: colors.textLight,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textLight,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 11,
    color: colors.textMuted,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.accent,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  // Score Section
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  scoreCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreNumber: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  scoreMax: {
    fontSize: 12,
    color: colors.textMuted,
  },
  scoreInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  categoryDescription: {
    fontSize: 11,
    color: colors.textMuted,
    lineHeight: 1.5,
  },
  // Quick Summary
  summaryRow: {
    flexDirection: 'row',
    gap: 16,
  },
  summaryBox: {
    flex: 1,
    backgroundColor: colors.bgCard,
    borderRadius: 8,
    padding: 12,
  },
  summaryLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  summaryItem: {
    fontSize: 9,
    color: colors.textLight,
    marginBottom: 3,
  },
  // Radar Chart
  radarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bgCard,
    borderRadius: 12,
    padding: 12,
  },
  // Compact Answers Table
  table: {
    backgroundColor: colors.bgCard,
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.bgDark,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tableHeaderText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: colors.accent,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.bgDark,
  },
  tableRowLast: {
    borderBottomWidth: 0,
  },
  tableColBereich: {
    width: '25%',
  },
  tableColAntwort: {
    width: '55%',
  },
  tableColScore: {
    width: '20%',
    alignItems: 'flex-end',
  },
  tableCellBereich: {
    fontSize: 9,
    color: colors.textLight,
    fontWeight: 'bold',
  },
  tableCellAntwort: {
    fontSize: 9,
    color: colors.textMuted,
  },
  scoreBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  scoreBadgeText: {
    fontSize: 8,
    color: colors.textLight,
    fontWeight: 'bold',
  },
  // Pain Point
  painPointCard: {
    backgroundColor: colors.bgCard,
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  painPointText: {
    fontSize: 11,
    color: colors.textLight,
    fontStyle: 'italic',
    lineHeight: 1.5,
  },
  // Fokus-Killer
  killerCard: {
    backgroundColor: colors.bgCard,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    gap: 12,
  },
  killerIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
  killerIconText: {
    fontSize: 12,
    color: colors.textLight,
  },
  killerContent: {
    flex: 1,
  },
  killerTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.textLight,
    marginBottom: 4,
  },
  killerDescription: {
    fontSize: 9,
    color: colors.textMuted,
    lineHeight: 1.4,
  },
  // Quick Wins
  quickWinCard: {
    backgroundColor: colors.bgCard,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    gap: 12,
  },
  quickWinIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickWinIconText: {
    fontSize: 12,
    color: colors.textLight,
  },
  quickWinContent: {
    flex: 1,
  },
  quickWinTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.textLight,
    marginBottom: 4,
  },
  quickWinDescription: {
    fontSize: 9,
    color: colors.textMuted,
    lineHeight: 1.4,
  },
  // CTA
  ctaBox: {
    backgroundColor: colors.bgCard,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textLight,
    marginBottom: 2,
  },
  ctaAccent: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.accent,
    marginBottom: 10,
  },
  ctaDescription: {
    fontSize: 10,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: 12,
  },
  ctaButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  ctaButtonText: {
    color: colors.textLight,
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  ctaFeatures: {
    flexDirection: 'row',
    gap: 12,
  },
  ctaFeature: {
    fontSize: 9,
    color: colors.textMuted,
  },
  // Footer
  footer: {
    marginTop: 'auto',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: `${colors.textMuted}30`,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 9,
    color: colors.textMuted,
  },
});

// Fokus-Bereiche mit kurzen Namen
const fokusBereiche: Record<number, string> = {
  1: 'Projekte',
  2: 'Störungen',
  3: 'Prioritäten',
  4: 'Balance',
  5: 'Umsetzung',
  6: 'Tools',
  7: 'Aufgaben',
  8: 'Fokus',
};

// Fokus-Killer Templates für alle 8 Bereiche
const killerTemplates: Record<number, { title: string; description: string }> = {
  1: {
    title: 'Zu viele Projekte gleichzeitig',
    description: 'Mit mehr als 6 aktiven Projekten verzettelst Du Deine Energie. Faustregel: Max. 3 Projekte gleichzeitig.',
  },
  2: {
    title: 'Ständige Unterbrechungen',
    description: 'Jede Unterbrechung kostet Dich 23 Minuten Wiederanlaufzeit. Schaffe Dir Fokus-Blöcke ohne Störungen.',
  },
  3: {
    title: 'Fehlende Prioritäten-Klarheit',
    description: 'Ohne klare Top-3 fehlt Dir der Kompass für schnelle Entscheidungen.',
  },
  4: {
    title: 'Überarbeitung statt Effektivität',
    description: 'Mehr als 50h/Woche ist kein Produktivitäts-Zeichen, sondern ein Priorisierungs-Problem.',
  },
  5: {
    title: 'Niedrige Umsetzungsquote',
    description: 'Du startest viele Dinge, schließt aber wenige ab. Fokus heißt: Weniger anfangen, mehr beenden.',
  },
  6: {
    title: 'Tools arbeiten gegen Dich',
    description: 'Deine Systeme sollten Dich entlasten, nicht belasten. Zeit für einen Tool-Audit.',
  },
  7: {
    title: 'Kein zentraler Überblick',
    description: 'Aufgaben im Kopf oder über mehrere Tools verteilt führen zu Vergessen und Stress.',
  },
  8: {
    title: 'Keine Konzentrations-Praxis',
    description: 'Fokus ist wie ein Muskel - ohne Training verkümmert er. Schon 10 Min/Tag machen den Unterschied.',
  },
};

// Quick-Win Templates für alle 8 Bereiche
const quickWinTemplates: Record<number, { title: string; description: string }> = {
  1: {
    title: 'Projekt-Freeze einführen',
    description: 'Schließe diese Woche ein Projekt ab, bevor Du ein neues startest. Qualität vor Quantität.',
  },
  2: {
    title: 'Fokus-Blöcke blocken',
    description: 'Plane 2x täglich 90-Minuten-Blöcke ohne Meetings, Slack oder E-Mail. Handy auf Flugmodus.',
  },
  3: {
    title: 'Morgen-Ritual: Top 3',
    description: 'Schreibe jeden Morgen Deine 3 wichtigsten Aufgaben auf. Alles andere ist optional.',
  },
  4: {
    title: 'Feste Feierabend-Zeit',
    description: 'Definiere eine Uhrzeit, nach der Du nicht mehr arbeitest. Der Kalender ist heilig.',
  },
  5: {
    title: '2-Minuten-Regel anwenden',
    description: 'Alles unter 2 Minuten sofort erledigen. Alles andere auf die To-Do-Liste.',
  },
  6: {
    title: 'Tool-Audit starten',
    description: 'Liste alle Tools auf, die Du nutzt. Streiche alles, was Du in 30 Tagen nicht gebraucht hast.',
  },
  7: {
    title: 'Ein System, eine Quelle',
    description: 'Sammle alle Aufgaben an einem Ort. Egal ob App oder Papier - Hauptsache zentral.',
  },
  8: {
    title: 'Fokus-Training starten',
    description: 'Starte mit 10 Minuten Meditation oder Deep Work täglich. Steigere wöchentlich um 5 Minuten.',
  },
};

// Antwort-Label finden
const getAnswerLabel = (questionId: number, value: number): string => {
  const question = questions.find((q) => q.id === questionId);
  if (!question) return String(value);
  if (question.type === 'slider') return `${value}/5`;
  const option = question.options?.find((o) => o.value === value);
  return option?.label || String(value);
};

// Score-Farbe bestimmen
const getScoreColor = (value: number, maxValue: number = 5) => {
  const percentage = value / maxValue;
  if (percentage >= 0.8) return colors.green;
  if (percentage >= 0.6) return colors.yellow;
  if (percentage >= 0.4) return colors.orange;
  return colors.red;
};

// Category Color
const getCategoryColor = (category: FokusCheckResult['category']): string => {
  switch (category) {
    case 'excellent':
    case 'good':
      return colors.green;
    case 'moderate':
      return colors.yellow;
    case 'weak':
      return colors.orange;
    case 'critical':
      return colors.red;
    default:
      return colors.yellow;
  }
};

// Top 3 schwächste Bereiche finden
const getWeakestAreas = (answers: Answer[]): number[] => {
  return [...answers]
    .sort((a, b) => a.value - b.value)
    .slice(0, 3)
    .map((a) => a.questionId);
};

// Top 3 stärkste Bereiche finden
const getStrongestAreas = (answers: Answer[]): number[] => {
  return [...answers]
    .sort((a, b) => b.value - a.value)
    .slice(0, 3)
    .map((a) => a.questionId);
};

interface FokusReportPDFProps {
  result: FokusCheckResult;
  answers: Answer[];
  userName?: string;
  painPoint?: string;
  createdAt: Date;
}

export function FokusReportPDF({ result, answers, userName, painPoint, createdAt }: FokusReportPDFProps) {
  const categoryColor = getCategoryColor(result.category);
  const weakestAreas = getWeakestAreas(answers);
  const strongestAreas = getStrongestAreas(answers);
  const formattedDate = createdAt.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <Document>
      {/* ========== SEITE 1: DEIN ERGEBNIS ========== */}
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>DEIN FOKUS-REPORT</Text>
          </View>
          {userName && <Text style={styles.title}>Hallo {userName}!</Text>}
          <Text style={styles.subtitle}>Erstellt am {formattedDate}</Text>
        </View>

        {/* Score Section - Horizontal Layout */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DEIN FOKUS-SCORE</Text>
          <View style={styles.scoreRow}>
            <View
              style={[
                styles.scoreCircle,
                {
                  borderColor: categoryColor,
                  backgroundColor: `${categoryColor}15`,
                },
              ]}
            >
              <Text style={[styles.scoreNumber, { color: categoryColor }]}>{result.score}</Text>
              <Text style={styles.scoreMax}>von {MAX_SCORE}</Text>
            </View>
            <View style={styles.scoreInfo}>
              <Text style={[styles.categoryTitle, { color: categoryColor }]}>{result.title}</Text>
              <Text style={styles.categoryDescription}>{result.description}</Text>
            </View>
          </View>
        </View>

        {/* Quick Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AUF EINEN BLICK</Text>
          <View style={styles.summaryRow}>
            <View style={[styles.summaryBox, { borderLeftWidth: 3, borderLeftColor: colors.green }]}>
              <Text style={styles.summaryLabel}>Deine Stärken</Text>
              {strongestAreas.map((id) => (
                <Text key={id} style={styles.summaryItem}>• {fokusBereiche[id]}</Text>
              ))}
            </View>
            <View style={[styles.summaryBox, { borderLeftWidth: 3, borderLeftColor: colors.textMuted }]}>
              <Text style={styles.summaryLabel}>Verbesserungspotential</Text>
              {weakestAreas.map((id) => (
                <Text key={id} style={styles.summaryItem}>• {fokusBereiche[id]}</Text>
              ))}
            </View>
          </View>
        </View>

        {/* Radar Chart Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DEIN FOKUS-PROFIL</Text>
          <View style={styles.radarContainer}>
            <RadarChart
              size={320}
              color={colors.accent}
              gridColor={colors.textMuted}
              labelColor={colors.textLight}
              data={[
                { label: 'Projekte', value: answers.find((a) => a.questionId === 1)?.value || 0, maxValue: 5 },
                { label: 'Störungen', value: answers.find((a) => a.questionId === 2)?.value || 0, maxValue: 5 },
                { label: 'Prioritäten', value: answers.find((a) => a.questionId === 3)?.value || 0, maxValue: 5 },
                { label: 'Balance', value: answers.find((a) => a.questionId === 4)?.value || 0, maxValue: 5 },
                { label: 'Umsetzung', value: answers.find((a) => a.questionId === 5)?.value || 0, maxValue: 5 },
                { label: 'Tools', value: answers.find((a) => a.questionId === 6)?.value || 0, maxValue: 5 },
                { label: 'Aufgaben', value: answers.find((a) => a.questionId === 7)?.value || 0, maxValue: 5 },
                { label: 'Fokus', value: answers.find((a) => a.questionId === 8)?.value || 0, maxValue: 5 },
              ]}
            />
          </View>
        </View>
      </Page>

      {/* ========== SEITE 2: DEINE ANALYSE ========== */}
      <Page size="A4" style={styles.page}>
        {/* Pain Point Section */}
        {painPoint && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>DEINE AKTUELLE HERAUSFORDERUNG</Text>
            <View style={styles.painPointCard}>
              <Text style={styles.painPointText}>&quot;{painPoint}&quot;</Text>
            </View>
          </View>
        )}

        {/* Kompakte Antworten-Tabelle */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DEINE ANTWORTEN IM ÜBERBLICK</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <View style={styles.tableColBereich}>
                <Text style={styles.tableHeaderText}>Bereich</Text>
              </View>
              <View style={styles.tableColAntwort}>
                <Text style={styles.tableHeaderText}>Deine Antwort</Text>
              </View>
              <View style={styles.tableColScore}>
                <Text style={styles.tableHeaderText}>Score</Text>
              </View>
            </View>
            {answers.map((answer, index) => {
              const scoreColor = getScoreColor(answer.value, 5);
              const isLast = index === answers.length - 1;
              return (
                <View key={answer.questionId} style={[styles.tableRow, isLast && styles.tableRowLast]}>
                  <View style={styles.tableColBereich}>
                    <Text style={styles.tableCellBereich}>{fokusBereiche[answer.questionId]}</Text>
                  </View>
                  <View style={styles.tableColAntwort}>
                    <Text style={styles.tableCellAntwort}>{getAnswerLabel(answer.questionId, answer.value)}</Text>
                  </View>
                  <View style={styles.tableColScore}>
                    <View style={[styles.scoreBadge, { backgroundColor: scoreColor }]}>
                      <Text style={styles.scoreBadgeText}>{answer.value}/5</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Fokus-Killer Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DEINE TOP 3 FOKUS-KILLER</Text>
          {weakestAreas.map((questionId, index) => {
            const killer = killerTemplates[questionId];
            if (!killer) return null;
            return (
              <View key={questionId} style={styles.killerCard}>
                <View style={styles.killerIcon}>
                  <Text style={styles.killerIconText}>{index + 1}</Text>
                </View>
                <View style={styles.killerContent}>
                  <Text style={styles.killerTitle}>{killer.title}</Text>
                  <Text style={styles.killerDescription}>{killer.description}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </Page>

      {/* ========== SEITE 3: DEINE NÄCHSTEN SCHRITTE ========== */}
      <Page size="A4" style={styles.page}>
        {/* Quick Wins Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DEINE 3 QUICK-WINS FÜR DIESE WOCHE</Text>
          {weakestAreas.map((questionId, index) => {
            const quickWin = quickWinTemplates[questionId];
            if (!quickWin) return null;
            return (
              <View key={questionId} style={styles.quickWinCard}>
                <View style={styles.quickWinIcon}>
                  <Text style={styles.quickWinIconText}>{index + 1}</Text>
                </View>
                <View style={styles.quickWinContent}>
                  <Text style={styles.quickWinTitle}>{quickWin.title}</Text>
                  <Text style={styles.quickWinDescription}>{quickWin.description}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Zusätzliche Tipps */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROFI-TIPP</Text>
          <View style={styles.painPointCard}>
            <Text style={styles.killerDescription}>
              Fokussiere Dich auf EINE Verbesserung pro Woche. Multitasking beim Gewohnheitsaufbau funktioniert
              genauso wenig wie im Arbeitsalltag. Wähle den Quick-Win, der Dir am leichtesten fällt, und ziehe ihn
              7 Tage konsequent durch.
            </Text>
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>BEREIT FÜR DEN NÄCHSTEN LEVEL?</Text>
          <View style={styles.ctaBox}>
            <Text style={styles.ctaTitle}>DIE WICHTIGSTEN 3 STUNDEN</Text>
            <Text style={styles.ctaAccent}>DEINES JAHRES.</Text>
            <Text style={styles.ctaDescription}>
              Im Fokus-Audit analysieren wir gemeinsam Deine Situation und entwickeln eine konkrete Roadmap.
            </Text>
            <View style={styles.ctaButton}>
              <Text style={styles.ctaButtonText}>ERSTGESPRÄCH BUCHEN</Text>
            </View>
            <Text style={styles.ctaDescription}>suigen.de/kontakt</Text>
            <View style={styles.ctaFeatures}>
              <Text style={styles.ctaFeature}>30 Minuten</Text>
              <Text style={styles.ctaFeature}>•</Text>
              <Text style={styles.ctaFeature}>Kostenlos</Text>
              <Text style={styles.ctaFeature}>•</Text>
              <Text style={styles.ctaFeature}>Unverbindlich</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>SUI GENERIS | Human First | suigen.de</Text>
        </View>
      </Page>
    </Document>
  );
}
