import type { ReactNode } from 'react'
import { cn } from '#/lib/cn'

type TagProps = {
  children: ReactNode
  /** Bone fill — use for the selected item in a filter set. */
  active?: boolean
  /**
   * Opt in to hover styling. Most tags are static labels listing a stack, and
   * a chip that lights up under a pointer it can't respond to is a lie — so
   * the hover accent is only worn by tags that are actually a control.
   */
  interactive?: boolean
  className?: string
}

/** Square chip, after a stamped component label. */
export function Tag({
  children,
  active = false,
  interactive = false,
  className,
}: TagProps) {
  return (
    <span
      className={cn(
        'label-mono inline-block border px-2.5 py-1 transition-colors duration-150 ease-ui',
        active
          ? 'border-bone bg-bone text-ground'
          : 'border-line bg-surface-2 text-bone-dim',
        interactive &&
          (active
            ? 'hover:border-acid hover:bg-acid hover:text-on-accent'
            : 'hover:border-acid-ink hover:text-acid-ink'),
        className,
      )}
    >
      {children}
    </span>
  )
}
