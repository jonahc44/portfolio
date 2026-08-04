import { createFileRoute } from '@tanstack/react-router'

import { PageShell } from '#/components/layout/PageShell'
import { Panel } from '#/components/ui/Panel'
import { buttonClass } from '#/components/ui/button'
import { profile } from '#/data/profile'

export const Route = createFileRoute('/contact')({ component: ContactPage })

function ContactPage() {
  return (
    <PageShell
      eyebrow="03 / contact"
      title="Contact"
      intro={
        profile.openToWork
          ? 'Open to internships, new-grad roles and collaborations. The fastest way to reach me is email.'
          : 'Not actively looking, but always happy to talk shop. Email is the fastest way to reach me.'
      }
    >
      <div className="grid gap-5 md:grid-cols-[1.3fr_1fr]">
        <Panel
          accent="acid"
          title="primary channel"
          className="flex flex-col justify-between gap-8 p-8"
        >
          <div>
            <a
              href={`mailto:${profile.email}`}
              className="display-wide text-xl font-semibold break-all underline decoration-line-2 underline-offset-8 transition-colors hover:decoration-acid-ink sm:text-2xl"
            >
              {profile.email}
            </a>
            <p className="mt-4 max-w-md text-bone-dim">
              Tell me what you&apos;re building and what you need. I read
              everything and reply to anything that isn&apos;t a template.
            </p>
          </div>

          <a
            href={`mailto:${profile.email}`}
            className={buttonClass('acid', 'md', 'self-start')}
          >
            Compose message
          </a>
        </Panel>

        <Panel title="elsewhere" className="p-8">
          <ul className="space-y-4">
            {profile.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="group/link flex items-baseline justify-between gap-4 border-b border-line pb-3 transition-colors hover:border-line-2"
                >
                  <span className="display-wide text-sm font-semibold text-bone-dim transition-colors group-hover/link:text-bone">
                    {social.label}
                  </span>
                  <span className="label-mono truncate text-bone-faint">
                    {social.handle}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </PageShell>
  )
}
