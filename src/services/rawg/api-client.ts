import ky from 'ky'
import type { Game, GamesQueryParams, Genre, Platform, RawgPagedData, Screenshot, Trailer } from './types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.rawg.io/api'
const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY

if (!RAWG_API_KEY) {
  throw new Error('API key is required but not found in environment variables')
}

const rawgApi = ky.create({
  prefixUrl: API_BASE_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        const url = new URL(request.url)
        url.searchParams.set('key', RAWG_API_KEY)
        return new Request(url, request)
      },
    ],
    beforeError: [
      (error) => {
        const { response } = error
        console.error(`RAWG API Error: ${response?.status} ${response?.statusText}`)
        return error
      },
    ],
  },
})

async function fetchRawgData<T>(endpoint: string, params?: Record<string, string | number | undefined>): Promise<T> {
  return await rawgApi.get(endpoint, { searchParams: params }).json<T>()
}

export const getGames = ({ params }: { params: GamesQueryParams }): RawgPagedData<Game> =>
  fetchRawgData('games', params as Record<string, string | number | undefined>)
export const getGamesDetails = (id: number | string): Promise<Game> => fetchRawgData(`games/${id}`)
export const getGameScreenshots = (id: number | string): Promise<Screenshot> => fetchRawgData(`games/${id}/screenshots`)
export const getGameTrailers = (id: number | string): Promise<Trailer> => fetchRawgData(`games/${id}/movies`)
export const getGenres = (): RawgPagedData<Genre> => fetchRawgData('genres')
export const getGenresDetails = (id: number | string): Promise<Genre> => fetchRawgData(`genres/${id}`)
export const getPlatforms = (): RawgPagedData<Platform> => fetchRawgData('platforms')
export const getParentPlatforms = (): RawgPagedData<Platform> => fetchRawgData('platforms/lists/parents')
export const getPlatformDetails = (id: number | string): Promise<Platform> => fetchRawgData(`platforms/${id}`)
