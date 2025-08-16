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
    <div className="flex items-center space-x-1.5">
      {platforms.slice(0, 4).map((platform) => {
        const IconComponent = iconMap[platform.slug];
        return IconComponent ? (
          <IconComponent
            key={platform.id}
            className="w-3.5 h-3.5 text-muted-foreground/60"
          />
        ) : null;
      })}
      {platforms.length > 4 && (
        <span className="text-xs text-muted-foreground/40 ml-1">
          +{platforms.length - 4}
        </span>
      )}
    </div>
  );
}
