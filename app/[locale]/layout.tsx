import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import '../globals.css'
import { geistSans, geistMono, hindSiliguri } from '@/lib/fonts'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { AccentProvider } from '@/components/providers/accent-provider'
import { NoFlashAccent } from '@/components/providers/no-flash'
import { getDictionary } from '@/i18n/dictionaries'
import { isLocale, locales, type Locale } from '@/i18n/config'
import { site } from '@/lib/site'

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = await getDictionary(locale)
  return {
    metadataBase: new URL(site.url),
    title: { default: dict.meta.title, template: `%s · ${site.shortName}` },
    description: dict.meta.description,
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `${site.url}/${locale}`,
      siteName: site.name,
      locale: locale === 'bn' ? 'bn_BD' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.title,
      description: dict.meta.description,
    },
    alternates: {
      canonical: `${site.url}/${locale}`,
      languages: {
        en: `${site.url}/en`,
        bn: `${site.url}/bn`,
        'x-default': `${site.url}/en`,
      },
    },
    robots: { index: true, follow: true },
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a192f' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <html
      lang={locale}
      data-accent="emerald"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${hindSiliguri.variable} h-full antialiased`}
    >
      <head>
        <NoFlashAccent />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider>
          <AccentProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-card focus:px-3 focus:py-2 focus:text-sm focus:shadow"
            >
              {/* Skip link label provided by client nav, kept here for SSR */}
              Skip to content
            </a>
            {children}
          </AccentProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export type LocaleParam = { locale: Locale }
