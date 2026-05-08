import { notFound } from 'next/navigation'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Experience } from '@/components/sections/experience'
import { Featured } from '@/components/sections/featured'
import { Other } from '@/components/sections/other'
import { Contact } from '@/components/sections/contact'
import { getDictionary } from '@/i18n/dictionaries'
import { isLocale } from '@/i18n/config'
import { getExperience } from '@/data/experience'
import { getArchiveProjects, getFeaturedProjects } from '@/data/projects'

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const dict = await getDictionary(locale)
  const experience = getExperience(locale)
  const featured = getFeaturedProjects(locale)
  const archive = getArchiveProjects(locale)

  return (
    <main id="main">
      <Hero dict={dict} />
      <About dict={dict} />
      <Experience dict={dict} items={experience} />
      <Featured dict={dict} items={featured} />
      <Other dict={dict} items={archive} locale={locale} />
      <Contact dict={dict} locale={locale} />
    </main>
  )
}
