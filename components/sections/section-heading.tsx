type Props = {
  index: number
  title: string
}

export function SectionHeading({ index, title }: Props) {
  return (
    <div className="mb-10 flex items-center gap-4">
      <h2 className="text-2xl font-bold whitespace-nowrap md:text-3xl">
        <span className="text-accent font-mono text-base md:text-xl">
          {String(index).padStart(2, '0')}.
        </span>{' '}
        {title}
      </h2>
      <div className="bg-border h-px w-full" aria-hidden="true" />
    </div>
  )
}
