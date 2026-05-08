'use client'

import { Palette } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { accents, useAccent, type Accent } from '@/components/providers/accent-provider'

const swatchHex: Record<Accent, string> = {
  emerald: '#10b981',
  violet: '#7c3aed',
  amber: '#d97706',
  sky: '#0284c7',
  rose: '#e11d48',
}

type Props = { label: string }

export function AccentPicker({ label }: Props) {
  const { accent, setAccent } = useAccent()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={label}
        title={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 w-9 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-accent-soft hover:text-accent"
      >
        <Palette className="h-4 w-4" />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={label}
          className="absolute right-0 top-full z-30 mt-2 flex gap-1 rounded-md border border-border bg-card p-2 shadow-lg"
        >
          {accents.map((a) => (
            <li key={a}>
              <button
                role="option"
                aria-selected={accent === a}
                aria-label={a}
                title={a}
                onClick={() => {
                  setAccent(a)
                  setOpen(false)
                }}
                className="flex h-7 w-7 items-center justify-center rounded-full ring-offset-2 ring-offset-card transition-transform hover:scale-110"
                style={{
                  backgroundColor: swatchHex[a],
                  boxShadow: accent === a ? `0 0 0 2px ${swatchHex[a]}` : undefined,
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
