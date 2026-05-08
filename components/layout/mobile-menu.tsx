'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

type Item = { href: string; label: string }
type Props = {
  items: Item[]
  resumeHref: string
  resumeLabel: string
  openLabel: string
  closeLabel: string
}

export function MobileMenu({ items, resumeHref, resumeLabel, openLabel, closeLabel }: Props) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        aria-label={open ? closeLabel : openLabel}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 w-9 items-center justify-center rounded text-foreground hover:bg-accent-soft md:hidden"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div className="fixed inset-0 top-16 z-30 flex flex-col bg-background/95 backdrop-blur-md md:hidden">
          <ul className="flex flex-col items-center gap-6 p-8 font-mono text-sm">
            {items.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex flex-col items-center gap-1 text-foreground hover:text-accent"
                >
                  <span className="text-accent">{`0${i + 1}.`}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
            <li>
              <a
                href={resumeHref}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded border border-accent px-4 py-2 text-accent hover:bg-accent-soft"
              >
                {resumeLabel}
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}
