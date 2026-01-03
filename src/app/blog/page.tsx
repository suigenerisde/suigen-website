import { Metadata } from 'next'
import Link from 'next/link'
import { posts } from '#site/content'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Blog | SUI GENERIS',
  description: 'Insights zu Produktivität, Fokus und Human First - Thilo Pfeils Blog über effektives Arbeiten und Unternehmertum.',
  openGraph: {
    title: 'Blog | SUI GENERIS',
    description: 'Insights zu Produktivität, Fokus und Human First',
    type: 'website',
  },
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default function BlogPage() {
  // Filter published posts and sort by date (newest first)
  const publishedPosts = posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[var(--bg-dark)]">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Blog
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Gedanken zu Produktivität, Fokus und dem Human First Prinzip.
            Praktische Insights für Unternehmer und Führungskräfte.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {publishedPosts.length === 0 ? (
            <p className="text-center text-gray-400 text-lg">
              Noch keine Artikel veröffentlicht. Komm bald wieder!
            </p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {publishedPosts.map((post) => (
                <article
                  key={post.slug}
                  className="group bg-[#1a2e35] rounded-2xl overflow-hidden border border-gray-700/50 hover:border-[var(--accent)]/50 transition-all duration-300"
                >
                  <Link href={`/blog/${post.slugAsParams}`}>
                    {/* Card Content */}
                    <div className="p-6">
                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Title */}
                      <h2 className="text-xl font-semibold text-white mb-3 group-hover:text-[var(--accent)] transition-colors">
                        {post.title}
                      </h2>

                      {/* Description */}
                      {post.description && (
                        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                          {post.description}
                        </p>
                      )}

                      {/* Meta */}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{formatDate(post.date)}</span>
                        <span>{post.readingTime} Min. Lesezeit</span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
      <Footer />
    </>
  )
}
