import { IconType } from "react-icons";
import {
  FaXbox,
  FaApple,
  FaPlaystation,
  FaLinux,
  FaWindows,
  FaAndroid,
} from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { SiNintendo } from "react-icons/si";
import { BsGlobeAsiaAustralia } from "react-icons/bs";
import Platform from "../entities/Platform";

interface Props {
  platforms: Platform[];
}

export default function PlatformIconList({ platforms }: Props) {
  const iconMap: Record<string, IconType> = {
    pc: FaWindows,
    playstation: FaPlaystation,
    xbox: FaXbox,
    ios: MdPhoneIphone,
    mac: FaApple,
    linux: FaLinux,
    android: FaAndroid,
    nintendo: SiNintendo,
    web: BsGlobeAsiaAustralia,
  };

  return (
    <div className="flex space-x-2 my-1">
      {platforms.map((platform) => {
        const IconComponent = iconMap[platform.slug];
        return IconComponent ? (
          <IconComponent key={platform.id} className="text-gray-500" />
        ) : null;
      })}
    </div>
  );
}
