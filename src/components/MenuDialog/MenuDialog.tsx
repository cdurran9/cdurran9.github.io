import { useRef, useState, type MouseEvent } from 'react';
import { useLocation } from 'react-router';
import { PersonaButton } from '../PersonaButton/PersonaButton';
import { PersonaLabel } from '../PersonaButton/PersonaLabel';
import { backdropVars } from '../PersonaButton/personaSeed';
import './MenuDialog.css';

// `heading` is the plain-English name shown big in the lower right.
const ITEMS = [
  {
    to: '/',
    label: 'Calling Card',
    heading: 'Contact',
    description: 'Who I am & how to reach me',
  },
  {
    to: '/request',
    label: 'Request',
    heading: 'FAQ',
    description: 'Ask me a question',
  },
  {
    to: '/skills',
    label: 'Skills',
    heading: 'Tech Stack',
    description: 'My tech stack skill levels',
  },
  {
    to: '/inventory',
    label: 'Inventory',
    heading: 'Projects',
    description: 'View my project portfolio',
  },
  {
    to: '/help',
    label: 'Help',
    heading: 'Résumé',
    description: 'My info, no frills',
  },
];

/**
 * Top-corner toggle plus a borderless modal menu. Uses a native <dialog> for
 * the focus trap, Esc to close and the ::backdrop shim. Items line up along a
 * diagonal slash, and the highlighted item's description shows in the lower
 * right. Choosing an item closes the menu first. A modal dialog sits in the
 * top layer above the wipe, so it has to be gone before the wipe plays.
 */
export function MenuDialog() {
  const dialog = useRef<HTMLDialogElement>(null);
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const close = () => dialog.current?.close();

  // The dialog box fills the screen, so any click that misses a menu button
  // counts as a click on the shim.
  const onDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (!(event.target as Element).closest('.p-btn')) close();
  };

  return (
    <>
      <button
        type="button"
        className="p-btn p-btn--small menu-toggle"
        style={backdropVars('Menu')}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          // Start with the description for the page you're on.
          setActive(
            Math.max(
              0,
              ITEMS.findIndex((item) => item.to === pathname),
            ),
          );
          dialog.current?.showModal();
          setOpen(true);
        }}
      >
        <PersonaLabel text="Menu" />
      </button>

      <dialog
        ref={dialog}
        className="menu-dialog"
        aria-label="Menu"
        onClick={onDialogClick}
        onClose={() => setOpen(false)}
      >
        <div className="menu-rail">
          <nav className="menu-dialog__nav">
            {ITEMS.map((item, i) => (
              <PersonaButton
                key={item.to}
                to={item.to}
                description={item.description}
                onSelect={close}
                onHighlight={() => setActive(i)}
              >
                {item.label}
              </PersonaButton>
            ))}
          </nav>
          <div className="menu-slash" aria-hidden="true" />
        </div>

        {/* Screen readers get each description inside its link instead. */}
        {/* Re-keyed so the heading and text re-pop whenever the item changes. */}
        <div className="menu-help" aria-hidden="true">
          <span key={`h${active}`} className="menu-help__heading">
            <PersonaLabel text={ITEMS[active].heading} />
          </span>
          <p key={`t${active}`} className="menu-help__text">
            {ITEMS[active].description}
          </p>
        </div>
      </dialog>
    </>
  );
}
