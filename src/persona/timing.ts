// Cover → swap → reveal (~1.85s total).
export const TIMING = {
  cover: 700,
  hold: 450,
  reveal: 700,
} as const;

// prefers-reduced-motion: a quick crossfade instead of the wipe.
export const REDUCED_TIMING = {
  cover: 150,
  hold: 50,
  reveal: 150,
} as const;

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));
