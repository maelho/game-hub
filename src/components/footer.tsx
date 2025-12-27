import { ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-auto border-t bg-background/95 py-6">
      <div className="container mx-auto flex flex-col items-center justify-center gap-2 px-4 text-center text-muted-foreground text-sm sm:px-6">
        <p className="flex items-center gap-1">
          Game data provided by{' '}
          <a
            className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
            href="https://rawg.io"
            rel="noopener noreferrer"
            target="_blank"
          >
            RAWG
            <ExternalLink className="h-3 w-3" />
          </a>
        </p>
        <p className="text-muted-foreground/70 text-xs">
          The largest open video game database
        </p>
      </div>
    </footer>
  )
}
