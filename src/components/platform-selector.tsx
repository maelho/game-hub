import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import usePlatform from '../hooks/usePlatform'
import usePlatforms from '../hooks/usePlatforms'
import useGameQueryStore from '../store'

export default function PlatformSelector() {
  const { data, error } = usePlatforms()
  const selectedPlatformId = useGameQueryStore((s) => s.gameQuery.platformId)
  const setPlatformId = useGameQueryStore((s) => s.setPlatformId)

  const { data: selectedPlatform } = usePlatform(selectedPlatformId)

  if (error) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-9 border-border bg-card font-normal text-foreground text-sm hover:bg-muted"
        >
          {selectedPlatform?.name || 'All Platforms'}
          <ChevronDown className="ml-2 h-3.5 w-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48 border-border bg-card">
        <DropdownMenuItem
          onClick={() => setPlatformId(undefined)}
          className="text-sm hover:bg-muted"
        >
          All Platforms
        </DropdownMenuItem>
        {data?.results.map((platform) => (
          <DropdownMenuItem
            key={platform.id}
            onClick={() => setPlatformId(platform.id)}
            className="text-sm hover:bg-muted"
          >
            {platform.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
