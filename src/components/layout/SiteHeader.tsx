import { Link } from '@tanstack/react-router'
import { profile } from '#/data/profile'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const

const linkBase =
  'display-wide px-3 py-1.5 text-xs font-semibold text-bone-dim transition-colors duration-150 ease-ui hover:text-bone'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ground">
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 px-5 sm:px-8">
        <Link to="/" className="group flex min-w-0 items-center gap-2.5 justify-self-start">
          <span
            aria-hidden
            className="grid size-6 shrink-0 place-items-center bg-acid font-display text-xs font-bold text-ground"
          >
            JC
          </span>
          <span className="display-wide truncate text-sm font-semibold transition-colors group-hover:text-bone">
            {profile.name}
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
                    className: 'bg-acid text-ground! hover:text-ground',
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
