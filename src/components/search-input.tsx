import { useLocation, useNavigate } from '@tanstack/react-router'
import { Search } from 'lucide-react'
import { useRef } from 'react'

import { Input } from '@/components/ui/input'
import useGameQueryStore from '../store'

export default function SearchInput() {
  const ref = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const location = useLocation()
  const setSearchText = useGameQueryStore((s) => s.setSearchText)

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault()
    if (ref.current) {
      const searchValue = ref.current.value.trim()
      setSearchText(searchValue)

      if (location.pathname !== '/') {
        navigate({ to: '/' })
      }
    }
  }

  return (
    <form className="w-full" onSubmit={handleSearch}>
      <div className="group relative">
        <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 transform text-muted-foreground transition-colors group-focus-within:text-foreground" />
        <Input
          ref={ref}
          className="h-10 rounded-md border-0 bg-muted/50 pl-10 text-sm placeholder:text-muted-foreground/70 focus:bg-muted focus:ring-1 focus:ring-border"
          placeholder="Search games..."
        />
      </div>
    </form>
  )
}
