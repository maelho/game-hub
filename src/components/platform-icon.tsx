import type { PlataformNames } from '@/services/rawg'
import * as Icons from './platform-icons'

const platformIconLoaders: Record<PlataformNames, React.ComponentType<React.SVGAttributes<SVGSVGElement>>> = {
  pc: Icons.Pc,
  playstation: Icons.Playstation,
  xbox: Icons.Xbox,
  ios: Icons.Ios,
  mac: Icons.Mac,
  linux: Icons.Linux,
  android: Icons.Android,
  nintendo: Icons.Nintendo,
  web: Icons.Web,

  // TODO: add missing Icons
  sega: Icons.Web,
  atari: Icons.Web,
  '3do': Icons.Web,
  'commodore-amiga': Icons.Web,
  'neo-geo': Icons.Web,
}

type PlatformIconProps = React.SVGAttributes<SVGSVGElement> & {
  slug: PlataformNames
}

export function PlatformIcon({ slug, ...props }: PlatformIconProps) {
  const Icon = platformIconLoaders[slug]

  if (!Icon) return null

  return (
    <div className="flex items-center">
      <Icon {...props} />
    </div>
  )
}
