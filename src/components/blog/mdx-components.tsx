import type { MDXComponents } from 'mdx/types'
import { FAQ, FAQSchema } from './FAQ'
import { BlogImage } from './BlogImage'
import { FokusCheckCTA } from './FokusCheckCTA'

/**
 * MDX Components Registry
 * All custom components available in MDX blog posts
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom blog components
    FAQ,
    FAQSchema,
    BlogImage,
    FokusCheckCTA,

    // Pass through any additional components
    ...components,
  }
}

// Direct export for Velite MDX rendering
export const mdxComponents: MDXComponents = {
  FAQ,
  FAQSchema,
  BlogImage,
  FokusCheckCTA,
}
