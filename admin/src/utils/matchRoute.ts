export function matchRoute(
  pattern: string,
  pathname: string
): boolean {
  const patternParts = pattern.split("/")
  const pathParts = pathname.split("/")

  if (patternParts.length !== pathParts.length) return false

  return patternParts.every((part, i) => {
    if (part.startsWith(":")) return true
    return part === pathParts[i]
  })
}
