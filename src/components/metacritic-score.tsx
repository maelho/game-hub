import { cn } from '@/lib/utils'

interface Props {
  score?: number
  size?: 'sm' | 'md' | 'lg'
}

function getScoreStyle(score: number) {
  if (score >= 75) return { bg: 'bg-pastel-green-bg', text: 'text-pastel-green-text' }
  if (score >= 50) return { bg: 'bg-pastel-yellow-bg', text: 'text-pastel-yellow-text' }
  return { bg: 'bg-pastel-red-bg', text: 'text-pastel-red-text' }
}

const sizeClasses = {
  sm: 'text-xs px-1.5 py-0.5',
  md: 'text-sm px-2 py-1',
  lg: 'text-base px-2.5 py-1.5',
}

export default function MetacriticScore({ score = 0, size = 'sm' }: Props) {
  if (!score) return null

  const style = getScoreStyle(score)

  return (
    <span
      className={cn(
        'mono-data inline-flex items-center justify-center rounded-full font-medium',
        style.bg,
        style.text,
        sizeClasses[size],
      )}
    >
      {score}
    </span>
  )
}