import { ContactForm } from './contact-form'
import type { Dictionary } from '@/i18n/dictionaries'
import type { Locale } from '@/i18n/config'
import { site } from '@/lib/site'

type Props = {
  locale: Locale
  dict: Dictionary
}

export function Contact({ locale, dict }: Props) {
  return (
    <section
      id="contact"
      className="container-page mx-auto max-w-2xl scroll-mt-20 py-24 text-center"
      aria-labelledby="contact-heading"
    >
      <p className="text-accent font-mono text-sm">{dict.contact.eyebrow}</p>
      <h2 id="contact-heading" className="text-foreground mt-3 text-4xl font-bold">
        {dict.contact.title}
      </h2>
      <p className="text-muted-foreground mx-auto mt-6 max-w-lg">{dict.contact.body}</p>
      <a
        href={`mailto:${site.email}`}
        className="text-accent border-accent hover:bg-accent-soft mt-8 inline-flex items-center justify-center rounded border px-6 py-4 font-mono text-sm transition-colors"
      >
        {dict.contact.cta}
      </a>
      <ContactForm locale={locale} dict={dict} />
    </section>
  )
}
