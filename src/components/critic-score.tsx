interface Props {
  score?: number
}

export default function CriticScore({ score }: Props) {
  if (!score) return null

  const getScoreColor = (score: number) => {
    if (score > 75) return 'bg-green-600 dark:bg-green-500 text-white border-green-700 dark:border-green-400'
    if (score > 60) return 'bg-yellow-600 dark:bg-yellow-500 text-white border-yellow-700 dark:border-yellow-400'
    return 'bg-red-600 dark:bg-red-500 text-white border-red-700 dark:border-red-400'
  }

  return <span className={`rounded border px-2 py-1 font-bold text-xs ${getScoreColor(score)}`}>{score}</span>
}
