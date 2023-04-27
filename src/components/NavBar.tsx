import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import ColorModeSwich from "./ColorModeSwich";
import SearchInput from "./SearchInput";

export default function NavBar() {
  return (
    <HStack  padding='10px'>
      <Image src={logo} boxSize="60px" />
      <SearchInput />
      <ColorModeSwich  />
    </HStack>
  );
}
