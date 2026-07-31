# portfolio

Personal portfolio site — cyberpunk-leaning, dark, neon. React 19 + TanStack Router
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
| `src/data/skills.ts` | Skill groups (about page) + the home-page ticker |
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
    layout/          Backdrop, ViewportFrame, SiteHeader, SiteFooter, PageShell
    ui/              Panel, Tag, StatusPill, SectionHeading, button
    home/            Hero, SkillTicker
    projects/        ProjectCard
  data/              all site content (see above)
  lib/cn.ts          class joiner
  styles.css         design system — tokens, base, utilities
```

Imports use the `#/` alias for `src/` (declared in both `package.json#imports`
and `tsconfig.json#paths`), e.g. `import { Panel } from '#/components/ui/Panel'`.

## Design system

All of it lives in `src/styles.css`. Change the theme there, not in components.

**Art direction** follows the Marathon (Bungie) UI language: near-black ground,
bone-white fills, and exactly **one** accent. Flat colour — no glow, no bloom,
no texture. Hierarchy comes from contrast, weight and negative space. The
accent, light fill and black are sampled from the reference art.

**Tokens** (`@theme`) — Tailwind v4 generates utilities from each one:

- Ground: `base` (`#06080A`), `surface`, `surface-2`
- Hairlines: `line` (default rule), `line-2` (hover/active)
- Bone: `bone` (`#E3E3E3`), `bone-dim`, `bone-faint`
- Accent: `acid` (`#A0C516`), `acid-2` (hover), `acid-deep` (low-emphasis)
- Fonts: `font-display` (Chakra Petch), `font-sans` (Archivo), `font-mono` (JetBrains Mono)
- Easing: `ease-ui`

**Custom utilities:**

- `label-mono` — tracked uppercase mono for indices, meta and eyebrows. Used
  heavily; it carries most of the "technical readout" character.
- `label-micro` — smaller still, for the annotations pinned to the viewport frame
- `display-wide` — tracked uppercase display type, after the reference's menu labels
- `fill-acid` / `fill-bone` — the button fills. Both carry the barely-there
  vertical gradient from the reference; don't flatten them to a solid colour or
  the light fills read as plain white boxes.

**Animations:** `animate-caret`, `animate-ticker`, `animate-breathe`.

### Conventions

- **One accent.** `acid` marks the single most important thing in a view — the
  primary action, the active nav item, a live project. Spending it anywhere else
  costs it its weight. Everything else separates by grey value.
- **Panels**: use `<Panel>` rather than hand-rolling borders. `ticks` adds the
  corner brackets, `title`/`meta` add the top strip, `accent="acid"` is reserved
  for the one panel that matters most on a page.
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
