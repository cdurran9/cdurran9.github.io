import type { CSSProperties } from 'react';

const VARIANTS = ['ink', 'paper', 'red', 'ink', 'bare', 'paper'] as const;

// Stable pseudo-random in [0, 1) so letters keep their tilt across renders.
const hash = (n: number) => {
  const x = Math.sin(n * 91.345 + 47.853) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * Ransom-note label: each letter gets its own tilt (--r), vertical offset
 * (--y), size (--s) and colour treatment. Screen readers get the plain text.
 */
export function PersonaLabel({ text }: { text: string }) {
  const seed = [...text].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);

  return (
    <span className="p-label">
      <span className="p-label__sr">{text}</span>
      <span className="p-label__letters" aria-hidden="true">
        {[...text].map((ch, i) => {
          if (ch === ' ') return <span key={i} className="p-letter-gap" />;
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
    </span>
  );
}
