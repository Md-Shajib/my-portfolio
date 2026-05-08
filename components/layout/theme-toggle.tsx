'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

type Props = { label: string }

export function ThemeToggle({ label }: Props) {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="hover:bg-accent-soft hover:text-accent text-muted-foreground inline-flex h-9 w-9 items-center justify-center rounded transition-colors"
    >
      <Sun className="hidden h-4 w-4 dark:block" />
      <Moon className="block h-4 w-4 dark:hidden" />
    </button>
  )
}
