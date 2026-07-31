import type { ReactNode } from 'react'
import { cn } from '#/lib/cn'

export type PanelAccent = 'line' | 'acid'

type PanelProps = {
  children: ReactNode
  /** `acid` reserves the accent for the one panel that matters most on a view. */
  accent?: PanelAccent
  /** Small L-brackets at the corners — the reference's framing motif. */
  ticks?: boolean
  /** Optional mono label rendered in a strip along the top edge. */
  title?: string
  /** Optional right-aligned content in the title strip. */
  meta?: ReactNode
  className?: string
  outerClassName?: string
}

const accents: Record<PanelAccent, { border: string; tick: string }> = {
  line: {
    border: 'border-line group-hover:border-line-2',
    tick: 'border-bone-faint',
  },
  acid: {
    border: 'border-acid/40 group-hover:border-acid',
    tick: 'border-acid',
  },
}

/**
 * Base container: a flat surface inside a 1px hairline. No glow, no gradient —
 * separation comes from the rule and a one-step background lift.
 */
export function Panel({
  children,
  accent = 'line',
  ticks = false,
  title,
  meta,
  className,
  outerClassName,
}: PanelProps) {
  const style = accents[accent]

  return (
    <div
      className={cn(
        'group relative rounded border bg-surface transition-colors duration-200 ease-ui',
        style.border,
        outerClassName,
      )}
    >
      {ticks ? <CornerTicks className={style.tick} /> : null}

      {title ? (
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-2.5">
          <span
            className={cn(
              'label-mono',
              accent === 'acid' ? 'text-acid' : 'text-bone-faint',
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

function CornerTicks({ className }: { className: string }) {
  const corners = [
    'top-0 left-0 border-t border-l',
    'top-0 right-0 border-t border-r',
    'bottom-0 left-0 border-b border-l',
    'bottom-0 right-0 border-b border-r',
  ]

  return (
    <>
      {corners.map((position) => (
        <span
          key={position}
          aria-hidden
          className={cn('absolute size-2.5', position, className)}
        />
      ))}
    </>
  )
}
