import { socials } from '@/data/socials'
import type { Dictionary } from '@/i18n/dictionaries'
import { site } from '@/lib/site'

type Props = { dict: Dictionary }

export function Footer({ dict }: Props) {
  return (
    <footer className="border-t border-border/40 py-10">
      <div className="container-page flex flex-col items-center gap-3 text-center font-mono text-xs text-muted-foreground">
        <ul className="flex items-center gap-5 md:hidden">
          {socials.map(({ name, href, icon: Icon }) => (
            <li key={name}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={name}
                className="transition-colors hover:text-accent"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
        <p>
          <a
            href={site.source}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-accent"
          >
            {dict.footer.sourceCode}
          </a>
        </p>
        <p>
          {dict.footer.builtBy} {dict.footer.inspiredBy}
        </p>
      </div>
    </footer>
  )
}
