import { ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-auto border-industrial-border border-t bg-industrial-primary py-6">
      <div className="container mx-auto flex flex-col items-center justify-center gap-3 px-4 text-center sm:px-6">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-industrial-text-tertiary uppercase tracking-wider">Data source:</span>
          <a
            className="inline-flex items-center gap-1.5 text-industrial-text-secondary text-xs transition-colors hover:text-industrial-accent"
            href="https://rawg.io"
            rel="noopener noreferrer"
            target="_blank"
          >
            RAWG.io
            <ExternalLink className="size-3" />
          </a>
        </div>
        <p className="mono-data text-[10px] text-industrial-text-tertiary">The largest open video game database</p>
      </div>
    </footer>
  )
}
