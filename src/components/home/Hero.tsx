import { Link } from '@tanstack/react-router'
import { profile } from '#/data/profile'
import { projects } from '#/data/projects'
import { buttonClass } from '#/components/ui/button'
import { Panel } from '#/components/ui/Panel'

const readout = [
  { label: 'Projects', value: String(projects.length).padStart(2, '0') },
  { label: 'Focus', value: 'Systems / Web' },
  { label: 'Status', value: profile.openToWork ? 'Available' : 'Heads down' },
]

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl gap-14 px-5 pt-20 pb-24 sm:px-8 sm:pt-28 lg:grid-cols-[1.55fr_1fr] lg:items-center">
      <div>
        <p className="label-mono mb-6 flex items-center gap-2 text-acid">
          <span className="text-bone-faint">01 /</span>
          Identity
          <span aria-hidden className="animate-caret ml-1 inline-block h-3 w-1.5 bg-acid" />
        </p>

        <h1 className="display-wide text-5xl leading-[1.02] font-semibold sm:text-7xl">
          {profile.name}
          <span className="mt-1 block text-bone-faint">Engineer</span>
        </h1>

        <p className="label-mono mt-7 text-bone-dim">
          {profile.roles.join('  /  ')}
        </p>

        <p className="mt-5 max-w-xl text-lg text-bone-dim">{profile.tagline}</p>

        <div className="mt-10 flex flex-wrap gap-2.5">
          <Link to="/projects" className={buttonClass('acid')}>
            View work
          </Link>
          <Link to="/contact" className={buttonClass('line')}>
            Get in touch
          </Link>
        </div>
      </div>

      <Panel
        ticks
        title="readout"
        meta={<span className="label-micro text-bone-faint">live</span>}
        className="p-6"
      >
        <dl className="space-y-3.5">
          {readout.map((row) => (
            <div
              key={row.label}
              className="flex items-baseline justify-between gap-4 border-b border-line/70 pb-3 last:border-0 last:pb-0"
            >
              <dt className="label-mono text-bone-faint">{row.label}</dt>
              <dd className="font-mono text-sm text-bone">{row.value}</dd>
            </div>
          ))}
        </dl>

        <p className="label-micro mt-6 leading-relaxed text-bone-faint">
          {profile.location}
          <br />
          {profile.education}
        </p>
      </Panel>
    </section>
  )
}
