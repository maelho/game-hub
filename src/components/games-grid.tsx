import { useMemo } from 'react'
import type { GamesListResponse } from '@/services/rawg'
import GameCard from './game-card'

export function GamesGrid({ data }: { data: GamesListResponse[] }) {
  const games = useMemo(
    // TODO: fix: Sometimes the rawg api returns duplicate games
    () => data.flatMap((page) => [...new Map(page.results.map((game) => [game.id, game])).values()]),
    [data],
  )

  if (games.length === 0) {
    return <div className="flex min-h-[400px] items-center justify-center text-muted-foreground">No games found</div>
  }

  return (
    <div className="columns-1 gap-6 space-y-4 sm:columns-2 lg:columns-3 xl:columns-4">
      {games.map((game, index) => (
        <GameCard game={game} key={`${index}-${game.id}`} />
      ))}
    </div>
  )
}
