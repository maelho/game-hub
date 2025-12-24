import { createFileRoute, Link } from '@tanstack/react-router'
import { X } from 'lucide-react'
import { createStandardSchemaV1 } from 'nuqs'
import { Suspense } from 'react'
import GameFilters from '@/components/game-filters'
import GameInfiniteScroll from '@/components/games-infinite-scroll'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { gameFilterParams, useGameFilters } from '@/hooks/useGameFilters'

export const Route = createFileRoute('/')({
  component: RootIndex,
  validateSearch: createStandardSchemaV1(gameFilterParams, {
    partialOutput: true,
  }),
})

function RootIndex() {
  const [filters] = useGameFilters()
  const searchQuery = filters.search

  return (
    <div className="container mx-auto px-6 py-6">
      {searchQuery ? (
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <h1 className="font-bold text-2xl sm:text-3xl">Search results for "{searchQuery}"</h1>
            <Link to="/">
              <Button className="text-muted-foreground hover:text-foreground" size="sm" variant="ghost">
                <X className="mr-1 size-4" />
                Clear
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <h1 className="mb-6 font-bold text-2xl sm:text-3xl">All Games</h1>
      )}

      <GameFilters />
      <Suspense
        fallback={
          <div className="flex min-h-100 items-center justify-center">
            <Spinner className="size-10" />
          </div>
        }
      >
        <GameInfiniteScroll />
      </Suspense>
    </div>
  )
}
