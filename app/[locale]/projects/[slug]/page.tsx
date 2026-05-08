import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getEntry, getAllSlugs } from '@/lib/mdx'
import { getDictionary } from '@/i18n/dictionaries'
import { isLocale, locales } from '@/i18n/config'
import { formatDate } from '@/lib/utils'
import { site } from '@/lib/site'

export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = await getAllSlugs('projects')
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })))
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/projects/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const entry = await getEntry('projects', slug, locale)
  if (!entry) return {}
  const url = `${site.url}/${locale}/projects/${slug}`
  return {
    title: entry.frontmatter.title,
    description: entry.frontmatter.description,
    alternates: { canonical: url },
    openGraph: {
      title: entry.frontmatter.title,
      description: entry.frontmatter.description,
      url,
      type: 'article',
      publishedTime: entry.frontmatter.date,
    },
  }
}

export default async function ProjectPage({ params }: PageProps<'/[locale]/projects/[slug]'>) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const entry = await getEntry('projects', slug, locale)
  if (!entry) notFound()
  const dict = await getDictionary(locale)

  const { default: Mdx } = await import(`@/content/projects/${slug}.${entry.locale}.mdx`)

  return (
    <main id="main" className="container-page py-24">
      <Link href={`/${locale}#work`} className="text-accent font-mono text-xs hover:underline">
        ← {dict.featured.title}
      </Link>
      <h1 className="mt-4 text-4xl font-bold">{entry.frontmatter.title}</h1>
      <p className="text-muted-foreground mt-2 font-mono text-xs">
        {formatDate(entry.frontmatter.date, locale)}
      </p>
      {entry.frontmatter.description && (
        <p className="text-muted-foreground mt-4 max-w-prose">{entry.frontmatter.description}</p>
      )}
      {entry.frontmatter.tags && (
        <ul className="text-muted-foreground mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs">
          {entry.frontmatter.tags.map((t) => (
            <li key={t}>#{t}</li>
          ))}
        </ul>
      )}
      <article className="mt-10 max-w-prose">
        <Mdx />
      </article>
    </main>
  )
}
