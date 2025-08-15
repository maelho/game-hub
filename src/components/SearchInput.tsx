import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
import useGameQueryStore from "../store";

export default function SearchInput() {
  const ref = useRef<HTMLInputElement>(null);

  const setSearchText = useGameQueryStore((s) => s.setSearchText);

  return (
    <form
      className="w-full"
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) setSearchText(ref.current.value);
      }}
    >
      <div className="relative">
        <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={ref}
          className="pl-10 rounded-full bg-muted"
          placeholder="Search games..."
        />
      </div>
    </form>
  );
}
