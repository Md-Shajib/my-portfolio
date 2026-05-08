import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { AccentPicker } from './accent-picker'
import { LanguageToggle } from './language-toggle'
import { MobileMenu } from './mobile-menu'
import type { Dictionary } from '@/i18n/dictionaries'
import type { Locale } from '@/i18n/config'

type Props = {
  locale: Locale
  dict: Dictionary
}

export function Nav({ locale, dict }: Props) {
  const items = [
    { href: `/${locale}#about`, label: dict.nav.about },
    { href: `/${locale}#experience`, label: dict.nav.experience },
    { href: `/${locale}#work`, label: dict.nav.work },
    { href: `/${locale}#contact`, label: dict.nav.contact },
    { href: `/${locale}/blog`, label: dict.nav.blog },
  ]

  return (
    <header className="sticky top-0 z-20 border-b border-border/40 bg-background/70 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="container-page flex h-16 items-center justify-between"
      >
        <Link
          href={`/${locale}`}
          aria-label="Home"
          className="inline-flex h-10 w-10 items-center justify-center rounded border border-accent font-mono text-lg font-bold text-accent transition-transform hover:scale-105"
        >
          S
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <ul className="flex items-center gap-2 font-mono text-sm">
            {items.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded px-3 py-2 text-foreground transition-colors hover:text-accent"
                >
                  <span className="text-accent">{`0${i + 1}.`}</span>{' '}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="ml-3 inline-flex h-9 items-center justify-center rounded border border-accent px-3 font-mono text-xs text-accent transition-colors hover:bg-accent-soft"
          >
            {dict.nav.resume}
          </a>
          <div className="ml-2 flex items-center gap-1">
            <LanguageToggle current={locale} label={dict.nav.switchLanguage} />
            <ThemeToggle label={dict.nav.toggleTheme} />
            <AccentPicker label={dict.nav.pickAccent} />
          </div>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <LanguageToggle current={locale} label={dict.nav.switchLanguage} />
          <ThemeToggle label={dict.nav.toggleTheme} />
          <AccentPicker label={dict.nav.pickAccent} />
          <MobileMenu
            items={items}
            resumeHref="/resume.pdf"
            resumeLabel={dict.nav.resume}
            openLabel={dict.nav.openMenu}
            closeLabel={dict.nav.closeMenu}
          />
        </div>
      </nav>
    </header>
  )
}
