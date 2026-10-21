import { useEffect, useRef } from 'react';
import { MenuDialog } from '../../components/MenuDialog/MenuDialog';
import { useTransitionState } from '../../persona/TransitionContext';
import { PROFILE } from '../../profile';

const TITLES: Record<string, string> = {
  '/request': 'FAQ',
  '/skills': 'Skills',
  '/inventory': 'Projects',
  '/help': 'Résumé',
};

/**
 * Names the tab after the page on screen, and after each page swap moves focus
 * to the new page's heading so keyboard and screen reader users land on it
 * instead of being left on the menu button.
 */
function usePageChange(main: React.RefObject<HTMLElement | null>) {
  const { displayLocation } = useTransitionState();
  const { pathname } = displayLocation;
  const firstPage = useRef(true);

  useEffect(() => {
    const page = TITLES[pathname];
    document.title = page
      ? `${page} · ${PROFILE.name}`
      : `${PROFILE.name} · ${PROFILE.title}`;

    // A fresh load already starts at the top of the page.
    if (firstPage.current) {
      firstPage.current = false;
      return;
    }
    const heading = main.current?.querySelector<HTMLElement>('h1');
    if (!heading) return;
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
  }, [pathname, main]);
}

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const main = useRef<HTMLElement>(null);
  usePageChange(main);

  return (
    <>
      <MenuDialog />
      <main ref={main} className="layout-main">
        {children}
      </main>
    </>
  );
};
