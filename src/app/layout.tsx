import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { JsonLd } from '@/components/seo/JsonLd';
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

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://suigen.suimation.de';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'SUIGEN - Fokus-Experte & AI-Pionier seit 2014 | Thilo Pfeil',
    template: '%s | SUIGEN',
  },
  description:
    'Du weisst, was zu tun ist - du tust es nur nicht. SUIGEN hilft Unternehmern, Fokus zu finden, bevor sie automatisieren. AI-Erfahrung seit 2014.',
  keywords: [
    'fokus',
    'fokus coaching',
    'unternehmer coaching',
    'geschaeftsfuehrer beratung',
    'produktivitaet steigern',
    'automatisierung unternehmen',
    'ai beratung',
    'ki experte',
    'thilo pfeil',
    'sui generis',
    'human first',
    'deep work',
    'zeitmanagement fuehrungskraefte',
    'skalierung mittelstand',
  ],
  authors: [{ name: 'Thilo Pfeil', url: 'https://www.linkedin.com/in/sui-generis/' }],
  creator: 'SUI GENERIS GmbH',
  publisher: 'SUI GENERIS GmbH',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: baseUrl,
    siteName: 'SUIGEN',
    title: 'SUIGEN - Fokus-Experte & AI-Pionier seit 2014',
    description:
      'Du weisst, was zu tun ist - du tust es nur nicht. SUIGEN hilft Unternehmern, Fokus zu finden. Von Thilo Pfeil - MBA (LSE), AI-Erfahrung seit 2014.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SUIGEN - Fokus. Human-First. System.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SUIGEN - Fokus-Experte & AI-Pionier seit 2014',
    description: 'Du weisst, was zu tun ist. Du tust es nur nicht. Fokus-Coaching fuer Unternehmer.',
    images: ['/og-image.png'],
  },
  // TEMPORAER: noindex bis Website final ist
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  /* AKTIVIEREN WENN FERTIG:
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  */
  alternates: {
    canonical: baseUrl,
  },
  verification: {
    // Google Search Console - spaeter hinzufuegen
    // google: 'verification-code',
  },
  category: 'business',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <JsonLd />
        <Script
          src="https://umami.suimation.de/script.js"
          data-website-id="9e923068-f849-44da-81b0-04cc772cac14"
          strategy="lazyOnload"
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
