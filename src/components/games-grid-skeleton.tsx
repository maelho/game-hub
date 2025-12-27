import GameCardSkeleton from './game-card-skeleton'

const SKELETON_COLUMNS = 4
const SKELETON_ROWS = 3

export default function GamesGridSkeleton() {
  return (
    <div className="flex gap-6">
      {Array.from({ length: SKELETON_COLUMNS }).map((_, columnIndex) => (
        <div
          className="hidden flex-1 flex-col gap-6 first:flex sm:nth-2:flex md:nth-3:flex lg:flex"
          // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton items
          key={columnIndex}
        >
          {Array.from({ length: SKELETON_ROWS }).map((_, rowIndex) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton items
            <GameCardSkeleton key={rowIndex} />
          ))}
        </div>
      ))}
    </div>
  )
}
