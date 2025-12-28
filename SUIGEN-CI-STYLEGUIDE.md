# SUIGEN CI Styleguide für Grafiken

> **Design-Philosophie:** Dark-First, aicellence-inspired, minimalistisch, technisch, mit strategischen Akzenten

---

## 🎨 Farbpalette

### Primäre Farben

| Farbe | HEX | RGB | Verwendung |
|-------|-----|-----|------------|
| **Dark Background** | `#2e474f` | `rgb(46, 71, 79)` | Haupt-Hintergrund, dunkle Basis |
| **Dark Lighter** | `#3a5861` | `rgb(58, 88, 97)` | Sekundär-Hintergrund, Sections |
| **Accent Teal** | `#00b8c4` | `rgb(0, 184, 196)` | Call-to-Action, Highlights, Icons |
| **Accent Light** | `#00d4e0` | `rgb(0, 212, 224)` | Hover-States, Akzente |

### Text-Farben

| Farbe | HEX | RGB | Verwendung |
|-------|-----|-----|------------|
| **Text Light** | `#ffffff` | `rgb(255, 255, 255)` | Headlines, wichtiger Text |
| **Text Muted** | `#a8c0c5` | `rgb(168, 192, 197)` | Body-Text, Beschreibungen |
| **Text Dark** | `#2e474f` | `rgb(46, 71, 79)` | Text auf hellen Flächen |

### Transparente Overlays

| Verwendung | CSS-Wert |
|------------|----------|
| Card Background | `rgba(255, 255, 255, 0.05)` |
| Border Subtle | `rgba(255, 255, 255, 0.1)` |
| Border Hover | `rgba(255, 255, 255, 0.3)` |
| Accent Glow | `rgba(0, 184, 196, 0.4)` |
| Accent Background | `rgba(0, 184, 196, 0.1)` |

---

## 📐 Typografie

### Schriftarten

- **Primary:** `Inter` (sans-serif)
- **Monospace:** `JetBrains Mono`
- **Fallback:** `system-ui, sans-serif`

### Typografie-Hierarchie

#### Headlines

```css
/* Hero Headline */
font-size: clamp(2.5rem, 8vw, 5rem)
font-weight: 900
letter-spacing: -0.03em
line-height: 1.0
text-transform: uppercase

/* Section Headline */
font-size: clamp(2rem, 5vw, 3.5rem)
font-weight: 800
letter-spacing: -0.02em
line-height: 1.1
text-transform: uppercase
```

#### Body Text

```css
font-size: 1.125rem (18px)
line-height: 1.7
color: #a8c0c5
```

#### Small Labels

```css
font-size: 0.875rem (14px)
font-weight: 700
text-transform: uppercase
letter-spacing: 0.1em
```

---

## ✨ Stil-Elemente

### Glow-Effekte

#### Text Glow (für Akzente)
```css
text-shadow: 0 0 40px rgba(0, 184, 196, 0.4)
```

#### Box Glow (für CTAs)
```css
box-shadow: 0 0 30px rgba(0, 184, 196, 0.4)
```

#### Ambient Glow (für Sections)
```css
background: radial-gradient(circle, rgba(0, 184, 196, 0.05) 0%, transparent 70%)
blur: 150px
```

### Gradienten

#### Vertikaler Gradient
```css
background: linear-gradient(180deg, #2e474f 0%, #3a5861 100%)
```

#### Radialer Gradient
```css
background: radial-gradient(ellipse at center top, #3a5861 0%, #2e474f 70%)
```

### Cards & Container

```css
background: rgba(255, 255, 255, 0.05)
border: 1px solid rgba(255, 255, 255, 0.1)
border-radius: 50px
padding: 2rem

/* Hover State */
border-color: rgba(255, 255, 255, 0.3)
transform: translateY(-4px)
```

### Buttons

#### Primary Button
```css
background: #00b8c4
color: #2e474f
border-radius: 50px
padding: 1rem 2rem
font-weight: 700
text-transform: uppercase
letter-spacing: 0.05em

/* Hover */
background: #00d4e0
box-shadow: 0 0 30px rgba(0, 184, 196, 0.4)
transform: translateY(-2px)
```

#### Secondary Button
```css
background: transparent
border: 2px solid #ffffff
color: #ffffff

/* Hover */
background: #ffffff
color: #2e474f
```

---

## 📏 Spacing & Layout

### Spacing-System

```css
--spacing-section: 8rem (128px Desktop)
--spacing-section-mobile: 5rem (80px Mobile)
```

### Container
```css
max-width: 1152px (6xl)
padding-x: 1rem → 1.5rem → 2rem (responsive)
```

### Grid-System
- 3 Spalten (Desktop)
- 1-2 Spalten (Mobile)
- Gap: 1.5rem → 2rem

---

## 🎯 Grafik-Spezifikationen für Fokus-Audit

### 1. Ablauf-Diagramm (3 Phasen)

**Format:** Horizontaler Flow, 3 Steps

**Design:**
- Hintergrund: `#2e474f`
- Step-Boxen:
  - Nummerierung: Quadrat 56x56px, `#00b8c4`, schwarze Zahl (font-weight: 900)
  - Box: Rounded Rectangle (border-radius: 24px)
  - Border: `rgba(255, 255, 255, 0.1)`
  - Background: `rgba(255, 255, 255, 0.05)`
- Pfeile: `#00b8c4`, 2px Strich
- Schrift: Headlines weiß, Body `#a8c0c5`

**Inhalte:**
1. **Analyse Deiner aktuellen Situation**
2. **Identifikation der echten Engpässe**
3. **Klare Empfehlung für den nächsten Schritt**

---

### 2. Fokus-Dreieck Visualisierung

**Format:** Gleichseitiges Dreieck mit Labels

**Design:**
- Dreieck: Outline 3px, `#00b8c4`, mit Glow (`rgba(0, 184, 196, 0.4)`)
- Hintergrund: `#2e474f`
- Center-Icon: Kreis mit Fokus-Symbol (Fadenkreuz)
- Ecken: Small Circles (16px) in `#00b8c4`

**Labels:**
- Oben: **KLARHEIT**
- Links unten: **PRIORITÄT**
- Rechts unten: **ROADMAP**

**Center:** "90 TAGE" (groß, weiß, uppercase)

---

### 3. Scoring-Radar-Chart

**Format:** 5-achsiges Radar-Chart

**Design:**
- Achsen: 5 Dimensionen
- Gitter: `rgba(255, 255, 255, 0.1)`, 5 Stufen (0-100)
- Daten-Polygon: Fill `rgba(0, 184, 196, 0.2)`, Stroke `#00b8c4` (3px)
- Punkte: Circles 8px, `#00b8c4`
- Hintergrund: `#2e474f`
- Labels: Weiß, uppercase, außerhalb

**Dimensionen:**
1. **STRATEGIE**
2. **FOKUS**
3. **PROZESSE**
4. **TEAM**
5. **SYSTEME**

---

### 4. Quick-Win-Matrix (2x2)

**Format:** 2x2 Matrix (Impact vs. Aufwand)

**Design:**
- Hintergrund: `#2e474f`
- Quadranten:
  - Top-Right (HIGH IMPACT, LOW EFFORT): `rgba(0, 184, 196, 0.2)` + Glow
  - Andere: `rgba(255, 255, 255, 0.05)`
- Achsen: `rgba(255, 255, 255, 0.3)`, 2px
- Punkte: Circles 12px, `#00b8c4` mit weißem Text inside
- Grid Lines: `rgba(255, 255, 255, 0.1)`

**Achsen-Labels:**
- X-Achse: **AUFWAND** (niedrig ← → hoch)
- Y-Achse: **IMPACT** (niedrig ← → hoch)

**Quadranten:**
- Top-Left: **STRATEGISCH**
- Top-Right: **QUICK WINS** ⭐
- Bottom-Left: **IGNORIEREN**
- Bottom-Right: **VERMEIDEN**

---

### 5. Roadmap-Timeline (90 Tage)

**Format:** Horizontal Timeline mit Meilensteinen

**Design:**
- Baseline: Horizontale Linie, `#00b8c4`, 3px
- Hintergrund: `#2e474f`
- Meilensteine:
  - Kreis: 48px, `#00b8c4`, weißer Text (Zahl)
  - Label darüber: Weiß, uppercase
  - Beschreibung darunter: `#a8c0c5`, normal case
- Verbindungslinie mit Glow: `box-shadow: 0 0 20px rgba(0, 184, 196, 0.3)`

**Phasen:**
1. **TAG 1-30:** Fundament
2. **TAG 31-60:** Implementierung
3. **TAG 61-90:** Optimierung

---

## 🎨 Grafik-Tools Empfehlungen

### Für Vektorgrafiken
- **Figma** (empfohlen)
- **Illustrator**
- **Inkscape** (Open Source)

### Für Diagramme
- **Figma** + Chart Plugins
- **D3.js** (für interaktive Web-Grafiken)
- **Mermaid.js** (für technische Diagramme)

### Für Exports
- **SVG** (bevorzugt für Skalierbarkeit)
- **PNG** mit transparentem Hintergrund (2x für Retina)

---

## ✅ Do's

- ✅ **Maximaler Kontrast:** Weiße Headlines auf dunklem Grund
- ✅ **Glow sparsam:** Nur für Akzente und CTAs
- ✅ **Uppercase Headlines:** Für Power und Direktheit
- ✅ **Großzügiger Whitespace:** Nicht zu voll
- ✅ **Rounded Corners:** 50px für Buttons, 24px für Cards
- ✅ **Teal als Akzent:** Niemals als Hintergrund

---

## ❌ Don'ts

- ❌ **Keine hellen Hintergründe:** Immer dark-first
- ❌ **Kein Teal-Overload:** Teal ist Akzent, nicht Basis
- ❌ **Keine scharfen Ecken:** Immer abgerundet
- ❌ **Keine generischen Fonts:** Inter oder JetBrains Mono
- ❌ **Keine bunten Farbexplosionen:** Mono + Teal only
- ❌ **Kein Light Mode:** Design ist dark-first optimiert

---

## 🔧 Export-Spezifikationen

### Für Web

```
Format: SVG (bevorzugt) oder PNG
Auflösung: 2x für Retina (z.B. 2400x1600px)
Transparenz: Ja (außer bei Vollbild-Grafiken)
Farbraum: sRGB
Kompression: Optimiert für Web
```

### Dateinamen

```
fokus-audit-ablauf-diagramm.svg
fokus-audit-dreieck.svg
fokus-audit-radar-chart.svg
fokus-audit-quick-win-matrix.svg
fokus-audit-roadmap-timeline.svg
```

---

## 📦 Assets-Struktur

```
/public/images/graphics/
  ├── fokus-audit-ablauf-diagramm.svg
  ├── fokus-audit-dreieck.svg
  ├── fokus-audit-radar-chart.svg
  ├── fokus-audit-quick-win-matrix.svg
  └── fokus-audit-roadmap-timeline.svg
```

---

## 🎯 Verwendung im Code

```tsx
<Image
  src="/images/graphics/fokus-audit-ablauf-diagramm.svg"
  alt="Fokus-Audit Ablauf in 3 Phasen"
  width={1200}
  height={400}
  className="w-full h-auto"
/>
```

---

**Version:** 1.0
**Erstellt:** 2025-12-25
**Projekt:** SUIGEN Website
**Zweck:** Grafik-Erstellung für Fokus-Audit Seite
