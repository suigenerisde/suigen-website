# Blog Infrastructure - Phase 1: Technical Foundation

> Auto-Run Plan für SUIGEN Blog mit Velite + MDX

## Kontext

- **Ziel:** SEO- und GEO-optimierter Blog für SUIGEN
- **Stack:** Velite + MDX + Next.js 16
- **Design:** Dark Mode, SUIGEN-Branding (--bg-dark: #2e474f, --accent: #00b8c4)
- **Nach Phase 1:** LinkedIn-Posts als Content-Basis harvesten

---

## Tasks

- [x] **1. Velite installieren** - `bun add velite` ausführen und Abhängigkeiten prüfen
  - ✅ Bereits installiert: velite v0.3.1 in package.json

- [x] **2. Velite Konfiguration erstellen** - `velite.config.ts` im Root mit Blog-Collection (slug, title, description, date, tags, published, body) und computedFields für readingTime
  - ✅ velite.config.ts existiert mit Post-Collection, readingTime, linkedinOriginal-Feld

- [x] **3. Content-Ordnerstruktur anlegen** - `content/blog/` Ordner erstellen für MDX-Artikel
  - ✅ content/blog/ existiert mit 2 MDX-Dateien

- [x] **4. Next.js Config für Velite anpassen** - `next.config.ts` erweitern mit Velite-Plugin-Integration (webpack/turbopack)
  - ✅ Velite-Build-Integration in next.config.ts (Zeilen 4-10)

- [x] **5. TypeScript-Pfad für Content hinzufügen** - In `tsconfig.json` den Pfad `#site/content` auf `.velite` mappen
  - ✅ Pfad "#site/content": ["./.velite"] in tsconfig.json

- [x] **6. Beispiel-Artikel erstellen** - `content/blog/fokus-check-einfuehrung.mdx` mit Frontmatter (title, description, date, tags) und Beispiel-Content inkl. FAQ-Sektion
  - ✅ fokus-check-einfuehrung.mdx existiert mit FAQ, FokusCheckCTA

- [x] **7. Blog-Übersichtsseite erstellen** - `src/app/blog/page.tsx` mit Grid-Layout für Artikel-Cards, Metadata für SEO
  - ✅ src/app/blog/page.tsx mit Grid-Layout, SEO-Metadata, formatDate

- [x] **8. Blog-Artikel-Route erstellen** - `src/app/blog/[slug]/page.tsx` mit generateStaticParams, MDX-Rendering, generateMetadata für SEO
  - ✅ src/app/blog/[slug]/page.tsx mit generateStaticParams, generateMetadata, BlogPostingSchema-Import

- [x] **9. MDX-Komponenten erstellen** - `src/components/blog/` Ordner mit: FAQ.tsx (mit Schema.org JSON-LD), BlogImage.tsx (Next/Image Wrapper), FokusCheckCTA.tsx (Lead-Capture)
  - ✅ FAQ.tsx mit FAQSchema, BlogImage.tsx, FokusCheckCTA.tsx alle vorhanden

- [ ] **10. BlogPosting Schema-Komponente erstellen** - `src/components/blog/BlogPostingSchema.tsx` mit JSON-LD für BlogPosting, author, datePublished, etc.

- [ ] **11. MDX-Components Registry erstellen** - `src/components/blog/mdx-components.tsx` die alle Blog-Komponenten für MDX verfügbar macht

- [ ] **12. Sitemap erweitern** - `src/app/sitemap.ts` anpassen um Blog-Posts dynamisch einzubinden

- [ ] **13. llms.txt erstellen** - `public/llms.txt` mit AI-Crawler-Hinweisen für GEO-Optimierung

- [ ] **14. Navigation erweitern** - Blog-Link in Header-Navigation hinzufügen (navItems in entsprechender Komponente)

- [ ] **15. Build testen** - `bun run build` ausführen und sicherstellen dass alles kompiliert

- [ ] **16. Dev-Server starten und prüfen** - `bun run dev` starten, `/blog` und `/blog/fokus-check-einfuehrung` aufrufen und Funktionalität verifizieren

---

## Erfolgskriterien

Nach Abschluss dieser Phase:
- [ ] `/blog` zeigt Artikel-Übersicht
- [ ] `/blog/[slug]` rendert MDX-Artikel korrekt
- [ ] FAQ-Komponente generiert Schema.org JSON-LD
- [ ] BlogPosting Schema auf Artikel-Seiten
- [ ] Sitemap enthält Blog-Posts
- [ ] llms.txt ist unter `/llms.txt` erreichbar
- [ ] Build läuft ohne Fehler

---

## Nächste Phase (Interaktiv)

Phase 2 wird interaktiv mit Design-Feedback:
- Blog-Card Design
- Artikel-Typography
- Reading Progress Bar
- Table of Contents
- Related Posts
- Mobile Optimization
