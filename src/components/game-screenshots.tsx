import useScreenshots from '../hooks/useScreenshots'

interface Props {
  gameId: number
}

const GameScreenshots = ({ gameId }: Props) => {
  const { data, isLoading, error } = useScreenshots(gameId)

  if (isLoading) return null

  if (error) throw error

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
      {data?.results.map((file) => (
        <img
          key={file.id}
          src={file.image}
          alt="Game screenshot"
          className="h-auto w-full rounded"
        />
      ))}
    </div>
  )
}

export default GameScreenshots
