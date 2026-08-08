import { Link, createFileRoute } from '@tanstack/react-router'

import { NameMatrix } from '#/components/home/NameMatrix'
import { ProjectCard } from '#/components/projects/ProjectCard'
import { SectionHeading } from '#/components/ui/SectionHeading'
import { buttonClass } from '#/components/ui/button'
import { profile } from '#/data/profile'
import { featuredProjects } from '#/data/projects'

export const Route = createFileRoute('/')({ component: Home })

/**
 * Rebuild in progress. The name board still owns the first screen — selected
 * work sits under it, and the rest of the page gets designed around those two.
 */
function Home() {
  return (
    <>
      <section className="mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col justify-center px-5 py-20 sm:px-8">
        <h1>
          <span className="sr-only">{profile.name}</span>
          <NameMatrix text={profile.name} />
        </h1>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8">
        <SectionHeading
          index="01"
          title="Selected work"
          kicker={profile.tagline}
          action={
            <Link to="/projects" className={buttonClass('secondary', 'sm')}>
              All work
            </Link>
          }
        />

        {/* Two columns, not three: the featured set is small enough that a
            third column leaves an orphan on wide screens. */}
        <div className="grid gap-5 md:grid-cols-2">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </section>
    </>
  )
}
