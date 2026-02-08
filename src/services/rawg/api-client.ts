import { type FetchContext, FetchError, ofetch } from 'ofetch'
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
const MAX_RETRIES = 1
const RETRY_STATUS_CODES = [408, 413, 429, 500, 502, 503, 504]
const BASE_RETRY_DELAY = 250
const MAX_RETRY_JITTER = 250

if (!RAWG_API_KEY) {
  throw new Error('API key is required but not found in environment variables')
}

const rawgApi = ofetch.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  retry: MAX_RETRIES,
  retryStatusCodes: RETRY_STATUS_CODES,
  onRequest({ options }: FetchContext) {
    if (options.retryDelay === undefined) {
      const jitter = Math.floor(Math.random() * MAX_RETRY_JITTER)
      options.retryDelay = BASE_RETRY_DELAY + jitter
    }

    const query = { ...(options.query ?? {}) } as Record<string, unknown>
    query.key = RAWG_API_KEY
    options.query = query
  },
  onResponseError({ response }: FetchContext) {
    if (!response) return
    if (import.meta.env.DEV) {
      console.error(`RAWG API Error: ${response.status} ${response.statusText}`)
    }
  },
})

export class RawgApiError extends Error {
  status?: number
  statusText?: string
  endpoint?: string
  data?: unknown

  constructor(
    message: string,
    options?: {
      status?: number
      statusText?: string
      endpoint?: string
      data?: unknown
    },
  ) {
    super(message)
    this.name = 'RawgApiError'
    this.status = options?.status
    this.statusText = options?.statusText
    this.endpoint = options?.endpoint
    this.data = options?.data
  }
}

type RawgParams = GamesQueryParams | Record<string, unknown>

function sanitizeParams(params?: RawgParams): Record<string, unknown> | undefined {
  if (!params) return undefined

  const entries = Object.entries(params).filter(([_, value]) => value !== undefined && value !== null)
  if (entries.length === 0) return undefined

  return Object.fromEntries(entries)
}

async function fetchRawgData<T>(endpoint: string, params?: RawgParams, signal?: AbortSignal): Promise<T> {
  try {
    const cleanParams = sanitizeParams(params)

    return await rawgApi<T>(endpoint, {
      query: cleanParams,
      signal,
    })
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw error
    }

    if (error instanceof FetchError) {
      if (error.cause instanceof Error && error.cause.name === 'AbortError') {
        throw error.cause
      }

      const status = error.status ?? error.statusCode ?? error.response?.status
      const statusText = error.statusText ?? error.statusMessage ?? error.response?.statusText
      const data = error.data ?? error.response?._data

      throw new RawgApiError(error.message, {
        status,
        statusText,
        endpoint,
        data,
      })
    }

    if (error instanceof Error) {
      throw new RawgApiError(error.message, { endpoint })
    }
    throw error
  }
}

type ParamsRequest<TParams extends RawgParams> = {
  params: TParams
  signal?: AbortSignal
}

const endpoints = {
  games: 'games',
  gameLists: (list: string) => `games/lists/${list}`,
  gameDetails: (slug: string) => `games/${slug}`,
  gameScreenshots: (slug: string) => `games/${slug}/screenshots`,
  gameTrailers: (slug: string) => `games/${slug}/movies`,
  platformsParents: 'platforms/lists/parents',
} as const

const createParamsEndpoint = <TResult, TParams extends RawgParams>(endpoint: string) => {
  return ({ params, signal }: ParamsRequest<TParams>): Promise<TResult> => fetchRawgData(endpoint, params, signal)
}

const createSignalEndpoint = <TResult>(endpoint: string) => {
  return (signal?: AbortSignal): Promise<TResult> => fetchRawgData(endpoint, undefined, signal)
}

const createSlugEndpoint = <TResult>(endpoint: (slug: string) => string) => {
  return (slug: string, signal?: AbortSignal): Promise<TResult> => fetchRawgData(endpoint(slug), undefined, signal)
}

const createListEndpoint = <TResult>(endpoint: (list: string) => string) => {
  return ({ list = 'main', params, signal }: GameLits): Promise<TResult> =>
    fetchRawgData(endpoint(list), params, signal)
}

export const getGameLists = createListEndpoint<GamesListResponse>(endpoints.gameLists)
export const getGames = createParamsEndpoint<GamesListResponse, GamesQueryParams>(endpoints.games)
export const getGameDetails = createSlugEndpoint<GameDetailResponse>(endpoints.gameDetails)
export const getGameScreenshots = createSlugEndpoint<ScreenshotsListResponse>(endpoints.gameScreenshots)
export const getGameTrailers = createSlugEndpoint<TrailersListResponse>(endpoints.gameTrailers)
export const getPlatformsParents = createSignalEndpoint<PlatformsParentsResponse>(endpoints.platformsParents)
