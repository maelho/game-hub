import type { ParentPlatform, PlataformNames } from '@/services/rawg'
import { PlatformIcon } from './platform-icons'

interface Props {
  parent_platform: {
    platform: ParentPlatform
  }[]
}

export default function PlatformIconList({ parent_platform }: Props) {
  return (
    <div className="mb-4 flex items-center space-x-1.5">
      {parent_platform.slice(0, 4).map((platform) => (
        <PlatformIcon key={platform.platform.id} slug={platform.platform.slug as PlataformNames} />
      ))}
      {parent_platform.length > 4 && (
        <span className="ml-1 text-muted-foreground/40 text-xs">+{parent_platform.length - 4}</span>
      )}
    </div>
  )
}
