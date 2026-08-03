/**
 * Ambient ground: a single soft lift toward the top of the page and nothing
 * else. No grid, no texture, no motion — on a grey ground the panel edges are
 * already doing the structural work, and anything more reads as noise.
 */
export function Backdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 bg-ground"
    >
      <div className="absolute inset-x-0 top-0 h-[36rem] bg-gradient-to-b from-surface/60 to-transparent" />
    </div>
  )
}
