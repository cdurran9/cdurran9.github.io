import type { MouseEvent } from 'react';
import { useHref } from 'react-router';
import { usePersonaNavigate } from '../../persona/TransitionContext';
import { preloadScene } from '../../scenes';
import { PersonaLabel } from './PersonaLabel';
import './PersonaButton.css';

type PersonaButtonProps = {
  to: string;
  children: string;
  /** Called on a plain click, before navigating (e.g. to close a menu). */
  onSelect?: () => void;
};

/** Menu button: a real link (keeps href) that navigates through the wipe. */
export function PersonaButton({ to, children, onSelect }: PersonaButtonProps) {
  const href = useHref(to);
  const personaNavigate = usePersonaNavigate();

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // Let modified clicks open a new tab/window as usual.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    onSelect?.();
    personaNavigate(to);
  };

  // Warm the next scene's chunk while the user is still deciding.
  const warm = () => void preloadScene(to);

  return (
    <a
      className="p-btn"
      href={href}
      onClick={onClick}
      onPointerEnter={warm}
      onFocus={warm}
    >
      <PersonaLabel text={children} />
    </a>
  );
}
