import { useQuery } from '@tanstack/react-query'
import { gameQueries } from '../lib/query-options'
import type { Game } from '@/services/rawg/types'

export const useGame = (slug: string | number) => {
  return useQuery({
    ...gameQueries.detail(slug),
    select: (data: Game) => ({
      ...data,
      hasMetacritic: typeof data.metacritic === 'number' && data.metacritic > 0,
      hasRating: typeof data.rating_top === 'number' && data.rating_top > 0,
      platformNames: data.parent_platforms?.map((p) => p.platform.name) ?? [],
      genreNames: data.genres?.map((g) => g.name) ?? [],
      publisherNames: data.publishers?.map((p) => p.name) ?? [],
      isReleased: data.released ? new Date(data.released) <= new Date() : false,
    }),
  })
}

export default useGame
