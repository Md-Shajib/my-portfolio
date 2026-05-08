import Link from 'next/link'
import { ExternalLink, Folder } from 'lucide-react'
import { GitHubIcon } from '@/components/icons/brand'
import { SectionHeading } from './section-heading'
import type { ArchiveProject } from '@/data/projects'
import type { Dictionary } from '@/i18n/dictionaries'
import type { Locale } from '@/i18n/config'

type Props = {
  dict: Dictionary
  items: ArchiveProject[]
  locale: Locale
}

export function Other({ dict, items, locale }: Props) {
  const preview = items.slice(0, 6)

  return (
    <section className="container-page scroll-mt-20 py-24" aria-labelledby="other-heading">
      <h2 id="other-heading" className="mb-3 text-center text-3xl font-bold">
        {dict.archive.title}
      </h2>
      <p className="text-muted-foreground mb-12 text-center font-mono text-sm">
        {dict.archive.subtitle}
      </p>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {preview.map((p, i) => (
          <li
            key={`${p.year}-${p.title}-${i}`}
            className="bg-card group flex flex-col rounded p-6 shadow-md transition-transform hover:-translate-y-1"
          >
            <header className="mb-4 flex items-center justify-between">
              <Folder className="text-accent h-7 w-7" aria-hidden="true" />
              <div className="text-muted-foreground flex gap-3">
                {p.links.map((l) =>
                  l.label === 'github' ? (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={dict.featured.viewSource}
                      className="hover:text-accent transition-colors"
                    >
                      <GitHubIcon className="h-5 w-5" />
                    </a>
                  ) : (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={dict.featured.viewMore}
                      className="hover:text-accent transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" aria-hidden="true" />
                    </a>
                  )
                )}
              </div>
            </header>
            <h3 className="text-foreground group-hover:text-accent text-lg font-bold transition-colors">
              {p.title}
            </h3>
            <p className="text-muted-foreground mt-2 flex-1 text-sm">{p.summary}</p>
            <ul className="text-muted-foreground mt-5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs">
              {p.tech.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <div className="mt-12 flex justify-center">
        <Link
          href={`/${locale}/archive`}
          className="text-accent border-accent hover:bg-accent-soft inline-flex items-center justify-center rounded border px-6 py-3 font-mono text-sm transition-colors"
        >
          {dict.archive.viewArchive}
        </Link>
      </div>
    </section>
  )
}
