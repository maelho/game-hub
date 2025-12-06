import { useMemo } from 'react'
import type { Game, GamesListResponse } from '@/services/rawg'
import GameCard from './game-card'

export function GamesGrid({ data }: { data: GamesListResponse[] }) {
  const games = useMemo(() => {
    const games = new Map<string, Game>()

    for (const page of data) {
      for (const game of page.results) {
        if (!games.has(game.slug)) {
          games.set(game.slug, game)
        }
      }
    }

    return Array.from(games.values())
  }, [data])

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
