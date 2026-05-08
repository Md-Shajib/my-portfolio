'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import {
  initialContactState,
  submitContact,
  type ContactState,
} from '@/app/[locale]/_actions/contact'
import type { Dictionary } from '@/i18n/dictionaries'
import type { Locale } from '@/i18n/config'
import { cn } from '@/lib/utils'

type Props = {
  locale: Locale
  dict: Dictionary
}

function SubmitButton({ dict }: { dict: Dictionary }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="border-accent text-accent hover:bg-accent-soft mt-2 inline-flex h-11 items-center justify-center rounded border px-6 font-mono text-sm transition-colors disabled:opacity-60"
    >
      {pending ? dict.contact.form.sending : dict.contact.form.submit}
    </button>
  )
}

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null
  return (
    <p id={id} className="mt-1 text-xs text-rose-500" role="alert">
      {error}
    </p>
  )
}

export function ContactForm({ locale, dict }: Props) {
  const [state, formAction] = useActionState<ContactState, FormData>(
    submitContact,
    initialContactState
  )

  return (
    <form action={formAction} className="mx-auto mt-10 max-w-lg space-y-4 text-left">
      <input type="hidden" name="locale" value={locale} />
      {/* Honeypot */}
      <div
        aria-hidden="true"
        className="absolute top-auto left-[-10000px] h-px w-px overflow-hidden"
      >
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label htmlFor="contact-name" className="text-muted-foreground block font-mono text-xs">
          {dict.contact.form.name}
        </label>
        <input
          id="contact-name"
          name="name"
          required
          aria-invalid={!!state.errors?.name}
          aria-describedby={state.errors?.name ? 'contact-name-err' : undefined}
          className={cn(
            'border-border bg-card text-foreground focus:border-accent mt-1 w-full rounded border px-3 py-2 outline-none'
          )}
        />
        <FieldError id="contact-name-err" error={state.errors?.name} />
      </div>

      <div>
        <label htmlFor="contact-email" className="text-muted-foreground block font-mono text-xs">
          {dict.contact.form.email}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          aria-invalid={!!state.errors?.email}
          aria-describedby={state.errors?.email ? 'contact-email-err' : undefined}
          className="border-border bg-card text-foreground focus:border-accent mt-1 w-full rounded border px-3 py-2 outline-none"
        />
        <FieldError id="contact-email-err" error={state.errors?.email} />
      </div>

      <div>
        <label htmlFor="contact-message" className="text-muted-foreground block font-mono text-xs">
          {dict.contact.form.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          aria-invalid={!!state.errors?.message}
          aria-describedby={state.errors?.message ? 'contact-message-err' : undefined}
          className="border-border bg-card text-foreground focus:border-accent mt-1 w-full resize-y rounded border px-3 py-2 outline-none"
        />
        <FieldError id="contact-message-err" error={state.errors?.message} />
      </div>

      <SubmitButton dict={dict} />

      <p
        role="status"
        aria-live="polite"
        className={cn(
          'min-h-[1.25rem] font-mono text-xs',
          state.status === 'success' && 'text-accent',
          state.status === 'error' && 'text-rose-500',
          state.status === 'unavailable' && 'text-amber-500'
        )}
      >
        {state.message ?? ''}
      </p>
    </form>
  )
}
