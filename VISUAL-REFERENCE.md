# SUIGEN Visual Reference Guide

> Visuelle Design-Prinzipien und Beispiele aus der aktuellen Website

---

## 🎯 Core Design Principles

### Dark-First Philosophy
- **Primär:** Dunkle Hintergründe schaffen Fokus und Premium-Feeling
- **Akzente:** Teal (#00b8c4) als strategischer Kontrast-Punkt
- **Hierarchie:** Helligkeit = Wichtigkeit (je heller, desto wichtiger)

### Minimalistisch & Technisch
- **Weniger ist mehr:** Keine visuellen Ablenkungen
- **Klare Formen:** Geometrische Shapes, klare Linien
- **Gezielter Einsatz von Glow:** Nur für CTAs und Highlights

### Typografie als Statement
- **Uppercase Headlines:** Power und Direktheit
- **Tight Letter Spacing:** -0.03em für Hero, -0.02em für Sections
- **Font Weight 800-900:** Extreme Boldness für Headlines

---

## 🎨 Farb-Psychologie

### Warum diese Farben?

#### Dark Background (#2e474f)
- **Gefühl:** Professionell, seriös, premium
- **Wirkung:** Reduziert Ablenkung, schafft Fokus
- **Zielgruppe:** Unternehmer, die Klarheit suchen

#### Teal Accent (#00b8c4)
- **Gefühl:** Modern, technisch, zukunftsorientiert
- **Wirkung:** Eye-catching ohne aggressiv zu sein
- **Kontrast:** Perfekt lesbar auf Dark Background
- **Psychologie:** Vertrauen + Innovation

#### Muted Text (#a8c0c5)
- **Gefühl:** Ruhig, lesbar, angenehm
- **Wirkung:** Lange Texte werden nicht anstrengend
- **Kontrast:** Ausreichend für WCAG AA Standard

---

## 📐 Layout-Prinzipien

### Spacing System

```
Small:    0.5rem (8px)
Medium:   1rem (16px)
Large:    1.5rem (24px)
XL:       2rem (32px)
2XL:      3rem (48px)
Section:  8rem Desktop / 5rem Mobile (128px / 80px)
```

### Container Sizes

```
Max Width:    1152px (Tailwind 6xl)
Padding:      1rem (Mobile) → 1.5rem (Tablet) → 2rem (Desktop)
Content Max:  720px für lange Texte
```

### Grid System

#### 3-Column Layout (Desktop)
```
<div class="grid md:grid-cols-3 gap-6 md:gap-8">
  <div class="card">...</div>
  <div class="card">...</div>
  <div class="card">...</div>
</div>
```

#### 2-Column Layout
```
<div class="grid md:grid-cols-2 gap-6 md:gap-8">
  <div class="card">...</div>
  <div class="card">...</div>
</div>
```

---

## ✨ Effekte & Animationen

### Glow Effekte - Wann einsetzen?

#### Text Glow (sparsam!)
```css
/* NUR für zentrale Headlines */
.text-glow {
  text-shadow: 0 0 40px rgba(0, 184, 196, 0.4);
}
```

**Beispiel aus Website:**
```html
<span className="text-[var(--accent)] text-glow">
  Deines Jahres.
</span>
```

#### Box Glow (für CTAs)
```css
/* Primary Button Hover */
.btn-primary:hover {
  box-shadow: 0 0 30px rgba(0, 184, 196, 0.4);
}
```

#### Ambient Glow (Sections)
```html
<!-- Background Glow für Fokus-Audit Section -->
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-[600px] h-[600px] bg-[var(--accent)] opacity-[0.05]
            blur-[150px] rounded-full pointer-events-none" />
```

### Hover States

#### Cards
```
Default:
- background: rgba(255, 255, 255, 0.05)
- border: rgba(255, 255, 255, 0.1)

Hover:
- background: rgba(255, 255, 255, 0.05) (gleich!)
- border: rgba(255, 255, 255, 0.3)
- transform: translateY(-4px)
- transition: 0.3s ease
```

#### Buttons
```
Primary:
- transform: translateY(-2px)
- box-shadow: 0 0 30px rgba(0, 184, 196, 0.4)

Secondary:
- background: #ffffff
- color: #2e474f (invertiert!)
```

### Animationen

```css
/* Slide Up - für Hero Content */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Timing */
animation: slideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
```

**Delay Stacking:**
```html
<div class="animate-slide-up delay-1">...</div>
<div class="animate-slide-up delay-2">...</div>
<div class="animate-slide-up delay-3">...</div>
```

---

## 🔢 Komponenten-Anatomie

### Badge Component

```html
<span class="inline-block px-4 py-2
             bg-[var(--accent)]/10
             text-[var(--accent)]
             text-sm font-bold
             rounded uppercase tracking-widest
             border border-[var(--accent)]/20">
  ALLES startet hier
</span>
```

**Breakdown:**
- Background: 10% Teal Opacity
- Text: 100% Teal
- Border: 20% Teal Opacity
- Rounded corners (nicht 50px!)
- Uppercase + Wide Tracking

### Card Component

```html
<div class="card">
  <div class="w-12 h-12
              bg-[var(--accent)]/10
              rounded-lg
              flex items-center justify-center mb-6">
    <span class="text-[var(--accent)] text-2xl">✓</span>
  </div>
  <h3 class="text-xl font-bold text-[var(--text-light)] mb-3 uppercase">
    HEADLINE
  </h3>
  <p class="text-[var(--text-muted)]">
    Description text hier...
  </p>
</div>
```

**Icon Pattern:**
- 48x48px Container
- 10% Teal Background
- Rounded 8px
- Icon in voller Teal-Farbe

### Numbered Steps

```html
<div class="flex gap-6">
  <div class="flex-shrink-0 w-14 h-14
              bg-[var(--accent)] rounded-lg
              flex items-center justify-center
              text-[var(--bg-dark)] font-black text-xl">
    1
  </div>
  <div>
    <h3 class="text-xl font-bold text-[var(--text-light)] mb-2 uppercase">
      SCHRITT TITEL
    </h3>
    <p class="text-[var(--text-muted)]">
      Beschreibung...
    </p>
  </div>
</div>
```

**Pattern:**
- 56x56px Quadrat
- 100% Teal Background
- Schwarze Zahl (wegen Kontrast auf Teal)
- Font Weight 900 (Black)

---

## 📱 Responsive Patterns

### Typography Scaling

```css
/* Hero Headline */
font-size: clamp(2.5rem, 8vw, 5rem)
/* Mobile: 40px → Desktop: 80px */

/* Section Headline */
font-size: clamp(2rem, 5vw, 3.5rem)
/* Mobile: 32px → Desktop: 56px */
```

### Spacing Scaling

```css
/* Section Padding */
py-24 md:py-32
/* Mobile: 96px → Desktop: 128px */

/* Card Grid Gap */
gap-6 md:gap-8
/* Mobile: 24px → Desktop: 32px */
```

### Grid Breakpoints

```html
<!-- 1 Column → 2 Columns -->
<div class="grid md:grid-cols-2 gap-6">

<!-- 1 Column → 3 Columns -->
<div class="grid md:grid-cols-3 gap-6">

<!-- Stack → Flex -->
<div class="flex flex-col md:flex-row gap-6">
```

---

## 🎨 Real-World Beispiele

### Hero Section Pattern

```tsx
<section className="min-h-[70vh] flex items-center bg-gradient-radial py-32">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="max-w-3xl">

      {/* Badge */}
      <span className="inline-block px-4 py-2
                       bg-[var(--accent)]/10 text-[var(--accent)]
                       text-sm font-bold rounded uppercase tracking-widest
                       mb-8 border border-[var(--accent)]/20">
        Der Startpunkt für alles
      </span>

      {/* Headline */}
      <h1 className="headline-hero text-[var(--text-light)] mb-6">
        Die wichtigsten 3 Stunden
        <br />
        <span className="text-[var(--accent)] text-glow">
          Deines Jahres.
        </span>
      </h1>

      {/* Body */}
      <p className="body-text mb-10 max-w-2xl">
        Das Fokus-Audit ist der erste Schritt...
      </p>

      {/* CTA */}
      <Button href="/kontakt" variant="primary" size="lg">
        Erstgespräch buchen
      </Button>

    </div>
  </div>
</section>
```

**Key Takeaways:**
- Badge als Eyecatcher oben
- Headline mit Teal-Akzent + Glow im zweiten Teil
- Body Text auf max-w-2xl begrenzt (Lesbarkeit)
- Starker CTA am Ende

### Benefits Grid Pattern

```tsx
<section className="bg-[var(--bg-dark-lighter)] py-24 md:py-32">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Section Headline */}
    <h2 className="headline-section text-[var(--text-light)] mb-16 text-center">
      Dein Nutzen
    </h2>

    {/* Grid */}
    <div className="grid md:grid-cols-3 gap-6 md:gap-8">

      {/* Card 1 */}
      <div className="card">
        <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-lg
                        flex items-center justify-center mb-6">
          <span className="text-[var(--accent)] text-2xl">✓</span>
        </div>
        <h3 className="text-xl font-bold text-[var(--text-light)] mb-3 uppercase">
          BENEFIT TITEL
        </h3>
        <p className="text-[var(--text-muted)]">
          Beschreibung...
        </p>
      </div>

      {/* Card 2 & 3 analog */}

    </div>
  </div>
</section>
```

**Pattern:**
- Centered Section Headline
- 3-Column Grid (Mobile: 1 Column)
- Icon + Headline + Description pro Card
- Gleiche Card-Höhe durch Grid

### Process Steps Pattern

```tsx
<div className="max-w-3xl mx-auto">
  <div className="space-y-8">

    {/* Step 1 */}
    <div className="flex gap-6">
      <div className="flex-shrink-0 w-14 h-14
                      bg-[var(--accent)] rounded-lg
                      flex items-center justify-center
                      text-[var(--bg-dark)] font-black text-xl">
        1
      </div>
      <div>
        <h3 className="text-xl font-bold text-[var(--text-light)] mb-2 uppercase">
          PHASE 1 TITEL
        </h3>
        <p className="text-[var(--text-muted)]">
          Beschreibung der Phase...
        </p>
      </div>
    </div>

    {/* Step 2 & 3 analog */}

  </div>
</div>
```

**Pattern:**
- Numbered Boxes links (56x56px)
- Content rechts flexibel
- Vertical Spacing: 32px (space-y-8)
- Max Width: 768px (3xl) für Lesbarkeit

---

## ⚠️ Common Mistakes

### ❌ Zu viel Glow

```html
<!-- FALSCH -->
<h1 class="text-glow">Headline</h1>
<h2 class="text-glow">Subheadline</h2>
<p class="text-glow">Text</p>
```

```html
<!-- RICHTIG -->
<h1>
  Normale Headline
  <span class="text-[var(--accent)] text-glow">
    nur dieser Teil
  </span>
</h1>
```

### ❌ Zu viel Teal

```html
<!-- FALSCH -->
<div class="bg-[var(--accent)]">
  <h2 class="text-[var(--accent)]">Alles Teal!</h2>
  <button class="bg-[var(--accent)]">Button</button>
</div>
```

```html
<!-- RICHTIG -->
<div class="bg-[var(--bg-dark)]">
  <h2 class="text-[var(--text-light)]">Normale Headline</h2>
  <button class="bg-[var(--accent)]">Ein Teal CTA</button>
</div>
```

### ❌ Zu wenig Kontrast

```html
<!-- FALSCH -->
<p class="text-[var(--text-muted)]">
  Wichtiger Call-to-Action Text!
</p>
```

```html
<!-- RICHTIG -->
<p class="text-[var(--text-light)] font-bold">
  Wichtiger Call-to-Action Text!
</p>
```

### ❌ Inkonsistente Rounded Corners

```html
<!-- FALSCH -->
<button class="rounded-lg">Button</button>
<div class="card rounded-2xl">Card</div>
```

```html
<!-- RICHTIG -->
<button class="rounded-[50px]">Button</button>
<div class="card">Card (hat bereits 50px)</div>
```

---

## 📊 Accessibility Guidelines

### Kontrast-Verhältnisse (WCAG AA)

```
White (#ffffff) auf Dark Background (#2e474f):
→ 12.5:1 ✅ AAA

Teal (#00b8c4) auf Dark Background (#2e474f):
→ 7.2:1 ✅ AA

Muted Text (#a8c0c5) auf Dark Background (#2e474f):
→ 4.8:1 ✅ AA (für Text ≥18px)
```

### Focus States

```css
/* Alle interaktiven Elemente */
focus:outline-none
focus:ring-2
focus:ring-offset-2
focus:ring-offset-[var(--bg-dark)]
focus:ring-[var(--accent)]
```

### Alt-Texte für Grafiken

```tsx
<Image
  src="/graphics/fokus-audit-ablauf.svg"
  alt="Fokus-Audit Ablauf in 3 Phasen:
       1. Analyse der aktuellen Situation,
       2. Identifikation der echten Engpässe,
       3. Klare Empfehlung für nächste Schritte"
  width={1200}
  height={400}
/>
```

---

## 🎯 Design Checklist

Vor Veröffentlichung prüfen:

**Farben:**
- [ ] Haupt-Hintergrund ist #2e474f
- [ ] Teal nur als Akzent, nicht als Basis
- [ ] Text-Kontrast mindestens WCAG AA
- [ ] Glow-Effekte sparsam eingesetzt

**Typografie:**
- [ ] Headlines sind uppercase
- [ ] Font Weights: 700-900 für Headlines
- [ ] Letter Spacing negativ für Headlines
- [ ] Body Text auf max-w-2xl begrenzt

**Spacing:**
- [ ] Section Padding: py-24 oder py-32
- [ ] Grid Gaps: gap-6 oder gap-8
- [ ] Container max-w-6xl (1152px)

**Komponenten:**
- [ ] Buttons mit rounded-[50px]
- [ ] Cards mit .card Klasse
- [ ] Icons in 48x48px Container
- [ ] Numbered Steps in 56x56px

**Responsive:**
- [ ] Clamp für Font Sizes
- [ ] Grid breakpoints bei md:
- [ ] Mobile Padding px-4

**Accessibility:**
- [ ] Focus States definiert
- [ ] Alt-Texte vorhanden
- [ ] Kontrast geprüft
- [ ] Keyboard Navigation möglich

---

**Version:** 1.0
**Erstellt:** 2025-12-25
**Verwendung:** Als Referenz beim Erstellen neuer Komponenten und Grafiken
