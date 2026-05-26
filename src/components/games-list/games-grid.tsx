import { memo, useEffect, useMemo, useRef, useState } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import type { Game, GamesListResponse } from '@/services/rawg'
import GameCard from './game-card'

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const

const PRIORITY_ROWS = 2

function getColumns(width: number): number {
  if (width >= breakpoints.lg) return 4
  if (width >= breakpoints.md) return 3
  if (width >= breakpoints.sm) return 2
  return 1
}

function dedupeAndSplit(data: GamesListResponse[], columnsCounter: number): Game[][] {
  const columns: Game[][] = Array.from({ length: columnsCounter }, () => [])
  const seen = new Set<string>()

  let index = 0

  for (const page of data) {
    for (const game of page.results) {
      if (seen.has(game.slug)) continue
      seen.add(game.slug)
      columns[index % columnsCounter].push(game)
      index++
    }
  }

  return columns
}

const MemoizedGameCard = memo(GameCard)

export function GamesGrid({ data }: { data: GamesListResponse[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [columnsCounter, setColumnsCounter] = useState(getColumns(window.innerWidth))
  const { ref: animRef, isVisible } = useScrollAnimation()

  useEffect(() => {
    const gridRef = ref.current
    if (!gridRef) return

    let rafId: null | number = null

    const updateColumns = (width: number) => {
      const newColumns = getColumns(width)
      setColumnsCounter((prev) => (prev === newColumns ? prev : newColumns))
    }

    updateColumns(gridRef.getBoundingClientRect().width)

    const resizeObserver = new ResizeObserver((entries) => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }

      rafId = requestAnimationFrame(() => {
        const entry = entries[0]
        if (!entry) return

        const { width } = entry.contentRect

        updateColumns(width)
      })
    })

    resizeObserver.observe(gridRef)

    return () => {
      resizeObserver.disconnect()
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  const games = useMemo(() => dedupeAndSplit(data, columnsCounter), [data, columnsCounter])

  if (games.every((col) => col.length === 0)) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <div className="text-center">
          <span className="text-industrial-text-tertiary text-sm">NO_RESULTS_FOUND</span>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`transition-all duration-600 ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-3'}`}
      ref={animRef}
    >
      <div className="flex gap-5" ref={ref}>
        {games.map((columns, columnIndex) => (
          <div className="flex flex-1 flex-col gap-5" key={columnIndex}>
            {columns.map((game, rowIndex) => (
              <MemoizedGameCard
                game={game}
                key={`${game.slug}${columnIndex}`}
                priority={rowIndex < PRIORITY_ROWS}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}