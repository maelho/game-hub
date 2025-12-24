import { memo, useEffect, useMemo, useRef, useState } from 'react'
import type { Game, GamesListResponse } from '@/services/rawg'
import GameCard from './game-card'

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
} as const

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

      // smooths it: Syncs with the browser’s render cycle and reduce re-renders
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

  if (games.length === 0 || games.every((col) => col.length === 0)) {
    return <div className="flex min-h-100 items-center justify-center text-muted-foreground">No games found</div>
  }

  return (
    <div className="flex gap-6" ref={ref}>
      {games.map((columns, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: i don't need this
        <div className="flex flex-1 flex-col gap-6" key={index}>
          {columns.map((game) => (
            <MemoizedGameCard game={game} key={`${game.slug}${index}`} />
          ))}
        </div>
      ))}
    </div>
  )
}
