import { createFileRoute } from '@tanstack/react-router'

import { NameMatrix } from '#/components/home/NameMatrix'
import { profile } from '#/data/profile'

export const Route = createFileRoute('/')({ component: Home })

/**
 * Rebuild in progress. The home page is currently the name board and nothing
 * else — the rest of the page gets designed on top of it.
 */
function Home() {
  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col justify-center px-5 py-20 sm:px-8">
      <h1>
        <span className="sr-only">{profile.name}</span>
        <NameMatrix text={profile.name} />
      </h1>
    </section>
  )
}
