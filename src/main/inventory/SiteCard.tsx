import type { CSSProperties } from 'react';
import { hash } from '../../components/PersonaButton/personaSeed';
import './SiteCard.css';

const TEXT = 'Make Your App';

// Ransom-note mix: alternate case, and a few letters cut out as white boxes
// or set in the condensed italic face.
const STYLES = ['ink', 'ink', 'box', 'ink', 'thin', 'ink'] as const;

/**
 * Drawn "screenshot" for this site's inventory entry: a calling-card flag with
 * concentric rings, a code emblem and "Make Your App" in ransom lettering.
 */
export function SiteCard() {
  return (
    <div className="site-card" role="img" aria-label={`Calling card reading "${TEXT}"`}>
      <span className="site-card__emblem" aria-hidden="true">
        &lt;/&gt;
      </span>
      <span className="site-card__text" aria-hidden="true">
        {[...TEXT].map((ch, i) => {
          if (ch === ' ') return <span key={i} className="site-card__gap" />;
          const r = hash(i * 5.3 + 11);
          const style = {
            '--r': `${((r - 0.5) * 16).toFixed(1)}deg`,
            '--y': `${((hash(i * 2.9 + 3) - 0.5) * 0.14).toFixed(3)}em`,
          } as CSSProperties;
          const variant = STYLES[Math.floor(r * STYLES.length)];
          const letter = i % 3 === 1 ? ch.toLowerCase() : ch.toUpperCase();
          return (
            <span key={i} className={`site-card__l site-card__l--${variant}`} style={style}>
              {letter}
            </span>
          );
        })}
      </span>
    </div>
  );
}
