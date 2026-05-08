import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getEntry, getAllSlugs } from '@/lib/mdx'
import { getDictionary } from '@/i18n/dictionaries'
import { isLocale, locales } from '@/i18n/config'
import { formatDate, interpolate } from '@/lib/utils'
import { site } from '@/lib/site'

export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = await getAllSlugs('posts')
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })))
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/blog/[slug]'>): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const entry = await getEntry('posts', slug, locale)
  if (!entry) return {}
  const url = `${site.url}/${locale}/blog/${slug}`
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

export default async function BlogPostPage({ params }: PageProps<'/[locale]/blog/[slug]'>) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const entry = await getEntry('posts', slug, locale)
  if (!entry) notFound()
  const dict = await getDictionary(locale)

  const { default: Mdx } = await import(`@/content/posts/${slug}.${entry.locale}.mdx`)

  return (
    <main id="main" className="container-page py-24">
      <Link
        href={`/${locale}/blog`}
        className="text-accent hover:underline font-mono text-xs"
      >
        {dict.blog.backToBlog}
      </Link>
      <h1 className="mt-4 text-4xl font-bold md:text-5xl">{entry.frontmatter.title}</h1>
      <p className="text-muted-foreground mt-3 font-mono text-xs">
        {interpolate(dict.blog.publishedOn, { date: formatDate(entry.frontmatter.date, locale) })}
        {' · '}
        {interpolate(dict.blog.readingTime, { minutes: entry.readingMinutes })}
      </p>
      {entry.frontmatter.tags && (
        <ul className="text-muted-foreground mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs">
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
