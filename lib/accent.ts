export const accents = ['emerald', 'violet', 'amber', 'sky', 'rose'] as const
export type Accent = (typeof accents)[number]
export const defaultAccent: Accent = 'emerald'
