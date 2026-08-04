import type { ReactNode } from 'react'
import { cn } from '#/lib/cn'

/**
 * `lead` marks the one panel that matters most on a view. It earns that at
 * rest with a brighter hairline and a brighter title, not with colour — the
 * accent only appears when the pointer is on it.
 */
export type PanelEmphasis = 'default' | 'lead'

type PanelProps = {
  children: ReactNode
  emphasis?: PanelEmphasis
  /** Optional mono label rendered in a strip along the top edge. */
  title?: string
  /** Optional right-aligned content in the title strip. */
  meta?: ReactNode
  className?: string
  outerClassName?: string
}

const emphases: Record<PanelEmphasis, string> = {
  default: 'border-line group-hover:border-line-2',
  lead: 'border-line-2 group-hover:border-acid-ink',
}

const titleTones: Record<PanelEmphasis, string> = {
  default: 'text-bone-faint',
  lead: 'text-bone-dim group-hover:text-acid-ink',
}

/**
 * Base container: a flat surface inside a 1px hairline, square-cornered.
 * Separation comes from the rule and a one-step background lift — nothing else.
 */
export function Panel({
  children,
  emphasis = 'default',
  title,
  meta,
  className,
  outerClassName,
}: PanelProps) {
  return (
    <div
      className={cn(
        'group relative border bg-surface transition-colors duration-200 ease-ui',
        emphases[emphasis],
        outerClassName,
      )}
    >
      {title ? (
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-2.5">
          <span
            className={cn(
              'label-mono transition-colors duration-200 ease-ui',
              titleTones[emphasis],
            )}
          >
            {title}
          </span>
          {meta}
        </div>
      ) : null}

      <div className={className}>{children}</div>
    </div>
  )
}
