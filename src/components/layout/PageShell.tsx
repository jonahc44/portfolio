import type { ReactNode } from 'react'
import { cn } from '#/lib/cn'

type PageShellProps = {
  /** Mono eyebrow above the title, e.g. "02 / work". */
  eyebrow: string
  title: string
  intro?: string
  children: ReactNode
  className?: string
}

/**
 * Standard interior-page wrapper: consistent max width, gutters and masthead.
 * The home page opts out and lays itself out directly.
 */
export function PageShell({
  eyebrow,
  title,
  intro,
  children,
  className,
}: PageShellProps) {
  return (
    <div
      className={cn('mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20', className)}
    >
      <header className="mb-14 border-b border-line pb-8">
        <p className="label-mono mb-4 flex items-center gap-3 text-acid">
          {eyebrow}
          <span aria-hidden className="h-px w-8 bg-acid/40" />
        </p>
        <h1 className="display-wide text-4xl font-semibold sm:text-6xl">
          {title}
        </h1>
        {intro ? (
          <p className="mt-5 max-w-2xl text-lg text-bone-dim">{intro}</p>
        ) : null}
      </header>
      {children}
    </div>
  )
}
