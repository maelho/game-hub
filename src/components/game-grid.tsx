import { Search } from 'lucide-react'
import { Fragment } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import type { Game } from '../entities/Game'
import useGames from '../hooks/useGames'
import useGameQueryStore from '../store'
import GameCard from './game-card'
import GameCardContainer from './game-card-container'
import GameCardSkeleton from './game-card-skeleton'

export default function GameGrid() {
  const { data, error, isLoading, fetchNextPage, hasNextPage } = useGames()
  const searchText = useGameQueryStore((s) => s.gameQuery.searchText)
  const skeletons = Array.from({ length: 12 }, (_, i) => i + 1)

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-16">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Search className="h-6 w-6 text-muted-foreground" />
        </div>
        <div className="space-y-2 text-center">
          <h3 className="font-medium text-foreground text-lg">
            Something went wrong
          </h3>
          <p className="max-w-md text-muted-foreground text-sm">
            {error.message ||
              "We couldn't load the games. Please try again later."}
          </p>
        </div>
      </div>
    )
  }

  const fetchedGamesCount =
    data?.pages.reduce((acc, page) => acc + page.results.length, 0) || 0

  const hasNoResults = !isLoading && fetchedGamesCount === 0

  if (hasNoResults) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-16">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Search className="h-6 w-6 text-muted-foreground" />
        </div>
        <div className="space-y-2 text-center">
          <h3 className="font-medium text-foreground text-lg">
            {searchText ? 'No games found' : 'No games available'}
          </h3>
          <p className="max-w-md text-muted-foreground text-sm">
            {searchText
              ? `We couldn't find any games matching "${searchText}". Try adjusting your search or filters.`
              : 'There are no games available at the moment. Please check back later.'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <InfiniteScroll
      dataLength={fetchedGamesCount}
      hasMore={!!hasNextPage}
      next={() => fetchNextPage()}
      loader={
        <div className="flex justify-center py-8">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-muted border-t-foreground"></div>
            <span className="text-sm">Loading more games...</span>
          </div>
        </div>
      }
      endMessage={
        !isLoading && fetchedGamesCount > 0 ? (
          <div className="py-8 text-center">
            <p className="text-muted-foreground text-sm">
              You've reached the end! Found {fetchedGamesCount} games.
            </p>
          </div>
        ) : null
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading &&
          skeletons.map((skeleton) => (
            <GameCardContainer key={skeleton}>
              <GameCardSkeleton />
            </GameCardContainer>
          ))}
        {data?.pages.map((page, index) => (
          <Fragment key={index}>
            {page.results.map((game: Game) => (
              <GameCardContainer key={game.id}>
                <GameCard game={game} />
              </GameCardContainer>
            ))}
          </Fragment>
        ))}
      </div>
    </InfiniteScroll>
  )
}
