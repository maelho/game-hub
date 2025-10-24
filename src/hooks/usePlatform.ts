import { useQuery } from '@tanstack/react-query'
import type { Platform } from '../entities/Platform'
import { platformQueries } from '../lib/query-options'

export const usePlatform = (id?: number) => {
  return useQuery({
    ...platformQueries.detail(id || 0),
    enabled: !!id,
    select: (data: Platform) => ({
      ...data,
      hasGamesCount: typeof data.games_count === 'number' && data.games_count > 0,
      isPopular: data.games_count ? data.games_count > 1000 : false,
      hasImage: !!data.image_background,
      isActive: data.year_end ? data.year_end >= new Date().getFullYear() : true,
    }),
  })
}

export default usePlatform
