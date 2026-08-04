import { cn } from '#/lib/cn'

/**
 * Three tiers. Fills are flat ink on a square field — screen-printed panel
 * labels, not glossy chrome.
 *
 *   primary   — the ONE main action on a view (bone fill, ground label)
 *   secondary — a supporting action (strong hairline, no fill)
 *   quiet     — tertiary (faint hairline, dimmed label)
 *
 * All three rest in greyscale and separate by weight alone: filled,
 * outlined-strong, outlined-faint. The accent is not part of the resting
 * hierarchy — it only arrives under the pointer, which is why `primary` can
 * afford to be a plain bone fill and still read as the loudest thing on a page
 * where nothing else is filled.
 *
 * `quiet` brightens to bone rather than to the accent: it is the tier for
 * things like "return home", where the hover isn't worth a colour.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'quiet'
export type ButtonSize = 'sm' | 'md'

const base =
  'display-wide inline-flex items-center justify-center gap-2 font-semibold transition-colors duration-150 ease-ui select-none'

const sizes: Record<ButtonSize, string> = {
  sm: 'px-3.5 py-1.5 text-[0.7rem]',
  md: 'px-6 py-2.5 text-sm',
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-bone text-ground hover:bg-acid hover:text-on-accent',
  secondary:
    'border border-line-2 text-bone hover:border-acid-ink hover:text-acid-ink',
  quiet: 'border border-line text-bone-dim hover:border-line-2 hover:text-bone',
}

/**
 * Returns button styling as a class string rather than a component, so it can
 * be applied to a `<button>`, an `<a>`, or a router `<Link>` without wrapping
 * or re-declaring TanStack Router's link generics.
 */
export function buttonClass(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  className?: string,
): string {
  return cn(base, sizes[size], variants[variant], className)
}
