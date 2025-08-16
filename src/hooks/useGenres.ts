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



export default useGenres;
