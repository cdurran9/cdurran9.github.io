import type { CSSProperties } from 'react';

// Stable pseudo-random in [0, 1) so a given label always looks the same.
export const hash = (n: number) => {
  const x = Math.sin(n * 91.345 + 47.853) * 43758.5453;
  return x - Math.floor(x);
};

export const seedOf = (text: string) =>
  [...text].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);

/**
 * Per-button backdrop layout: where each shard sits, how much it leans, and
 * its loop timing, all derived from the label so every button is unique but
 * identical on every render. Feeds the --bk-* / --rd-* / --cy-* custom
 * properties in PersonaButton.css.
 */
export function backdropVars(text: string): CSSProperties {
  // Offset well away from the letter streams PersonaLabel uses.
  const seed = seedOf(text) * 3.17 + 1000;
  let k = 0;
  const next = () => hash(seed + k++ * 13.7);
  const between = (min: number, max: number) => min + next() * (max - min);
  const em = (min: number, max: number) => `${between(min, max).toFixed(2)}em`;
  const pct = (min: number, max: number) => `${between(min, max).toFixed(0)}%`;
  const deg = (min: number, max: number) => `${between(min, max).toFixed(1)}deg`;
  const sec = (min: number, max: number) => between(min, max);

  // Red usually hangs off the top right; sometimes it moves to the top left.
  const redLeft = next() < 0.35;

  const bkDur = sec(2.1, 2.6);
  const rdDur = sec(1.5, 1.9);
  const cyDur = sec(2.6, 3.2);

  return {
    '--bk-inset': `${em(0.35, 0.7)} ${em(0.7, 1.8)} ${em(-0.35, -0.05)} ${em(-0.7, -0.25)}`,
    '--bk-skew': deg(-8, 8),
    '--bk-dur': `${bkDur.toFixed(2)}s`,
    '--bk-delay': `${(-next() * bkDur).toFixed(2)}s`,

    '--rd-inset': redLeft
      ? `${em(-0.35, -0.05)} ${pct(40, 62)} ${em(0.5, 0.95)} ${em(-0.75, -0.25)}`
      : `${em(-0.35, -0.05)} ${em(-0.8, -0.2)} ${em(0.5, 0.95)} ${pct(20, 55)}`,
    '--rd-skew': deg(-12, 12),
    '--rd-dur': `${rdDur.toFixed(2)}s`,
    '--rd-delay': `${(-next() * rdDur).toFixed(2)}s`,

    '--cy-inset': `${pct(40, 62)} ${em(-1.2, -0.6)} ${em(-0.55, -0.25)} ${pct(35, 60)}`,
    '--cy-skew': deg(-10, 10),
    '--cy-dur': `${cyDur.toFixed(2)}s`,
    '--cy-delay': `${(-next() * cyDur).toFixed(2)}s`,
  } as CSSProperties;
}
