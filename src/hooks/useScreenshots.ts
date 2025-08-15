import { useQuery } from "@tanstack/react-query";
import { gameQueries } from "../lib/query-options";
import type { Screenshot } from "../entities/Screenshot";

export const useScreenshots = (gameId: number) => {
  return useQuery({
    ...gameQueries.screenshots(gameId),
    select: (data) => ({
      ...data,
      screenshots: data.results,
      screenshotCount: data.count,
      hasScreenshots: data.results.length > 0,
    }),
  });
};

export const useScreenshotsList = (gameId: number) => {
  const { data } = useScreenshots(gameId);
  return data?.screenshots ?? [];
};

export const useScreenshotsData = (gameId: number) => {
  const query = useScreenshots(gameId);

  return {
    ...query,
    screenshots: query.data?.screenshots ?? [],
    count: query.data?.screenshotCount ?? 0,
    hasScreenshots: query.data?.hasScreenshots ?? false,
    isScreenshotsLoading: query.isLoading,
    screenshotsError: query.error,
  };
};

export const useScreenshotsByDimensions = (gameId: number) => {
  const { data } = useScreenshots(gameId);

  const categorized = {
    landscape: [] as Screenshot[],
    portrait: [] as Screenshot[],
    square: [] as Screenshot[],
  };

  data?.screenshots.forEach((screenshot) => {
    const aspectRatio = screenshot.width / screenshot.height;

    if (aspectRatio > 1.3) {
      categorized.landscape.push(screenshot);
    } else if (aspectRatio < 0.8) {
      categorized.portrait.push(screenshot);
    } else {
      categorized.square.push(screenshot);
    }
  });

  return categorized;
};

export const useHighQualityScreenshots = (gameId: number, minWidth = 1920) => {
  const { data } = useScreenshots(gameId);

  return (
    data?.screenshots.filter((screenshot) => screenshot.width >= minWidth) ?? []
  );
};

export const useScreenshotUrls = (gameId: number) => {
  const { data } = useScreenshots(gameId);

  return data?.screenshots.map((screenshot) => screenshot.image) ?? [];
};

export const useFeaturedScreenshot = (gameId: number) => {
  const { data } = useScreenshots(gameId);

  return data?.screenshots[0];
};

export default useScreenshots;
