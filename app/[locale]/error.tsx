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
    <main
      id="main"
      className="container-page flex flex-1 flex-col items-center justify-center py-24 text-center"
    >
      <p className="text-accent font-mono text-2xl">Oops.</p>
      <p className="text-muted-foreground mt-4 max-w-prose">
        Something went sideways while rendering this page.
      </p>
      <button
        onClick={reset}
        className="border-accent text-accent hover:bg-accent-soft mt-8 inline-flex items-center gap-2 rounded border px-4 py-2 transition"
      >
        Try again
      </button>
    </main>
  )
}
