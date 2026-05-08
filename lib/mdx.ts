import 'server-only'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import type { Locale } from '@/i18n/config'
import { defaultLocale } from '@/i18n/config'

export type Frontmatter = {
  title: string
  description?: string
  date: string // ISO yyyy-mm-dd
  tags?: string[]
  draft?: boolean
  cover?: string
}

export type ContentEntry = {
  slug: string
  locale: Locale
  frontmatter: Frontmatter
  readingMinutes: number
  filePath: string
}

const ROOTS = {
  projects: path.join(process.cwd(), 'content', 'projects'),
  posts: path.join(process.cwd(), 'content', 'posts'),
} as const

export type ContentKind = keyof typeof ROOTS

async function readDir(kind: ContentKind): Promise<string[]> {
  try {
    return await fs.readdir(ROOTS[kind])
  } catch {
    return []
  }
}

function parseFilename(file: string): { slug: string; locale: Locale } | null {
  // {slug}.{locale}.mdx → slug, locale
  const match = file.match(/^(.+?)\.([a-z]{2})\.mdx?$/)
  if (!match) return null
  return { slug: match[1], locale: match[2] as Locale }
}

async function readEntry(kind: ContentKind, file: string): Promise<ContentEntry | null> {
  const parsed = parseFilename(file)
  if (!parsed) return null
  const filePath = path.join(ROOTS[kind], file)
  const raw = await fs.readFile(filePath, 'utf8')
  const { data, content } = matter(raw)
  const fm = data as Frontmatter
  if (!fm.title || !fm.date) return null
  const stats = readingTime(content)
  return {
    slug: parsed.slug,
    locale: parsed.locale,
    frontmatter: fm,
    readingMinutes: Math.max(1, Math.ceil(stats.minutes)),
    filePath,
  }
}

export async function listEntries(kind: ContentKind, locale: Locale): Promise<ContentEntry[]> {
  const files = await readDir(kind)
  const entries: ContentEntry[] = []
  const bySlug = new Map<string, ContentEntry>()

  // First pass: try requested locale
  for (const file of files) {
    const entry = await readEntry(kind, file)
    if (!entry || entry.frontmatter.draft) continue
    if (entry.locale === locale) bySlug.set(entry.slug, entry)
  }
  // Fallback pass: fill in missing slugs from default locale
  if (locale !== defaultLocale) {
    for (const file of files) {
      const entry = await readEntry(kind, file)
      if (!entry || entry.frontmatter.draft) continue
      if (entry.locale === defaultLocale && !bySlug.has(entry.slug)) {
        bySlug.set(entry.slug, entry)
      }
    }
  }

  for (const e of bySlug.values()) entries.push(e)
  entries.sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1))
  return entries
}

export async function getEntry(
  kind: ContentKind,
  slug: string,
  locale: Locale
): Promise<ContentEntry | null> {
  const files = await readDir(kind)
  for (const file of files) {
    const parsed = parseFilename(file)
    if (parsed && parsed.slug === slug && parsed.locale === locale) {
      return readEntry(kind, file)
    }
  }
  if (locale !== defaultLocale) {
    for (const file of files) {
      const parsed = parseFilename(file)
      if (parsed && parsed.slug === slug && parsed.locale === defaultLocale) {
        return readEntry(kind, file)
      }
    }
  }
  return null
}

export async function getAllSlugs(kind: ContentKind): Promise<string[]> {
  const files = await readDir(kind)
  const slugs = new Set<string>()
  for (const file of files) {
    const parsed = parseFilename(file)
    if (parsed) slugs.add(parsed.slug)
  }
  return [...slugs]
}
