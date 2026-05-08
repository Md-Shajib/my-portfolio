'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Languages } from 'lucide-react'
import { locales, type Locale } from '@/i18n/config'

type Props = { current: Locale; label: string }

function swapLocale(pathname: string, next: Locale) {
  const segments = pathname.split('/')
  if (segments.length > 1 && (locales as readonly string[]).includes(segments[1])) {
    segments[1] = next
    return segments.join('/') || '/'
  }
  return `/${next}${pathname}`
}

export function LanguageToggle({ current, label }: Props) {
  const pathname = usePathname() ?? `/${current}`
  const next: Locale = current === 'en' ? 'bn' : 'en'
  const href = swapLocale(pathname, next)

  return (
    <Link
      href={href}
      hrefLang={next}
      aria-label={label}
      title={label}
      onClick={() => {
        try {
          document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000; SameSite=Lax`
        } catch {
          /* ignore */
        }
      }}
      className="text-muted-foreground hover:bg-accent-soft hover:text-accent inline-flex h-9 items-center gap-1 rounded px-2 font-mono text-xs transition-colors"
    >
      <Languages className="h-4 w-4" />
      <span aria-hidden="true">{next.toUpperCase()}</span>
    </Link>
  )
}
