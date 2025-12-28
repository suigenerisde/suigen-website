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
import { determineFokusType } from '@/lib/fokus-check/fokus-types';
import { calculateROI, formatCurrency, formatHours } from '@/lib/fokus-check/roi-calculator';

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
    borderTopColor: colors.textLight,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 9,
    color: colors.textMuted,
  },
  // ROI Section
  roiBox: {
    backgroundColor: colors.bgCard,
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: colors.red,
    marginBottom: 16,
  },
  roiHeader: {
    marginBottom: 16,
  },
  roiTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textLight,
    marginBottom: 4,
  },
  roiSubtitle: {
    fontSize: 9,
    color: colors.textMuted,
    lineHeight: 1.4,
  },
  roiMainNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.red,
    marginBottom: 8,
  },
  roiLabel: {
    fontSize: 10,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  roiGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  roiGridItem: {
    flex: 1,
    backgroundColor: colors.bgDark,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  roiGridNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textLight,
    marginBottom: 4,
  },
  roiGridLabel: {
    fontSize: 8,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  roiBreakdownCard: {
    backgroundColor: colors.bgDark,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roiBreakdownLeft: {
    flex: 1,
  },
  roiBreakdownLabel: {
    fontSize: 10,
    color: colors.textLight,
    marginBottom: 2,
  },
  roiBreakdownHours: {
    fontSize: 8,
    color: colors.textMuted,
  },
  roiBreakdownRight: {
    alignItems: 'flex-end',
  },
  roiBreakdownAmount: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.red,
    marginBottom: 2,
  },
  roiBreakdownPer: {
    fontSize: 7,
    color: colors.textMuted,
  },
  roiWarning: {
    backgroundColor: colors.bgDark,
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  roiWarningText: {
    fontSize: 8,
    color: colors.textMuted,
    lineHeight: 1.4,
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
  const fokusType = determineFokusType(answers);
  const roiData = calculateROI(answers);
  const formattedDate = createdAt.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <Document>
      {/* ========== SEITE 1: DEIN ERGEBNIS ========== */}
      <Page size="A4" style={styles.page}>
        {/* Professional Header */}
        <View style={styles.header}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>FOKUS-CHECK REPORT</Text>
          </View>
          <Text style={styles.title}>Persönliche Fokus-Analyse</Text>
          <Text style={styles.subtitle}>
            {userName ? `für ${userName} | ` : ''}Erstellt am {formattedDate}
          </Text>
        </View>

        {/* Einleitung */}
        <View style={[styles.section, { marginBottom: 20 }]}>
          <Text style={[styles.categoryDescription, { lineHeight: 1.6, textAlign: 'left' }]}>
            Dieser Report analysiert Deine aktuelle Fokus-Situation in 8 Dimensionen. Du erhältst eine ehrliche
            Standortbestimmung, konkrete Zahlen zu den Kosten Deiner Fokus-Probleme und einen klaren Fahrplan, wie Du
            Deine Produktivität systematisch verbesserst. Fakten, Zahlen und umsetzbare Strategien.
          </Text>
        </View>

        {/* Score Section - Clean & Professional */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DEIN FOKUS-SCORE</Text>
          <View style={styles.scoreRow}>
            <View
              style={[
                styles.scoreCircle,
                {
                  borderColor: colors.accent,
                  backgroundColor: `${colors.accent}15`,
                },
              ]}
            >
              <Text style={[styles.scoreNumber, { color: colors.accent }]}>{result.score}</Text>
              <Text style={styles.scoreMax}>von {MAX_SCORE}</Text>
            </View>
            <View style={styles.scoreInfo}>
              <Text style={[styles.categoryTitle, { color: colors.textLight }]}>{result.title}</Text>
              <Text style={styles.categoryDescription}>{result.description}</Text>
            </View>
          </View>
        </View>

        {/* Fokus-Typ Section - Unified Design */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DEIN FOKUS-TYP</Text>
          <Text style={[styles.categoryDescription, { marginBottom: 12 }]}>
            Basierend auf Deiner Selbsteinschätzung zeigt sich ein klares Muster in Deinem Arbeits- und Fokusverhalten.
            Du arbeitest nach folgendem Profil:
          </Text>
          <View style={[styles.painPointCard, { borderLeftWidth: 3, borderLeftColor: colors.accent }]}>
            <Text style={[styles.categoryTitle, { color: colors.accent, marginBottom: 12 }]}>
              {fokusType.name}
            </Text>
            <Text style={[styles.painPointText, { marginBottom: 16 }]}>
              {fokusType.description}
            </Text>
            <Text style={[styles.sectionTitle, { fontSize: 9, color: colors.accent, marginBottom: 6 }]}>
              DEINE SUPERKRAFT
            </Text>
            <Text style={[styles.painPointText, { marginBottom: 16 }]}>
              {fokusType.superpower}
            </Text>
            <Text style={[styles.sectionTitle, { fontSize: 9, color: colors.accent, marginBottom: 6 }]}>
              DEIN FOKUS-KILLER
            </Text>
            <Text style={[styles.painPointText, { marginBottom: 16 }]}>
              {fokusType.killer}
            </Text>
            <Text style={[styles.sectionTitle, { fontSize: 9, color: colors.accent, marginBottom: 6 }]}>
              WAS DU JETZT BRAUCHST
            </Text>
            <Text style={styles.painPointText}>
              {fokusType.whatYouNeed}
            </Text>
          </View>
        </View>

        {/* Radar Chart Section */}
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>DEIN FOKUS-PROFIL</Text>
          <View style={styles.radarContainer}>
            <RadarChart
              size={280}
              color={colors.accent}
              gridColor={colors.textMuted}
              labelColor={colors.textLight}
              data={[
                { label: 'Projekte', value: answers.find((a) => a.questionId === 1)?.value || 0, maxValue: 5 },
                { label: 'Störungen', value: answers.find((a) => a.questionId === 2)?.value || 0, maxValue: 5 },
                { label: 'Priorität', value: answers.find((a) => a.questionId === 3)?.value || 0, maxValue: 5 },
                { label: 'Balance', value: answers.find((a) => a.questionId === 4)?.value || 0, maxValue: 5 },
                { label: 'Umsetzung', value: answers.find((a) => a.questionId === 5)?.value || 0, maxValue: 5 },
                { label: 'Tools', value: answers.find((a) => a.questionId === 6)?.value || 0, maxValue: 5 },
                { label: 'Aufgaben', value: answers.find((a) => a.questionId === 7)?.value || 0, maxValue: 5 },
                { label: 'Fokus', value: answers.find((a) => a.questionId === 8)?.value || 0, maxValue: 5 },
              ]}
            />
          </View>
          <Text style={[styles.categoryDescription, { marginTop: 16, textAlign: 'right' }]}>
            Das Radar-Diagramm visualisiert Deine 8 Fokus-Dimensionen. Je weiter außen ein Punkt liegt, desto stärker
            bist Du in diesem Bereich. Die Fläche zeigt Dein aktuelles Profil – Dein Ziel ist es, diese Fläche
            strategisch zu vergrößern, beginnend mit den Bereichen, die den größten Impact auf Dein Business haben.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>SUI GENERIS | Human First | suigen.de</Text>
        </View>
      </Page>

      {/* ========== SEITE 1.5: WAS DICH DEIN FOKUS-PROBLEM KOSTET ========== */}
      {roiData.totalHoursLostPerWeek > 0 && (
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>DEIN ROI-KALKULATION</Text>
            </View>
          </View>

          {/* Main ROI Box */}
          <View style={styles.roiBox}>
            <View style={styles.roiHeader}>
              <Text style={styles.roiTitle}>Was Dich Dein Fokus-Problem WIRKLICH kostet</Text>
              <Text style={styles.roiSubtitle}>
                Basierend auf Deinen schwächsten Bereichen und einem konservativen Stundensatz von{' '}
                {formatCurrency(roiData.hourlyRate)}/h
              </Text>
            </View>

            {/* Total Cost per Year */}
            <Text style={styles.roiMainNumber}>{formatCurrency(roiData.totalCostPerYear)}</Text>
            <Text style={styles.roiLabel}>Pro Jahr verschwendet</Text>

            {/* Grid: Week/Month */}
            <View style={styles.roiGrid}>
              <View style={styles.roiGridItem}>
                <Text style={styles.roiGridNumber}>{formatHours(roiData.totalHoursLostPerWeek)}</Text>
                <Text style={styles.roiGridLabel}>Stunden / Woche</Text>
              </View>
              <View style={styles.roiGridItem}>
                <Text style={styles.roiGridNumber}>{formatCurrency(roiData.totalCostPerWeek)}</Text>
                <Text style={styles.roiGridLabel}>Pro Woche</Text>
              </View>
              <View style={styles.roiGridItem}>
                <Text style={styles.roiGridNumber}>{formatCurrency(roiData.totalCostPerMonth)}</Text>
                <Text style={styles.roiGridLabel}>Pro Monat</Text>
              </View>
            </View>
          </View>

          {/* Hybrid-Ansatz: Größter Hebel + Gesamtpotenzial */}
          {roiData.breakdown.length > 0 && (
            <View style={styles.section}>
              {/* Größter Hebel */}
              <View style={[styles.painPointCard, { borderLeftWidth: 3, borderLeftColor: colors.red, marginBottom: 20 }]}>
                <Text style={[styles.sectionTitle, { fontSize: 11, color: colors.red, marginBottom: 8 }]}>
                  IHR GRÖSSTER HEBEL: {formatCurrency(roiData.breakdown[0].costPerYear)} / Jahr
                </Text>
                <Text style={[styles.painPointText, { marginBottom: 12 }]}>
                  {roiData.breakdown[0].label} optimieren
                </Text>
                <Text style={[styles.categoryDescription, { fontSize: 10, fontStyle: 'italic' }]}>
                  = 1 vollständig finanzierter Senior-Mitarbeiter (inkl. Lohnnebenkosten)
                </Text>
              </View>

              {/* Trennlinie */}
              <View style={{ borderBottomWidth: 1, borderBottomColor: colors.textMuted, opacity: 0.3, marginBottom: 16 }} />

              {/* Gesamtpotenzial */}
              <View>
                <Text style={[styles.categoryDescription, { marginBottom: 8 }]}>
                  Gesamtpotenzial über alle Bereiche:
                </Text>
                <Text style={[styles.categoryTitle, { fontSize: 16, color: colors.accent, marginBottom: 12 }]}>
                  {formatCurrency(roiData.totalCostPerYear)} / Jahr
                </Text>

                {/* Einfacher Balken */}
                <View style={{ marginTop: 12 }}>
                  <View style={{ flexDirection: 'row', height: 24, borderRadius: 4, overflow: 'hidden', marginBottom: 8 }}>
                    <View
                      style={{
                        width: `${(roiData.breakdown[0].costPerYear / roiData.totalCostPerYear) * 100}%`,
                        backgroundColor: colors.red,
                        justifyContent: 'center',
                        paddingLeft: 8,
                      }}
                    >
                      <Text style={{ fontSize: 8, color: colors.textLight, fontWeight: 'bold' }}>
                        {Math.round((roiData.breakdown[0].costPerYear / roiData.totalCostPerYear) * 100)}%
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: `${colors.textMuted}30`,
                      }}
                    />
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 8, color: colors.textMuted }}>
                      {roiData.breakdown[0].label} (Start hier)
                    </Text>
                    <Text style={{ fontSize: 8, color: colors.textMuted }}>
                      {roiData.breakdown.length - 1} weitere Bereiche
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* ROI Summary mit ACHTUNG */}
          <View style={[styles.section, { marginTop: 'auto', marginBottom: 0 }]}>
            <Text style={styles.categoryDescription}>
              Diese Zahlen zeigen Dir den finanziellen Impact Deiner aktuellen Fokus-Situation. Der größte Hebel liegt
              bei {roiData.breakdown[0]?.label || 'Deinen Schwachstellen'} – hier verlierst Du am meisten Zeit und
              damit Geld. Die gute Nachricht: Schon kleine Verbesserungen in diesem Bereich können einen enormen ROI
              bringen. Eine Stunde mehr Fokus pro Tag = {formatCurrency(roiData.hourlyRate * 5 * 52)} pro Jahr.{'\n\n'}
              ACHTUNG: Diese Kalkulation ist KONSERVATIV. Sie berücksichtigt nur direkte Zeitverluste, nicht die
              Opportunitätskosten: Projekte, die Du nicht angehen konntest. Kunden, die Du nicht gewonnen hast. Ideen,
              die nie umgesetzt wurden. Der ECHTE Schaden ist deutlich höher.
            </Text>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>SUI GENERIS | Human First | suigen.de</Text>
          </View>
        </Page>
      )}

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
                <View key={answer.questionId} style={isLast ? [styles.tableRow, styles.tableRowLast] : styles.tableRow}>
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

        {/* Fokustechnische Analyse */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>WAS DEINE ANTWORTEN ZEIGEN</Text>
          <View style={styles.painPointCard}>
            <Text style={styles.painPointText}>
              Deine Selbsteinschätzung zeigt ein klares Muster: Die größten Herausforderungen liegen in den Bereichen{' '}
              <Text style={{ fontWeight: 'bold' }}>{fokusBereiche[weakestAreas[0]]}</Text>,{' '}
              <Text style={{ fontWeight: 'bold' }}>{fokusBereiche[weakestAreas[1]]}</Text> und{' '}
              <Text style={{ fontWeight: 'bold' }}>{fokusBereiche[weakestAreas[2]]}</Text>. Diese drei Bereiche sind
              Deine primären Fokus-Killer und kosten Dich täglich wertvolle Zeit und Energie. Die gute Nachricht: Wenn
              Du gezielt an diesen Punkten arbeitest, wirst Du die größte Verbesserung in kürzester Zeit sehen. Deine
              stärkeren Bereiche können dabei als Hebel dienen – nutze sie strategisch, um Deine Schwachstellen
              auszugleichen.
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>SUI GENERIS | Human First | suigen.de</Text>
        </View>
      </Page>

      {/* ========== NEUE SEITE: TOP 3 FOKUS-KILLER ========== */}
      <Page size="A4" style={styles.page}>
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

        {/* Erklärung unter Fokus-Killern */}
        <View style={styles.section}>
          <View style={styles.painPointCard}>
            <Text style={[styles.painPointText, { marginBottom: 12 }]}>
              Diese drei Faktoren sind verantwortlich für den Großteil Deiner Produktivitätsverluste. Sie wirken nicht
              isoliert – sie verstärken sich gegenseitig und schaffen einen Teufelskreis aus verschwendeter Zeit,
              verpassten Chancen und ständigem Gefühl, nicht voranzukommen.
            </Text>
            <Text style={[styles.painPointText, { marginBottom: 12 }]}>
              Die gute Nachricht: Genau hier liegt Dein größter Hebel. Verbesserungen in diesen Bereichen haben einen
              überproportionalen Effekt auf Deine gesamte Fokus-Situation. Ein einziger Durchbruch in einem dieser
              Bereiche kann eine Kettenreaktion auslösen und mehrere Probleme gleichzeitig lösen.
            </Text>
            <Text style={styles.painPointText}>
              Die folgenden Seiten zeigen Dir konkrete Quick Wins und bewährte Strategien, wie Du diese Killer
              systematisch ausschaltest – ohne Dein komplettes Leben umkrempeln zu müssen.
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>SUI GENERIS | Human First | suigen.de</Text>
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

        {/* Ausführlicher Profi-Tipp */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PROFI-TIPP: SO SETZT DU DAS UM</Text>
          <View style={styles.painPointCard}>
            <Text style={[styles.painPointText, { marginBottom: 12 }]}>
              Fokussiere Dich auf EINE Verbesserung pro Woche. Multitasking beim Gewohnheitsaufbau funktioniert
              genauso wenig wie im Arbeitsalltag.
            </Text>
            <Text style={[styles.painPointText, { marginBottom: 12 }]}>
              <Text style={{ fontWeight: 'bold' }}>Deine Strategie:</Text> Wähle den Quick-Win, der Dir am leichtesten
              fällt, und ziehe ihn 7 Tage konsequent durch. Erst wenn er zur Gewohnheit geworden ist, nimmst Du den
              nächsten in Angriff.
            </Text>
            <Text style={[styles.painPointText, { marginBottom: 12 }]}>
              <Text style={{ fontWeight: 'bold' }}>Warum das funktioniert:</Text> Kleine, konsistente Veränderungen
              schlagen große, unregelmäßige Aktionen. Eine einzige neue Gewohnheit kann eine Kettenreaktion auslösen
              und mehrere Bereiche Deines Lebens verbessern.
            </Text>
            <Text style={styles.painPointText}>
              <Text style={{ fontWeight: 'bold' }}>Der häufigste Fehler:</Text> Alles gleichzeitig ändern zu wollen.
              Das führt zu Überforderung und nach 2 Wochen ist alles beim Alten. Gehe es langsam an – nachhaltige
              Veränderung braucht Zeit, keine Willenskraft.
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>SUI GENERIS | Human First | suigen.de</Text>
        </View>
      </Page>

      {/* ========== SEITE 4: BEREIT FÜR DAS NÄCHSTE LEVEL? ========== */}
      <Page size="A4" style={styles.page}>
        {/* CTA Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>BEREIT FÜR DAS NÄCHSTE LEVEL?</Text>
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
