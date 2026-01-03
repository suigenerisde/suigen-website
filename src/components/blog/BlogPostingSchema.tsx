interface Post {
  title: string
  description?: string
  date: string
  author: string
  image?: string
  imageAlt?: string
  slugAsParams: string
  readingTime: number
  tags?: string[]
}

interface BlogPostingSchemaProps {
  post: Post
}

export function BlogPostingSchema({ post }: BlogPostingSchemaProps) {
  const baseUrl = 'https://suigeneris.de'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description || '',
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
      url: `${baseUrl}/ueber-uns`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'SUI GENERIS GmbH',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${post.slugAsParams}`,
    },
    url: `${baseUrl}/blog/${post.slugAsParams}`,
    wordCount: post.readingTime * 200,
    timeRequired: `PT${post.readingTime}M`,
    ...(post.image && {
      image: {
        '@type': 'ImageObject',
        url: post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`,
        ...(post.imageAlt && { caption: post.imageAlt }),
      },
    }),
    ...(post.tags &&
      post.tags.length > 0 && {
        keywords: post.tags.join(', '),
      }),
    inLanguage: 'de-DE',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
