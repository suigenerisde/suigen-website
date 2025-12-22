'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import type { AccessRequestData } from '@/types/fokus-check';

interface AccessRequestFormProps {
  onSubmit: (data: AccessRequestData) => Promise<void>;
  onBack: () => void;
}

export function AccessRequestForm({ onSubmit, onBack }: AccessRequestFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const formatPhoneNumber = (value: string) => {
    // Nur Zahlen und + erlauben
    let cleaned = value.replace(/[^\d+]/g, '');

    // Wenn mit 0 anfängt, zu +49 konvertieren (Deutschland)
    if (cleaned.startsWith('0')) {
      cleaned = '+49' + cleaned.slice(1);
    }

    // Wenn keine Ländervorwahl, +49 hinzufügen
    if (cleaned && !cleaned.startsWith('+')) {
      cleaned = '+49' + cleaned;
    }

    return cleaned;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    // Mindestens +49 und 8 weitere Ziffern
    return phone.length >= 11 && phone.startsWith('+');
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');

      // Validierung
      if (!name.trim()) {
        setError('Bitte gib Deinen Namen ein.');
        return;
      }
      if (!validateEmail(email)) {
        setError('Bitte gib eine gültige E-Mail-Adresse ein.');
        return;
      }
      if (!validatePhone(phone)) {
        setError('Bitte gib eine gültige Telefonnummer ein.');
        return;
      }

      setIsSubmitting(true);

      try {
        await onSubmit({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone,
        });
        setIsSubmitted(true);
      } catch (err) {
        console.error('Error submitting access request:', err);
        setError('Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.');
      } finally {
        setIsSubmitting(false);
      }
    },
    [name, email, phone, onSubmit]
  );

  // Erfolgs-Screen nach Absenden
  if (isSubmitted) {
    return (
      <div className="animate-fade-in text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--accent)]/10 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-[var(--accent)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-[var(--text-light)] mb-4">
          Anfrage erhalten!
        </h2>

        <p className="text-[var(--text-muted)] mb-6 max-w-md mx-auto">
          Danke, <span className="text-[var(--text-light)]">{name}</span>! Ich melde mich
          schnellstmöglich bei Dir mit Deinem persönlichen Einladungscode.
        </p>

        <div className="bg-[var(--accent)]/5 border border-[var(--accent)]/20 rounded-xl p-4 max-w-md mx-auto">
          <p className="text-[var(--text-light)] text-sm flex items-center justify-center gap-2">
            <svg className="w-5 h-5 text-[var(--accent)]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            Du erhältst Deinen Code per WhatsApp
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-light)] transition-colors mb-8"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Zurück
      </button>

      <span className="inline-block px-4 py-2 bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-bold rounded uppercase tracking-widest mb-8 border border-[var(--accent)]/20">
        Zugang anfragen
      </span>

      <h2 className="text-3xl font-bold text-[var(--text-light)] mb-4">
        Sichere Dir Deinen
        <br />
        <span className="text-[var(--accent)]">Einladungscode</span>
      </h2>

      <p className="text-[var(--text-muted)] mb-8 max-w-md">
        Hinterlasse Deine Kontaktdaten und ich schicke Dir Deinen persönlichen Zugang zum
        Fokus-Check.
      </p>

      <form onSubmit={handleSubmit} className="max-w-md space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-[var(--text-light)] text-sm font-medium mb-2">
            Dein Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Max Mustermann"
            className="w-full px-4 py-3 bg-[var(--bg-dark-card)] border border-[var(--text-muted)]/20 rounded-xl text-[var(--text-light)] placeholder:text-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-[var(--text-light)] text-sm font-medium mb-2">
            E-Mail-Adresse
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="max@beispiel.de"
            className="w-full px-4 py-3 bg-[var(--bg-dark-card)] border border-[var(--text-muted)]/20 rounded-xl text-[var(--text-light)] placeholder:text-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-[var(--text-light)] text-sm font-medium mb-2">
            Telefonnummer (für WhatsApp)
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="+49 170 1234567"
            className="w-full px-4 py-3 bg-[var(--bg-dark-card)] border border-[var(--text-muted)]/20 rounded-xl text-[var(--text-light)] placeholder:text-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all"
          />
          <p className="mt-1 text-xs text-[var(--text-muted)]">
            Hier schicke ich Dir Deinen Einladungscode
          </p>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Wird gesendet...' : 'Zugang anfragen'}
        </Button>
      </form>

      {/* Privacy Note */}
      <p className="mt-6 text-xs text-[var(--text-muted)] max-w-md flex items-start gap-2">
        <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          />
        </svg>
        Deine Daten werden nur zur Kontaktaufnahme verwendet und nicht an Dritte weitergegeben.
      </p>
    </div>
  );
}
