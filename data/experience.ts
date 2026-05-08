import type { Locale } from '@/i18n/config'

export type ExperienceItem = {
  id: string
  company: string
  url: string
  role: string
  start: string
  end: string | 'present'
  bullets: string[]
}

const en: ExperienceItem[] = [
  {
    id: 'technonext',
    company: 'TechnoNext',
    url: 'https://technonext.com',
    role: 'Junior Software Engineer',
    start: 'Nov 2025',
    end: 'present',
    bullets: [
      'Develop backend microservices in Go with gRPC + REST endpoints, designed for reliability and clear service boundaries.',
      'Model relational and geospatial data in PostgreSQL; ship Dockerised services with reproducible local + CI builds.',
      'Pair with the Next.js frontend team to define typed contracts and keep API ergonomics aligned with product needs.',
    ],
  },
  {
    id: 'easital',
    company: 'Easital Technologies',
    url: '#',
    role: 'Junior Software Engineer',
    start: 'Nov 2024',
    end: 'Oct 2025',
    bullets: [
      'Built feature-rich Next.js + TypeScript dashboards backed by NestJS APIs, with Redux Toolkit for state.',
      'Implemented JWT auth + role-based access control across the stack and shipped Tailwind UI matched to design specs.',
      'Owned features end-to-end from spec to deploy and debugged across the React/Node boundary.',
    ],
  },
  {
    id: 'brainstation',
    company: 'Brain Station 23',
    url: 'https://brainstation-23.com',
    role: 'Industrial Attachment',
    start: 'Oct 2024',
    end: 'Nov 2024',
    bullets: [
      'Studied SDLC and Agile delivery on production teams; contributed to React features under code review.',
      'Practised reading large codebases, writing tests, and pairing with senior engineers on real tickets.',
    ],
  },
]

const bn: ExperienceItem[] = en.map((item) => ({
  ...item,
  role: `${item.role} [BN review]`,
  bullets: item.bullets.map((b) => `${b} [BN review]`),
}))

export function getExperience(locale: Locale): ExperienceItem[] {
  return locale === 'bn' ? bn : en
}
