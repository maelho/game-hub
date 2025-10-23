import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import useGameQueryStore from '../store'

export default function SortSelector() {
  const sortOrders = [
    { label: 'Relevance', value: 'relevance' },
    { label: 'Date added', value: '-added' },
    { label: 'Name', value: 'name' },
    { label: 'Release date', value: '-released' },
    { label: 'Popularity', value: '-metacritic' },
    { label: 'Average rating', value: '-rating' },
  ]
  const sortOrder = useGameQueryStore((s) => s.gameQuery.sortOrder)
  const setSortOrder = useGameQueryStore((s) => s.setSortOrder)

  const currentSortOrder = sortOrders.find((order) => order.value === sortOrder)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-9 border-border bg-card font-normal text-foreground text-sm hover:bg-muted"
        >
          {currentSortOrder?.label || 'Relevance'}
          <ChevronDown className="ml-2 h-3.5 w-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48 border-border bg-card">
        {sortOrders.map((order) => (
          <DropdownMenuItem
            key={order.value}
            onClick={() => setSortOrder(order.value)}
            className="text-sm hover:bg-muted"
          >
            {order.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
