import { CATEGORY_COLOR_VAR } from "@/lib/content/categories";
import type { Author } from "@/lib/content/authors";

/**
 * Procedurally drawn 8-bit robot faces, one per byline.
 *
 * Near's cast is ~25 personas and growing (EPIC 4), so bespoke artwork
 * for each is a maintenance burden that gets worse every time a byline is
 * added. This draws a deterministic face from the slug instead: every new
 * persona gets a distinct avatar for free, forever.
 *
 * Pixel art also solves the problem the illustration brief worries about.
 * near-illustrator forbids photoreal output because a synthetic image a
 * reader could mistake for documentation is a lie — a 13x13 grid of
 * squares cannot be mistaken for anything. And every Near byline is
 * openly a machine, so a blocky robot is the honest form.
 *
 * The generated image is used when a persona has no hand-made artwork;
 * `hasAvatar` on the author record overrides it.
 */

const GRID = 11;

// Deterministic and stable: the same slug must always produce the same
// face, or bylines would change appearance between renders.
function hash(slug: string): number {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

type Cell = 0 | 1 | 2 | 3; // empty | ink | accent | beat colour

/**
 * Solid silhouette with cut-out features, which is how 8-bit sprites stay
 * legible when small. An outlined head with one-pixel eyes reads as an
 * empty box at 28px; a filled head with two-pixel negative-space eyes
 * reads as a face.
 */
function buildFace(slug: string): Cell[][] {
  const h = hash(slug);
  const pick = (shift: number, mod: number) => (h >>> shift) % mod;

  const g: Cell[][] = Array.from({ length: GRID }, () =>
    Array<Cell>(GRID).fill(0),
  );
  const set = (x: number, y: number, v: Cell) => {
    if (x < 0 || y < 0 || x >= GRID || y >= GRID) return;
    g[y][x] = v;
    g[y][GRID - 1 - x] = v; // mirrored — symmetry is what makes it a face
  };

  const top = 2;
  const bottom = 9;

  // Solid head.
  const shape = pick(0, 3);
  for (let y = top; y <= bottom; y++) {
    for (let x = 1; x <= 5; x++) {
      if (shape === 1 && y === top && x <= 1) continue; // clipped corners
      if (shape === 2 && y === bottom && x <= 1) continue; // tapered jaw
      set(x, y, 1);
    }
  }

  // Antenna, the clearest per-persona tell at thumbnail size.
  const antenna = pick(4, 4);
  if (antenna === 0) {
    set(5, top - 1, 1);
    set(5, top - 2, 2);
  } else if (antenna === 1) {
    set(3, top - 1, 1);
    set(3, top - 2, 2);
  } else if (antenna === 2) {
    set(1, top - 1, 1);
    set(5, top - 1, 1);
  }

  // Eyes cut out of the silhouette, 2x2 so they survive small sizes.
  const eyeY = top + 2;
  const eyes = pick(8, 3);
  for (let dy = 0; dy < 2; dy++) {
    for (let dx = 0; dx < 2; dx++) {
      set(2 + dx, eyeY + dy, 0);
    }
  }
  if (eyes === 0) set(2, eyeY, 2); // lit pupil
  else if (eyes === 1) set(3, eyeY + 1, 2);
  // eyes === 2 leaves them dark

  // Mouth / speaker grille, also negative space.
  const mouthY = bottom - 2;
  const mouth = pick(12, 3);
  if (mouth === 0) {
    for (let x = 2; x <= 4; x++) set(x, mouthY, 0);
    set(3, mouthY, 3);
  } else if (mouth === 1) {
    for (let x = 2; x <= 5; x++) set(x, mouthY, 3);
  } else {
    for (let x = 2; x <= 4; x++) set(x, mouthY, 0);
    for (let x = 2; x <= 4; x++) set(x, mouthY + 1, 3);
  }

  // Side plates.
  set(0, top + 3, 1);
  set(0, top + 4, 1);

  return g;
}

export default function PixelAvatar({
  author,
  size = 40,
}: {
  author: Author;
  size?: number;
}) {
  const grid = buildFace(author.slug);
  const beat = author.beats[0];
  const beatColor = beat ? `var(${CATEGORY_COLOR_VAR[beat]})` : "var(--accent)";
  const px = 100 / GRID;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role="img"
      aria-hidden="true"
      // shape-rendering keeps the squares hard-edged at any scale, which
      // is the entire point of pixel art.
      shapeRendering="crispEdges"
      className="flex-none border-[2px] border-ink bg-surface"
    >
      {grid.map((row, y) =>
        row.map((cell, x) =>
          cell === 0 ? null : (
            <rect
              key={`${x}-${y}`}
              x={x * px}
              y={y * px}
              width={px}
              height={px}
              fill={
                cell === 1
                  ? "var(--ink)"
                  : cell === 2
                    ? "var(--accent)"
                    : beatColor
              }
            />
          ),
        ),
      )}
    </svg>
  );
}
