import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getEntry, getAllSlugs } from '@/lib/mdx'
import { getDictionary } from '@/i18n/dictionaries'
import { isLocale, locales } from '@/i18n/config'
import { formatDate, interpolate } from '@/lib/utils'
import { site } from '@/lib/site'
import { JsonLd, articleJsonLd } from '@/components/seo/json-ld'

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
      images: [
        `/api/og?title=${encodeURIComponent(entry.frontmatter.title)}&subtitle=${encodeURIComponent('Blog')}`,
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: entry.frontmatter.title,
      description: entry.frontmatter.description,
      images: [
        `/api/og?title=${encodeURIComponent(entry.frontmatter.title)}&subtitle=${encodeURIComponent('Blog')}`,
      ],
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
  const url = `${site.url}/${locale}/blog/${slug}`

  return (
    <main id="main" className="container-page py-24">
      <JsonLd
        data={articleJsonLd({
          url,
          title: entry.frontmatter.title,
          description: entry.frontmatter.description,
          date: entry.frontmatter.date,
          locale,
        })}
      />
      <Link href={`/${locale}/blog`} className="text-accent font-mono text-xs hover:underline">
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
