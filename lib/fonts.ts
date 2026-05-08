import { Geist, Geist_Mono, Hind_Siliguri } from 'next/font/google'

export const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

export const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const hindSiliguri = Hind_Siliguri({
  variable: '--font-hind-siliguri',
  subsets: ['latin', 'bengali'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})
