import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { GitHubIcon } from '@/components/icons/brand'
import { SectionHeading } from './section-heading'
import type { FeaturedProject } from '@/data/projects'
import type { Dictionary } from '@/i18n/dictionaries'
import { cn } from '@/lib/utils'

type Props = {
  dict: Dictionary
  items: FeaturedProject[]
}

export function Featured({ dict, items }: Props) {
  return (
    <section
      id="work"
      className="container-page scroll-mt-20 py-24"
      aria-labelledby="featured-heading"
    >
      <SectionHeading index={3} title={dict.featured.title} />
      <ul className="space-y-24">
        {items.map((p, i) => {
          const reversed = i % 2 === 1
          return (
            <li
              key={p.slug}
              className={cn(
                'relative grid items-center gap-2 md:grid-cols-12',
                'before:bg-card/30 before:absolute before:inset-0 before:rounded before:opacity-0 md:before:opacity-0'
              )}
            >
              <div
                className={cn(
                  'relative md:col-span-7',
                  reversed ? 'md:col-start-6' : 'md:col-start-1'
                )}
              >
                <a
                  href={p.links[0]?.href ?? '#'}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={p.title}
                  className="group block"
                >
                  <div className="bg-accent-soft relative aspect-[16/10] overflow-hidden rounded">
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={`${p.title} preview`}
                        fill
                        sizes="(max-width: 768px) 100vw, 60vw"
                        className="object-cover opacity-90 transition group-hover:opacity-100"
                      />
                    ) : (
                      <div className="text-accent flex h-full w-full items-center justify-center font-mono">
                        {p.title}
                      </div>
                    )}
                  </div>
                </a>
              </div>

              <div
                className={cn(
                  'relative z-10 md:col-span-6',
                  reversed
                    ? 'md:col-start-1 md:row-start-1 md:text-left'
                    : 'md:col-start-7 md:row-start-1 md:text-right'
                )}
              >
                <p className="text-accent font-mono text-xs">{dict.featured.featuredTag}</p>
                <h3 className="text-foreground mt-1 text-2xl font-bold">
                  <a
                    href={p.links[0]?.href ?? '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    {p.title}
                  </a>
                </h3>
                <div className="bg-card text-muted-foreground mt-4 rounded p-5 shadow-md">
                  <p>{p.summary}</p>
                </div>
                <ul
                  className={cn(
                    'text-muted-foreground mt-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs',
                    reversed ? 'md:justify-start' : 'md:justify-end'
                  )}
                >
                  {p.tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <div
                  className={cn(
                    'text-muted-foreground mt-4 flex gap-4',
                    reversed ? 'md:justify-start' : 'md:justify-end'
                  )}
                >
                  {p.links.map((l) =>
                    l.label === 'github' ? (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={dict.featured.viewSource}
                        title={dict.featured.viewSource}
                        className="hover:text-accent transition-colors"
                      >
                        <GitHubIcon className="h-5 w-5" />
                      </a>
                    ) : (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={dict.featured.viewMore}
                        title={dict.featured.viewMore}
                        className="hover:text-accent transition-colors"
                      >
                        <ExternalLink className="h-5 w-5" aria-hidden="true" />
                      </a>
                    )
                  )}
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
