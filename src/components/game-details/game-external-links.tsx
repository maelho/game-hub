import { ArrowSquareOutIcon } from '@phosphor-icons/react'
import { memo } from 'react'
import type { Game } from '@/services/rawg/types'

interface GameExternalLinksProps {
  game: Game
}

export const GameExternalLinks = memo(function GameExternalLinks({ game }: GameExternalLinksProps) {
  return (
    <div className="rounded-md border border-industrial-border bg-industrial-secondary p-5">
      <h3 className="mb-4 border-industrial-border-strong border-b pb-2 font-serif text-industrial-text text-base leading-[1.2] tracking-[-0.02em]">
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
            <ArrowSquareOutIcon className="size-3" weight="bold" />
          </a>
        )}
        <a
          className="flex items-center justify-between py-2 text-industrial-text-secondary text-xs transition-colors hover:text-industrial-accent"
          href={`https://rawg.io/games/${game.slug}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span>RAWG Database</span>
          <ArrowSquareOutIcon className="size-3" weight="bold" />
        </a>
      </div>
    </div>
  )
})