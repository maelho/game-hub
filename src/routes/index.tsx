import { createFileRoute } from '@tanstack/react-router'

import GenreList from '@/components/genre-list'
import GameGrid from '../components/game-grid'
import GameHeading from '../components/game-heading'
import PlatformSelector from '../components/platform-selector'
import SortSelector from '../components/sort-selector'

export const Route = createFileRoute('/')({
  component: RootIndexComponent,
  loader: ({ context: { queryClient } }) => queryClient.ensureInfiniteQueryData(gameQueryOptions()),
})

const animals = [
  { key: 'cat', label: 'Cat' },
  { key: 'dog', label: 'Dog' },
  { key: 'elephant', label: 'Elephant' },
  { key: 'lion', label: 'Lion' },
  { key: 'tiger', label: 'Tiger' },
  { key: 'giraffe', label: 'Giraffe' },
  { key: 'dolphin', label: 'Dolphin' },
  { key: 'penguin', label: 'Penguin' },
  { key: 'zebra', label: 'Zebra' },
  { key: 'shark', label: 'Shark' },
  { key: 'whale', label: 'Whale' },
  { key: 'otter', label: 'Otter' },
  { key: 'crocodile', label: 'Crocodile' },
]

function Games() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="lg:w-64 lg:shrink-0">
          <div className="lg:sticky lg:top-24">
            <GenreList />
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <div className="space-y-6">
            <div className="space-y-4">
              <GameHeading />

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <PlatformSelector />
                <SortSelector />
              </div>
            </div>

            <GameGrid />
          </div>
        </main>
      </div>
    </div>
  )
}
