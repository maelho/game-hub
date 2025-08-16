import { useInfiniteQuery } from "@tanstack/react-query";
import { gameQueries } from "../lib/query-options";
import useGameQueryStore from "../store";
import type { GameFilters } from "../entities/Game";

export const useGames = (customFilters?: Partial<GameFilters>) => {
  const gameQuery = useGameQueryStore((s) => s.gameQuery);

  const filters: GameFilters = {
    ...gameQuery,
    ...customFilters,
  };

  return useInfiniteQuery({
    ...gameQueries.infinite(filters),
    select: (data) => ({
      pages: data.pages,
      pageParams: data.pageParams,
      games: data.pages.flatMap((page) => page.results),
      totalCount: data.pages[0]?.count ?? 0,
      hasNextPage: data.pages[data.pages.length - 1]?.next != null,
    }),
  });
};



export default useGames;
