import ky from 'ky'
import type {
  GameDetailResponse,
  GameLits,
  GamesListResponse,
  GamesQueryParams,
  Genre,
  GenreDetails,
  PlatformDetailResponse,
  ScreenshotsListResponse,
  TrailersListResponse,
} from './types'

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

// https://rawg.io/api/games/lists/main?discover=true&ordering=-relevance&page_size=40&page=1&key=c542e67aec3a4340908f9de9e86038af

async function fetchRawgData<T>(endpoint: string, params?: GamesQueryParams): Promise<T> {
  return await rawgApi.get(endpoint, { searchParams: params }).json<T>()
}

export function getGameLists({ list = 'main', params }: GameLits): Promise<GamesListResponse> {
  return fetchRawgData(`games/lists/${list}`, params)
}

export function getGames({ params }: { params: GamesQueryParams }): Promise<GamesListResponse> {
  return fetchRawgData('games', params)
}

export function getGameDetails(id: number | string): Promise<GameDetailResponse> {
  return fetchRawgData(`games/${id}`)
}

export function getGameScreenshots(id: number | string): Promise<ScreenshotsListResponse> {
  return fetchRawgData(`games/${id}/screenshots`)
}

export function getGameTrailers(id: number | string): Promise<TrailersListResponse> {
  return fetchRawgData(`games/${id}/movies`)
}

export function getGenres(): Promise<GenreDetails> {
  return fetchRawgData('genres')
}

export function getGenreDetails(id: number | string): Promise<Genre> {
  return fetchRawgData(`genres/${id}`)
}

export function getPlatforms(): Promise<PlatformDetailResponse> {
  return fetchRawgData('platforms')
}

export function getPlatformDetails(id: number | string): Promise<PlatformDetailResponse> {
  return fetchRawgData(`platforms/${id}`)
}
