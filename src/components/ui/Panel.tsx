import type { ReactNode } from 'react'
import { cn } from '#/lib/cn'

export type PanelAccent = 'line' | 'acid'

type PanelProps = {
  children: ReactNode
  /** `acid` reserves the accent for the one panel that matters most on a view. */
  accent?: PanelAccent
  /** Optional mono label rendered in a strip along the top edge. */
  title?: string
  /** Optional right-aligned content in the title strip. */
  meta?: ReactNode
  className?: string
  outerClassName?: string
}

const accents: Record<PanelAccent, string> = {
  line: 'border-line group-hover:border-line-2',
  acid: 'border-acid-ink/40 group-hover:border-acid-ink',
}

/**
 * Base container: a flat surface inside a 1px hairline, square-cornered.
 * Separation comes from the rule and a one-step background lift — nothing else.
 */
export function Panel({
  children,
  accent = 'line',
  title,
  meta,
  className,
  outerClassName,
}: PanelProps) {
  return (
    <div
      className={cn(
        'group relative border bg-surface transition-colors duration-200 ease-ui',
        accents[accent],
        outerClassName,
      )}
    >
      {title ? (
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-2.5">
          <span
            className={cn(
              'label-mono',
              accent === 'acid' ? 'text-acid-ink' : 'text-bone-faint',
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
