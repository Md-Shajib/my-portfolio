import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import Image, { type ImageProps } from 'next/image'

const components: MDXComponents = {
  h1: (props) => <h1 className="mt-10 text-3xl font-bold" {...props} />,
  h2: (props) => <h2 className="mt-10 text-2xl font-bold" {...props} />,
  h3: (props) => <h3 className="mt-8 text-xl font-bold" {...props} />,
  p: (props) => <p className="text-foreground mt-5 leading-relaxed" {...props} />,
  a: ({ href = '', children, ...rest }) => {
    const isExternal = /^https?:\/\//.test(href)
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-accent hover:underline"
          {...rest}
        >
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className="text-accent hover:underline" {...rest}>
        {children}
      </Link>
    )
  },
  ul: (props) => <ul className="mt-5 list-disc space-y-2 pl-6" {...props} />,
  ol: (props) => <ol className="mt-5 list-decimal space-y-2 pl-6" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-accent text-muted-foreground mt-6 border-l-4 pl-4 italic"
      {...props}
    />
  ),
  pre: (props) => (
    <pre className="bg-card mt-6 overflow-x-auto rounded p-4 font-mono text-sm" {...props} />
  ),
  code: (props) => (
    <code
      className="bg-accent-soft text-accent rounded px-1 py-0.5 font-mono text-[0.9em]"
      {...props}
    />
  ),
  hr: () => <hr className="border-border my-10" />,
  img: (props) => (
    <Image
      sizes="100vw"
      style={{ width: '100%', height: 'auto' }}
      {...(props as ImageProps)}
      alt={props.alt ?? ''}
    />
  ),
}

export function useMDXComponents(): MDXComponents {
  return components
}
