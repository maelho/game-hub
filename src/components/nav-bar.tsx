import { Link } from "react-router-dom";
import ColorModeSwitch from "./color-mode-switch";
import SearchInput from "./search-input";

export default function NavBar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 bg-foreground rounded-md flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-background font-bold text-sm">G</span>
            </div>
            <span className="text-xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
              GameHub
            </span>
          </Link>

          <div className="flex items-center space-x-6">
            <div className="hidden md:block w-80">
              <SearchInput />
            </div>
            <ColorModeSwitch />
          </div>
        </div>

        <div className="md:hidden mt-4">
          <SearchInput />
        </div>
      </div>
    </nav>
  );
}
