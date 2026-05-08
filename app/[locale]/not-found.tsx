import Link from 'next/link'

export default function NotFound() {
  return (
    <main id="main" className="container-page flex flex-1 flex-col items-center justify-center py-24 text-center">
      <p className="font-mono text-6xl text-accent">404</p>
      <p className="mt-4 max-w-prose text-muted-foreground">
        This page wandered off. Let’s get you home.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded border border-accent px-4 py-2 text-accent transition hover:bg-accent-soft"
      >
        Back home
      </Link>
    </main>
  )
}
