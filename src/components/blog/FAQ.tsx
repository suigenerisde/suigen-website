'use client'

import { useState, ReactNode } from 'react'

interface FAQProps {
  question: string
  children: ReactNode
}

export function FAQ({ question, children }: FAQProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="my-6 border border-gray-700/50 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between bg-[#1a2e35] hover:bg-[#243d46] transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-white pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-[var(--accent)] flex-shrink-0 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="px-6 py-4 bg-[#1a2e35]/50 text-gray-300">
          {children}
        </div>
      </div>
    </div>
  )
}

// FAQ Schema Component for SEO
interface FAQSchemaProps {
  faqs: Array<{ question: string; answer: string }>
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
