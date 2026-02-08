import type { ParentPlatform, PlataformNames } from '@/services/rawg/types'

/**
 * Full platform names for display in detailed views
 */
export const platformNames: Record<PlataformNames, string> = {
  pc: 'PC',
  playstation: 'PlayStation',
  xbox: 'Xbox',
  nintendo: 'Nintendo',
  mac: 'Mac',
  linux: 'Linux',
  ios: 'iOS',
  android: 'Android',
  web: 'Web',
  sega: 'Sega',
  atari: 'Atari',
  '3do': '3DO',
  'commodore-amiga': 'Commodore Amiga',
  'neo-geo': 'Neo Geo',
}

/**
 * Short platform codes for compact display (cards, lists)
 */
export const platformShortCodes: Record<PlataformNames, string> = {
  pc: 'PC',
  playstation: 'PS',
  xbox: 'XB',
  nintendo: 'NS',
  mac: 'MAC',
  linux: 'LNX',
  ios: 'iOS',
  android: 'AND',
  web: 'WEB',
  sega: 'SEG',
  atari: 'ATR',
  '3do': '3DO',
  'commodore-amiga': 'AMI',
  'neo-geo': 'NGO',
}

type FormatStyle = 'full' | 'short'

/**
 * Formats a list of parent platforms into a display string
 * @param platforms - Array of parent platform objects
 * @param style - 'full' for complete names, 'short' for abbreviated codes
 * @param separator - String to join platform names (default: ' / ')
 * @param limit - Maximum number of platforms to show (default: all)
 */
export function formatPlatforms(
  platforms: ParentPlatform[] | undefined,
  style: FormatStyle = 'full',
  separator = ' / ',
  limit?: number,
): string | null {
  if (!platforms || platforms.length === 0) return null

  const mapping = style === 'full' ? platformNames : platformShortCodes
  const platformsToFormat = limit ? platforms.slice(0, limit) : platforms

  return platformsToFormat
    .map((p) => {
      const slug = p.platform.slug
      return mapping[slug] ?? (style === 'short' ? slug.slice(0, 3).toUpperCase() : p.platform.name)
    })
    .join(separator)
}

/**
 * Get a single platform's display name
 */
export function getPlatformName(slug: PlataformNames, style: FormatStyle = 'full'): string {
  const mapping = style === 'full' ? platformNames : platformShortCodes
  return mapping[slug] ?? slug
}
