import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Rss } from 'lucide-react'
import { listEntries } from '@/lib/mdx'
import { getDictionary } from '@/i18n/dictionaries'
import { isLocale, locales } from '@/i18n/config'
import { formatDate, interpolate } from '@/lib/utils'
import { site } from '@/lib/site'

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: PageProps<'/[locale]/blog'>): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = await getDictionary(locale)
  const url = `${site.url}/${locale}/blog`
  return {
    title: dict.blog.title,
    description: dict.blog.subtitle,
    alternates: { canonical: url },
  }
}

export default async function BlogIndexPage({ params }: PageProps<'/[locale]/blog'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = await getDictionary(locale)
  const entries = await listEntries('posts', locale)

  return (
    <main id="main" className="container-page py-24">
      <header className="flex flex-col items-start gap-4">
        <h1 className="text-4xl font-bold md:text-5xl">{dict.blog.title}</h1>
        <p className="text-muted-foreground font-mono text-sm">{dict.blog.subtitle}</p>
        <a
          href="/feed.xml"
          className="text-accent inline-flex items-center gap-2 font-mono text-xs hover:underline"
        >
          <Rss className="h-4 w-4" aria-hidden="true" />
          {dict.blog.rss}
        </a>
      </header>

      <ul className="mt-12 space-y-8">
        {entries.map((entry) => (
          <li key={entry.slug} className="border-border/40 border-b pb-8 last:border-b-0">
            <Link href={`/${locale}/blog/${entry.slug}`} className="group block">
              <p className="text-muted-foreground font-mono text-xs">
                {formatDate(entry.frontmatter.date, locale)} ·{' '}
                {interpolate(dict.blog.readingTime, { minutes: entry.readingMinutes })}
              </p>
              <h2 className="text-foreground group-hover:text-accent mt-2 text-2xl font-bold transition-colors">
                {entry.frontmatter.title}
              </h2>
              {entry.frontmatter.description && (
                <p className="text-muted-foreground mt-2 max-w-prose">
                  {entry.frontmatter.description}
                </p>
              )}
              {entry.frontmatter.tags && (
                <ul className="text-muted-foreground mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs">
                  {entry.frontmatter.tags.map((t) => (
                    <li key={t}>#{t}</li>
                  ))}
                </ul>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
