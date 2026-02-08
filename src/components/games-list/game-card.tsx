import { useQueryClient } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { useRef } from 'react'
import { formatPlatforms } from '@/lib/platform'
import { gameDetailsQueryOptions, gameScreenshotsQueryOptions } from '@/lib/query-options'
import { cn } from '@/lib/utils'
import type { Game } from '@/services/rawg'
import { getCroppedImageUrl } from '@/services/rawg/utils'

interface GameCardProps {
  game: Game
  priority?: boolean
}

export default function GameCard({ game, priority = false }: GameCardProps) {
  const imgSrc = getCroppedImageUrl(game.background_image)
  const platformCodes = formatPlatforms(game.parent_platforms, 'short', ' · ', 4)
  const queryClient = useQueryClient()
  const hasPrefetched = useRef(false)
  const prefetchTimeout = useRef<number | null>(null)
  const PREFETCH_DELAY = 150

  const handlePrefetch = () => {
    if (hasPrefetched.current || prefetchTimeout.current !== null) return

    prefetchTimeout.current = window.setTimeout(() => {
      prefetchTimeout.current = null
      if (hasPrefetched.current) return

      hasPrefetched.current = true
      queryClient.prefetchQuery(gameDetailsQueryOptions(game.slug))
      queryClient.prefetchQuery(gameScreenshotsQueryOptions(game.slug))
    }, PREFETCH_DELAY)
  }

  const handleCancelPrefetch = () => {
    if (prefetchTimeout.current === null) return
    window.clearTimeout(prefetchTimeout.current)
    prefetchTimeout.current = null
  }

  const scoreClass = game.metacritic
    ? game.metacritic >= 75
      ? 'text-industrial-success'
      : game.metacritic >= 50
        ? 'text-industrial-warning'
        : 'text-industrial-error'
    : ''

  return (
    <Link
      className="group block"
      onBlur={handleCancelPrefetch}
      onFocus={handlePrefetch}
      onMouseEnter={handlePrefetch}
      onMouseLeave={handleCancelPrefetch}
      onTouchStart={handlePrefetch}
      params={{ slug: game.slug }}
      preload={false}
      to="/games/$slug"
    >
      <article className="overflow-hidden rounded-sm border border-industrial-border bg-industrial-secondary transition-all duration-150 hover:border-industrial-accent/50 hover:bg-industrial-tertiary">
        <div className="relative aspect-video overflow-hidden bg-industrial-tertiary">
          {imgSrc ? (
            <img
              alt={game.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              decoding={priority ? 'sync' : 'async'}
              fetchPriority={priority ? 'high' : 'auto'}
              loading={priority ? 'eager' : 'lazy'}
              src={imgSrc}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-industrial-text-tertiary text-xs">
              NO_IMAGE
            </div>
          )}

          {game.metacritic && (
            <div
              className={cn(
                'mono-data absolute top-2 right-2 rounded-sm border border-current bg-industrial-primary/90 px-2 py-1 font-medium text-xs backdrop-blur-sm',
                scoreClass,
              )}
            >
              {game.metacritic}
            </div>
          )}
        </div>

        <div className="space-y-2 p-3">
          <h3 className="line-clamp-2 font-medium text-industrial-text text-sm leading-tight transition-colors duration-150 group-hover:text-industrial-accent">
            {game.name}
          </h3>

          <div className="flex items-center justify-between gap-2 border-industrial-border-strong border-t border-dotted pt-1">
            {platformCodes && (
              <span className="text-[10px] text-industrial-text-tertiary tracking-wide">{platformCodes}</span>
            )}

            {game.rating && game.rating > 0 && (
              <span className="mono-data text-[10px] text-industrial-text-secondary">{game.rating.toFixed(1)}/5</span>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
