import { createFileRoute, Link } from '@tanstack/react-router'
import { X } from 'lucide-react'
import { createStandardSchemaV1 } from 'nuqs'
import { Suspense } from 'react'
import { GameFilters } from '@/components/filters'
import { GamesGridSkeleton, GamesInfiniteScroll } from '@/components/games-list'
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
    <div className="container mx-auto px-4 py-6 sm:px-6">
      {searchQuery ? (
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-industrial-text text-sm">
              <span className="text-industrial-text-tertiary">SEARCH:</span>{' '}
              <span className="text-industrial-accent">"{searchQuery}"</span>
            </h1>
            <Link to="/">
              <button
                className="flex items-center gap-1 border border-industrial-border px-2 py-1 text-industrial-text-secondary text-xs transition-all duration-150 hover:border-industrial-accent hover:text-industrial-accent"
                style={{ borderRadius: 'var(--radius-sm)' }}
                type="button"
              >
                <X className="size-3" />
                clear
              </button>
            </Link>
          </div>
        </div>
      ) : null}

      <GameFilters />
      <Suspense fallback={<GamesGridSkeleton />}>
        <GamesInfiniteScroll />
      </Suspense>
    </div>
  )
}
