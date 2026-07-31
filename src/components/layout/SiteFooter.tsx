import { profile } from '#/data/profile'

export function SiteFooter() {
  return (
    <footer className="mt-28 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="display-wide text-sm font-semibold">{profile.name}</p>
          <p className="label-mono mt-1.5 text-bone-faint">
            {profile.roles.join(' / ')}
          </p>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {profile.socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
                className="label-mono text-bone-dim transition-colors hover:text-acid"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-line/60">
        <p className="label-micro mx-auto max-w-6xl px-5 py-4 text-bone-faint sm:px-8">
          © {new Date().getFullYear()} {profile.name} — React / TanStack Router / Tailwind
        </p>
      </div>
    </footer>
  )
}
