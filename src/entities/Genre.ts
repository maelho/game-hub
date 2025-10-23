export interface Genre {
  readonly id: number
  name: string
  slug: string
  games_count: number
  image_background?: string
  description?: string
}

export interface GenreDetails extends Genre {
  description: string
}
