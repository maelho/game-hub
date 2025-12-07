import ky, { type KyInstance, type Options } from 'ky'
import type {
  GameDetailResponse,
  GameLits,
  GamesListResponse,
  GamesQueryParams,
  PlatformsParentsResponse,
  ScreenshotsListResponse,
  TrailersListResponse,
} from './types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.rawg.io/api'
const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY
const REQUEST_TIMEOUT = 30000 // 30 seconds
const MAX_RETRIES = 2

if (!RAWG_API_KEY) {
  throw new Error('API key is required but not found in environment variables')
}

const rawgApi: KyInstance = ky.create({
  prefixUrl: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  retry: {
    limit: MAX_RETRIES,
    methods: ['get'],
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
  },
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

export class RawgApiError extends Error {
  constructor(message: string, _status?: number, _statusText?: string, _endpoint?: string) {
    super(message)
    this.name = 'RawgApiError'
  }
}

async function fetchRawgData<T>(endpoint: string, params?: GamesQueryParams | Record<string, unknown>): Promise<T> {
  try {
    const cleanParams = params
      ? Object.fromEntries(Object.entries(params).filter(([_, v]) => v !== undefined && v !== null))
      : undefined

    return await rawgApi
      .get(endpoint, {
        searchParams: cleanParams as Options['searchParams'],
      })
      .json<T>()
  } catch (error) {
    if (error instanceof Error) {
      throw new RawgApiError(error.message, undefined, undefined, endpoint)
    }
    throw error
  }
}

export function getGameLists({ list = 'main', params }: GameLits): Promise<GamesListResponse> {
  return fetchRawgData(`games/lists/${list}`, params)
}

export function getGames({ params }: { params: GamesQueryParams }): Promise<GamesListResponse> {
  return fetchRawgData('games', params)
}

export function getGameDetails(slug: string): Promise<GameDetailResponse> {
  return fetchRawgData(`games/${slug}`)
}

export function getGameScreenshots(slug: string): Promise<ScreenshotsListResponse> {
  return fetchRawgData(`games/${slug}/screenshots`)
}

export function getGameTrailers(slug: string): Promise<TrailersListResponse> {
  return fetchRawgData(`games/${slug}/movies`)
}

export function getPlatformsParents(): Promise<PlatformsParentsResponse> {
  return fetchRawgData('platforms/lists/parents')
}
