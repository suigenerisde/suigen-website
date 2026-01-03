'use client'

import * as runtime from 'react/jsx-runtime'
import { mdxComponents } from './mdx-components'

interface MDXContentProps {
  code: string
}

/**
 * MDX Content Renderer
 * Renders compiled MDX code from Velite with custom components
 */
export function MDXContent({ code }: MDXContentProps) {
  // Velite compiles MDX to a function body string
  // We need to evaluate it with the jsx runtime and components
  const Content = useMDXComponent(code)
  return <Content components={mdxComponents} />
}

function useMDXComponent(code: string) {
  const fn = new Function(code)
  return fn({ ...runtime }).default
}
