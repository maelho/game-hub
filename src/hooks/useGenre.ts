import { useQuery } from '@tanstack/react-query'
import type { Genre } from '../entities/Genre'
import { genreQueries } from '../lib/query-options'

export const useGenre = (id?: number) => {
  return useQuery({
    ...genreQueries.detail(id || 0),
    enabled: !!id,
    select: (data: Genre) => ({
      ...data,
      hasGamesCount: typeof data.games_count === 'number' && data.games_count > 0,
      isPopular: data.games_count ? data.games_count > 1000 : false,
      hasImage: !!data.image_background,
    }),
  })
}

export default useGenre
