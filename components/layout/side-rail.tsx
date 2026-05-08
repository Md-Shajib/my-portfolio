import { socials } from '@/data/socials'

export function SideRail() {
  return (
    <aside
      aria-label="Social links"
      className="fixed bottom-0 left-6 z-10 hidden flex-col items-center gap-6 md:flex xl:left-10"
    >
      <ul className="flex flex-col items-center gap-5">
        {socials.map(({ name, href, icon: Icon }) => (
          <li key={name}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={name}
              title={name}
              className="text-muted-foreground hover:text-accent block transition-all hover:-translate-y-1"
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
      <div className="bg-muted-foreground/40 h-24 w-px" aria-hidden="true" />
    </aside>
  )
}
