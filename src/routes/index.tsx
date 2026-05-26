import { createFileRoute, Link } from '@tanstack/react-router'
import { XIcon } from '@phosphor-icons/react'
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
    <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12">
      {searchQuery ? (
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-industrial-text text-xl leading-[1.2] tracking-[-0.02em] sm:text-2xl">
              <span className="text-industrial-text-tertiary">Search:</span>{' '}
              <span className="text-industrial-accent">"{searchQuery}"</span>
            </h1>
            <Link to="/">
              <button
                className="flex items-center gap-1 border border-industrial-border px-2 py-1 text-industrial-text-secondary text-xs transition-all duration-150 hover:border-industrial-accent hover:text-industrial-accent"
                style={{ borderRadius: 'var(--radius-sm)' }}
                type="button"
              >
                <XIcon className="size-3" weight="bold" />
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