import { site } from '@/lib/site'

type JsonLdProps = { data: object | object[] }

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    email: `mailto:${site.email}`,
    jobTitle: 'Software Engineer',
    worksFor: { '@type': 'Organization', name: 'TechnoNext Software Ltd' },
    address: { '@type': 'PostalAddress', addressLocality: site.location },
    sameAs: [site.github, site.linkedin, site.codeforces, site.leetcode],
  }
}

export function websiteJsonLd(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: `${site.url}/${locale}`,
    inLanguage: locale === 'bn' ? 'bn-BD' : 'en-US',
  }
}

export function articleJsonLd(args: {
  url: string
  title: string
  description?: string
  date: string
  locale: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: args.title,
    description: args.description,
    datePublished: args.date,
    inLanguage: args.locale === 'bn' ? 'bn-BD' : 'en-US',
    author: { '@type': 'Person', name: site.name, url: site.url },
    publisher: { '@type': 'Person', name: site.name, url: site.url },
    mainEntityOfPage: args.url,
    url: args.url,
  }
}
