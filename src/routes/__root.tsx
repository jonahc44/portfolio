import { Link, Outlet, createRootRoute } from '@tanstack/react-router'

import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import { Backdrop } from '#/components/layout/Backdrop'
import { SiteHeader } from '#/components/layout/SiteHeader'
import { SiteFooter } from '#/components/layout/SiteFooter'
import { buttonClass } from '#/components/ui/button'

import '../styles.css'

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
})

function RootComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <Backdrop />

      <a
        href="#main"
        className={buttonClass(
          'primary',
          'sm',
          'sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-100',
        )}
      >
        Skip to content
      </a>

      <SiteHeader />

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      <SiteFooter />

      {import.meta.env.DEV ? (
        <TanStackDevtools
          config={{ position: 'bottom-right' }}
          plugins={[
            {
              name: 'TanStack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
      ) : null}
    </div>
  )
}

function NotFound() {
  return (
    <div className="mx-auto grid max-w-6xl place-items-center px-5 py-32 text-center sm:px-8">
      {/* accent exception: the one place a resting accent is the message and
          not a label. A hazard colour on a dead route is the readout doing its
          actual job, and this is a page nobody stays on. */}
      <p className="label-mono mb-5 text-orange">Error / 404</p>
      <h1 className="display-wide text-6xl font-semibold sm:text-8xl">404</h1>
      <p className="mt-5 max-w-md text-bone-dim">
        This route doesn&apos;t resolve. The page was moved, deleted, or never
        existed in the first place.
      </p>
      <Link to="/" className={buttonClass('quiet', 'md', 'mt-9')}>
        Return home
      </Link>
    </div>
  )
}
