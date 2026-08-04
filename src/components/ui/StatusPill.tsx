import type { ProjectStatus } from '#/data/projects'
import { statusLabels } from '#/data/projects'
import { cn } from '#/lib/cn'

/**
 * The two accents split by meaning: green is the affirmative state, orange is
 * advisory. Anything neither of those separates by grey value alone.
 */
const statusStyles: Record<ProjectStatus, string> = {
  live: 'text-acid-ink',
  wip: 'text-orange',
  archived: 'text-bone-faint',
}

const statusDots: Record<ProjectStatus, string> = {
  live: 'bg-acid',
  wip: 'bg-orange',
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
