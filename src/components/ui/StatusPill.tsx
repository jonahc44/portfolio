import type { ProjectStatus } from '#/data/projects'
import { statusLabels } from '#/data/projects'
import { cn } from '#/lib/cn'

/**
 * Single-accent discipline: only a live project earns the acid colour. The rest
 * separate by grey value alone.
 */
const statusStyles: Record<ProjectStatus, { dot: string; text: string }> = {
  live: { dot: 'bg-acid', text: 'text-acid' },
  wip: { dot: 'bg-bone-dim', text: 'text-bone-dim' },
  archived: { dot: 'bg-bone-faint', text: 'text-bone-faint' },
}

type StatusPillProps = {
  status: ProjectStatus
  className?: string
}

export function StatusPill({ status, className }: StatusPillProps) {
  const style = statusStyles[status]

  return (
    <span
      className={cn(
        'label-mono inline-flex items-center gap-1.5',
        style.text,
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          'size-1.5 rounded-full',
          style.dot,
          status === 'live' && 'animate-breathe',
        )}
      />
      {statusLabels[status]}
    </span>
  )
}
