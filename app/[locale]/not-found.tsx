import Link from 'next/link'

export default function NotFound() {
  return (
    <main
      id="main"
      className="container-page flex flex-1 flex-col items-center justify-center py-24 text-center"
    >
      <p className="text-accent font-mono text-6xl">404</p>
      <p className="text-muted-foreground mt-4 max-w-prose">
        This page wandered off. Let’s get you home.
      </p>
      <Link
        href="/"
        className="border-accent text-accent hover:bg-accent-soft mt-8 inline-flex items-center gap-2 rounded border px-4 py-2 transition"
      >
        Back home
      </Link>
    </main>
  )
}
