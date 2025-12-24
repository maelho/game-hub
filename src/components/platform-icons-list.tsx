import type { ParentPlatform } from '@/services/rawg'
import { PlatformIcon } from './platform-icon'

export default function PlatformIconList({
  parent_platform,
  limit = 4,
}: {
  limit?: number
  parent_platform: ParentPlatform[]
}) {
  if (parent_platform.length === 0) {
    return null
  }

  const visiblePlatforms = parent_platform.slice(0, limit)
  const remainingCount = parent_platform.length - limit

  return (
    <div className="mb-4 flex items-center gap-2">
      {visiblePlatforms.map((parent) => (
        <PlatformIcon key={parent.platform.slug} slug={parent.platform.slug} />
      ))}
      {remainingCount > 0 && <span className="text-muted-foreground/40 text-xs">+{remainingCount}</span>}
    </div>
  )
}
