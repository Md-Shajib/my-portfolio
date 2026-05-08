export const skills = [
  'Go',
  'TypeScript',
  'Next.js',
  'React',
  'Node.js / NestJS',
  'gRPC + REST',
  'PostgreSQL',
  'Docker',
  'Tailwind CSS',
  'Redux Toolkit',
] as const

export type Skill = (typeof skills)[number]
