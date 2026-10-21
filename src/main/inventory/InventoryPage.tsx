import { useState, type CSSProperties, type KeyboardEvent } from 'react';
import { prefersReducedMotion } from '../../persona/timing';
import {
  INVENTORY,
  type InventoryItem,
  type InventoryTab,
} from './inventoryData';
import { SiteCard } from './SiteCard';
import './InventoryPage.css';

function ItemDetails({ item }: { item: InventoryItem }) {
  return (
    <article className="inv-detail__body">
      <h2 className="inv-detail__name">{item.name}</h2>
      <p className="inv-detail__tagline">{item.tagline}</p>

      {item.image && (
        <figure className="inv-detail__shot">
          <img
            src={item.image.src}
            alt={item.image.alt}
            width={item.image.width}
            height={item.image.height}
            loading="lazy"
          />
        </figure>
      )}

      {item.art === 'site-card' && (
        <figure className="inv-detail__shot">
          <SiteCard />
        </figure>
      )}

      <p className="inv-detail__text">{item.description}</p>

      {item.highlights && (
        <ul className="inv-detail__highlights">
          {item.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      )}

      {item.stack && (
        <ul className="inv-detail__stack" aria-label="Built with">
          {item.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      )}

      {item.links && (
        <p className="inv-detail__links">
          {item.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              {link.label} ↗
            </a>
          ))}
        </p>
      )}
    </article>
  );
}

// Matches the breakpoint in InventoryPage.css where details stack under the list.
const STACKED = '(max-width: 760px)';

export const InventoryPage = () => {
  const [tabId, setTabId] = useState<InventoryTab['id']>('professional');
  // Remember the open item per tab so switching tabs doesn't lose your place.
  const [selected, setSelected] = useState<Record<InventoryTab['id'], string>>({
    professional: INVENTORY[0].items[0].id,
    personal: INVENTORY[1].items[0].id,
  });

  const tab = INVENTORY.find((t) => t.id === tabId) ?? INVENTORY[0];
  const item = tab.items.find((i) => i.id === selected[tab.id]) ?? tab.items[0];

  const openItem = (id: string) => {
    setSelected((s) => ({ ...s, [tab.id]: id }));
    // When the details sit below the list, bring them into view so the tap
    // visibly does something.
    if (window.matchMedia(STACKED).matches) {
      document.getElementById('inv-detail')?.scrollIntoView({
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  };

  // Arrow keys move between the two tabs, per the ARIA tabs pattern.
  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    const i = INVENTORY.findIndex((t) => t.id === tabId);
    const next =
      INVENTORY[
        (i + (event.key === 'ArrowRight' ? 1 : -1) + INVENTORY.length) %
          INVENTORY.length
      ];
    setTabId(next.id);
    document.getElementById(`inv-tab-${next.id}`)?.focus();
  };

  return (
    <div className="inv-screen">
      <h1 className="inv-sr">Inventory</h1>

      <div className="inv-tabs" role="tablist" aria-label="Project type">
        {INVENTORY.map((t) => (
          <button
            key={t.id}
            id={`inv-tab-${t.id}`}
            type="button"
            role="tab"
            className="inv-tab"
            aria-selected={t.id === tabId}
            aria-controls="inv-panel"
            tabIndex={t.id === tabId ? 0 : -1}
            onClick={() => setTabId(t.id)}
            onKeyDown={onTabKey}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div
        className="inv-box"
        id="inv-panel"
        role="tabpanel"
        aria-labelledby={`inv-tab-${tab.id}`}
      >
        <div className="inv-items">
          {tab.caption && <p className="inv-caption">{tab.caption}</p>}
          <ul className="inv-list" key={tab.id}>
            {tab.items.map((i, index) => (
              <li key={i.id} style={{ '--i': index } as CSSProperties}>
                <button
                  type="button"
                  className="inv-row"
                  aria-current={i.id === item.id}
                  aria-controls="inv-detail"
                  onClick={() => openItem(i.id)}
                >
                  <span className="inv-row__name">{i.name}</span>
                  <span className="inv-row__tag">{i.tag}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <section className="inv-detail" id="inv-detail">
          {/* Re-keyed so each newly opened item pops in. */}
          <ItemDetails key={item.id} item={item} />
        </section>
      </div>
    </div>
  );
};
