import type { Dictionary } from './types'

const en: Dictionary = {
  meta: {
    title: 'Md Sharifuzzaman Shajib · Software Engineer',
    description:
      'Backend engineer at TechnoNext building reliable Go services and polished web experiences. Based in Bangladesh.',
  },
  nav: {
    about: 'About',
    experience: 'Experience',
    work: 'Work',
    contact: 'Contact',
    blog: 'Blog',
    archive: 'Archive',
    resume: 'Resume',
    skipToContent: 'Skip to content',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    toggleTheme: 'Toggle theme',
    pickAccent: 'Pick accent color',
    switchLanguage: 'Switch language',
  },
  hero: {
    eyebrow: 'Hi, my name is',
    name: 'Shajib.',
    headline: 'I build things for the web and beyond.',
    body: 'I’m a software engineer based in Dhaka, Bangladesh, focused on backend systems in Go and gRPC, with a soft spot for thoughtful frontend work in Next.js and TypeScript. Currently engineering at TechnoNext.',
    cta: 'Get in touch',
  },
  about: {
    title: 'About Me',
    p1: 'Hello! I’m Shajib, a software engineer who enjoys turning fuzzy problems into reliable systems. My path here started with competitive programming (ICPC Asia Dhaka 2022 and 2023, 800+ problems solved) and a CSE degree from Gopalganj Science and Technology University.',
    p2: 'These days I work on backend microservices in Go — gRPC, REST, PostgreSQL (including geospatial), Docker — and collaborate closely with Next.js front-of-house teams. I’ve also shipped full-stack Next.js work and dabbled in ML and AI agent automation.',
    p3: 'A few things I’ve been working with recently:',
    skillsHeading: 'Tech I reach for:',
    photoAlt: 'Portrait of Md Sharifuzzaman Shajib',
  },
  experience: {
    title: 'Where I’ve Worked',
    present: 'Present',
  },
  featured: {
    title: 'Some Things I’ve Built',
    featuredTag: 'Featured Project',
    viewMore: 'View Project',
    viewSource: 'View Source',
  },
  archive: {
    title: 'Other Noteworthy Projects',
    subtitle: 'a list of things I’ve worked on',
    viewArchive: 'view the archive',
    backToHome: '← Back to home',
    columns: {
      year: 'Year',
      project: 'Project',
      builtWith: 'Built with',
      links: 'Links',
    },
  },
  blog: {
    title: 'Writing',
    subtitle: 'notes on engineering, systems, and the things I’m learning',
    backToBlog: '← All posts',
    readingTime: '{{minutes}} min read',
    publishedOn: 'Published on {{date}}',
    rss: 'RSS feed',
  },
  contact: {
    eyebrow: 'What’s Next?',
    title: 'Get In Touch',
    body: 'My inbox is open. Whether you have a question, a project idea, or just want to say hi, I’ll do my best to get back to you.',
    cta: 'Say hello',
    form: {
      name: 'Your name',
      email: 'Your email',
      message: 'Message',
      submit: 'Send message',
      sending: 'Sending…',
      success: 'Thanks — I’ll get back to you soon.',
      genericError: 'Something went wrong. Please try again, or email me directly.',
      unavailable: 'Contact form is not configured yet. Please email me directly.',
      validation: {
        nameRequired: 'Please share your name.',
        emailInvalid: 'Please share a valid email.',
        messageShort: 'A few more words would help.',
      },
    },
  },
  footer: {
    builtBy: 'Built by Md Sharifuzzaman Shajib.',
    inspiredBy: 'Inspired by Brittany Chiang.',
    sourceCode: 'Source on GitHub',
  },
  notFound: {
    title: '404',
    body: 'This page wandered off. Let’s get you home.',
    cta: 'Back home',
  },
  errors: {
    boundary: 'Something went sideways while rendering this page.',
    retry: 'Try again',
  },
}

export default en
export type { Dictionary } from './types'
