import type { ReactNode } from 'react'
import { cn } from '#/lib/cn'

type SectionHeadingProps = {
  /** Two-digit section index, e.g. "01". Decorative. */
  index: string
  title: string
  /** Optional supporting line under the title. */
  kicker?: string
  /** Right-aligned slot, typically a link. */
  action?: ReactNode
  className?: string
}

export function SectionHeading({
  index,
  title,
  kicker,
  action,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6',
        className,
      )}
    >
      <div>
        <p className="label-mono mb-3 text-bone-dim">{index}</p>
        <h2 className="display-wide text-2xl font-semibold sm:text-3xl">
          {title}
        </h2>
        {kicker ? (
          <p className="mt-2.5 max-w-xl text-bone-dim">{kicker}</p>
        ) : null}
      </div>
      {action}
    </div>
  )
}
