import type { CSSProperties } from 'react';
import { hash, seedOf } from './personaSeed';

const VARIANTS = ['ink', 'paper', 'red', 'ink', 'bare', 'paper'] as const;

/** Words with their character offset, so each letter keeps its seeded look. */
const words = (text: string) => {
  let start = 0;
  return text.split(' ').map((word) => {
    const entry = { word, start };
    start += word.length + 1;
    return entry;
  });
};

/**
 * Ransom-note label: each letter gets its own tilt (--r), vertical offset
 * (--y), size (--s) and colour treatment. Screen readers get the plain text.
 */
export function PersonaLabel({ text }: { text: string }) {
  const seed = seedOf(text);

  return (
    <span className="p-label">
      <span className="p-label__sr">{text}</span>
      <span className="p-label__letters" aria-hidden="true">
        {words(text).map(({ word, start }) => (
          // Each word stays on one line; wrapping only happens between words.
          <span key={start} className="p-word">
            {[...word].map((ch, j) => {
              const i = start + j;
              const r = hash(seed + i);
              const style = {
                '--r': `${((r - 0.5) * 22).toFixed(1)}deg`,
                '--y': `${((hash(seed + i + 0.5) - 0.5) * 0.18).toFixed(3)}em`,
                '--s': (0.86 + hash(seed - i) * 0.3).toFixed(2),
              } as CSSProperties;
              const variant = i === 0 ? 'red' : VARIANTS[Math.floor(r * VARIANTS.length)];
              return (
                <span key={i} className={`p-letter p-letter--${variant}`} style={style}>
                  {ch}
                </span>
              );
            })}
          </span>
        ))}
      </span>
    </span>
  );
}
