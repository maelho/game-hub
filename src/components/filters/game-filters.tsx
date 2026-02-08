import { useSuspenseQuery } from '@tanstack/react-query'
import { Suspense } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { useGameFilters } from '@/hooks/useGameFilters'
import { platformsQueryOptions } from '@/lib/query-options'
import { sortBy } from '@/services/rawg'

function PlatformFilter() {
  const [filter, setFilters] = useGameFilters()
  const { data: platformsData } = useSuspenseQuery(platformsQueryOptions())

  const selectedPlatform = platformsData.results.find((p) => String(p.id) === filter.parent_platforms)

  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="font-medium text-[10px] text-industrial-text-tertiary uppercase tracking-wider"
        htmlFor="platform"
      >
        Platform
      </label>
      <Select onValueChange={(v) => setFilters({ parent_platforms: v || null })} value={filter.parent_platforms ?? ''}>
        <SelectTrigger id="platform">
          <SelectValue>{selectedPlatform?.name ?? 'All'}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="">All platforms</SelectItem>
            {platformsData.results.map((platform) => (
              <SelectItem key={platform.id} value={String(platform.id)}>
                {platform.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

function PlatformFilterSkeleton() {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-medium text-[10px] text-industrial-text-tertiary uppercase tracking-wider">Platform</span>
      <div
        className="flex h-9 w-fit items-center gap-2 border border-industrial-border bg-industrial-secondary px-3 py-2"
        style={{ borderRadius: 'var(--radius-sm)' }}
      >
        <Spinner size="sm" />
      </div>
    </div>
  )
}

export default function GameFilters() {
  const [filter, setFilters] = useGameFilters()

  return (
    <div className="mb-6 flex gap-6 border-industrial-border-strong border-b border-dotted pb-4">
      <div className="flex flex-col gap-1.5">
        <label
          className="font-medium text-[10px] text-industrial-text-tertiary uppercase tracking-wider"
          htmlFor="order-by"
        >
          Order by
        </label>
        <Select items={sortBy} onValueChange={(v) => setFilters({ ordering: v })} value={filter.ordering}>
          <SelectTrigger id="order-by">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {sortBy.map((by) => (
                <SelectItem key={by.label} value={by.value}>
                  {by.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Suspense fallback={<PlatformFilterSkeleton />}>
        <PlatformFilter />
      </Suspense>
    </div>
  )
}
