import logo from "../assets/logo.webp";
import ColorModeSwich from "./ColorModeSwich";
import SearchInput from "./SearchInput";

export default function NavBar() {
  return (
    <div className="flex items-center space-x-4 p-2.5">
      <img src={logo} alt="Logo" className="w-15 h-15" />
      <SearchInput />
      <ColorModeSwich />
    </div>
  );
}
