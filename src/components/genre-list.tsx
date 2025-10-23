import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useGenres from '../hooks/useGenres'
import useGameQueryStore from '../store'

export default function GenreList() {
  const { data, isLoading, error } = useGenres()
  const selectedGenreId = useGameQueryStore((s) => s.gameQuery.genreId)
  const setSelectedGenreId = useGameQueryStore((s) => s.setGenreId)

  if (error) return null

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="font-medium text-muted-foreground text-sm uppercase tracking-wider">
          Genres
        </h2>
        <div className="flex justify-center py-8">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted border-t-foreground"></div>
        </div>
      </div>
    )
  }

  const hasActiveFilter = selectedGenreId !== undefined

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-medium text-muted-foreground text-sm uppercase tracking-wider">
          Genres
        </h2>
        {hasActiveFilter && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedGenreId(undefined)}
            className="h-7 px-2 text-muted-foreground text-xs hover:bg-destructive/10 hover:text-destructive"
          >
            Clear
          </Button>
        )}
      </div>

      <div className="space-y-1">
        <button
          className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-muted ${
            !selectedGenreId
              ? 'bg-primary font-medium text-primary-foreground'
              : 'text-foreground hover:text-foreground'
          }
          `}
          onClick={() => setSelectedGenreId(undefined)}
        >
          <div className="flex items-center justify-between">
            <span>All Games</span>
            {!selectedGenreId && <Check className="h-3.5 w-3.5" />}
          </div>
        </button>

        {data?.results.map((genre) => (
          <button
            key={genre.id}
            className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-muted ${
              genre.id === selectedGenreId
                ? 'bg-primary font-medium text-primary-foreground'
                : 'text-foreground hover:text-foreground'
            }
            `}
            onClick={() => setSelectedGenreId(genre.id)}
          >
            <div className="flex items-center justify-between">
              <span className="truncate">{genre.name}</span>
              {genre.id === selectedGenreId && (
                <Check className="h-3.5 w-3.5 flex-shrink-0" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
