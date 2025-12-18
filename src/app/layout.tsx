import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'SUIGEN - Fokus. Human-First. System.',
    template: '%s | SUIGEN',
  },
  description:
    '3 Stunden Klarheit statt 6 Monate Chaos. FOKUS: Human-First und FOKUS: System fuer Unternehmer, die im Hamsterrad stecken.',
  keywords: [
    'fokus',
    'unternehmer',
    'geschaeftsfuehrer',
    'klarheit',
    'skalierung',
    'automatisierung',
  ],
  authors: [{ name: 'Thilo Pfeil' }],
  creator: 'SUI GENERIS GmbH',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://suigen.de',
    siteName: 'SUIGEN',
    title: 'SUIGEN - Fokus. Human-First. System.',
    description:
      '3 Stunden Klarheit statt 6 Monate Chaos. FOKUS: Human-First und FOKUS: System fuer Unternehmer.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SUIGEN - Fokus. Human-First. System.',
    description: '3 Stunden Klarheit statt 6 Monate Chaos.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
