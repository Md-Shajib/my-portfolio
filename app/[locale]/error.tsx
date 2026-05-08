'use client'

import { useEffect } from 'react'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.error(error)
    }
  }, [error])

  return (
    <main id="main" className="container-page flex flex-1 flex-col items-center justify-center py-24 text-center">
      <p className="font-mono text-2xl text-accent">Oops.</p>
      <p className="mt-4 max-w-prose text-muted-foreground">
        Something went sideways while rendering this page.
      </p>
      <button
        onClick={reset}
        className="mt-8 inline-flex items-center gap-2 rounded border border-accent px-4 py-2 text-accent transition hover:bg-accent-soft"
      >
        Try again
      </button>
    </main>
  )
}
