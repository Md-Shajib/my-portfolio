import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ExternalLink } from 'lucide-react'
import { GitHubIcon } from '@/components/icons/brand'
import { getDictionary } from '@/i18n/dictionaries'
import { isLocale, locales } from '@/i18n/config'
import { getArchiveProjects } from '@/data/projects'
import { site } from '@/lib/site'

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/archive'>): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = await getDictionary(locale)
  const url = `${site.url}/${locale}/archive`
  return {
    title: dict.archive.title,
    description: dict.archive.subtitle,
    alternates: { canonical: url },
  }
}

export default async function ArchivePage({ params }: PageProps<'/[locale]/archive'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = await getDictionary(locale)
  const items = getArchiveProjects(locale)

  return (
    <main id="main" className="container-page py-24">
      <header className="text-center">
        <Link
          href={`/${locale}`}
          className="text-accent font-mono text-xs hover:underline"
        >
          {dict.archive.backToHome}
        </Link>
        <h1 className="mt-4 text-4xl font-bold md:text-5xl">{dict.archive.title}</h1>
        <p className="text-muted-foreground mt-3 font-mono text-sm">
          {dict.archive.subtitle}
        </p>
      </header>

      <div className="mt-12 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-muted-foreground border-border border-b font-mono text-xs uppercase">
            <tr>
              <th className="py-3 pr-4">{dict.archive.columns.year}</th>
              <th className="py-3 pr-4">{dict.archive.columns.project}</th>
              <th className="py-3 pr-4 hidden md:table-cell">{dict.archive.columns.builtWith}</th>
              <th className="py-3 pr-4">{dict.archive.columns.links}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p, i) => (
              <tr
                key={`${p.year}-${p.title}-${i}`}
                className="border-border/40 hover:bg-accent-soft border-b transition-colors"
              >
                <td className="text-muted-foreground py-4 pr-4 font-mono text-xs">{p.year}</td>
                <td className="text-foreground py-4 pr-4 font-medium">
                  {p.title}
                  {p.summary && (
                    <p className="text-muted-foreground mt-1 text-xs font-normal">
                      {p.summary}
                    </p>
                  )}
                </td>
                <td className="text-muted-foreground py-4 pr-4 hidden font-mono text-xs md:table-cell">
                  {p.tech.join(' · ')}
                </td>
                <td className="text-muted-foreground py-4 pr-4">
                  <div className="flex gap-3">
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
                          <GitHubIcon className="h-4 w-4" />
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
                          <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        </a>
                      )
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
