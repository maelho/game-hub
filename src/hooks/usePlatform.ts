import { useQuery } from "@tanstack/react-query";
import { platformQueries } from "../lib/query-options";
import type { Platform } from "../entities/Platform";

export const usePlatform = (id: number) => {
  return useQuery({
    ...platformQueries.detail(id),
    select: (data: Platform) => ({
      ...data,
      hasGamesCount:
        typeof data.games_count === "number" && data.games_count > 0,
      isPopular: data.games_count ? data.games_count > 1000 : false,
      hasImage: !!data.image_background,
      isActive: data.year_end
        ? data.year_end >= new Date().getFullYear()
        : true,
      era: getPlatformEra(data.year_start, data.year_end),
    }),
  });
};

export const usePlatformDetails = (id: number) => {
  const query = usePlatform(id);

  return {
    ...query,
    platform: query.data,
    isPlatformLoading: query.isLoading,
    platformError: query.error,
    hasPlatform: !!query.data,
  };
};

export const usePlatformBasicInfo = (id: number) => {
  const { data } = usePlatform(id);

  return {
    id: data?.id,
    name: data?.name,
    slug: data?.slug,
    gamesCount: data?.games_count,
    imageBackground: data?.image_background,
    yearStart: data?.year_start,
    yearEnd: data?.year_end,
    isActive: data?.isActive,
    era: data?.era,
  };
};

const getPlatformEra = (yearStart?: number, yearEnd?: number): string => {
  if (!yearStart) return "Unknown";

  const currentYear = new Date().getFullYear();
  const age = currentYear - yearStart;

  if (age <= 5) return "Current";
  if (age <= 15) return "Previous";
  if (age <= 25) return "Retro";
  return "Classic";
};

export default usePlatform;
