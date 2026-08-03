import type { Project } from '#/data/projects'
import { Panel } from '#/components/ui/Panel'
import { StatusPill } from '#/components/ui/StatusPill'
import { Tag } from '#/components/ui/Tag'

const linkLabels = {
  repo: 'Source',
  demo: 'Live',
  writeup: 'Write-up',
} as const

type ProjectCardProps = {
  project: Project
  /** Zero-based position; rendered as a two-digit index. */
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const links = Object.entries(project.links).filter(([, href]) => Boolean(href))

  return (
    <Panel
      outerClassName="h-full"
      className="flex h-full flex-col gap-4 p-6"
      title={String(index + 1).padStart(2, '0')}
      meta={<StatusPill status={project.status} />}
    >
      <div>
        <h3 className="display-wide text-lg font-semibold">{project.title}</h3>
        <p className="mt-1 text-sm text-bone-dim">{project.tagline}</p>
      </div>

      <p className="text-sm leading-relaxed text-bone-dim/80">
        {project.summary}
      </p>

      <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
        {project.stack.map((tech) => (
          <li key={tech}>
            <Tag>{tech}</Tag>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between gap-4 border-t border-line pt-4">
        <span className="label-mono text-bone-faint">{project.year}</span>
        {links.length > 0 ? (
          <ul className="flex gap-4">
            {links.map(([key, href]) => (
              <li key={key}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="label-mono text-bone-dim transition-colors hover:text-bone"
                >
                  {linkLabels[key as keyof typeof linkLabels]} ↗
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <span className="label-mono text-bone-faint">Private</span>
        )}
      </div>
    </Panel>
  )
}
