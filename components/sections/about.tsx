import Image from 'next/image'
import { SectionHeading } from './section-heading'
import { skills } from '@/data/skills'
import type { Dictionary } from '@/i18n/dictionaries'

type Props = { about: Dictionary['about'] }

export function About({ about }: Props) {
  return (
    <section
      id="about"
      className="container-page scroll-mt-20 py-24"
      aria-labelledby="about-heading"
    >
      <SectionHeading index={1} title={about.title} />
      <div className="grid gap-12 md:grid-cols-[3fr_2fr]">
        <div className="text-muted-foreground space-y-4">
          <p>{about.p1}</p>
          <p>{about.p2}</p>
          <p>{about.p3}</p>
          <ul
            className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-xs"
            aria-label={about.skillsHeading}
          >
            {skills.map((skill) => (
              <li key={skill} className="flex items-start gap-2">
                <span className="text-accent leading-5" aria-hidden="true">
                  ▹
                </span>
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="group relative mx-auto w-full max-w-70">
          <div className="border-accent relative overflow-hidden rounded border-3 transition-transform duration-300 group-hover:-translate-y-1">
            <Image
              src="/image.png"
              alt={about.photoAlt}
              width={400}
              height={400}
              className="block h-auto w-full"
              priority={false}
            />
            <div className="bg-accent absolute top-0 left-0 h-full w-full opacity-40 transition-all duration-300 hover:opacity-0" />
          </div>
          <div
            className="border-accent pointer-events-none absolute top-3 -right-3 -z-10 h-[88%] w-full rounded border-2 transition-all duration-300 group-hover:-top-1 group-hover:right-0"
            aria-hidden="true"
            color="black"
          />
        </div>
      </div>
    </section>
  )
}
