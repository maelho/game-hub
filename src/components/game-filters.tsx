import { useGameFilters } from '@/hooks/useGameFilters'
// import { platformsQueryOptions } from '@/lib/query-options'
import { sortBy } from '@/services/rawg'
// import { useSuspenseQuery } from '@tanstack/react-query'
import { Field, FieldLabel } from './ui/field'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'

export default function GameFilters() {
  const [filter, setFilters] = useGameFilters()
  // const { data: platformsData } = useSuspenseQuery(platformsQueryOptions())

  // const selectedPlatform = platformsData.results.find(
  //   (p) => String(p.id) === filter.parent_platforms
  // )

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

      {/*<Field>
        <FieldLabel htmlFor="platform">Platform</FieldLabel>
        <Select
          onValueChange={(v) => setFilters({ parent_platforms: v || null })}
          value={filter.parent_platforms ?? ''}
        >
          <SelectTrigger id="platform">
            <SelectValue>
              {selectedPlatform?.name ?? 'All platforms'}
            </SelectValue>
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
      </Field>*/}
    </div>
  )
}
