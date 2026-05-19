'use client'

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from 'react'
import { accents, defaultAccent } from '@/lib/accent'
import type { Accent } from '@/lib/accent'

export { accents, defaultAccent }
export type { Accent }

const STORAGE_KEY = 'shajib-accent'
const STORE_EVENT = 'shajib:accent-change'

type AccentContextValue = {
  accent: Accent
  setAccent: (next: Accent) => void
}

const AccentContext = createContext<AccentContextValue | null>(null)

function isAccent(v: string | null): v is Accent {
  return !!v && (accents as readonly string[]).includes(v)
}

function readAccent(): Accent {
  if (typeof window === 'undefined') return defaultAccent
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (isAccent(v)) return v
  } catch {
    /* ignore */
  }
  const attr = document.documentElement.getAttribute('data-accent')
  return isAccent(attr) ? attr : defaultAccent
}

function subscribe(onChange: () => void) {
  if (typeof window === 'undefined') return () => {}
  const handle = () => onChange()
  window.addEventListener('storage', handle)
  window.addEventListener(STORE_EVENT, handle)
  return () => {
    window.removeEventListener('storage', handle)
    window.removeEventListener(STORE_EVENT, handle)
  }
}

export function AccentProvider({ children }: { children: React.ReactNode }) {
  const accent = useSyncExternalStore(subscribe, readAccent, () => defaultAccent)

  useEffect(() => {
    document.documentElement.setAttribute('data-accent', accent)
    // Sync cookie so future SSR requests read the correct accent
    document.cookie = `${STORAGE_KEY}=${accent};path=/;max-age=31536000;SameSite=Lax`
  }, [accent])

  const setAccent = useCallback((next: Accent) => {
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* storage unavailable */
    }
    // Keep cookie in sync so server can read it for SSR flash-prevention
    document.cookie = `${STORAGE_KEY}=${next};path=/;max-age=31536000;SameSite=Lax`
    window.dispatchEvent(new Event(STORE_EVENT))
  }, [])

  return <AccentContext.Provider value={{ accent, setAccent }}>{children}</AccentContext.Provider>
}

export function useAccent() {
  const ctx = useContext(AccentContext)
  if (!ctx) throw new Error('useAccent must be used inside AccentProvider')
  return ctx
}
