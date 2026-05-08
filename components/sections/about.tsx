import Image from 'next/image'
import { SectionHeading } from './section-heading'
import { skills } from '@/data/skills'
import type { Dictionary } from '@/i18n/dictionaries'

type Props = { dict: Dictionary }

export function About({ dict }: Props) {
  return (
    <section
      id="about"
      className="container-page scroll-mt-20 py-24"
      aria-labelledby="about-heading"
    >
      <SectionHeading index={1} title={dict.about.title} />
      <div className="grid gap-12 md:grid-cols-[3fr_2fr]">
        <div className="text-muted-foreground space-y-4">
          <p>{dict.about.p1}</p>
          <p>{dict.about.p2}</p>
          <p>{dict.about.p3}</p>
          <ul
            className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-xs"
            aria-label={dict.about.skillsHeading}
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
        <div className="group relative mx-auto w-full max-w-[280px]">
          <div className="border-accent relative overflow-hidden rounded border-2 transition-transform duration-300 group-hover:-translate-y-1">
            <Image
              src="/portrait.svg"
              alt={dict.about.photoAlt}
              width={400}
              height={400}
              className="block h-auto w-full"
              priority={false}
            />
          </div>
          <div
            className="border-accent pointer-events-none absolute -right-3 -bottom-3 -z-10 h-full w-full rounded border-2 transition-all duration-300 group-hover:-right-1 group-hover:-bottom-1"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  )
}
