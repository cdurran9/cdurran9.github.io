import { startTransition, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigationType } from 'react-router';
import { preloadScene } from '../scenes';
import {
  TransitionContext,
  type WipeDirection,
  type WipePhase,
} from './TransitionContext';
import {
  prefersReducedMotion,
  REDUCED_TIMING,
  TIMING,
  wait,
} from './timing';

/**
 * The choreographer. The router decides where we're going (the URL); this
 * decides how we get there: preload → wipe in → swap the displayed route under
 * cover → hold → wipe out.
 */
export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigationType = useNavigationType();

  // First render (deep link / refresh) shows the current route with no wipe.
  const [displayLocation, setDisplayLocation] = useState(location);
  const [phase, setPhase] = useState<WipePhase>('idle');
  const [direction, setDirection] = useState<WipeDirection>('forward');

  const busy = useRef(false);
  const shownKey = useRef(location.key);
  const shownPath = useRef(location.pathname);
  const latest = useRef({ location, navigationType });

  useEffect(() => {
    latest.current = { location, navigationType };
    // A running sequence picks up the newest location when it swaps or loops.
    if (busy.current || location.key === shownKey.current) return;

    const run = async () => {
      busy.current = true;
      try {
        while (latest.current.location.key !== shownKey.current) {
          const { location: target, navigationType: type } = latest.current;
          const timing = prefersReducedMotion() ? REDUCED_TIMING : TIMING;

          // Same scene (e.g. a search/hash change): swap without a wipe.
          if (target.pathname === shownPath.current) {
            shownKey.current = target.key;
            setDisplayLocation(target);
            continue;
          }

          await preloadScene(target.pathname);

          setDirection(type === 'POP' ? 'back' : 'forward');
          setPhase('in');
          await wait(timing.cover);

          // Swap to whatever is newest now, so a back press mid-cover
          // fast-forwards instead of queueing another full wipe.
          const next = latest.current.location;
          if (next.pathname !== target.pathname) {
            await preloadScene(next.pathname);
          }
          shownKey.current = next.key;
          shownPath.current = next.pathname;
          startTransition(() => setDisplayLocation(next));
          await wait(timing.hold);

          setPhase('out');
          await wait(timing.reveal);
          setPhase('idle');
        }
      } finally {
        setPhase('idle');
        busy.current = false;
      }
    };
    void run();
  }, [location, navigationType]);

  return (
    <TransitionContext value={{ displayLocation, phase, direction, busy }}>
      {children}
    </TransitionContext>
  );
}
