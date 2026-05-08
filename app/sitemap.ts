import type { MetadataRoute } from 'next'
import { listEntries, getAllSlugs } from '@/lib/mdx'
import { locales } from '@/i18n/config'
import { site } from '@/lib/site'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projectSlugs = await getAllSlugs('projects')
  const postSlugs = await getAllSlugs('posts')
  const enPosts = await listEntries('posts', 'en')
  const lastModForPost = new Map(enPosts.map((e) => [e.slug, e.frontmatter.date]))

  const entries: MetadataRoute.Sitemap = []
  const now = new Date().toISOString()

  for (const locale of locales) {
    entries.push({ url: `${site.url}/${locale}`, lastModified: now, changeFrequency: 'monthly' })
    entries.push({ url: `${site.url}/${locale}/archive`, lastModified: now, changeFrequency: 'monthly' })
    entries.push({ url: `${site.url}/${locale}/blog`, lastModified: now, changeFrequency: 'weekly' })
    for (const slug of projectSlugs) {
      entries.push({
        url: `${site.url}/${locale}/projects/${slug}`,
        lastModified: now,
        changeFrequency: 'yearly',
      })
    }
    for (const slug of postSlugs) {
      entries.push({
        url: `${site.url}/${locale}/blog/${slug}`,
        lastModified: lastModForPost.get(slug) ?? now,
        changeFrequency: 'yearly',
      })
    }
  }

  return entries
}
