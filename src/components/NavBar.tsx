import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import ColorModeSwich from "./ColorModeSwich";
import SearchInput from "./SearchInput";

interface Props {
  onSearch: (searchTerm: string) => void;
}

export default function NavBar({ onSearch }: Props) {
  return (
    <HStack  padding='10px'>
      <Image src={logo} boxSize="60px" />
      <SearchInput onSearch={onSearch} />
      <ColorModeSwich  />
    </HStack>
  );
}
