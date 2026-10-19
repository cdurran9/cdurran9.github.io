import { useRef, useState, type MouseEvent } from 'react';
import { PersonaButton } from '../PersonaButton/PersonaButton';
import { PersonaLabel } from '../PersonaButton/PersonaLabel';
import './MenuDialog.css';

const ITEMS = [
  { to: '/stats', label: 'Stats' },
  { to: '/skills', label: 'Skills' },
  { to: '/inventory', label: 'Inventory' },
];

/**
 * Top-corner toggle plus a borderless modal menu. Uses a native <dialog> for
 * the focus trap, Esc to close and the ::backdrop shim. Choosing an item
 * closes the menu first. A modal dialog sits in the top layer above the wipe,
 * so it has to be gone before the wipe plays.
 */
export function MenuDialog() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const close = () => dialog.current?.close();

  // The dialog box fills the screen, so a click that lands on the dialog
  // itself (not the nav or its buttons) is a click on the shim.
  const onDialogClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) close();
  };

  return (
    <>
      <button
        type="button"
        className="p-btn p-btn--small menu-toggle"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
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
        <nav className="menu menu-dialog__nav">
          {ITEMS.map((item) => (
            <PersonaButton key={item.to} to={item.to} onSelect={close}>
              {item.label}
            </PersonaButton>
          ))}
        </nav>
      </dialog>
    </>
  );
}
