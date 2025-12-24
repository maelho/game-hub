import { Link, useNavigate } from '@tanstack/react-router'
import { Gamepad2, Search } from 'lucide-react'
import { type FormEvent, type KeyboardEvent, useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { useGameFilters } from '@/hooks/useGameFilters'

export default function Navbar() {
  const [filters] = useGameFilters()
  const navigate = useNavigate()

  const [searchValue, setSearchValue] = useState(filters.search)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setSearchValue(filters.search)
  }, [filters.search])

  useEffect(() => {
    const handleGlobalKeyDown = (e: globalThis.KeyboardEvent) => {
      const activeElement = document.activeElement
      const isInputFocused =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        activeElement?.getAttribute('contenteditable') === 'true'

      if (e.key === '/' && !isInputFocused) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleGlobalKeyDown)
    return () => document.removeEventListener('keydown', handleGlobalKeyDown)
  }, [])

  const handleLogoClick = () => {
    setSearchValue('')
    navigate({
      to: '/',
      search: {},
    })
  }

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()

    const trimmedSearch = searchValue.trim()
    inputRef.current?.blur()

    navigate({
      to: '/',
      search: trimmedSearch ? { search: trimmedSearch } : {},
    })
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setSearchValue('')
      inputRef.current?.blur()
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center gap-4 px-4 sm:px-6">
        <Link
          className="flex items-center gap-2 font-bold text-xl transition-colors hover:text-primary"
          onClick={handleLogoClick}
          to="/"
        >
          <Gamepad2 className="size-7 text-primary" />
          <span className="hidden sm:inline">GameHub</span>
        </Link>
        <div className="flex-1" />
        <form className="w-full max-w-xs sm:max-w-sm" onSubmit={handleSearch}>
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="w-full border-transparent bg-muted/50 pr-4 pl-9 focus-visible:border-primary focus-visible:bg-background"
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search games... (press /)"
              ref={inputRef}
              type="search"
              value={searchValue}
            />
          </div>
        </form>
      </div>
    </header>
  )
}
