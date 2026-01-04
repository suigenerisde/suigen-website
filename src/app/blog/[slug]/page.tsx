import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { posts } from '#site/content'
import { MDXContent } from '@/components/blog/mdx-content'
import { BlogPostingSchema } from '@/components/blog/BlogPostingSchema'
import { ReadingProgressBar } from '@/components/ReadingProgressBar'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

function getPostBySlug(slug: string) {
  return posts.find((post) => post.slugAsParams === slug)
}

export async function generateStaticParams() {
  return posts
    .filter((post) => post.published)
    .map((post) => ({
      slug: post.slugAsParams,
    }))
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Artikel nicht gefunden | SUI GENERIS',
    }
  }

  return {
    title: `${post.title} | SUI GENERIS Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [{ url: post.image, alt: post.imageAlt }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : undefined,
    },
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post || !post.published) {
    notFound()
  }

  return (
    <>
      <ReadingProgressBar />
      <BlogPostingSchema post={post} />
      <Header />
      <main className="min-h-screen bg-[var(--bg-dark)]">
        {/* Article Header */}
        <article className="max-w-3xl mx-auto px-4 py-20">
          {/* Meta Info */}
          <div className="mb-8">
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Description */}
            {post.description && (
              <p className="text-xl text-gray-300 mb-6">{post.description}</p>
            )}

            {/* Author & Date */}
            <div className="flex items-center gap-4 text-sm text-gray-400 pb-8">
              <span className="font-medium text-white">{post.author}</span>
              <span>|</span>
              <span>{formatDate(post.date)}</span>
              <span>|</span>
              <span>{post.readingTime} Min. Lesezeit</span>
            </div>
          </div>

          {/* Hero Image */}
          {post.image && (
            <div className="relative w-full aspect-[16/9] mb-12 rounded-xl overflow-hidden">
              <Image
                src={post.image}
                alt={post.imageAlt || post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-700/50 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-3 prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6 prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-strong:font-semibold prose-code:text-[var(--accent)] prose-code:bg-[#1a2e35] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-[#1a2e35] prose-pre:border prose-pre:border-gray-700/50 prose-blockquote:border-[var(--accent)] prose-blockquote:border-l-4 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-300 prose-ul:my-6 prose-ul:space-y-2 prose-ol:my-6 prose-ol:space-y-2 prose-li:text-gray-300 prose-li:leading-relaxed prose-table:my-8 prose-table:w-full prose-thead:border-b prose-thead:border-gray-600 prose-th:text-left prose-th:text-white prose-th:font-semibold prose-th:py-3 prose-th:px-4 prose-td:py-3 prose-td:px-4 prose-td:text-gray-300 prose-tr:border-b prose-tr:border-gray-700/50 prose-hr:my-12 prose-hr:border-gray-700/50">
            <MDXContent code={post.body} />
          </div>

          {/* Article Footer */}
          <div className="mt-16 pt-8 border-t border-gray-700/50">
            <div className="flex items-center justify-between">
              <a
                href="/blog"
                className="text-[var(--accent)] hover:underline flex items-center gap-2"
              >
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Zurück zum Blog
              </a>

              {post.linkedinOriginal && (
                <a
                  href={post.linkedinOriginal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Original auf LinkedIn
                </a>
              )}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
