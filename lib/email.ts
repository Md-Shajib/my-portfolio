import 'server-only'
import { Resend } from 'resend'

export type SendContactEmailInput = {
  name: string
  email: string
  message: string
  locale: string
}

export type SendResult = { ok: true } | { ok: false; reason: 'unavailable' | 'failed' }

export async function sendContactEmail(input: SendContactEmailInput): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return { ok: false, reason: 'unavailable' }

  const to = process.env.CONTACT_TO_EMAIL ?? 'shajib.dev.bd@gmail.com'
  const from = process.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev'

  try {
    const client = new Resend(apiKey)
    const subject = `Portfolio contact — ${input.name}`
    const text = [
      `Locale: ${input.locale}`,
      `From: ${input.name} <${input.email}>`,
      '',
      input.message,
    ].join('\n')
    const { error } = await client.emails.send({
      from,
      to,
      subject,
      replyTo: input.email,
      text,
    })
    if (error) {
      console.error('[contact] resend error', error)
      return { ok: false, reason: 'failed' }
    }
    return { ok: true }
  } catch (err) {
    console.error('[contact] send threw', err)
    return { ok: false, reason: 'failed' }
  }
}
