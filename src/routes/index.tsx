import { Link, createFileRoute } from '@tanstack/react-router'

import { Hero } from '#/components/home/Hero'
import { SkillTicker } from '#/components/home/SkillTicker'
import { ProjectCard } from '#/components/projects/ProjectCard'
import { Panel } from '#/components/ui/Panel'
import { SectionHeading } from '#/components/ui/SectionHeading'
import { buttonClass } from '#/components/ui/button'
import { featuredProjects } from '#/data/projects'
import { profile } from '#/data/profile'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <>
      <Hero />
      <SkillTicker />

      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <SectionHeading
          index="02 / work"
          title="Selected work"
          kicker="A few things I've built recently. The full list lives on the work page."
          action={
            <Link to="/projects" className={buttonClass('line', 'sm')}>
              All projects →
            </Link>
          }
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <Panel accent="acid" ticks className="p-8 sm:p-12">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <p className="label-mono mb-4 text-acid">03 / contact</p>
              <h2 className="display-wide max-w-lg text-2xl font-semibold sm:text-3xl">
                Building something interesting?
              </h2>
              <p className="mt-3 max-w-lg text-bone-dim">
                I&apos;m{' '}
                {profile.openToWork
                  ? 'currently open to internships and new-grad roles'
                  : 'not looking right now, but always up for a good conversation'}
                . Either way, my inbox is open.
              </p>
            </div>
            <Link to="/contact" className={buttonClass('acid', 'md', 'shrink-0')}>
              Say hello
            </Link>
          </div>
        </Panel>
      </section>
    </>
  )
}
