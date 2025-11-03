import { useQuery } from '@tanstack/react-query'
import genres from '../data/genres'
import { genreQueries } from '../lib/query-options'

export const useGenres = () => {
  return useQuery({
    ...genreQueries.list({
      count: genres.count,
      results: genres.results,
    }),
    select: (data) => ({
      ...data,
      genres: data.results,
      genreCount: data.count,
    }),
  })
}

export default useGenres
