import { useQuery } from "@tanstack/react-query";
import { genreQueries } from "../lib/query-options";
import type { Genre } from "../entities/Genre";

export const useGenre = (id?: number) => {
  return useQuery({
    ...genreQueries.detail(id || 0),
    enabled: !!id,
    select: (data: Genre) => ({
      ...data,
      hasGamesCount:
        typeof data.games_count === "number" && data.games_count > 0,
      isPopular: data.games_count ? data.games_count > 1000 : false,
      hasImage: !!data.image_background,
    }),
  });
};

export const useGenreDetails = (id?: number) => {
  const query = useGenre(id);

  return {
    ...query,
    genre: query.data,
    isGenreLoading: query.isLoading,
    genreError: query.error,
    hasGenre: !!query.data,
  };
};

export const useGenreBasicInfo = (id?: number) => {
  const { data } = useGenre(id);

  return {
    id: data?.id,
    name: data?.name,
    slug: data?.slug,
    gamesCount: data?.games_count,
    imageBackground: data?.image_background,
    description: data?.description,
  };
};

export default useGenre;
