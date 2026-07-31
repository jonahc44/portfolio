type ClassValue = string | false | null | undefined

/**
 * Minimal class joiner. Deliberately not `clsx` — we have no conditional-object
 * or array cases yet, and this keeps the dependency count at zero.
 */
export function cn(...values: Array<ClassValue>): string {
  return values.filter(Boolean).join(' ')
}
