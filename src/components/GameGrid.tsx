import { Fragment } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardContainer from "./GameCardContainer";
import GameCardSkeleton from "./GameCardSkeleton";
import Game from "../entities/Game";

export default function GameGrid() {
  const { data, error, isLoading, fetchNextPage, hasNextPage } = useGames();
  const skeletons = [1, 2, 3, 4, 5, 6];

  if (error) return <p className="text-red-500">{error.message}</p>;

  const fetchedGamesCount =
    data?.pages.reduce((acc, page) => acc + page.results.length, 0) || 0;

  return (
    <InfiniteScroll
      dataLength={fetchedGamesCount}
      hasMore={!!hasNextPage}
      next={() => fetchNextPage()}
      loader={
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-2.5">
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
                {!isLoading && <GameCard game={game} />}
              </GameCardContainer>
            ))}
          </Fragment>
        ))}
      </div>
    </InfiniteScroll>
  );
}
