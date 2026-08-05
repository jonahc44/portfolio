import { Link } from '@tanstack/react-router'
import { LogoMark } from '#/components/ui/LogoMark'
import { profile } from '#/data/profile'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const

const linkBase =
  'display-wide px-3 py-1.5 text-xs font-semibold text-bone-dim transition-colors duration-150 ease-ui hover:text-acid-ink'

/**
 * The current page is a bone fill rather than an accent one — "where you are"
 * is a resting fact, and the resting page is greyscale. It still answers the
 * pointer, taking the same bone-fill-to-accent-fill step the primary button
 * does, so no item in the nav is a dead spot under the cursor.
 *
 * The `!` beats `linkBase` regardless of the order the two class strings land
 * in the sheet. The hover pair outranks the resting pair on specificity, so
 * marking both important doesn't strand the fill at bone.
 */
const linkActive = 'bg-bone text-ground! hover:bg-acid hover:text-on-accent!'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ground">
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 px-5 sm:px-8">
        <Link to="/" className="group flex min-w-0 items-center gap-2.5 justify-self-start">
          {/* The mark carries no fill of its own. The old chip was a bone
              square with JC set in it, but the monogram needs every pixel it
              can get — knocking it out of a square would cost it the padding
              and the initials stop reading. Bare, it takes the same
              bone-to-accent step under the pointer that the chip did.

              28px, not 24: below about 26 the J and C stop resolving and the
              mark reads as one dense glyph. It is still under the nav labels
              in weight, so the header keeps its balance. */}
          <LogoMark
            aria-hidden
            className="h-7 w-auto shrink-0 text-bone transition-colors duration-150 ease-ui group-hover:text-acid-ink"
          />
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
                  activeProps={{ className: linkActive }}
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
