import { createFileRoute } from '@tanstack/react-router'
import { createStandardSchemaV1 } from 'nuqs'
import { Suspense } from 'react'
import GameFilters from '@/components/game-filters'
import GameInfiniteScroll from '@/components/games-infinite-scroll'
import { gameFilterParams } from '@/hooks/useGameFilters'

export const Route = createFileRoute('/')({
  component: RootIndex,
  validateSearch: createStandardSchemaV1(gameFilterParams, {
    partialOutput: true,
  }),
})

function RootIndex() {
  return (
    <div className="container mx-auto px-6 py-6">
      <GameFilters />
      <Suspense fallback={<h1>Loading...</h1>}>
        <GameInfiniteScroll />
      </Suspense>
    </div>
  )
}
