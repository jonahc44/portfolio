import { Link } from '@tanstack/react-router'
import { profile } from '#/data/profile'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const

const linkBase =
  'display-wide rounded-md px-3 py-1.5 text-xs font-semibold text-bone-dim transition-colors duration-150 ease-ui hover:text-bone'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-base/85 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link to="/" className="group flex items-center gap-2.5">
          <span
            aria-hidden
            className="fill-acid grid size-6 place-items-center rounded font-display text-xs font-bold text-black"
          >
            J
          </span>
          <span className="display-wide text-sm font-semibold transition-colors group-hover:text-acid">
            {profile.handle}
          </span>
        </Link>

        <nav aria-label="Primary">
          <ul className="flex items-center gap-0.5 sm:gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === '/' }}
                  className={linkBase}
                  activeProps={{
                    className: 'fill-acid text-black! hover:text-black',
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Status chip, after the small badges in the reference's header. */}
        {profile.openToWork ? (
          <div className="label-mono hidden items-center gap-1.5 rounded-full border border-acid/40 px-2.5 py-1 text-acid lg:flex">
            <span aria-hidden className="animate-breathe size-1.5 rounded-full bg-acid" />
            Open to work
          </div>
        ) : null}
      </div>
    </header>
  )
}
