import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'solid' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded font-mono text-sm transition-colors focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<Variant, string> = {
  solid: 'bg-accent text-accent-foreground hover:bg-accent-strong',
  outline: 'border border-accent text-accent hover:bg-accent-soft',
  ghost: 'text-foreground hover:bg-accent-soft',
}

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3',
  md: 'h-10 px-4',
  lg: 'h-12 px-5',
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'outline', size = 'md', ...rest }, ref) => (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    />
  )
)
Button.displayName = 'Button'

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant
  size?: Size
}

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant = 'outline', size = 'md', ...rest }, ref) => (
    <a
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    />
  )
)
ButtonLink.displayName = 'ButtonLink'
