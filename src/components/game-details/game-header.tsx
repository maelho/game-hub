import { Link } from '@tanstack/react-router'
import { CaretLeftIcon } from '@phosphor-icons/react'
import { memo } from 'react'
import MetacriticScore from '@/components/metacritic-score'
import type { Game } from '@/services/rawg/types'

interface GameHeaderProps {
  game: Game
}

export const GameHeader = memo(function GameHeader({ game }: GameHeaderProps) {
  return (
    <>
      <Link
        className="mb-6 inline-flex items-center gap-2 text-industrial-text-secondary text-xs transition-colors hover:text-industrial-accent"
        to="/"
      >
        <CaretLeftIcon className="size-3" weight="bold" />
        <span className="uppercase tracking-wider">Back</span>
      </Link>

      <header className="mb-8 border-industrial-border-strong border-b pb-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <h1 className="font-serif text-industrial-text text-2xl leading-[1.1] tracking-[-0.02em] sm:text-3xl">
              {game.name}
            </h1>
            {game.alternative_names && game.alternative_names.length > 0 && (
              <p className="text-industrial-text-tertiary text-xs">
                aka {game.alternative_names.slice(0, 2).join(', ')}
              </p>
            )}
          </div>

          {game.metacritic && (
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-industrial-text-tertiary uppercase tracking-wider">
                Metacritic
              </span>
              <MetacriticScore score={game.metacritic} size="lg" />
            </div>
          )}
        </div>
      </header>
    </>
  )
})
