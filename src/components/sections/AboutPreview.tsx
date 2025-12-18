import { Button } from '@/components/ui/Button';

export function AboutPreview() {
  return (
    <section className="bg-[var(--bg-dark-lighter)] py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 md:order-1">
            <img
              src="/thilo-pfeil.jpg"
              alt="Thilo Pfeil - Gründer von SUI GENERIS"
              className="w-full aspect-square object-cover object-top rounded-lg"
            />
          </div>

          {/* Content */}
          <div className="order-1 md:order-2">
            <h2 className="headline-section text-[var(--text-light)] mb-6">
              Thilo Pfeil
            </h2>
            <p className="text-lg text-[var(--text-muted)] mb-6">
              Gründer von SUI GENERIS. MBA (LSE). 6 Jahre Vorstand.
              <br />
              AI-Erfahrung seit 2014.
            </p>
            <p className="text-[var(--text-light)] mb-8 text-lg leading-relaxed">
              &ldquo;Ich habe selbst erlebt, wie es ist, im Hamsterrad zu stecken.
              80 Stunden pro Woche, 20 Tools, und trotzdem das Gefühl, nichts zu schaffen.
              SUIGEN ist das System, das ich mir damals gewünscht hätte.&rdquo;
            </p>
            <Button href="/ueber" variant="secondary">
              Mehr erfahren
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
