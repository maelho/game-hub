import { useQuery } from "@tanstack/react-query";
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
    staleTime: 24 + 60 * 60 * 1000, // 24 hours
    initialData: { count: platforms.length, results: platforms },
  });

export default usePlatforms;
