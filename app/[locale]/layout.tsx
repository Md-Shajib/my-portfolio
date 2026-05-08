import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import '../globals.css'
import { geistSans, geistMono, hindSiliguri } from '@/lib/fonts'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { AccentProvider } from '@/components/providers/accent-provider'
import { NoFlashAccent } from '@/components/providers/no-flash'
import { Nav } from '@/components/layout/nav'
import { Footer } from '@/components/layout/footer'
import { SideRail } from '@/components/layout/side-rail'
import { EmailRail } from '@/components/layout/email-rail'
import { getDictionary } from '@/i18n/dictionaries'
import { isLocale, locales } from '@/i18n/config'
import { site } from '@/lib/site'

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
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
  const dict = await getDictionary(locale)

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
      <body className="bg-background text-foreground flex min-h-full flex-col">
        <ThemeProvider>
          <AccentProvider>
            <a
              href="#main"
              className="focus:bg-card sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:px-3 focus:py-2 focus:text-sm focus:shadow"
            >
              {dict.nav.skipToContent}
            </a>
            <Nav locale={locale} dict={dict} />
            <SideRail />
            <EmailRail />
            <div className="flex-1">{children}</div>
            <Footer dict={dict} />
          </AccentProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
