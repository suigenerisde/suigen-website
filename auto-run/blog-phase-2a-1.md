# Blog Phase 2a-1: Reading Progress Bar einbinden

## Kontext
Die `ReadingProgressBar` Komponente existiert bereits in `src/components/ReadingProgressBar.tsx`.
Sie muss nur noch in die Blog-Artikel-Seite eingebunden werden.

## Tasks

- [x] Reading Progress Bar in `src/app/blog/[slug]/page.tsx` importieren und einbinden
- [x] Komponente oberhalb von `<Header />` platzieren (fixed top position)
- [x] Testen ob Progress Bar bei Scroll erscheint
- [x] Verify: Bar erreicht 100% am Artikelende

**Erledigt am 2026-01-04:**
- Import hinzugefuegt: `import { ReadingProgressBar } from '@/components/ReadingProgressBar';`
- Komponente als erstes Element im JSX-Return platziert (vor `BlogPostingSchema` und `Header`)
- Build erfolgreich durchgelaufen (42 Seiten generiert)
- Komponente verwendet: `fixed top-0 left-0 right-0 z-50` (korrekte Position)
- Scroll-Berechnung: `scrollY / (scrollHeight - innerHeight) * 100` = 100% am Ende
- 60fps Performance durch requestAnimationFrame + 16ms Throttle

## Technische Details

```tsx
// Import hinzufuegen
import { ReadingProgressBar } from '@/components/ReadingProgressBar';

// Im JSX vor Header einbinden
<>
  <ReadingProgressBar />
  <BlogPostingSchema post={post} />
  <Header />
  ...
</>
```

## Akzeptanzkriterien
- Progress Bar erscheint beim Scrollen
- Smooth Animation (60fps)
- Verschwindet bei 0% (Seitenanfang)
- Erreicht 100% am Artikelende
