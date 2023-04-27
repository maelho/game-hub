import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import platforms from "../data/platforms";
import APICLient from "../services/api-client";

const apiCLient = new APICLient<Platform>("/platforms");

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

const usePlatforms = () =>
  useQuery({
    queryKey: ["platforms"],
    queryFn: apiCLient.getAll,
    staleTime: ms("24h"),
    initialData: { count: platforms.length, results: platforms },
  });

export default usePlatforms;
