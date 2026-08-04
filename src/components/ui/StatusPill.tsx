import type { ProjectStatus } from '#/data/projects'
import { statusLabels } from '#/data/projects'
import { cn } from '#/lib/cn'

/**
 * Status separates by form and value, not hue. A pill appears on every card in
 * the work grid, so colouring them scatters accent across the whole page — the
 * one place the palette can least afford it. Solid/hollow carries the split
 * between shipped and in-flight, and value carries the drop to archived.
 *
 * Nothing is lost by going greyscale: the pill always renders its label, so
 * the dot was never the only channel.
 */
const statusStyles: Record<ProjectStatus, string> = {
  live: 'text-bone',
  wip: 'text-bone-dim',
  archived: 'text-bone-faint',
}

const statusDots: Record<ProjectStatus, string> = {
  live: 'bg-bone',
  wip: 'border border-bone-dim',
  archived: 'bg-bone-faint',
}

type StatusPillProps = {
  status: ProjectStatus
  className?: string
}

export function StatusPill({ status, className }: StatusPillProps) {
  return (
    <span
      className={cn(
        'label-mono inline-flex items-center gap-1.5',
        statusStyles[status],
        className,
      )}
    >
      <span aria-hidden className={cn('size-1.5', statusDots[status])} />
      {statusLabels[status]}
    </span>
  )
}
