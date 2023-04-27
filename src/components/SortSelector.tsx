import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

export default function SortSelector() {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Order by: Relevance
      </MenuButton>
      <MenuList>
        <MenuItem>Relevance</MenuItem>
      </MenuList>
    </Menu>
  );
}
