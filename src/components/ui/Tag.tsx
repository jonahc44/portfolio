import type { ReactNode } from 'react'
import { cn } from '#/lib/cn'

type TagProps = {
  children: ReactNode
  /** Accent fill — use for the selected item in a filter set. */
  active?: boolean
  className?: string
}

/** Pill chip, after the small badges in the reference's header. */
export function Tag({ children, active = false, className }: TagProps) {
  return (
    <span
      className={cn(
        'label-mono inline-block rounded-full border px-2.5 py-1 transition-colors duration-150 ease-ui',
        active
          ? 'fill-acid border-transparent text-black'
          : 'border-line bg-surface-2 text-bone-dim',
        className,
      )}
    >
      {children}
    </span>
  )
}
