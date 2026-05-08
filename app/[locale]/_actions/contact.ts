'use server'

import { z } from 'zod'
import { sendContactEmail } from '@/lib/email'
import { getDictionary } from '@/i18n/dictionaries'
import { isLocale } from '@/i18n/config'

export type ContactState = {
  status: 'idle' | 'success' | 'error' | 'unavailable'
  message?: string
  errors?: {
    name?: string
    email?: string
    message?: string
  }
}

export const initialContactState: ContactState = { status: 'idle' }

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const localeRaw = String(formData.get('locale') ?? 'en')
  const locale = isLocale(localeRaw) ? localeRaw : 'en'
  const dict = await getDictionary(locale)
  const v = dict.contact.form.validation

  const schema = z.object({
    name: z.string().trim().min(1, v.nameRequired).max(120),
    email: z.string().trim().email(v.emailInvalid).max(200),
    message: z.string().trim().min(8, v.messageShort).max(5000),
  })

  const parsed = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  })

  if (!parsed.success) {
    const fields = parsed.error.flatten().fieldErrors
    return {
      status: 'error',
      errors: {
        name: fields.name?.[0],
        email: fields.email?.[0],
        message: fields.message?.[0],
      },
    }
  }

  // Honeypot — silently succeed if a bot fills the hidden field
  if (formData.get('company')) {
    return { status: 'success', message: dict.contact.form.success }
  }

  const result = await sendContactEmail({ ...parsed.data, locale })
  if (result.ok) return { status: 'success', message: dict.contact.form.success }
  if (result.reason === 'unavailable') {
    return { status: 'unavailable', message: dict.contact.form.unavailable }
  }
  return { status: 'error', message: dict.contact.form.genericError }
}
