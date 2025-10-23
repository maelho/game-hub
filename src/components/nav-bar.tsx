import { Link } from 'react-router-dom'
import ColorModeSwitch from './color-mode-switch'
import SearchInput from './search-input'

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="group flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-foreground transition-transform group-hover:scale-105">
              <span className="font-bold text-background text-sm">G</span>
            </div>
            <span className="font-semibold text-foreground text-xl tracking-tight transition-colors group-hover:text-primary">
              GameHub
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <div className="hidden w-80 md:block">
              <SearchInput />
            </div>
            <ColorModeSwitch />
          </div>
        </div>

        <div className="mt-4 md:hidden">
          <SearchInput />
        </div>
      </div>
    </nav>
  )
}
