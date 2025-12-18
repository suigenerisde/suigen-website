'use client';

import Link from 'next/link';

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-radial relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--accent)] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Main Headline */}
        <h1 className="headline-hero animate-slide-up">
          <span className="text-[var(--text-light)]">Du weißt,</span>
          <br />
          <span className="text-[var(--text-light)]">was zu tun ist.</span>
        </h1>

        {/* Gold Subline */}
        <p className="headline-hero text-[var(--accent)] mt-4 animate-slide-up delay-1 text-glow">
          Du tust es nur nicht.
        </p>

        {/* Description */}
        <p className="body-text max-w-2xl mx-auto mt-8 animate-slide-up delay-2">
          Dein nächstes Tool bringt nichts – solange Dir der Fokus fehlt.
        </p>

        {/* CTA Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center animate-slide-up delay-3">
          <Link href="/kontakt" className="btn btn-primary">
            Erstgespräch buchen
          </Link>
          <Link href="/fokus-audit" className="btn btn-secondary">
            Fokus-Audit entdecken
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in delay-5">
        <div className="w-6 h-10 border-2 border-[var(--border-subtle)] rounded-full flex justify-center">
          <div className="w-1 h-3 bg-[var(--text-muted)] rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
