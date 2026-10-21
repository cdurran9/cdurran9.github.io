import { PROFILE } from '../../profile';
import { INVENTORY } from '../inventory/inventoryData';
import { careerStats, SKILL_GROUPS } from '../skills/skillsData';
import { EXPERIENCE } from './helpData';
import './HelpPage.css';

const YEARS = careerStats(new Date()).level;
const PROJECTS = INVENTORY.find((tab) => tab.id === 'personal')?.items ?? [];

/** Help: the same information as the rest of the site, without the game UI. */
export const HelpPage = () => {
  return (
    <div className="help-page">
      <article className="help-sheet">
        <header className="help-header">
          <h1 className="help-name">{PROFILE.name}</h1>
          <p className="help-role">
            {PROFILE.title} · {PROFILE.location}
          </p>
          <nav className="help-links" aria-label="Profiles">
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={PROFILE.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </nav>
        </header>

        <section className="help-section" aria-labelledby="help-summary">
          <h2 id="help-summary">Summary</h2>
          <p>
            Senior software engineer with {YEARS} years building production web
            apps. Full-stack and frontend-leaning: React and TypeScript day to day,
            with Java, Spring Boot and PostgreSQL from full-stack project ownership
            and on-call support. Open to full-stack or frontend roles, remote or
            hybrid.
          </p>
        </section>

        <section className="help-section" aria-labelledby="help-experience">
          <h2 id="help-experience">Experience</h2>
          {EXPERIENCE.map((role) => (
            <div className="help-role-block" key={role.company}>
              <div className="help-role-head">
                <h3>
                  {role.title} <span>· {role.company}</span>
                </h3>
                <p className="help-meta">
                  {role.dates} · {role.location}
                </p>
              </div>
              <ul>
                {role.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="help-section" aria-labelledby="help-skills">
          <h2 id="help-skills">Skills</h2>
          <dl className="help-skills">
            {SKILL_GROUPS.map((group) => (
              <div key={group.id}>
                <dt>{group.title}</dt>
                <dd>{group.skills.map((s) => s.name).join(', ')}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="help-section" aria-labelledby="help-projects">
          <h2 id="help-projects">Personal projects</h2>
          <ul className="help-projects">
            {PROJECTS.map((p) => (
              <li key={p.id}>
                {p.links?.[0] ? (
                  <a href={p.links[0].href} target="_blank" rel="noreferrer">
                    {p.name}
                  </a>
                ) : (
                  <strong>{p.name}</strong>
                )}{' '}
                · {p.tagline}
                {p.stack && <span className="help-meta"> ({p.stack.join(', ')})</span>}
              </li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  );
};
