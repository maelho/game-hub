import { useQuery } from "@tanstack/react-query";
import { gameQueries } from "../lib/query-options";
import type { Trailer } from "../entities/Trailer";

export const useTrailers = (gameId: number) => {
  return useQuery({
    ...gameQueries.trailers(gameId),
    select: (data) => ({
      ...data,
      trailers: data.results,
      trailerCount: data.count,
      hasTrailers: data.results.length > 0,
    }),
  });
};

export const useTrailersList = (gameId: number) => {
  const { data } = useTrailers(gameId);
  return data?.trailers ?? [];
};

export const useTrailersData = (gameId: number) => {
  const query = useTrailers(gameId);

  return {
    ...query,
    trailers: query.data?.trailers ?? [],
    count: query.data?.trailerCount ?? 0,
    hasTrailers: query.data?.hasTrailers ?? false,
    isTrailersLoading: query.isLoading,
    trailersError: query.error,
  };
};

export const useMainTrailer = (gameId: number) => {
  const { data } = useTrailers(gameId);
  return data?.trailers[0];
};

export const useTrailersByQuality = (gameId: number) => {
  const { data } = useTrailers(gameId);

  const categorized = {
    highQuality: [] as Trailer[],
    standardQuality: [] as Trailer[],
  };

  data?.trailers.forEach((trailer) => {
    if (trailer.data.max) {
      categorized.highQuality.push(trailer);
    } else {
      categorized.standardQuality.push(trailer);
    }
  });

  return categorized;
};

export const useTrailerUrls = (gameId: number) => {
  const { data } = useTrailers(gameId);

  return {
    highQuality:
      data?.trailers.map((trailer) => trailer.data.max).filter(Boolean) ?? [],
    standard:
      data?.trailers.map((trailer) => trailer.data[480]).filter(Boolean) ?? [],
    previews:
      data?.trailers.map((trailer) => trailer.preview).filter(Boolean) ?? [],
  };
};

export const useFeaturedTrailer = (gameId: number) => {
  const { data } = useTrailers(gameId);

  const featuredTrailer = data?.trailers.find(
    (trailer) =>
      trailer.name.toLowerCase().includes("trailer") ||
      trailer.name.toLowerCase().includes("official"),
  );

  return featuredTrailer ?? data?.trailers[0];
};

export const useTrailerPreviews = (gameId: number) => {
  const { data } = useTrailers(gameId);

  return (
    data?.trailers.map((trailer) => ({
      id: trailer.id,
      name: trailer.name,
      preview: trailer.preview,
    })) ?? []
  );
};

export default useTrailers;
