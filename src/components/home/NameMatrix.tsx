import { useEffect, useRef } from 'react'

import { cn } from '#/lib/cn'

/* ---------------------------------------------------------------------------
   NameMatrix — the name as a physical dot-matrix display.

   The board is drawn on a canvas: every cell of the grid gets a dot, unlit
   cells included, so the thing reads as a panel with LEDs in it rather than as
   text made of circles. Two behaviours sit on top:

     ignition  a left-to-right scan on load, each dot flashing bright before it
               settles — a tube warming up, not a fade-in
     pointer   a pool of the accent follows the cursor — only the dots inside
               it change, and only in colour and brightness; nothing is ever
               displaced, so the name reads the same whether or not the cursor
               is on it

   Every colour is read off the document rather than written here, so the board
   is drawn in the page's own ink and follows the colour scheme with it.

   Between the two the board is completely still: no ambient shimmer, no drift,
   and the render loop parks itself rather than repainting an identical frame.
   Motion only ever happens because the page just loaded or because someone is
   pointing at it.

   All motion is disabled under prefers-reduced-motion; the colour response to
   the pointer is kept, since that's state rather than movement.
--------------------------------------------------------------------------- */

/** 5×7 cells — the classic LED-sign glyph box. */
const GLYPH_W = 5
const GLYPH_H = 7
/** Columns between glyphs, between words, and between stacked lines. */
const LETTER_GAP = 1
const WORD_GAP = 3
const LINE_GAP = 2

const GLYPHS: Record<string, ReadonlyArray<string>> = {
  A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
  B: ['11110', '10001', '10001', '11110', '10001', '10001', '11110'],
  C: ['01110', '10001', '10000', '10000', '10000', '10001', '01110'],
  D: ['11100', '10010', '10001', '10001', '10001', '10010', '11100'],
  E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
  F: ['11111', '10000', '10000', '11110', '10000', '10000', '10000'],
  G: ['01110', '10001', '10000', '10111', '10001', '10001', '01111'],
  H: ['10001', '10001', '10001', '11111', '10001', '10001', '10001'],
  I: ['11111', '00100', '00100', '00100', '00100', '00100', '11111'],
  J: ['00001', '00001', '00001', '00001', '00001', '10001', '01110'],
  K: ['10001', '10010', '10100', '11000', '10100', '10010', '10001'],
  L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
  M: ['10001', '11011', '10101', '10101', '10001', '10001', '10001'],
  N: ['10001', '11001', '11001', '10101', '10011', '10011', '10001'],
  O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
  P: ['11110', '10001', '10001', '11110', '10000', '10000', '10000'],
  Q: ['01110', '10001', '10001', '10001', '10101', '10010', '01101'],
  R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
  S: ['01111', '10000', '10000', '01110', '00001', '00001', '11110'],
  T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
  U: ['10001', '10001', '10001', '10001', '10001', '10001', '01110'],
  V: ['10001', '10001', '10001', '10001', '10001', '01010', '00100'],
  W: ['10001', '10001', '10001', '10101', '10101', '11011', '10001'],
  X: ['10001', '10001', '01010', '00100', '01010', '10001', '10001'],
  Y: ['10001', '10001', '01010', '00100', '00100', '00100', '00100'],
  Z: ['11111', '00001', '00010', '00100', '01000', '10000', '11111'],
  '.': ['00000', '00000', '00000', '00000', '00000', '01100', '01100'],
  '-': ['00000', '00000', '00000', '01110', '00000', '00000', '00000'],
}

type Dot = {
  col: number
  row: number
  lit: boolean
  /** Stable per-dot value, drives ignition jitter and warm-up flicker. */
  seed: number
  /** Seconds into the intro before this dot fires. */
  delay: number
}

type Board = {
  cols: number
  rows: number
  dots: Array<Dot>
  /** Delay of the last dot to fire — when the intro is over. */
  lastDelay: number
}

/* ---------------------------------------------------------------------------
   Board construction
--------------------------------------------------------------------------- */

/** Column advance of a line, in cells. */
function lineWidth(line: string): number {
  let x = 0
  for (let i = 0; i < line.length; i++) {
    if (i > 0) x += LETTER_GAP
    x += line[i] === ' ' ? WORD_GAP : GLYPH_W
  }
  return x
}

/**
 * Lay lines of text out on a cell grid. Lines stack vertically and are centred
 * against the widest one; every cell in the bounding box becomes a dot, lit or
 * not.
 */
function buildBoard(lines: Array<string>): Board {
  const cols = Math.max(1, ...lines.map(lineWidth))
  const rows = lines.length * GLYPH_H + (lines.length - 1) * LINE_GAP

  const isLit = Array.from({ length: rows }, () =>
    new Array<boolean>(cols).fill(false),
  )

  lines.forEach((line, lineIndex) => {
    const top = lineIndex * (GLYPH_H + LINE_GAP)
    let x = Math.floor((cols - lineWidth(line)) / 2)

    for (let i = 0; i < line.length; i++) {
      const ch = line[i]
      if (i > 0) x += LETTER_GAP
      if (ch === ' ') {
        x += WORD_GAP
        continue
      }

      const glyph = GLYPHS[ch]
      if (glyph) {
        for (let r = 0; r < GLYPH_H; r++) {
          for (let c = 0; c < GLYPH_W; c++) {
            if (glyph[r][c] === '1') isLit[top + r][x + c] = true
          }
        }
      }
      x += GLYPH_W
    }
  })

  const dots: Array<Dot> = []
  let lastDelay = 0
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const seed = hash(col * 31.7 + row * 71.3)
      // A scan across the board, softened by row and a little per-dot jitter
      // so the leading edge isn't a hard vertical line.
      const delay = (col / cols) * 0.62 + (row / rows) * 0.08 + seed * 0.05
      if (delay > lastDelay) lastDelay = delay
      dots.push({ col, row, lit: isLit[row][col], seed, delay })
    }
  }

  return { cols, rows, dots, lastDelay }
}

/* ---------------------------------------------------------------------------
   Small maths helpers
--------------------------------------------------------------------------- */

function hash(n: number): number {
  const s = Math.sin(n * 127.1) * 43758.5453
  return s - Math.floor(s)
}

function clamp01(n: number): number {
  return n < 0 ? 0 : n > 1 ? 1 : n
}

type RGB = [number, number, number]

function mix(a: RGB, b: RGB, t: number): RGB {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ]
}

function rgba([r, g, b]: RGB, alpha: number): string {
  return `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${alpha.toFixed(3)})`
}

/**
 * Read a design token off the document so the canvas can't drift from CSS.
 *
 * Both hex forms are accepted: the build minifies custom properties, so a token
 * authored as #ffffff arrives as #fff in production.
 */
function token(name: string, fallback: RGB): RGB {
  if (typeof window === 'undefined') return fallback
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim()
  const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(raw)
  if (!m) return fallback
  const hex =
    m[1].length === 3
      ? m[1].replace(/./g, (c) => c + c)
      : m[1]
  const int = parseInt(hex, 16)
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255]
}

type Palette = {
  /** Lit dots at rest. */
  bone: RGB
  /** Unlit cells — the substrate the dots are mounted in. */
  line: RGB
  /** The pointer pool. */
  acid: RGB
  /** The core of the pool: the same accent driven harder. */
  acidHot: RGB
}

/**
 * Snapshot the palette from CSS. Re-read on a scheme change: the fallbacks are
 * the dark values, used only before the document can be measured.
 */
function readPalette(): Palette {
  const acid = token('--color-acid', [184, 224, 25])
  return {
    bone: token('--color-bone', [230, 228, 223]),
    line: token('--color-line', [59, 59, 54]),
    acid,
    // Driven past full means driven *away from the ground* — blown out on a
    // dark board, saturated into the paper on a light one. Never a new hue.
    acidHot: mix(acid, token('--drive', [255, 255, 255]), 0.38),
  }
}

/* ---------------------------------------------------------------------------
   Component
--------------------------------------------------------------------------- */

type NameMatrixProps = {
  text: string
  /** Cell pitch bounds in CSS pixels. Also decides when the name wraps. */
  minPitch?: number
  maxPitch?: number
  className?: string
}

export function NameMatrix({
  text,
  minPitch = 10,
  maxPitch = 22,
  className,
}: NameMatrixProps) {
  const hostRef = useRef<HTMLSpanElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reduced = motionQuery.matches

    const words = text.trim().toUpperCase().split(/\s+/)
    // One line if the board can stay legible at that width; otherwise stack the
    // words. Both layouts are pre-built so resizing is a swap, not a rebuild.
    const wide = buildBoard([words.join(' ')])
    const stacked = buildBoard(words)

    const schemeQuery = window.matchMedia('(prefers-color-scheme: dark)')
    let palette = readPalette()

    // The ramp and the overshoot both have to finish, otherwise parking the
    // loop would freeze a dot mid-flash.
    const introEnd = Math.max(wide.lastDelay, stacked.lastDelay) + 0.3 + 2

    let board = wide
    let pitch = minPitch
    let width = 0
    let height = 0

    /** Pointer state, in CSS pixels relative to the canvas. */
    const pointer = { x: -1e4, y: -1e4, over: 0, target: 0 }
    let start = performance.now()
    let raf = 0
    let running = false

    function measure() {
      const available = host!.clientWidth
      if (!available) return

      const widePitch = Math.floor(available / wide.cols)
      board = widePitch >= minPitch ? wide : stacked
      pitch = Math.max(
        3,
        Math.min(maxPitch, Math.floor(available / board.cols)),
      )

      width = board.cols * pitch
      height = board.rows * pitch

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = Math.round(width * dpr)
      canvas!.height = Math.round(height * dpr)
      canvas!.style.width = `${width}px`
      canvas!.style.height = `${height}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function draw(now: number) {
      const { bone, line, acid, acidHot } = palette
      const t = (now - start) / 1000
      const igniting = !reduced && t < introEnd

      // Ease the hover factor rather than snapping, so leaving the board
      // drains the green instead of cutting it.
      pointer.over += (pointer.target - pointer.over) * (reduced ? 0.4 : 0.11)
      const hovering = pointer.target > 0 || pointer.over > 0.003
      // Settle the last of the easing rather than leaving a trace of green on
      // the resting frame.
      if (!hovering) pointer.over = 0

      ctx!.clearRect(0, 0, width, height)

      const half = pitch / 2
      const litRadius = pitch * 0.34
      const darkRadius = pitch * 0.15
      // Small enough to sit inside the height of the board, so the pool reads
      // as a circle rather than as a band across the full stave.
      const hotRadius = pitch * 3.4

      for (const dot of board.dots) {
        const cx = dot.col * pitch + half
        const cy = dot.row * pitch + half

        // --- pointer influence -------------------------------------------
        // Dots never leave their cell. The pointer changes what a dot looks
        // like, not where it is, so the letterforms are identical whether or
        // not the cursor is on them.
        let local = 0
        if (pointer.over > 0.001) {
          const dist = Math.hypot(cx - pointer.x, cy - pointer.y)
          if (dist < hotRadius) {
            // Smoothstep with a small saturated core, so the pool is solid in
            // the middle and its edge stays a clean circle.
            const u = clamp01(((hotRadius - dist) / hotRadius) * 1.15)
            local = pointer.over * u * u * (3 - 2 * u)
          }
        }

        // --- ignition ------------------------------------------------------
        const ignite = reduced ? 1 : clamp01((t - dot.delay) / 0.3)
        if (ignite <= 0) continue
        const eased = 1 - (1 - ignite) ** 3

        if (!dot.lit) {
          // Unlit cells: the substrate. Barely there until the pointer is near.
          const alpha = eased * (0.13 + 0.62 * local)
          ctx!.fillStyle = rgba(mix(line, acid, clamp01(local * 0.9)), alpha)
          ctx!.beginPath()
          ctx!.arc(cx, cy, darkRadius * (1 + local * 0.7), 0, Math.PI * 2)
          ctx!.fill()
          continue
        }

        let brightness = eased
        let radius = litRadius

        // Ignition is the only motion the board makes on its own, and it ends.
        // Once it's over the resting frame is exact, so there's nothing left to
        // shimmer or drift.
        if (igniting) {
          // Overshoot as each dot fires, decaying into the resting level.
          const flash = Math.exp(-Math.max(0, t - dot.delay - 0.3) / 0.4)
          brightness *= 1 + 0.95 * flash * eased

          if (ignite < 1) {
            // Warm-up stutter, only while the dot is still coming up.
            brightness *= 0.5 + 0.5 * hash(dot.seed * 97 + Math.floor(t * 26))
          }
        }

        brightness *= 1 + 0.55 * local

        // The accent is strictly local: dots outside the pool stay bone, so the
        // pointer reads as a light being carried across the board.
        let color = bone
        if (local > 0) {
          color = mix(bone, acid, clamp01(local))
          const core = clamp01((local - 0.65) / 0.35)
          if (core > 0) color = mix(color, acidHot, core * 0.55)
        }

        // Past full brightness the dot grows rather than clipping to white.
        if (brightness > 1) radius *= 1 + 0.3 * Math.min(brightness - 1, 1.2)

        ctx!.fillStyle = rgba(color, clamp01(brightness))
        ctx!.beginPath()
        ctx!.arc(cx, cy, radius, 0, Math.PI * 2)
        ctx!.fill()
      }

      // The frame just drawn is the board at rest: stop scheduling until
      // something actually changes.
      if (igniting || hovering) {
        raf = requestAnimationFrame(draw)
      } else {
        running = false
      }
    }

    /** Restart the loop after it has parked. */
    function wake() {
      if (running) return
      running = true
      raf = requestAnimationFrame(draw)
    }

    function onPointerMove(event: PointerEvent) {
      const rect = canvas!.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      pointer.target = 1
      wake()
    }

    function onPointerLeave() {
      pointer.target = 0
      wake()
    }

    function onMotionChange(event: MediaQueryListEvent) {
      reduced = event.matches
      start = performance.now()
      wake()
    }

    /** The scheme flipped under us: repaint in the new ink, without replaying
     *  the intro — the board is already warm. */
    function onSchemeChange() {
      palette = readPalette()
      wake()
    }

    const resizeObserver = new ResizeObserver(() => {
      measure()
      wake()
    })
    resizeObserver.observe(host)

    measure()
    start = performance.now()
    wake()

    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerenter', onPointerMove)
    canvas.addEventListener('pointerleave', onPointerLeave)
    canvas.addEventListener('pointercancel', onPointerLeave)
    motionQuery.addEventListener('change', onMotionChange)
    schemeQuery.addEventListener('change', onSchemeChange)

    return () => {
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerenter', onPointerMove)
      canvas.removeEventListener('pointerleave', onPointerLeave)
      canvas.removeEventListener('pointercancel', onPointerLeave)
      motionQuery.removeEventListener('change', onMotionChange)
      schemeQuery.removeEventListener('change', onSchemeChange)
    }
  }, [text, minPitch, maxPitch])

  return (
    // A span, not a div: this renders inside the page's <h1>.
    <span ref={hostRef} className={cn('block', className)}>
      <canvas ref={canvasRef} aria-hidden className="block" />
    </span>
  )
}
