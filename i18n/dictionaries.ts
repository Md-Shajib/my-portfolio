import 'server-only'
import type { Locale } from './config'
import type { Dictionary as EnDictionary } from './dictionaries/en'

export type Dictionary = EnDictionary

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('./dictionaries/en').then((m) => m.default),
  bn: () => import('./dictionaries/bn').then((m) => m.default),
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return loaders[locale]()
}
