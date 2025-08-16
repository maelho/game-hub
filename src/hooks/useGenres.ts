import { useQuery } from "@tanstack/react-query";
import { genreQueries } from "../lib/query-options";
import genres from "../data/genres";

export const useGenres = () => {
  return useQuery({
    ...genreQueries.list({
      count: genres.length,
      results: genres,
    }),
    select: (data) => ({
      ...data,
      genres: data.results,
      genreCount: data.count,
    }),
  });
};

export const useGenresList = () => {
  const { data } = useGenres();
  return data?.genres ?? [];
};

export const useGenre = (id: number) => {
  return useQuery({
    ...genreQueries.detail(id),
  });
};

export const useGenreBySlug = (slug: string) => {
  const { data } = useGenres();
  return data?.genres.find((genre) => genre.slug === slug);
};

export const useGenreOptions = () => {
  const { data, isLoading } = useGenres();

  return {
    options:
      data?.genres.map((genre) => ({
        value: genre.id,
        label: genre.name,
        slug: genre.slug,
      })) ?? [],
    isLoading,
  };
};

export const useGenresWithGamesCount = () => {
  const { data } = useGenres();

  return data?.genres.filter((genre) => genre.games_count > 0) ?? [];
};

export const usePopularGenres = (limit = 10) => {
  const { data } = useGenres();

  return (
    data?.genres
      .sort((a, b) => (b.games_count || 0) - (a.games_count || 0))
      .slice(0, limit) ?? []
  );
};

export default useGenres;
