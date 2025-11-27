import { Badge } from './ui/badge'

interface Props {
  score?: number
}

export default function MetacriticScore({ score = 0 }: Props) {
  const getScoreColor = (score: number) => {
    if (score > 75) return 'secondary'
    if (score > 60) return 'destructive'
    return 'default'
  }

  return <Badge variant={getScoreColor(score)}>{score}</Badge>
}
