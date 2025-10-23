import { useQuery } from '@tanstack/react-query'
import { gameQueries } from '../lib/query-options'

export const useTrailers = (gameId: number) => {
  return useQuery({
    ...gameQueries.trailers(gameId),
    select: (data) => ({
      ...data,
      trailers: data.results,
      trailerCount: data.count,
      hasTrailers: data.results.length > 0,
    }),
  })
}

export default useTrailers
