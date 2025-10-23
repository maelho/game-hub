import { useQuery } from '@tanstack/react-query'
import { gameQueries } from '../lib/query-options'

export const useScreenshots = (gameId: number) => {
  return useQuery({
    ...gameQueries.screenshots(gameId),
    select: (data) => ({
      ...data,
      screenshots: data.results,
      screenshotCount: data.count,
      hasScreenshots: data.results.length > 0,
    }),
  })
}

export default useScreenshots
