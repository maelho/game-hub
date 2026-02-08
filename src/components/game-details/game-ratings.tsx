import { memo } from 'react'
import type { Game } from '@/services/rawg/types'

interface GameRatingsProps {
  game: Game
}

export const GameRatings = memo(function GameRatings({ game }: GameRatingsProps) {
  if (game.rating === undefined || game.rating <= 0) {
    return null
  }

  return (
    <div className="rounded-sm border border-industrial-border bg-industrial-secondary p-4">
      <h3 className="mb-4 border-industrial-border-strong border-b pb-2 font-medium text-[10px] text-industrial-accent uppercase tracking-wider">
        User Ratings
      </h3>

      <div className="flex items-end justify-between">
        <div>
          <span className="mono-data font-medium text-3xl text-industrial-text">{game.rating.toFixed(1)}</span>
          <span className="text-industrial-text-tertiary text-sm">/5</span>
        </div>
        {game.ratings_count && (
          <span className="mono-data text-[10px] text-industrial-text-tertiary">
            {game.ratings_count.toLocaleString()} votes
          </span>
        )}
      </div>

      <div className="mt-3 h-1 overflow-hidden rounded-sm bg-industrial-tertiary">
        <div
          className="h-full bg-industrial-accent transition-all duration-500"
          style={{ width: `${(game.rating / 5) * 100}%` }}
        />
      </div>
    </div>
  )
})
