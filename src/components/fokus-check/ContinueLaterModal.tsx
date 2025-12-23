'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/Button';

interface ContinueLaterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { email?: string; phone?: string }) => Promise<void>;
  userName: string;
  questionNumber: number;
  totalQuestions: number;
}

export function ContinueLaterModal({
  isOpen,
  onClose,
  onSubmit,
  userName,
  questionNumber,
  totalQuestions,
}: ContinueLaterModalProps) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'email' | 'whatsapp' | null>(null);

  const formatPhoneNumber = (value: string) => {
    let cleaned = value.replace(/[^\d+]/g, '');
    if (cleaned.startsWith('0')) {
      cleaned = '+49' + cleaned.slice(1);
    }
    if (cleaned && !cleaned.startsWith('+')) {
      cleaned = '+49' + cleaned;
    }
    return cleaned;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhoneNumber(e.target.value));
    setError('');
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return phone.length >= 11 && phone.startsWith('+');
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');

      // Validate based on delivery method
      if (deliveryMethod === 'email' && !validateEmail(email)) {
        setError('Bitte gib eine gültige E-Mail-Adresse ein.');
        return;
      }
      if (deliveryMethod === 'whatsapp' && !validatePhone(phone)) {
        setError('Bitte gib eine gültige Telefonnummer ein.');
        return;
      }
      if (!deliveryMethod) {
        setError('Bitte wähle eine Zustellmethode.');
        return;
      }

      setIsSubmitting(true);

      try {
        await onSubmit({
          email: deliveryMethod === 'email' ? email.trim().toLowerCase() : undefined,
          phone: deliveryMethod === 'whatsapp' ? phone : undefined,
        });
        setIsSubmitted(true);
      } catch (err) {
        console.error('Error saving progress:', err);
        setError('Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.');
      } finally {
        setIsSubmitting(false);
      }
    },
    [email, phone, deliveryMethod, onSubmit]
  );

  if (!isOpen) return null;

  // Success screen
  if (isSubmitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-[var(--bg-dark-card)] rounded-3xl p-8 max-w-md mx-4 border border-[var(--accent)]/30 shadow-2xl animate-fade-in">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--accent)]/10 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-[var(--accent)]"
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

            <h3 className="text-2xl font-bold text-[var(--text-light)] mb-2">
              Link unterwegs!
            </h3>

            <p className="text-[var(--text-muted)] mb-6">
              {deliveryMethod === 'email'
                ? `Wir haben Dir einen Link an ${email} geschickt.`
                : `Du erhältst gleich eine WhatsApp mit Deinem Fortsetzungs-Link.`}
            </p>

            <p className="text-sm text-[var(--text-muted)]">
              Der Link ist <span className="text-[var(--accent)]">7 Tage</span> gültig.
            </p>

            <Button onClick={onClose} variant="secondary" size="lg" className="w-full mt-6">
              Alles klar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-[var(--bg-dark-card)] rounded-3xl p-8 max-w-md mx-4 border border-[var(--accent)]/30 shadow-2xl animate-fade-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-light)] transition-colors"
          aria-label="Schließen"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--accent)]/10 flex items-center justify-center">
            <span className="text-3xl">📩</span>
          </div>

          <h3 className="text-2xl font-bold text-[var(--text-light)] mb-2">
            Später weitermachen?
          </h3>

          <p className="text-[var(--text-muted)]">
            {userName ? `Hey ${userName}, ` : ''}Wir schicken Dir einen Link, mit dem Du
            bei <span className="text-[var(--accent)]">Frage {questionNumber}/{totalQuestions}</span> weitermachen kannst.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Delivery Method Selection */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setDeliveryMethod('email');
                setError('');
              }}
              className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                deliveryMethod === 'email'
                  ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--text-light)]'
                  : 'border-[var(--text-muted)]/20 text-[var(--text-muted)] hover:border-[var(--text-muted)]/40'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm font-medium">E-Mail</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setDeliveryMethod('whatsapp');
                setError('');
              }}
              className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                deliveryMethod === 'whatsapp'
                  ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--text-light)]'
                  : 'border-[var(--text-muted)]/20 text-[var(--text-muted)] hover:border-[var(--text-muted)]/40'
              }`}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
              </svg>
              <span className="text-sm font-medium">WhatsApp</span>
            </button>
          </div>

          {/* Email Input */}
          {deliveryMethod === 'email' && (
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="deine@email.de"
                className="w-full px-4 py-3 bg-[var(--bg-dark)] border border-[var(--text-muted)]/20 rounded-xl text-[var(--text-light)] placeholder:text-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all"
                autoFocus
              />
            </div>
          )}

          {/* Phone Input */}
          {deliveryMethod === 'whatsapp' && (
            <div>
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="+49 170 1234567"
                className="w-full px-4 py-3 bg-[var(--bg-dark)] border border-[var(--text-muted)]/20 rounded-xl text-[var(--text-light)] placeholder:text-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all"
                autoFocus
              />
            </div>
          )}

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
            disabled={!deliveryMethod || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Wird gesendet...' : 'Link senden'}
          </Button>
        </form>

        <p className="mt-4 text-center text-xs text-[var(--text-muted)]">
          Kein Spam. Der Link ist 7 Tage gültig.
        </p>
      </div>
    </div>
  );
}
