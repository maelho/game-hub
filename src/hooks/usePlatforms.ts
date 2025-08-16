import { useQuery } from "@tanstack/react-query";
import { platformQueries } from "../lib/query-options";
import platforms from "../data/platforms";


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



export default usePlatforms;
