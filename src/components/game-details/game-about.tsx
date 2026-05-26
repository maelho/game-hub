import { memo } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import GameDescription from './game-description'

interface GameAboutProps {
  description: string | null | undefined
}

export const GameAbout = memo(function GameAbout({ description }: GameAboutProps) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section
      className={`space-y-3 transition-all duration-600 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-3'}`}
      ref={ref}
    >
      <h2 className="border-industrial-border-strong border-b pb-2 font-serif text-industrial-text text-lg leading-[1.2] tracking-[-0.02em]">
        Description
      </h2>
      <GameDescription description={description} />
    </section>
  )
})
