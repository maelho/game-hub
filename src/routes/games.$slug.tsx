import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { ExternalLink, Database } from 'lucide-react'
import { memo, Suspense } from 'react'
import GameDescription from '@/components/game-description'
import GameScreenshots, { GameScreenshotsSkeleton } from '@/components/game-screenshots'
import PlatformIconList from '@/components/platform-icons-list'
import { Badge } from '@/components/ui/badge'
import { gameDetailsQueryOptions } from '@/lib/query-options'
import { cn } from '@/lib/utils'
import type { Game } from '@/services/rawg/types'

export const Route = createFileRoute('/games/$slug')({
  component: GameDetails,
  loader: ({ context: { queryClient }, params: { slug } }) => {
    return queryClient.ensureQueryData(gameDetailsQueryOptions(slug))
  },
})

const GameAbout = memo(({ description }: { description: string | null | undefined }) => (
  <div>
    <h2 className="mb-3 font-semibold text-xl sm:text-2xl">About</h2>
    <GameDescription description={description} />
  </div>
))

const GameDetailsInfo = memo(({ game }: { game: Game }) => {
  const formattedDate = game.released
    ? new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(game.released))
    : null

  return (
    <div className="lg:col-span-1">
      <div className="space-y-4 rounded-2xl border border-border/60 bg-card/60 p-5 shadow-sm backdrop-blur lg:sticky lg:top-20">
        {formattedDate && (
          <div>
            <h3 className="mb-1 font-medium text-muted-foreground text-sm">Release Date</h3>
            <p>{formattedDate}</p>
          </div>
        )}

        {game.parent_platforms && game.parent_platforms.length > 0 && (
          <div>
            <h3 className="mb-2 font-medium text-muted-foreground text-sm">Platforms</h3>
            <PlatformIconList limit={game.parent_platforms.length} parent_platform={game.parent_platforms} />
          </div>
        )}

        {game.genres && game.genres.length > 0 && (
          <div>
            <h3 className="mb-2 font-medium text-muted-foreground text-sm">Genres</h3>
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
            <h3 className="mb-1 font-medium text-muted-foreground text-sm">Developers</h3>
            <p>{game.developers.map((d) => d.name).join(', ')}</p>
          </div>
        )}

        {game.publishers && game.publishers.length > 0 && (
          <div>
            <h3 className="mb-1 font-medium text-muted-foreground text-sm">Publishers</h3>
            <p>{game.publishers.map((p) => p.name).join(', ')}</p>
          </div>
        )}

        {game.rating !== undefined && game.rating > 0 && (
          <div>
            <h3 className="mb-1 font-medium text-muted-foreground text-sm">Rating</h3>
            <p>
              {game.rating.toFixed(1)} / 5
              {game.ratings_count && (
                <span className="ml-1 text-muted-foreground text-sm">
                  ({game.ratings_count.toLocaleString()} ratings)
                </span>
              )}
            </p>
          </div>
        )}

        {game.playtime !== undefined && game.playtime > 0 && (
          <div>
            <h3 className="mb-1 font-medium text-muted-foreground text-sm">Average Playtime</h3>
            <p>{game.playtime} hours</p>
          </div>
        )}

        {game.esrb_rating && (
          <div>
            <h3 className="mb-1 font-medium text-muted-foreground text-sm">Age Rating</h3>
            <p>{game.esrb_rating.name}</p>
          </div>
        )}

        {game.website && (
          <div>
            <a
              className="inline-flex items-center gap-1 text-primary hover:underline"
              href={game.website}
              rel="noopener noreferrer"
              target="_blank"
            >
              Official Website
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        )}

        <div className="border-t pt-4">
          <a
            className="inline-flex items-center gap-1.5 text-muted-foreground text-sm hover:text-primary"
            href={`https://rawg.io/games/${game.slug}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Database className="h-4 w-4" />
            View on RAWG
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  )
})

function GameDetails() {
  const slug = Route.useParams().slug
  const { data: game } = useSuspenseQuery(gameDetailsQueryOptions(slug))

  return (
    <div className="container mx-auto px-6 py-6">
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-bold text-3xl leading-tight sm:text-4xl">{game.name}</h1>
          {game.metacritic && (
            <Badge
              className={cn(
                'px-2 py-0.5 font-bold text-lg',
                game.metacritic >= 75
                  ? 'border-green-500 text-green-500'
                  : game.metacritic >= 50
                    ? 'border-yellow-500 text-yellow-500'
                    : 'border-red-500 text-red-500',
              )}
              variant="outline"
            >
              {game.metacritic}
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
        <div className="space-y-8 lg:col-span-2">
          <Suspense fallback={<GameScreenshotsSkeleton />}>
            <GameScreenshots slug={game.slug} />
          </Suspense>

          <GameAbout description={game.description} />
        </div>

        <GameDetailsInfo game={game} />
      </div>
    </div>
  )
}
