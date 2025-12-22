'use client';

import { useState } from 'react';

interface DeliveryChoiceProps {
  onSubmit: (data: { email: string; phone?: string }) => void;
  isLoading: boolean;
}

export function DeliveryChoice({ onSubmit, isLoading }: DeliveryChoiceProps) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    // Erlaubt: +49, 0049, 0, mit Leerzeichen/Bindestrichen
    const cleaned = phone.replace(/[\s\-\/]/g, '');
    return /^(\+|00)?[0-9]{8,15}$/.test(cleaned);
  };

  const formatPhoneForWhatsApp = (phone: string): string => {
    let cleaned = phone.replace(/[\s\-\/]/g, '');
    // Deutsche Nummer ohne Vorwahl
    if (cleaned.startsWith('0') && !cleaned.startsWith('00')) {
      cleaned = '49' + cleaned.substring(1);
    }
    // 00 Prefix entfernen
    if (cleaned.startsWith('00')) {
      cleaned = cleaned.substring(2);
    }
    // + entfernen
    if (cleaned.startsWith('+')) {
      cleaned = cleaned.substring(1);
    }
    return cleaned;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; phone?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Bitte gib Deine E-Mail-Adresse ein.';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Bitte gib eine gültige E-Mail-Adresse ein.';
    }

    if (phone.trim() && !validatePhone(phone)) {
      newErrors.phone = 'Bitte gib eine gültige Telefonnummer ein.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit({
        email,
        phone: phone.trim() ? formatPhoneForWhatsApp(phone) : undefined,
      });
    }
  };

  const hasPhone = phone.trim().length > 0;

  return (
    <div className="animate-fade-in text-center">
      <div className="mb-6">
        <span className="text-5xl">🎯</span>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-light)] mb-4">
        Fast geschafft!
      </h2>

      <p className="text-[var(--text-muted)] mb-8">
        Wohin sollen wir Dein Ergebnis schicken?
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* E-Mail Feld */}
        <div>
          <label className="block text-left text-[var(--text-muted)] text-sm mb-2">
            E-Mail-Adresse *
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="deine@email.de"
            className="w-full p-4 rounded-2xl bg-[var(--bg-dark-card)] border-2 border-[var(--text-muted)]/20 text-[var(--text-light)] placeholder:text-[var(--text-muted)]/50 focus:border-[var(--accent)] focus:outline-none transition-colors"
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-2 text-left">{errors.email}</p>
          )}
        </div>

        {/* Telefon Feld */}
        <div>
          <label className="block text-left text-[var(--text-muted)] text-sm mb-2">
            Telefon (WhatsApp) – optional
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+49 170 1234567"
            className="w-full p-4 rounded-2xl bg-[var(--bg-dark-card)] border-2 border-[var(--text-muted)]/20 text-[var(--text-light)] placeholder:text-[var(--text-muted)]/50 focus:border-[var(--accent)] focus:outline-none transition-colors"
            disabled={isLoading}
          />
          {errors.phone && (
            <p className="text-red-400 text-sm mt-2 text-left">{errors.phone}</p>
          )}
        </div>

        {/* Benefit-Hinweis für WhatsApp */}
        <div
          className={`p-4 rounded-2xl border-2 transition-all ${
            hasPhone
              ? 'bg-[var(--accent)]/10 border-[var(--accent)]/30'
              : 'bg-[var(--bg-dark-card)] border-[var(--text-muted)]/10'
          }`}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">{hasPhone ? '🎁' : '💡'}</span>
            <div className="text-left">
              {hasPhone ? (
                <>
                  <p className="text-[var(--accent)] font-medium text-sm">
                    Du erhältst den detaillierten PDF-Report!
                  </p>
                  <p className="text-[var(--text-muted)] text-sm mt-1">
                    Mit persönlicher Analyse, Fokus-Killern und KI-generierten
                    Vertiefungsfragen per WhatsApp.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-[var(--text-muted)] font-medium text-sm">
                    Mit Telefonnummer erhältst Du mehr:
                  </p>
                  <p className="text-[var(--text-muted)] text-sm mt-1">
                    Detaillierter PDF-Report per WhatsApp mit persönlicher
                    Analyse und Handlungsempfehlungen.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-[var(--accent)] text-white font-bold rounded-full hover:bg-[var(--accent)]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Wird berechnet...
            </>
          ) : (
            <>
              Ergebnis anzeigen
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </>
          )}
        </button>
      </form>

      <p className="text-[var(--text-muted)] text-sm mt-6 flex items-center justify-center gap-2">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        Kein Spam.
      </p>
    </div>
  );
}
