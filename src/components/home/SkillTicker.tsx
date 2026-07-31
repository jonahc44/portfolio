import { skillTicker } from '#/data/skills'

/**
 * Slow horizontal readout. The list is rendered twice and translated -50%, so
 * the seam lands exactly where the duplicate begins. Kept low-contrast — it is
 * texture, not content.
 */
export function SkillTicker() {
  return (
    <div className="relative overflow-hidden border-y border-line py-3.5">
      <div
        className="animate-ticker flex w-max"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)',
        }}
      >
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0">
            {skillTicker.map((skill) => (
              <li
                key={skill}
                className="label-mono flex shrink-0 items-center gap-10 pr-10 text-bone-faint"
              >
                {skill}
                <span aria-hidden className="size-1 rounded-full bg-acid/50" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
