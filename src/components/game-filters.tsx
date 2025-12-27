import { useSuspenseQuery } from '@tanstack/react-query'
import { Suspense } from 'react'
import { useGameFilters } from '@/hooks/useGameFilters'
import { platformsQueryOptions } from '@/lib/query-options'
import { sortBy } from '@/services/rawg'
import { Field, FieldLabel } from './ui/field'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Skeleton } from './ui/skeleton'

function PlatformFilter() {
  const [filter, setFilters] = useGameFilters()
  const { data: platformsData } = useSuspenseQuery(platformsQueryOptions())

  const selectedPlatform = platformsData.results.find((p) => String(p.id) === filter.parent_platforms)

  return (
    <div className="min-w-min">
      <Field>
        <FieldLabel htmlFor="platform">Platform</FieldLabel>
        <Select
          onValueChange={(v) => setFilters({ parent_platforms: v || null })}
          value={filter.parent_platforms ?? ''}
        >
          <SelectTrigger id="platform">
            <SelectValue>{selectedPlatform?.name ?? 'All platforms'}</SelectValue>
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
      </Field>
    </div>
  )
}

function PlatformFilterSkeleton() {
  return (
    <div className="min-w-min">
      <Field>
        <FieldLabel>Platform</FieldLabel>
        <div className="flex h-9 w-fit items-center justify-between gap-1.5 rounded-4xl border border-input bg-input/30 px-3 py-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="size-4 rounded-full" />
        </div>
      </Field>
    </div>
  )
}

export default function GameFilters() {
  const [filter, setFilters] = useGameFilters()

  return (
    <div className="mb-6 flex gap-6">
      <div className="min-w-min">
        <Field>
          <FieldLabel htmlFor="order-by">Order by</FieldLabel>
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
        </Field>
      </div>

      <Suspense fallback={<PlatformFilterSkeleton />}>
        <PlatformFilter />
      </Suspense>
    </div>
  )
}
