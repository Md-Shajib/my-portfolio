import { socials } from '@/data/socials'
import type { Dictionary } from '@/i18n/dictionaries'
import { site } from '@/lib/site'

type Props = { dict: Dictionary }

export function Footer({ dict }: Props) {
  return (
    <footer className="border-border/40 border-t py-10">
      <div className="container-page text-muted-foreground flex flex-col items-center gap-3 text-center font-mono text-xs">
        <ul className="flex items-center gap-5 md:hidden">
          {socials.map(({ name, href, icon: Icon }) => (
            <li key={name}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={name}
                className="hover:text-accent transition-colors"
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
            className="hover:text-accent transition-colors"
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
