import parse, { domToReact, type Element, type HTMLReactParserOptions } from 'html-react-parser'
import type { JSX } from 'react'
import { cn } from '@/lib/utils'

const voidElements = new Set([
  'br',
  'hr',
  'img',
  'input',
  'meta',
  'link',
  'area',
  'base',
  'col',
  'embed',
  'source',
  'track',
  'wbr',
])

const classMap: Record<string, string> = {
  p: 'mb-4 leading-relaxed text-muted-foreground',
  h1: 'mb-4 text-3xl font-semibold',
  h2: 'mb-3 text-2xl font-semibold',
  h3: 'mb-2 text-xl font-semibold',
  ul: 'mb-4 list-disc space-y-2 pl-6',
  ol: 'mb-4 list-decimal space-y-2 pl-6',
  li: 'leading-relaxed text-muted-foreground',
  a: 'text-primary underline underline-offset-4',
  img: 'my-4 rounded-lg',
  strong: 'font-semibold text-foreground',
  em: 'italic text-foreground',
  blockquote: 'mb-4 border-l-4 border-primary/50 pl-4 italic text-muted-foreground',
}

const descriptionOptions: HTMLReactParserOptions = {
  replace: (node) => {
    if (node.type !== 'tag') return

    const element = node as Element
    const Tag = element.name as keyof JSX.IntrinsicElements
    const className = cn(classMap[element.name] ?? '', element.attribs?.class, element.attribs?.className)

    if (voidElements.has(element.name)) {
      return <Tag {...element.attribs} className={className || undefined} />
    }

    return (
      <Tag {...element.attribs} className={className}>
        {domToReact(element.children as Element[], descriptionOptions)}
      </Tag>
    )
  },
}

interface GameDescriptionProps {
  description: string | null | undefined
}

export default function GameDescription({ description }: GameDescriptionProps) {
  if (!description) {
    return <p className="text-muted-foreground">No description available.</p>
  }

  return <div>{parse(description, descriptionOptions)}</div>
}
