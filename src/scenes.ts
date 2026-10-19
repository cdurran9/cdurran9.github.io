// Lazy routes made with lazyWithPreload ('./persona/lazyWithPreload') can
// register `preload: Page.preload` here so the wipe never uncovers a loading state.
export type Scene = {
  /** Lazy route chunk to load before the wipe uncovers the scene. */
  preload?: () => Promise<unknown>;
  /** Images to fetch + decode before the reveal. */
  images?: string[];
};

export const SCENES: Record<string, Scene> = {};

export const sceneFor = (pathname: string): Scene => SCENES[pathname] ?? {};

const PRELOAD_TIMEOUT = 2000;

/** Resolves once the scene's chunk and images are ready (or after a timeout). */
export function preloadScene(pathname: string): Promise<void> {
  const scene = sceneFor(pathname);
  const images = (scene.images ?? []).map((src) => {
    const img = new Image();
    img.src = src;
    return img.decode().catch(() => undefined);
  });
  const ready = Promise.all([scene.preload?.(), ...images]).then(
    () => undefined,
    () => undefined,
  );
  const timeout = new Promise<void>((resolve) =>
    setTimeout(resolve, PRELOAD_TIMEOUT),
  );
  return Promise.race([ready, timeout]);
}
