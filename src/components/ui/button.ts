import { cn } from '#/lib/cn'

/**
 * Three tiers, mirroring the reference UI:
 *   acid    — the one primary action on a view (filled lime, black label)
 *   bone    — secondary (filled light grey, black label)
 *   line    — tertiary (transparent, hairline border)
 */
export type ButtonVariant = 'acid' | 'bone' | 'line'
export type ButtonSize = 'sm' | 'md'

const base =
  'display-wide inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors duration-150 ease-ui select-none'

const sizes: Record<ButtonSize, string> = {
  sm: 'px-3.5 py-1.5 text-[0.7rem]',
  md: 'px-6 py-2.5 text-sm',
}

const variants: Record<ButtonVariant, string> = {
  acid: 'fill-acid text-black hover:bg-acid-2 hover:bg-none',
  bone: 'fill-bone text-black hover:bg-white hover:bg-none',
  line: 'border border-line text-bone-dim hover:border-acid hover:text-acid',
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
