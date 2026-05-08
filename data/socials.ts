import { Mail } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import { CodeforcesIcon, GitHubIcon, LeetCodeIcon, LinkedInIcon } from '@/components/icons/brand'
import { site } from '@/lib/site'

export type Social = {
  name: string
  href: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

export const socials: Social[] = [
  { name: 'GitHub', href: site.github, icon: GitHubIcon },
  { name: 'LinkedIn', href: site.linkedin, icon: LinkedInIcon },
  { name: 'Codeforces', href: site.codeforces, icon: CodeforcesIcon },
  { name: 'LeetCode', href: site.leetcode, icon: LeetCodeIcon },
  { name: 'Email', href: `mailto:${site.email}`, icon: Mail },
]
