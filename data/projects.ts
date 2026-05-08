import type { Locale } from '@/i18n/config'

export type ProjectLink = {
  label: 'github' | 'external'
  href: string
}

export type FeaturedProject = {
  slug: string
  title: string
  summary: string
  tech: string[]
  image?: string
  links: ProjectLink[]
}

export type ArchiveProject = {
  slug?: string
  year: number
  title: string
  madeAt?: string
  summary: string
  tech: string[]
  links: ProjectLink[]
}

const featuredEn: FeaturedProject[] = [
  {
    slug: 'medidhaka',
    title: 'MediDhaka',
    summary:
      'A healthcare management platform: appointment booking, prescription tracking, and a clinician dashboard. I built the Next.js front-end, integrated a Go REST API, and wired auth + role-based views with Redux Toolkit.',
    tech: ['Next.js', 'TypeScript', 'Redux Toolkit', 'Go', 'REST API'],
    image: '/projects/medidhaka.svg',
    links: [
      { label: 'github', href: 'https://github.com/md-shajib' },
    ],
  },
  {
    slug: 'career-craft',
    title: 'Career Craft',
    summary:
      'A job exploration UI to help students discover careers based on skills and interests. Static, fast, accessible — with category filtering and a saved-roles drawer.',
    tech: ['React', 'Tailwind CSS', 'HTML'],
    image: '/projects/career-craft.svg',
    links: [
      { label: 'github', href: 'https://github.com/md-shajib' },
    ],
  },
  {
    slug: 'jobquery-ai',
    title: 'JobQueryAI',
    summary:
      'A LinkedIn job-listing Q&A agent: Selenium scrapes structured data, Llama 3.2 answers natural-language questions over the corpus through a Flask interface.',
    tech: ['Python', 'Llama 3.2', 'Selenium', 'Flask'],
    image: '/projects/jobquery-ai.svg',
    links: [
      { label: 'github', href: 'https://github.com/md-shajib' },
    ],
  },
]

const archiveEn: ArchiveProject[] = [
  {
    year: 2025,
    title: 'AI Voice Appointment Setter',
    summary: 'Inbound voice agent for appointment booking via Vapi + Make + Google Calendar.',
    tech: ['Vapi', 'Make', 'Google Calendar'],
    links: [{ label: 'external', href: 'https://github.com/md-shajib' }],
  },
  {
    year: 2024,
    title: 'Bangla OCR Model Evaluation',
    madeAt: 'GSTU Research',
    summary:
      'Compared ML models on Bengali handwritten character recognition; results contributed to a 2026 Elsevier Data in Brief publication.',
    tech: ['Python', 'TensorFlow', 'Pandas'],
    links: [{ label: 'external', href: 'https://doi.org/10.1016/j.dib.2026.112700' }],
  },
  {
    year: 2024,
    title: 'Online Student Counselling System',
    summary: 'Web platform for virtual student support and session booking.',
    tech: ['React', 'Node.js', 'MongoDB'],
    links: [{ label: 'github', href: 'https://github.com/md-shajib' }],
  },
  {
    year: 2023,
    title: 'GSTU Project Exhibition (2nd Place)',
    summary: 'Full-stack web project shown at the university exhibition; awarded 2nd place.',
    tech: ['React', 'Node.js'],
    links: [{ label: 'github', href: 'https://github.com/md-shajib' }],
  },
  {
    year: 2023,
    title: 'GSTU Web Dev Club',
    summary:
      'Founded and led the university web-dev club as president; ran workshops on React, Git, and shipping for the web.',
    tech: ['Community', 'Workshops'],
    links: [],
  },
  {
    year: 2022,
    title: 'ICPC Asia Dhaka Regional',
    summary:
      'Two-time regional finalist (2022, 2023). Solved 800+ algorithmic problems across competitive judges.',
    tech: ['C++', 'Algorithms'],
    links: [{ label: 'external', href: 'https://codeforces.com/profile/shajib_2k19' }],
  },
]

const featuredBn: FeaturedProject[] = featuredEn.map((p) => ({
  ...p,
  summary: `${p.summary} [BN review]`,
}))

const archiveBn: ArchiveProject[] = archiveEn.map((p) => ({
  ...p,
  summary: `${p.summary} [BN review]`,
}))

export function getFeaturedProjects(locale: Locale): FeaturedProject[] {
  return locale === 'bn' ? featuredBn : featuredEn
}

export function getArchiveProjects(locale: Locale): ArchiveProject[] {
  return locale === 'bn' ? archiveBn : archiveEn
}
