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

export function getGames({ params }: { params: GamesQueryParams }): RawgPagedData<Game> {
  return fetchRawgData('games', params as Record<string, string | number | undefined>)
}

export function getGameDetails(id: number | string): Promise<Game> {
  return fetchRawgData(`games/${id}`)
}

export function getGameScreenshots(id: number | string): RawgPagedData<Screenshot> {
  return fetchRawgData(`games/${id}/screenshots`)
}

export function getGameTrailers(id: number | string): RawgPagedData<Trailer> {
  return fetchRawgData(`games/${id}/movies`)
}

export function getGenres(): RawgPagedData<Genre> {
  return fetchRawgData('genres')
}

export function getGenreDetails(id: number | string): Promise<Genre> {
  return fetchRawgData(`genres/${id}`)
}

export function getPlatforms(): RawgPagedData<Platform> {
  return fetchRawgData('platforms')
}

export function getParentPlatforms(): RawgPagedData<Platform> {
  return fetchRawgData('platforms/lists/parents')
}

export function getPlatformDetails(id: number | string): Promise<Platform> {
  return fetchRawgData(`platforms/${id}`)
}
