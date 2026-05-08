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
              className="block text-muted-foreground transition-all hover:-translate-y-1 hover:text-accent"
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
      <div className="h-24 w-px bg-muted-foreground/40" aria-hidden="true" />
    </aside>
  )
}
