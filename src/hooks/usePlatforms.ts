import { useQuery } from "@tanstack/react-query";
import { platformQueries } from "../lib/query-options";
import platforms from "../data/platforms";
import type { Platform } from "../entities/Platform";

export const usePlatforms = () => {
  return useQuery({
    ...platformQueries.list({
      count: platforms.length,
      results: platforms,
    }),
    select: (data) => ({
      ...data,
      platforms: data.results,
      platformCount: data.count,
    }),
  });
};

export const usePlatformsList = () => {
  const { data } = usePlatforms();
  return data?.platforms ?? [];
};

export const usePlatform = (id: number) => {
  return useQuery({
    ...platformQueries.detail(id),
  });
};

export const usePlatformBySlug = (slug: string) => {
  const { data } = usePlatforms();
  return data?.platforms.find((platform) => platform.slug === slug);
};

export const usePlatformOptions = () => {
  const { data, isLoading } = usePlatforms();

  return {
    options:
      data?.platforms.map((platform) => ({
        value: platform.id,
        label: platform.name,
        slug: platform.slug,
      })) ?? [],
    isLoading,
  };
};

export const usePlatformsWithGamesCount = () => {
  const { data } = usePlatforms();

  return (
    data?.platforms.filter(
      (platform) => platform.games_count && platform.games_count > 0,
    ) ?? []
  );
};

export const usePopularPlatforms = (limit = 10) => {
  const { data } = usePlatforms();

  return (
    data?.platforms
      .sort((a, b) => (b.games_count || 0) - (a.games_count || 0))
      .slice(0, limit) ?? []
  );
};

export const useCurrentGenPlatforms = () => {
  const { data } = usePlatforms();
  const currentYear = new Date().getFullYear();

  return (
    data?.platforms.filter((platform) => {
      if (!platform.year_start) return true;
      return platform.year_start >= currentYear - 10;
    }) ?? []
  );
};

export const usePlatformsByGeneration = () => {
  const { data } = usePlatforms();
  const currentYear = new Date().getFullYear();

  const categorized = {
    current: [] as Platform[],
    previous: [] as Platform[],
    retro: [] as Platform[],
  };

  data?.platforms.forEach((platform) => {
    if (!platform.year_start) {
      categorized.current.push(platform);
      return;
    }

    const age = currentYear - platform.year_start;
    if (age <= 10) {
      categorized.current.push(platform);
    } else if (age <= 20) {
      categorized.previous.push(platform);
    } else {
      categorized.retro.push(platform);
    }
  });

  return categorized;
};

export default usePlatforms;
