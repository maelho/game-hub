import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { ExternalLink } from 'lucide-react'
import { Suspense } from 'react'
import GameDescription from '@/components/game-description'
import GameScreenshots, { GameScreenshotsSkeleton } from '@/components/game-screenshots'
import PlatformIconList from '@/components/platform-icons-list'
import { Badge } from '@/components/ui/badge'
import { gameDetailsQueryOptions } from '@/lib/query-options'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/games/$slug')({
  component: GameDetails,
  loader: ({ context: { queryClient }, params: { slug } }) => {
    return queryClient.ensureQueryData(gameDetailsQueryOptions(slug))
  },
})

function GameDetails() {
  const slug = Route.useParams().slug
  const { data: game } = useSuspenseQuery(gameDetailsQueryOptions(slug))

  const formattedDate = game.released
    ? new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(game.released))
    : null

  return (
    <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-8 space-y-10 sm:space-y-12">
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-bold text-3xl sm:text-4xl leading-tight">{game.name}</h1>
          {game.metacritic && (
            <Badge
              variant="outline"
              className={cn(
                'text-lg font-bold px-2 py-0.5',
                game.metacritic >= 75
                  ? 'border-green-500 text-green-500'
                  : game.metacritic >= 50
                    ? 'border-yellow-500 text-yellow-500'
                    : 'border-red-500 text-red-500',
              )}
            >
              {game.metacritic}
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <Suspense fallback={<GameScreenshotsSkeleton />}>
            <GameScreenshots slug={game.slug} />
          </Suspense>

          <div>
            <h2 className="font-semibold text-xl sm:text-2xl mb-3">About</h2>
            <GameDescription description={game.description} />
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-6 space-y-4 rounded-2xl border border-border/60 bg-card/60 p-5 shadow-sm backdrop-blur">
            {formattedDate && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Release Date</h3>
                <p>{formattedDate}</p>
              </div>
            )}

            {game.parent_platforms && game.parent_platforms.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Platforms</h3>
                <PlatformIconList parent_platform={game.parent_platforms} limit={6} />
              </div>
            )}

            {game.genres && game.genres.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Genres</h3>
                <div className="flex flex-wrap gap-1.5">
                  {game.genres.map((genre) => (
                    <Badge key={genre.id} variant="secondary">
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {game.developers && game.developers.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Developers</h3>
                <p>{game.developers.map((d) => d.name).join(', ')}</p>
              </div>
            )}

            {game.publishers && game.publishers.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Publishers</h3>
                <p>{game.publishers.map((p) => p.name).join(', ')}</p>
              </div>
            )}

            {game.rating !== undefined && game.rating > 0 && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Rating</h3>
                <p>
                  {game.rating.toFixed(1)} / 5
                  {game.ratings_count && (
                    <span className="text-muted-foreground text-sm ml-1">
                      ({game.ratings_count.toLocaleString()} ratings)
                    </span>
                  )}
                </p>
              </div>
            )}

            {game.playtime !== undefined && game.playtime > 0 && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Average Playtime</h3>
                <p>{game.playtime} hours</p>
              </div>
            )}

            {game.esrb_rating && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Age Rating</h3>
                <p>{game.esrb_rating.name}</p>
              </div>
            )}

            {game.website && (
              <div>
                <a
                  href={game.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:underline"
                >
                  Official Website
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
