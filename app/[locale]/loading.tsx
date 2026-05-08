export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="container-page flex flex-1 items-center justify-center py-24"
    >
      <span className="inline-block h-8 w-8 animate-pulse rounded-full bg-accent-soft" />
      <span className="sr-only">Loading…</span>
    </div>
  )
}
