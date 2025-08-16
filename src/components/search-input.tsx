import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import useGameQueryStore from "../store";

export default function SearchInput() {
  const ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const setSearchText = useGameQueryStore((s) => s.setSearchText);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (ref.current) {
      const searchValue = ref.current.value.trim();
      setSearchText(searchValue);

      if (location.pathname !== "/") {
        navigate("/");
      }
    }
  };

  return (
    <form className="w-full" onSubmit={handleSearch}>
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
        <Input
          ref={ref}
          className="pl-10 bg-muted/50 border-0 focus:bg-muted focus:ring-1 focus:ring-border rounded-md h-10 text-sm placeholder:text-muted-foreground/70"
          placeholder="Search games..."
        />
      </div>
    </form>
  );
}
