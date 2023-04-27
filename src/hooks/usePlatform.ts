import usePlatforms from "./usePlatforms";

export default function usePlatform(id?: number) {
  const { data: platform } = usePlatforms();

  return platform?.results.find((platform) => platform.id === id);
}
