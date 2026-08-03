# portfolio

Personal portfolio site — retrofuturist, warm-grey, flat. React 19 + TanStack Router
(file-based, SPA) + Tailwind v4 + Vite.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # -> dist/
npm run preview
npm run typecheck
```

## Where to edit what

Content is fully separated from presentation. For everyday updates you should
only need to touch `src/data/`:

| File | Holds |
| --- | --- |
| `src/data/profile.ts` | Name, roles, location, bio, email, socials, `openToWork` flag |
| `src/data/projects.ts` | Project catalogue. `featured: true` surfaces it on the home page |
| `src/data/skills.ts` | Skill groups (about page) |
| `src/data/timeline.ts` | Education / experience entries for the about page |

Everything currently in `src/data/` is **placeholder content** marked with
`TODO`. Replace it before shipping.

## Structure

```
src/
  routes/            file-based routes -> routeTree.gen.ts (generated, don't edit)
    __root.tsx       app shell: backdrop, header, footer, 404
    index.tsx        home
    projects.tsx     work index + stack filter
    about.tsx        bio, skills, timeline
    contact.tsx      email + socials
  components/
    layout/          Backdrop, SiteHeader, SiteFooter, PageShell
    ui/              Panel, Tag, StatusPill, SectionHeading, button
    home/            Hero
    projects/        ProjectCard
  data/              all site content (see above)
  lib/cn.ts          class joiner
  styles.css         design system — tokens, base, utilities
```

Imports use the `#/` alias for `src/` (declared in both `package.json#imports`
and `tsconfig.json#paths`), e.g. `import { Panel } from '#/components/ui/Panel'`.

## Design system

All of it lives in `src/styles.css`. Change the theme there, not in components.

**Art direction** is retrofuturist, not neon: green phosphor CRTs, hazard-orange
warning legends, screen-printed panel labels, moulded plastic enclosures — a
1970s/80s idea of the future. Warm greys carry everything; two accents carry
meaning. Flat ink, no glow, no gradients, **no rounded corners**. Hierarchy
comes from contrast, weight and negative space.

**Tokens** (`@theme`) — Tailwind v4 generates utilities from each one:

- Ground: `ground` (`#1B1B19`), `surface`, `surface-2`
- Hairlines: `line` (default rule), `line-2` (hover/active)
- Bone: `bone` (`#E6E4DF`), `bone-dim`, `bone-faint`
- Green: `acid` (`#A0C516`), `acid-2` (hover), `acid-deep` (low-emphasis)
- Orange: `orange` (`#FC6F1E`), `orange-2`, `orange-deep`
- Fonts: `font-display` (Chakra Petch), `font-sans` (Archivo), `font-mono` (JetBrains Mono)
- Easing: `ease-ui`

The ground token is `ground`, not `base` — `text-base` is already a Tailwind
font-size utility, and the collision is a trap worth avoiding.

**Custom utilities:**

- `label-mono` — tracked uppercase mono for indices, meta and eyebrows. Used
  heavily; it carries most of the terminal-readout character.
- `label-micro` — smaller still, for ambient annotations
- `display-wide` — tracked uppercase display type, the panel-label voice

**Animations:** `animate-caret` — and that is the whole list, on purpose.

### Conventions

- **Two accents, two meanings.** `acid` is affirmative state and the single
  primary action per view (active nav, live project, one button). `orange` is
  the readout layer — eyebrows, section indices, advisory status. Orange is
  never an action; acid is never decoration. Everything else separates by grey
  value.
- **Orange stays small.** At `#FC6F1E` it is the brightest thing in the palette,
  so it is confined to tracked mono labels and few-pixel markers. Never set body
  copy in it, never fill a panel or button with it.
- **Hover doesn't earn an accent.** Interactive text and tertiary buttons
  brighten toward `bone`. Reserving colour for state is what keeps it legible.
- **Panels**: use `<Panel>` rather than hand-rolling borders. `title`/`meta` add
  the top strip; `accent="acid"` is reserved for the one panel that matters most
  on a page.
- **Buttons**: `buttonClass(variant, size, extra)` returns a class string rather
  than a component, so the same styling applies to `<button>`, `<a>` and
  TanStack `<Link>` without fighting router generics. Tiers are `acid` (one per
  view) → `bone` → `line`.
- **Motion**: a global `prefers-reduced-motion` guard in `@layer base` disables
  all animations and transitions, so individual components don't need their own
  escape hatch. Keep new animation restrained and decorative — never encode
  meaning in motion alone.

## Notes

- This is a client-rendered SPA. There is no SSR, no server functions, no API
  routes — `index.html` is the shell and holds the `<title>`/meta tags.
- Route code-splitting is automatic (`autoCodeSplitting` in `vite.config.ts`).
- Devtools are dev-only and stripped from production builds.
- Fonts load from Google Fonts via `index.html`. Self-host them if you want to
  drop the third-party request.
