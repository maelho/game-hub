import { ExternalLink } from 'lucide-react'
import { memo } from 'react'
import type { Game } from '@/services/rawg/types'

interface GameExternalLinksProps {
  game: Game
}

export const GameExternalLinks = memo(function GameExternalLinks({ game }: GameExternalLinksProps) {
  return (
    <div className="rounded-sm border border-industrial-border bg-industrial-secondary p-4">
      <h3 className="mb-4 border-industrial-border-strong border-b pb-2 font-medium text-[10px] text-industrial-accent uppercase tracking-wider">
        External
      </h3>

      <div className="space-y-2">
        {game.website && (
          <a
            className="flex items-center justify-between border-industrial-border border-b border-dotted py-2 text-industrial-text-secondary text-xs transition-colors last:border-b-0 hover:text-industrial-accent"
            href={game.website}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>Official Website</span>
            <ExternalLink className="size-3" />
          </a>
        )}
        <a
          className="flex items-center justify-between py-2 text-industrial-text-secondary text-xs transition-colors hover:text-industrial-accent"
          href={`https://rawg.io/games/${game.slug}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span>RAWG Database</span>
          <ExternalLink className="size-3" />
        </a>
      </div>
    </div>
  )
})
