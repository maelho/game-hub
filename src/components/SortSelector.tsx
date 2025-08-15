import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsChevronDown } from "react-icons/bs";
import useGameQueryStore from "../store";

export default function SortSelector() {
  const sortOrders = [
    { label: "Relevance", value: "relevance" },
    { label: "Date added", value: "-added" },
    { label: "Name", value: "name" },
    { label: "Release data", value: "-released" },
    { label: "Popularity", value: "-metacritic" },
    { label: "Avarage rating", value: "-rating" },
  ];
  const sortOrder = useGameQueryStore((s) => s.gameQuery.sortOrder);
  const setSortOrder = useGameQueryStore((s) => s.setSortOrder);

  const currentSortOrder = sortOrders.find(
    (order) => order.value === sortOrder,
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          Order by: {currentSortOrder?.label || "Relevance"}
          <BsChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {sortOrders.map((order) => (
          <DropdownMenuItem
            key={order.value}
            onClick={() => setSortOrder(order.value)}
          >
            {order.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
