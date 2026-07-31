import { profile } from '#/data/profile'

/**
 * The hairline frame pinned inside the viewport, with corner brackets, an edge
 * crosshair and micro annotations — the reference's most recognisable device.
 *
 * It sits below the header (z-30 vs z-50) and starts beneath it, so the header
 * reads as breaking through the top edge rather than floating over it.
 */
export function ViewportFrame() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-3 top-[4.5rem] bottom-3 z-30 hidden sm:block"
    >
      <div className="absolute inset-0 border border-line/60" />

      {/* Corner brackets */}
      <span className="absolute -top-px -left-px size-3 border-t border-l border-bone-faint" />
      <span className="absolute -top-px -right-px size-3 border-t border-r border-bone-faint" />
      <span className="absolute -bottom-px -left-px size-3 border-b border-l border-bone-faint" />
      <span className="absolute -right-px -bottom-px size-3 border-r border-b border-bone-faint" />

      {/* Edge crosshair */}
      <span className="absolute top-1/2 -left-[3px] size-1.5 -translate-y-1/2 rotate-45 border border-acid/70" />

      {/* Micro annotations */}
      <span className="label-micro absolute top-2 left-3 text-bone-faint/70">
        {profile.handle} / portfolio
      </span>
      <span className="label-micro absolute right-3 bottom-2 text-right text-bone-faint/70">
        {profile.location}
      </span>
    </div>
  )
}
