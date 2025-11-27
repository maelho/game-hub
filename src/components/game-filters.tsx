import { useGameFilters } from '@/hooks/useGameFilters'
import { sortBy } from '@/services/rawg'
import { Field, FieldLabel } from './ui/field'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

export default function GameFilters() {
  const [filter, setFilters] = useGameFilters()

  return (
    <div className="mb-6 flex gap-6">
      <Field>
        <FieldLabel>Order by</FieldLabel>
        <Select defaultValue={filter.ordering} onValueChange={(v) => setFilters({ ordering: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Order by" />
          </SelectTrigger>
          <SelectContent>
            {sortBy.map((animal) => (
              <SelectItem key={animal.filter} value={animal.filter}>
                {animal.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      {/* <Field>
        <FieldLabel>Platforms</FieldLabel>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Platforms" />
          </SelectTrigger>
          <SelectContent>
            {animals.map((animal) => (
              <SelectItem key={animal.key} value={animal.key}>
                {animal.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field> */}
    </div>
  )
}
