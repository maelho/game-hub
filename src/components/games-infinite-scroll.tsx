import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { Spinner } from '@/components/ui/spinner'
import { useGameFilters } from '@/hooks/useGameFilters'
import { gameQueryOptions } from '@/lib/query-options'
import { GamesGrid } from './games-grid'

export default function GamesInfiniteScroll() {
  const [filters] = useGameFilters()

  const queryFilters = {
    ...filters,
    search: filters.search ?? undefined,
  }

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery(
    gameQueryOptions(queryFilters),
  )

  const { ref: loaderRef, inView } = useInView({
    rootMargin: '400px', // Trigger early before entering viewport
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage])

  return (
    <>
      <GamesGrid data={data.pages} />

      <div className="col-span-full flex min-h-20 w-full items-center justify-center py-4" ref={loaderRef}>
        {isFetchingNextPage || (hasNextPage && inView) ? <Spinner className="size-10" /> : null}
      </div>
    </>
  )
}
