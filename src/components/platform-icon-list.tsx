import type { IconType } from 'react-icons'
import { BsGlobeAsiaAustralia } from 'react-icons/bs'
import { FaAndroid, FaApple, FaLinux, FaPlaystation, FaWindows, FaXbox } from 'react-icons/fa'
import { MdPhoneIphone } from 'react-icons/md'
import { SiNintendo } from 'react-icons/si'
import type { Platform } from '@/services/rawg'

interface Props {
  platforms: Platform[]
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
  }

  return (
    <div className="flex items-center space-x-1.5">
      {platforms.slice(0, 4).map((platform) => {
        const IconComponent = iconMap[platform.slug]
        return IconComponent ? (
          <IconComponent className="h-3.5 w-3.5 text-muted-foreground/60" key={platform.id} />
        ) : null
      })}
      {platforms.length > 4 && <span className="ml-1 text-muted-foreground/40 text-xs">+{platforms.length - 4}</span>}
    </div>
  )
}
