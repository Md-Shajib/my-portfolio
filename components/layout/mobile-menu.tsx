'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, User, Briefcase, Code2, Send, BookOpen } from 'lucide-react'
import type { ComponentType } from 'react'
import * as motion from 'motion/react-client'
import { AnimatePresence, type Variants } from 'motion/react'
import { socials } from '@/data/socials'
import { site } from '@/lib/site'

type Item = { href: string; label: string }
type Props = {
  items: Item[]
  resumeHref: string
  resumeLabel: string
  openLabel: string
  closeLabel: string
}

// Maps href fragment/path-end → lucide icon
const NAV_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  about: User,
  experience: Briefcase,
  work: Code2,
  contact: Send,
  blog: BookOpen,
}

// Realistic brand colors (theme-independent)
const SOCIAL_COLORS: Record<string, string> = {
  GitHub: 'currentColor',
  LinkedIn: '#0A66C2',
  Codeforces: '#1F8ACB',
  LeetCode: '#FFA116',
  Email: '#EA4335',
}

function getNavIcon(href: string) {
  const key = href.split('#')[1] ?? href.split('/').at(-1) ?? ''
  return NAV_ICONS[key] ?? Code2
}

// Hamburger sits at ~88% from the left on mobile.
// Open:  TL jumps to 0% immediately; BL lags → creates the genie wave.
//        Right side slides down at a steady pace.
// Close: exact reverse.
const genieVariants = {
  initial: {
    clipPath: 'polygon(88% 0%, 100% 0%, 100% 0%, 88% 0%)',
  },
  open: {
    clipPath: [
      'polygon(88% 0%, 100% 0%, 100%  0%,  88%  0%)',
      'polygon( 0% 0%, 100% 0%, 100% 22%,  72% 22%)',
      'polygon( 0% 0%, 100% 0%, 100% 66%,  16% 66%)',
      'polygon( 0% 0%, 100% 0%, 100% 100%,  0% 100%)',
    ],
    transition: {
      duration: 0.52,
      times: [0, 0.22, 0.65, 1],
      ease: 'easeOut',
    },
  },
  exit: {
    clipPath: [
      'polygon( 0% 0%, 100% 0%, 100% 100%,  0% 100%)',
      'polygon( 0% 0%, 100% 0%, 100%  66%, 16%  66%)',
      'polygon( 0% 0%, 100% 0%, 100%  22%, 72%  22%)',
      'polygon(88% 0%, 100% 0%, 100%   0%, 88%   0%)',
    ],
    transition: {
      duration: 0.38,
      times: [0, 0.3, 0.65, 1],
      ease: 'easeIn',
    },
  },
} as unknown as Variants

export function MobileMenu({ items, resumeHref, resumeLabel, openLabel, closeLabel }: Props) {
  const [open, setOpen] = useState(false)
  // false on server, true on client — avoids createPortal SSR mismatch
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const overlay = (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-menu"
          initial="initial"
          animate="open"
          exit="exit"
          variants={genieVariants}
          className="border-border fixed inset-0 top-16 z-50 flex flex-col overflow-hidden border-t shadow-2xl md:hidden"
          style={{ background: 'var(--nav-overlay)' }}
        >
          {/* Scrollable content */}
          <div className="relative z-10 flex flex-1 flex-col px-6 pt-6 pb-4">
            {/* Profile card */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.22, duration: 0.22 }}
              className="flex items-center gap-4 pb-5"
            >
              <div className="border-accent h-14 w-14 shrink-0 overflow-hidden rounded-full border-2">
                <Image
                  src="/image.png"
                  alt={site.displayName}
                  width={56}
                  height={56}
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div className="min-w-0">
                <p className="text-foreground truncate text-base leading-snug font-semibold">
                  {site.displayName}
                </p>
                <p className="text-accent truncate font-mono text-xs">{site.role}</p>
              </div>
            </motion.div>

            <div className="bg-border mb-2 h-px w-full" />

            {/* Nav items */}
            <nav aria-label="Mobile navigation">
              <ul className="flex flex-col py-1">
                {items.map((item, i) => {
                  const Icon = getNavIcon(item.href)
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ delay: 0.28 + i * 0.07, duration: 0.2 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="text-foreground hover:text-accent hover:bg-accent-soft group flex items-center gap-3.5 rounded-lg px-3 py-3 transition-all duration-200"
                      >
                        <Icon className="text-accent h-4.5 w-4.5 shrink-0 opacity-80 transition-opacity duration-200 group-hover:opacity-100" />
                        <span className="text-[1.05rem] font-medium">{item.label}</span>
                      </Link>
                    </motion.li>
                  )
                })}
              </ul>
            </nav>

            {/* Resume + social icons */}
            <div className="mt-[4rem] space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.28 + items.length * 0.07, duration: 0.2 }}
              >
                <a
                  href={resumeHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground flex w-full items-center justify-center rounded border py-2.5 font-mono text-sm tracking-wider transition-all duration-200"
                >
                  {resumeLabel}
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.34 + items.length * 0.07, duration: 0.2 }}
                className="mt-2 flex items-center justify-between px-1 pb-1"
              >
                {socials.map(({ name, href, icon: Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noreferrer"
                    aria-label={name}
                    className="transition-transform duration-150 hover:scale-110"
                    style={{ color: SOCIAL_COLORS[name] ?? 'currentColor' }}
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Decorative background image — bottom */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 w-full select-none"
            style={{ mixBlendMode: 'screen', opacity: 0.55 }}
          >
            <Image
              src="/mobile-menu-bg.png"
              alt=""
              width={480}
              height={200}
              className="w-full object-contain object-bottom"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      <button
        type="button"
        aria-label={open ? closeLabel : openLabel}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="text-foreground hover:bg-accent-soft inline-flex h-9 w-9 items-center justify-center rounded md:hidden"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              <X className="h-5 w-5" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0, scale: 0.7 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              <Menu className="h-5 w-5" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {mounted && createPortal(overlay, document.body)}
    </>
  )
}
