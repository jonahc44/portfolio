import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { PageShell } from '#/components/layout/PageShell'
import { ProjectCard } from '#/components/projects/ProjectCard'
import { Tag } from '#/components/ui/Tag'
import { allStackTags, projects } from '#/data/projects'

export const Route = createFileRoute('/projects')({ component: ProjectsPage })

const ALL = 'All'

function ProjectsPage() {
  const [filter, setFilter] = useState<string>(ALL)

  const visible =
    filter === ALL
      ? projects
      : projects.filter((project) => project.stack.includes(filter))

  return (
    <PageShell
      eyebrow="02 / work"
      title="Work"
      intro="Everything worth showing, newest first. Filter by stack to narrow it down."
    >
      <div className="mb-10">
        <p className="label-mono mb-3 text-bone-faint">Filter</p>
        <div className="flex flex-wrap gap-1.5">
          {[ALL, ...allStackTags].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setFilter(tag)}
              aria-pressed={filter === tag}
              className="cursor-pointer"
            >
              <Tag active={filter === tag}>{tag}</Tag>
            </button>
          ))}
        </div>
      </div>

      {visible.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      ) : (
        <p className="label-mono py-16 text-center text-bone-faint">
          No projects match “{filter}”.
        </p>
      )}
    </PageShell>
  )
}
