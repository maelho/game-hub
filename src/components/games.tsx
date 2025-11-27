import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useEffectEvent, useRef } from 'react'
import { Fragment } from 'react/jsx-runtime'
import GameCard from '@/components/game-card'
import { Spinner } from '@/components/ui/spinner'
import { useGameFilters } from '@/hooks/useGameFilters'
import { gameQueryOptions } from '@/lib/query-options'
import type { GamesQueryParams } from '@/services/rawg'

export default function Games() {
  const [filters] = useGameFilters()
  const { data, isLoading, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery(
    gameQueryOptions(filters as GamesQueryParams),
  )

  // const fetchedGamesCount = data?.pages.reduce((acc, page) => acc + page.results.length, 0) || 0
  // const hasNoResults = !isLoading && fetchedGamesCount === 0
  //
  // if(hasNoResults) return null

  const allGames = data.pages.flatMap((games) => games.results)
  const loaderRef = useRef(null)

  const observerCallback = useEffectEvent<IntersectionObserverCallback>((entries) => {
    if (entries[0].isIntersecting && !isLoading && hasNextPage) {
      fetchNextPage()
    }
  })

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '100px',
      threshold: 0,
    })

    if (loaderRef.current) observer.observe(loaderRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div className="columns-1 gap-6 space-y-4 sm:columns-2 lg:columns-3 xl:columns-4">
        {allGames.map((game, index) => (
          <Fragment key={`${index}-${game.id}`}>
            <GameCard game={game} />
          </Fragment>
        ))}
      </div>
      <div className="mb-10 flex justify-center" id="loader" ref={loaderRef}>
        <Spinner className="size-10" />
      </div>
    </>
  )
}
