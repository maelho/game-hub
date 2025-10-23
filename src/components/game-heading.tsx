import useGenre from '../hooks/useGenre'
import usePlatform from '../hooks/usePlatform'
import useGameQueryStore from '../store'

export default function GameHeading() {
  const genreId = useGameQueryStore((s) => s.gameQuery.genreId)
  const platformId = useGameQueryStore((s) => s.gameQuery.platformId)

  const { data: genre } = useGenre(genreId)
  const { data: platform } = usePlatform(platformId)

  const heading = `${platform?.name || ''} ${genre?.name || ''} Games`.trim()

  return (
    <h1 className="font-medium text-2xl text-foreground tracking-tight">
      {heading}
    </h1>
  )
}
