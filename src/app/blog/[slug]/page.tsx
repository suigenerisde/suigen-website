import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { posts } from '#site/content'
import { MDXContent } from '@/components/blog/mdx-content'
import { BlogPostingSchema } from '@/components/blog/BlogPostingSchema'

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
      <BlogPostingSchema post={post} />
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
            <div className="flex items-center gap-4 text-sm text-gray-400 border-b border-gray-700/50 pb-8">
              <span className="font-medium text-white">{post.author}</span>
              <span>|</span>
              <span>{formatDate(post.date)}</span>
              <span>|</span>
              <span>{post.readingTime} Min. Lesezeit</span>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-[var(--accent)] prose-strong:text-white prose-code:text-[var(--accent)] prose-pre:bg-[#1a2e35] prose-blockquote:border-[var(--accent)] prose-blockquote:text-gray-300">
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
                Zurueck zum Blog
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
    </>
  )
}
