import { createFileRoute } from '@tanstack/react-router'

import { PageShell } from '#/components/layout/PageShell'
import { Panel } from '#/components/ui/Panel'
import { SectionHeading } from '#/components/ui/SectionHeading'
import { Tag } from '#/components/ui/Tag'
import { profile } from '#/data/profile'
import { skillGroups } from '#/data/skills'
import { timeline } from '#/data/timeline'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return (
    <PageShell
      eyebrow="01 / identity"
      title="About"
      intro={`${profile.roles.join(' / ')} — based in ${profile.location}.`}
    >
      <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div className="space-y-5">
          {profile.bio.map((paragraph, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? 'text-lg leading-relaxed text-bone'
                  : 'leading-relaxed text-bone-dim'
              }
            >
              {paragraph}
            </p>
          ))}
        </div>

        <Panel title="stack" className="h-fit p-6">
          <div className="space-y-6">
            {skillGroups.map((group) => (
              <div key={group.title}>
                <h3 className="label-mono mb-2.5 text-bone-faint">
                  {group.title}
                </h3>
                <ul className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Tag>{item}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <section className="mt-24">
        <SectionHeading index="04 / record" title="Timeline" />

        <ol className="relative space-y-10 border-l border-line pl-8">
          {timeline.map((entry) => (
            <li key={`${entry.org}-${entry.period}`} className="relative">
              <span
                aria-hidden
                className={
                  entry.kind === 'work'
                    ? 'absolute top-2.5 -left-[2.1rem] size-2 bg-orange'
                    : 'absolute top-2.5 -left-[2.1rem] size-2 border border-bone-faint bg-ground'
                }
              />
              <p className="label-mono mb-2 text-bone-faint">{entry.period}</p>
              <h3 className="display-wide text-lg font-semibold">
                {entry.title}
              </h3>
              <p className="mb-3 text-bone-dim">{entry.org}</p>
              <ul className="space-y-1.5">
                {entry.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-2.5 text-sm text-bone-dim/80"
                  >
                    <span aria-hidden className="mt-3 h-px w-2.5 shrink-0 bg-line-2" />
                    {point}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>
    </PageShell>
  )
}
