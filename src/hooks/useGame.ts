import { useQuery } from "@tanstack/react-query";
import { gameQueries } from "../lib/query-options";
import type { Game } from "../entities/Game";

export const useGame = (slug: string | number) => {
  return useQuery({
    ...gameQueries.detail(slug),
    select: (data: Game) => ({
      ...data,
      hasMetacritic: typeof data.metacritic === "number" && data.metacritic > 0,
      hasRating: typeof data.rating_top === "number" && data.rating_top > 0,
      platformNames: data.parent_platforms?.map((p) => p.platform.name) ?? [],
      genreNames: data.genres?.map((g) => g.name) ?? [],
      publisherNames: data.publishers?.map((p) => p.name) ?? [],
      isReleased: data.released ? new Date(data.released) <= new Date() : false,
    }),
  });
};

export const useGameDetails = (slug: string | number) => {
  const query = useGame(slug);

  return {
    ...query,
    game: query.data,
    isGameLoading: query.isLoading,
    gameError: query.error,
    hasGame: !!query.data,
  };
};

export const useGameBasicInfo = (slug: string | number) => {
  const { data } = useGame(slug);

  return {
    name: data?.name,
    slug: data?.slug,
    backgroundImage: data?.background_image,
    metacritic: data?.metacritic,
    rating: data?.rating_top,
    released: data?.released,
    genres: data?.genreNames ?? [],
    platforms: data?.platformNames ?? [],
    publishers: data?.publisherNames ?? [],
  };
};

export default useGame;
