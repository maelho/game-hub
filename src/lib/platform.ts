import type { ParentPlatform, PlataformNames } from '@/services/rawg'

const platforms: Record<PlataformNames, { full: string; short: string }> = {
  pc: { full: 'PC', short: 'PC' },
  playstation: { full: 'PlayStation', short: 'PS' },
  xbox: { full: 'Xbox', short: 'XB' },
  nintendo: { full: 'Nintendo', short: 'NS' },
  mac: { full: 'Mac', short: 'MAC' },
  linux: { full: 'Linux', short: 'LNX' },
  ios: { full: 'iOS', short: 'iOS' },
  android: { full: 'Android', short: 'AND' },
  web: { full: 'Web', short: 'WEB' },
  sega: { full: 'Sega', short: 'SEG' },
  atari: { full: 'Atari', short: 'ATR' },
  '3do': { full: '3DO', short: '3DO' },
  'commodore-amiga': { full: 'Commodore Amiga', short: 'AMI' },
  'neo-geo': { full: 'Neo Geo', short: 'NGO' },
}

type FormatStyle = 'full' | 'short'

export function formatPlatforms(
  platformsList: ParentPlatform[] | undefined,
  style: FormatStyle = 'full',
  separator = ' / ',
  limit?: number,
): string | null {
  if (!platformsList?.length) return null

  const list = limit ? platformsList.slice(0, limit) : platformsList
  return list.map((p) => platforms[p.platform.slug][style]).join(separator)
}

export function getPlatformName(slug: PlataformNames, style: FormatStyle = 'full'): string {
  return platforms[slug]?.[style] ?? slug
}
