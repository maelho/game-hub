import { memo } from 'react'
import GameDescription from './game-description'

interface GameAboutProps {
  description: string | null | undefined
}

export const GameAbout = memo(function GameAbout({ description }: GameAboutProps) {
  return (
    <section className="space-y-3">
      <h2 className="border-industrial-border-strong border-b pb-2 font-medium text-industrial-text-tertiary text-xs uppercase tracking-wider">
        Description
      </h2>
      <GameDescription description={description} />
    </section>
  )
})
