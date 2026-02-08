import { ExternalLink } from 'lucide-react'
import { memo } from 'react'

interface SpecRowProps {
  label: string
  value: React.ReactNode
  href?: string
}

export const SpecRow = memo(function SpecRow({ label, value, href }: SpecRowProps) {
  if (!value) return null

  return (
    <div className="flex items-baseline justify-between gap-4 border-industrial-border border-b border-dotted py-2 last:border-b-0">
      <span className="shrink-0 font-medium text-[10px] text-industrial-text-tertiary uppercase tracking-wider">
        {label}
      </span>
      <span className="mono-data text-right text-industrial-text text-xs">
        {href ? (
          <a
            className="inline-flex items-center gap-1 text-industrial-accent transition-colors hover:underline"
            href={href}
            rel="noopener noreferrer"
            target="_blank"
          >
            {value}
            <ExternalLink className="size-3" />
          </a>
        ) : (
          value
        )}
      </span>
    </div>
  )
})
