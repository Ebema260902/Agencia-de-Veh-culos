/**
 * Routes external image URLs through wsrv.nl:
 *  - Served from CDN edge after first cache hit
 *  - Auto-converted to WebP
 *  - Resized to the requested width
 *
 * Local assets and Supabase Storage URLs are returned unchanged.
 */
export function toOptimizedUrl(url: string | undefined, width: number): string | undefined {
  if (!url) return undefined
  if (url.startsWith('/') || url.includes('supabase.co')) return url
  return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=${width}&output=webp&q=82`
}
