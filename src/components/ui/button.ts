import { cn } from '#/lib/cn'

/**
 * Three tiers. Fills are flat ink on a square field — screen-printed panel
 * labels, not glossy chrome.
 *
 *   acid — the ONE primary action on a view (accent fill, ground label)
 *   bone — secondary (ink fill, ground label)
 *   line — tertiary (transparent, hairline border)
 *
 * Note that `line` brightens to bone on hover rather than to an accent: hover
 * is not a state worth spending the accent on.
 */
export type ButtonVariant = 'acid' | 'bone' | 'line'
export type ButtonSize = 'sm' | 'md'

const base =
  'display-wide inline-flex items-center justify-center gap-2 font-semibold transition-colors duration-150 ease-ui select-none'

const sizes: Record<ButtonSize, string> = {
  sm: 'px-3.5 py-1.5 text-[0.7rem]',
  md: 'px-6 py-2.5 text-sm',
}

const variants: Record<ButtonVariant, string> = {
  acid: 'bg-acid text-ground hover:bg-acid-2',
  bone: 'bg-bone text-ground hover:bg-bone-2',
  line: 'border border-line text-bone-dim hover:border-line-2 hover:text-bone',
}

/**
 * Returns button styling as a class string rather than a component, so it can
 * be applied to a `<button>`, an `<a>`, or a router `<Link>` without wrapping
 * or re-declaring TanStack Router's link generics.
 */
export function buttonClass(
  variant: ButtonVariant = 'acid',
  size: ButtonSize = 'md',
  className?: string,
): string {
  return cn(base, sizes[size], variants[variant], className)
}
