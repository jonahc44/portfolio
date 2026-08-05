import type { SVGProps } from 'react'

/**
 * The monogram, built on the one thing the two names have in common: the
 * second letter of each is an o. J-o-nah, C-o-hen. So the mark sets them as
 * two rows — J over C — and fuses the two o's into a single ring that spans
 * both. Read across the top it says Jo; across the bottom, Co. There is only
 * one o because there was only ever one o.
 *
 * All three glyphs are cut from the same shape. Start with the chamfered ring:
 * leave it whole and it is the O; open the right stroke with a slot and it is
 * the C; take away the top and the upper left and what remains — stem, bowl,
 * short riser — is the J. One ring, three subtractions, which is why the mark
 * holds together as a set rather than as three letters that happen to be
 * adjacent.
 *
 * Every stroke in the mark is the same width, including the tall O's. That is
 * the whole reason the O works: it is not a big O, it is two o's fused, so it
 * gains height without gaining weight. Scaling it up instead — a 2x ring with
 * a 2x stroke — buries the initials next to it, which is what the first pass
 * did and why it was thrown out.
 *
 * Geometry is 45deg cuts and right angles only, no curves: the site is
 * rectilinear and flat, and chamfers keep the letters technical without
 * rounding anything. The path is on a 100-unit body; the numbers came out of a
 * generator that enforced the two constraints the forms can violate — the C's
 * aperture has to clear its inner corners, and the J's riser has to reach above
 * the bowl's — and both were verified by rendering at 16, 24 and 32px, which is
 * the range that decides whether a mark this small survives.
 */
export function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 103.68 100"
      fill="currentColor"
      fillRule="evenodd"
      focusable="false"
      {...props}
    >
      {/* J */}
      <path d="M30.68,0 40.48,0 40.48,34.5 30.98,44 9.5,44 0,34.5 0,27.28 9.8,27.28 9.8,30.44 13.56,34.2 26.92,34.2 30.68,30.44Z" />
      {/* C */}
      <path d="M40.48,70.96 40.48,65.5 30.98,56 9.5,56 0,65.5 0,90.5 9.5,100 30.98,100 40.48,90.5 40.48,85.04 30.68,85.04 30.68,86.44 26.92,90.2 13.56,90.2 9.8,86.44 9.8,69.56 13.56,65.8 26.92,65.8 30.68,69.56 30.68,70.96Z" />
      {/* the shared o, spanning both rows */}
      <path d="M64.98,0 83.68,0 103.68,20 103.68,80 83.68,100 64.98,100 44.98,80 44.98,20ZM54.78,24.06 54.78,75.94 69.04,90.2 79.62,90.2 93.88,75.94 93.88,24.06 79.62,9.8 69.04,9.8Z" />
    </svg>
  )
}
