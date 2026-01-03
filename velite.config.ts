import { defineConfig, defineCollection, s } from 'velite'

// Computed fields for blog posts
const computedFields = <T extends { slug: string; body: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split('/').slice(1).join('/'),
  readingTime: Math.ceil(data.body.split(/\s+/).length / 200), // ~200 words per minute
})

// Blog posts collection
const posts = defineCollection({
  name: 'Post',
  pattern: 'blog/**/*.mdx',
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(120),
      description: s.string().max(300).optional(),
      date: s.isodate(),
      published: s.boolean().default(true),
      tags: s.array(s.string()).optional(),
      image: s.string().optional(),
      imageAlt: s.string().optional(),
      author: s.string().default('Thilo Pfeil'),
      linkedinOriginal: s.string().optional(), // Link to original LinkedIn post
      body: s.mdx(),
    })
    .transform(computedFields),
})

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { posts },
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})
