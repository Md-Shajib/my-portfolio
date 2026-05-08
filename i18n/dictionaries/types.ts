export type Dictionary = {
  meta: { title: string; description: string }
  nav: {
    about: string
    experience: string
    work: string
    contact: string
    blog: string
    archive: string
    resume: string
    skipToContent: string
    openMenu: string
    closeMenu: string
    toggleTheme: string
    pickAccent: string
    switchLanguage: string
  }
  hero: {
    eyebrow: string
    name: string
    headline: string
    body: string
    cta: string
  }
  about: {
    title: string
    p1: string
    p2: string
    p3: string
    skillsHeading: string
    photoAlt: string
  }
  experience: { title: string; present: string }
  featured: {
    title: string
    featuredTag: string
    viewMore: string
    viewSource: string
  }
  archive: {
    title: string
    subtitle: string
    viewArchive: string
    backToHome: string
    columns: { year: string; project: string; builtWith: string; links: string }
  }
  blog: {
    title: string
    subtitle: string
    backToBlog: string
    readingTime: string
    publishedOn: string
    rss: string
  }
  contact: {
    eyebrow: string
    title: string
    body: string
    cta: string
    form: {
      name: string
      email: string
      message: string
      submit: string
      sending: string
      success: string
      genericError: string
      unavailable: string
      validation: {
        nameRequired: string
        emailInvalid: string
        messageShort: string
      }
    }
  }
  footer: {
    builtBy: string
    inspiredBy: string
    sourceCode: string
  }
  notFound: { title: string; body: string; cta: string }
  errors: { boundary: string; retry: string }
}
