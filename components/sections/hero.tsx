import type { Dictionary } from '@/i18n/dictionaries'

type Props = { dict: Dictionary }

export function Hero({ dict }: Props) {
  return (
    <section
      id="hero"
      className="container-page flex min-h-[calc(100vh-4rem)] flex-col justify-center py-16"
      aria-labelledby="hero-heading"
    >
      <p className="text-accent mb-5 font-mono text-sm md:text-base">{dict.hero.eyebrow}</p>
      <h1
        id="hero-heading"
        className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl md:text-7xl"
      >
        {dict.hero.name}
      </h1>
      <h2 className="text-muted-foreground mt-3 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl md:text-6xl">
        {dict.hero.headline}
      </h2>
      <p className="text-muted-foreground mt-6 max-w-xl">{dict.hero.body}</p>
      <a
        href="#contact"
        className="border-accent text-accent hover:bg-accent-soft mt-10 inline-flex w-fit items-center justify-center rounded border px-6 py-4 font-mono text-sm transition-colors"
      >
        {dict.hero.cta}
      </a>
    </section>
  )
}
