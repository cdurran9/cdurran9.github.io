import type { CSSProperties } from 'react';
import { useTransitionState } from './TransitionContext';
import { TIMING, REDUCED_TIMING } from './timing';
import './Wipe.css';

const SHARDS = ['red', 'white', 'black'] as const;

/** Persistent full-screen overlay; data-state drives the sweep animations. */
export function Wipe() {
  const { phase, direction } = useTransitionState();

  const style = {
    '--wipe-cover': `${TIMING.cover}ms`,
    '--wipe-reveal': `${TIMING.reveal}ms`,
    '--fade-cover': `${REDUCED_TIMING.cover}ms`,
    '--fade-reveal': `${REDUCED_TIMING.reveal}ms`,
  } as CSSProperties;

  return (
    <div
      className="wipe"
      data-state={phase}
      data-dir={direction}
      style={style}
      aria-hidden="true"
    >
      {SHARDS.map((color, i) => (
        <div
          key={color}
          className={`wipe__shard wipe__shard--${color}`}
          style={{ '--i': i, '--j': SHARDS.length - 1 - i } as CSSProperties}
        />
      ))}
      <div className="wipe__fade" />
    </div>
  );
}
