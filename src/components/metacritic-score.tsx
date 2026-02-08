interface Props {
  score?: number
  size?: 'sm' | 'md' | 'lg'
}

export default function MetacriticScore({ score = 0, size = 'sm' }: Props) {
  const getScoreClass = (score: number) => {
    if (score >= 75) return 'text-industrial-success border-industrial-success/50'
    if (score >= 50) return 'text-industrial-warning border-industrial-warning/50'
    return 'text-industrial-error border-industrial-error/50'
  }

  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2 py-1',
    lg: 'text-base px-2.5 py-1.5',
  }

  return (
    <span
      className={`mono-data inline-flex items-center justify-center border bg-industrial-primary/80 font-medium ${getScoreClass(score)}
        ${sizeClasses[size]}
      `}
      style={{ borderRadius: 'var(--radius-sm)' }}
    >
      {score}
    </span>
  )
}
