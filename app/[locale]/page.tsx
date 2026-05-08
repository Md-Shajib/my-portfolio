import { notFound } from 'next/navigation'
import { getDictionary } from '@/i18n/dictionaries'
import { isLocale } from '@/i18n/config'

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = await getDictionary(locale)

  return (
    <main id="main" className="container-page py-24">
      <p className="text-sm text-accent">{dict.hero.eyebrow}</p>
      <h1 className="mt-3 text-4xl font-bold md:text-6xl">{dict.hero.name}</h1>
      <h2 className="mt-2 text-2xl text-muted-foreground md:text-4xl">
        {dict.hero.headline}
      </h2>
      <p className="mt-6 max-w-prose text-muted-foreground">{dict.hero.body}</p>
    </main>
  )
}
