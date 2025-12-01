import type { InfiniteData } from '@tanstack/react-query'
import { useMemo } from 'react'
import { Fragment } from 'react/jsx-runtime'
import type { GamesListResponse } from '@/services/rawg'
import GameCard from './game-card'

export function GamesGrid({ data }: { data: InfiniteData<GamesListResponse, unknown> }) {
  const games = useMemo(() => {
    if (!data.pages.length) return null

    const gamesData = data.pages.flatMap((games) => games.results)

    return (
      <div className="columns-1 gap-6 space-y-4 sm:columns-2 lg:columns-3 xl:columns-4">
        {gamesData.map((game, index) => (
          <Fragment key={`${index}-${game.id}`}>
            <GameCard game={game} />
          </Fragment>
        ))}
      </div>
    )
  }, [data])

  if (!games) return null

  return games
}
