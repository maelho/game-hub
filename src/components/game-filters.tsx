import { useGameFilters } from '@/hooks/useGameFilters'
import { sortBy } from '@/services/rawg'
import { Field, FieldLabel } from './ui/field'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'

export default function GameFilters() {
  const [filter, setFilters] = useGameFilters()

  return (
    <div className="mb-6 gap-6">
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
  )
}
