import { cn } from '@/lib/utils'

interface Props {
  score?: number
}

export default function MetacriticScore({ score = 0 }: Props) {
  const getScoreColor = (score: number) => {
    if (score >= 75) return 'bg-green-600 text-white'
    if (score >= 50) return 'bg-yellow-500 text-black'
    return 'bg-red-600 text-white'
  }

  return (
    <span
      className={cn('inline-flex h-6 w-7 items-center justify-center rounded font-bold text-sm', getScoreColor(score))}
    >
      {score}
    </span>
  )
}
