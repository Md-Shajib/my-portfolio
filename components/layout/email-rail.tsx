import { site } from '@/lib/site'

export function EmailRail() {
  return (
    <aside
      aria-label="Email"
      className="fixed bottom-0 right-6 z-10 hidden flex-col items-center gap-6 md:flex xl:right-10"
    >
      <a
        href={`mailto:${site.email}`}
        className="font-mono text-xs tracking-widest text-muted-foreground transition-all hover:-translate-y-1 hover:text-accent"
        style={{ writingMode: 'vertical-rl' }}
      >
        {site.email}
      </a>
      <div className="h-24 w-px bg-muted-foreground/40" aria-hidden="true" />
    </aside>
  )
}
