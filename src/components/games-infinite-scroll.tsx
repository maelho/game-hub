import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useEffectEvent, useRef } from 'react'
import { Spinner } from '@/components/ui/spinner'
import { useGameFilters } from '@/hooks/useGameFilters'
import { gameQueryOptions } from '@/lib/query-options'
import { GamesGrid } from './games-grid'

export default function GamesInfiniteScroll() {
  const [filters] = useGameFilters()
  const loaderRef = useRef(null)

  const { data, isLoading, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery(gameQueryOptions({ ...filters }))

  const observerCallback = useEffectEvent<IntersectionObserverCallback>((entries) => {
    if (entries[0].isIntersecting && !isLoading && hasNextPage) {
      fetchNextPage()
    }
  })

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px 0px 400px 0px',
      threshold: 0,
    })

    if (loaderRef.current) observer.observe(loaderRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <GamesGrid data={data.pages} />

      <div className="mb-10 flex justify-center" id="loader" ref={loaderRef}>
        <Spinner className="size-10" />
      </div>
    </>
  )
}
