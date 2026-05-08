'use client'

import { useState } from 'react'
import { SectionHeading } from './section-heading'
import type { ExperienceItem } from '@/data/experience'
import type { Dictionary } from '@/i18n/dictionaries'
import { cn } from '@/lib/utils'

type Props = {
  dict: Dictionary
  items: ExperienceItem[]
}

export function Experience({ dict, items }: Props) {
  const [active, setActive] = useState(0)
  const item = items[active]

  return (
    <section
      id="experience"
      className="container-page scroll-mt-20 py-24"
      aria-labelledby="experience-heading"
    >
      <SectionHeading index={2} title={dict.experience.title} />
      <div className="mx-auto flex max-w-3xl flex-col gap-6 md:flex-row md:gap-10">
        <div
          role="tablist"
          aria-orientation="vertical"
          className="flex overflow-x-auto md:flex-col md:overflow-visible"
        >
          {items.map((it, i) => (
            <button
              key={it.id}
              role="tab"
              type="button"
              aria-selected={active === i}
              aria-controls={`exp-panel-${it.id}`}
              id={`exp-tab-${it.id}`}
              onClick={() => setActive(i)}
              className={cn(
                'px-4 py-3 font-mono text-xs whitespace-nowrap transition-colors',
                'border-b-2 md:border-b-0 md:border-l-2',
                active === i
                  ? 'border-accent text-accent bg-accent-soft'
                  : 'border-border text-muted-foreground hover:bg-accent-soft hover:text-accent'
              )}
            >
              {it.company}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`exp-panel-${item.id}`}
          aria-labelledby={`exp-tab-${item.id}`}
          className="min-h-[14rem] flex-1"
        >
          <h3 className="text-foreground text-lg font-medium">
            {item.role}{' '}
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              @ {item.company}
            </a>
          </h3>
          <p className="text-muted-foreground mt-1 font-mono text-xs">
            {item.start} — {item.end === 'present' ? dict.experience.present : item.end}
          </p>
          <ul className="text-muted-foreground mt-4 space-y-3">
            {item.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-accent shrink-0 leading-6" aria-hidden="true">
                  ▹
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
