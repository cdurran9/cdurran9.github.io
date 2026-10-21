import type { MouseEvent } from 'react';
import { useHref } from 'react-router';
import { usePersonaNavigate } from '../../persona/TransitionContext';
import { preloadScene } from '../../scenes';
import { PersonaLabel } from './PersonaLabel';
import { backdropVars } from './personaSeed';
import './PersonaButton.css';

type PersonaButtonProps = {
  to: string;
  children: string;
  /** Called on a plain click, before navigating (e.g. to close a menu). */
  onSelect?: () => void;
  /** Called when the button is hovered or focused. */
  onHighlight?: () => void;
  /** Extra context for screen readers, read after the label. */
  description?: string;
};

/** Menu button: a real link (keeps href) that navigates through the wipe. */
export function PersonaButton({
  to,
  children,
  onSelect,
  onHighlight,
  description,
}: PersonaButtonProps) {
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
  const warm = () => {
    onHighlight?.();
    void preloadScene(to);
  };

  return (
    <a
      className="p-btn"
      href={href}
      style={backdropVars(children)}
      onClick={onClick}
      onPointerEnter={warm}
      onFocus={warm}
    >
      <PersonaLabel text={children} />
      {description && <span className="p-label__sr">, {description}</span>}
    </a>
  );
}
