/** Shorten long hash strings for terminal output without losing prefix identity. */
export function previewHash(hash: string, visible = 12): string {
  if (!hash) return '';
  if (hash.length <= visible * 2 + 3) return hash;
  return `${hash.slice(0, visible)}…${hash.slice(-visible)}`;
}
