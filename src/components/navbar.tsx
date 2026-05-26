import { Link, useNavigate } from "@tanstack/react-router";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import {
  type SubmitEvent,
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useGameFilters } from "@/hooks/useGameFilters";

export default function Navbar() {
  const [filters] = useGameFilters();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState(filters.search);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSearchValue(filters.search);
  }, [filters.search]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: globalThis.KeyboardEvent) => {
      const activeElement = document.activeElement;
      const isInputFocused =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        activeElement?.getAttribute("contenteditable") === "true";

      if (e.key === "/" && !isInputFocused) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  const handleLogoClick = () => {
    setSearchValue("");
    void navigate({
      to: "/",
      search: {},
    });
  };

  const handleSearch = (e: SubmitEvent) => {
    e.preventDefault();

    const trimmedSearch = searchValue?.trim();
    inputRef.current?.blur();

    void navigate({
      to: "/",
      search: trimmedSearch ? { search: trimmedSearch } : {},
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setSearchValue("");
      inputRef.current?.blur();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-industrial-border border-b bg-industrial-primary/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-14 items-center gap-6 px-4 sm:px-6">
        <Link
          className="group flex items-center gap-2 transition-colors duration-150"
          onClick={handleLogoClick}
          to="/"
        >
          <span className="text-[10px] text-industrial-text-tertiary uppercase tracking-wider transition-colors duration-150 group-hover:text-industrial-accent">
            [GAME_HUB]
          </span>
        </Link>

        <div className="flex-1" />
        <form className="w-full max-w-xs sm:max-w-sm" onSubmit={handleSearch}>
          <div className="relative">
            <div
              className={`flex h-9 items-center gap-2 border px-3 transition-all duration-150 ${
                isFocused
                  ? "border-industrial-accent bg-industrial-secondary"
                  : "border-industrial-border bg-industrial-secondary/50 hover:border-industrial-border-strong"
              }`}
              style={{ borderRadius: "var(--radius-sm)" }}
            >
              <MagnifyingGlassIcon
                className={`size-3.5 flex-shrink-0 transition-colors duration-150 ${
                  isFocused
                    ? "text-industrial-accent"
                    : "text-industrial-text-tertiary"
                }`}
                weight="bold"
              />
              <input
                className="w-full flex-1 bg-transparent text-industrial-text text-sm placeholder:text-industrial-text-tertiary focus:outline-none"
                onBlur={() => setIsFocused(false)}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onKeyDown={handleKeyDown}
                placeholder="search..."
                ref={inputRef}
                type="text"
                value={searchValue ?? ""}
              />
              <kbd className="hidden rounded-sm border border-industrial-border bg-industrial-tertiary px-1.5 py-0.5 text-[10px] text-industrial-text-tertiary sm:inline-flex">
                /
              </kbd>
            </div>
          </div>
        </form>
      </div>
    </header>
  );
}
