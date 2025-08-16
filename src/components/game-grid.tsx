import { Fragment } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Search } from "lucide-react";
import useGames from "../hooks/useGames";
import useGameQueryStore from "../store";
import GameCard from "./game-card";
import GameCardContainer from "./game-card-container";
import GameCardSkeleton from "./game-card-skeleton";
import Game from "../entities/Game";

export default function GameGrid() {
  const { data, error, isLoading, fetchNextPage, hasNextPage } = useGames();
  const searchText = useGameQueryStore((s) => s.gameQuery.searchText);
  const skeletons = Array.from({ length: 12 }, (_, i) => i + 1);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
          <Search className="w-6 h-6 text-muted-foreground" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-lg font-medium text-foreground">
            Something went wrong
          </h3>
          <p className="text-sm text-muted-foreground max-w-md">
            {error.message ||
              "We couldn't load the games. Please try again later."}
          </p>
        </div>
      </div>
    );
  }

  const fetchedGamesCount =
    data?.pages.reduce((acc, page) => acc + page.results.length, 0) || 0;

  const hasNoResults = !isLoading && fetchedGamesCount === 0;

  if (hasNoResults) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
          <Search className="w-6 h-6 text-muted-foreground" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-lg font-medium text-foreground">
            {searchText ? "No games found" : "No games available"}
          </h3>
          <p className="text-sm text-muted-foreground max-w-md">
            {searchText
              ? `We couldn't find any games matching "${searchText}". Try adjusting your search or filters.`
              : "There are no games available at the moment. Please check back later."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <InfiniteScroll
      dataLength={fetchedGamesCount}
      hasMore={!!hasNextPage}
      next={() => fetchNextPage()}
      loader={
        <div className="flex justify-center py-8">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-muted border-t-foreground"></div>
            <span className="text-sm">Loading more games...</span>
          </div>
        </div>
      }
      endMessage={
        !isLoading && fetchedGamesCount > 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">
              You've reached the end! Found {fetchedGamesCount} games.
            </p>
          </div>
        ) : null
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
  );
}
