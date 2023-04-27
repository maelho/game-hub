import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

interface Props {
  onSelectSort: (sortOrder: string) => void;
  sortOrder: string;
}

export default function SortSelector({ onSelectSort, sortOrder }: Props) {
  const sortOrders = [
    { label: "Relevance", value: "relevance" },
    { label: "Date added", value: "-added" },
    { label: "Name", value: "name" },
    { label: "Release data", value: "-released" },
    { label: "Popularity", value: "-metacritic" },
    { label: "Avarage rating", value: "-rating" },
  ];

  const currentSortOrder = sortOrders.find((order) => order.value === sortOrder);

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Order by: {currentSortOrder?.label || 'Relevance'}
      </MenuButton>
      <MenuList>
        {sortOrders.map((order) => (
          <MenuItem onClick={() => onSelectSort(order.value)} key={order.value} value={order.value}>
            {order.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
