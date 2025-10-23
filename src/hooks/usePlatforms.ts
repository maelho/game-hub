import { useQuery } from '@tanstack/react-query'
import platforms from '../data/platforms'
import { platformQueries } from '../lib/query-options'

export const usePlatforms = () => {
  return useQuery({
    ...platformQueries.list({
      count: platforms.length,
      results: platforms,
    }),
    select: (data) => ({
      ...data,
      platforms: data.results,
      platformCount: data.count,
    }),
  })
}

export default usePlatforms
