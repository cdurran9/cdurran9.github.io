import { createContext, useContext, type RefObject } from 'react';
import { useLocation, useNavigate, type Location } from 'react-router';

export type WipePhase = 'idle' | 'in' | 'out';
export type WipeDirection = 'forward' | 'back';

type TransitionState = {
  /** The location currently on screen; lags the URL while the wipe covers the swap. */
  displayLocation: Location;
  phase: WipePhase;
  direction: WipeDirection;
  busy: RefObject<boolean>;
};

export const TransitionContext = createContext<TransitionState | null>(null);

export function useTransitionState() {
  const state = useContext(TransitionContext);
  if (!state) {
    throw new Error('useTransitionState must be used inside <TransitionProvider>');
  }
  return state;
}

/**
 * Navigation for menu buttons. Clicks during a transition are ignored, and so
 * is navigating to the page you're already on. The wipe itself is played by
 * <TransitionProvider> on any location change, so plain <Link>s and the back
 * button get it too.
 */
export function usePersonaNavigate() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { busy } = useTransitionState();

  return (to: string) => {
    if (busy.current || to === pathname) return;
    navigate(to);
  };
}
