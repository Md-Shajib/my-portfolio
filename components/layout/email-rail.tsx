import { site } from '@/lib/site'

export function EmailRail() {
  return (
    <aside
      aria-label="Email"
      className="fixed right-6 bottom-0 z-10 hidden flex-col items-center gap-6 md:flex xl:right-10"
    >
      <a
        href={`mailto:${site.email}`}
        className="text-muted-foreground hover:text-accent font-mono text-xs tracking-widest transition-all hover:-translate-y-1"
        style={{ writingMode: 'vertical-rl' }}
      >
        {site.email}
      </a>
      <div className="bg-muted-foreground/40 h-24 w-px" aria-hidden="true" />
    </aside>
  )
}
