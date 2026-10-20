import { lazy, type ComponentType } from 'react';

// React.lazy that can be warmed up ahead of render, so the incoming scene is
// already loaded by the time the wipe uncovers it.
export function lazyWithPreload<T extends ComponentType<object>>(
  factory: () => Promise<{ default: T }>,
) {
  let promise: Promise<{ default: T }> | undefined;
  const load = () => (promise ??= factory());
  return Object.assign(lazy(load), { preload: load });
}
