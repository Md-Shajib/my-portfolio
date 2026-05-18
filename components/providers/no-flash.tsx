// Flash prevention is now handled server-side via cookie in layout.tsx.
// AccentProvider syncs the cookie on mount and on every accent change.
export function NoFlashAccent() {
  return null
}
