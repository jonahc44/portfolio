/**
 * Ambient ground. Deliberately almost nothing: a faint neutral lift at the top
 * and a whisper of grid for structure. No colour, no motion, no texture — the
 * accent has to stay rare to keep its weight.
 */
export function Backdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-base"
    >
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage:
            'radial-gradient(ellipse 80% 55% at 50% 0%, #000 20%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 55% at 50% 0%, #000 20%, transparent 80%)',
        }}
      />
      <div className="absolute inset-x-0 top-0 h-[32rem] bg-gradient-to-b from-surface/70 to-transparent" />
    </div>
  )
}
