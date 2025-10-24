import ky from 'ky'
import type { Game, Platform, rawgApiResponse } from './types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.rawg.io/api'
const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY

if (!RAWG_API_KEY) {
  throw new Error('API key is required but not found in environment variables')
}

const rawgApi = ky.create({
  prefixUrl: API_BASE_URL,
  searchParams: {
    key: RAWG_API_KEY,
  },
})

export async function getListOfGames(): Promise<rawgApiResponse<Game>> {
  const games = await rawgApi.get('games').json<rawgApiResponse<Game>>()

  return games
}

export async function getDetailsOfGame(id: number | string): Promise<Game> {
  const games = await rawgApi.get(`games/${id}`).json<Game>()

  return games
}

// export async function getListOfParentPlatforms(): Promise<rawgApiResponse<Platform>> {
//   const platforms = await rawgApi.get('platforms/lists/parents').json<rawgApiResponse<Platform>>()
//
//   return platforms
// }

export async function getListOfPlatforms(): Promise<rawgApiResponse<Platform>> {
  const platforms = await rawgApi.get('platforms').json<rawgApiResponse<Platform>>()

  return platforms
}

export async function getDetailsOfPlatform(id: number): Promise<Platform> {
  const platform = await rawgApi.get(`platforms/${id}`).json<Platform>()

  return platform
}
