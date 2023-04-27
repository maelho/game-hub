import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import usePlatform from "../hooks/usePlatform";
import usePlatforms, { Platform } from "../hooks/usePlatforms";

interface Props {
  onSelectPlatform: (platform: Platform) => void;
  selecedPlatformId?: number;
}

export default function PlatformSelector({ onSelectPlatform, selecedPlatformId }: Props) {
  const { data, error } = usePlatforms();

  const selecedPlatform = usePlatform(selecedPlatformId);

  if (error) return null;

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selecedPlatform?.name || "Platforms"}
      </MenuButton>
      <MenuList>
        {data?.results.map((platform) => (
          <MenuItem key={platform.id} onClick={() => onSelectPlatform(platform)}>
            {platform.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
