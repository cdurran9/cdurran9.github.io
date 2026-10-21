import type { CSSProperties } from 'react';
import {
  careerStats,
  MAX_LEVEL,
  SKILL_GROUPS,
  topLevel,
} from './skillsData';
import { PROFILE } from '../../profile';
import './SkillsPage.css';

// Computed once per page load; levels only tick over on anniversaries.
const CAREER = careerStats(new Date());


/** Zero-padded number with the padding dimmed, like the game's "078". */
function Num({ value, digits = 2 }: { value: number; digits?: number }) {
  const text = String(value);
  const pad = '0'.repeat(Math.max(0, digits - text.length));
  return (
    <span className="stat-num">
      {pad && <span className="stat-num__pad">{pad}</span>}
      {text}
    </span>
  );
}

function LevelBar({ level }: { level: number }) {
  return (
    <span
      className="stat-bar"
      role="meter"
      aria-label={`Level ${level} of ${MAX_LEVEL}`}
      aria-valuemin={0}
      aria-valuemax={MAX_LEVEL}
      aria-valuenow={level}
    >
      {Array.from({ length: MAX_LEVEL }, (_, i) => (
        <span
          key={i}
          className={`stat-bar__pip${i < level ? ' is-filled' : ''}`}
          style={{ '--p': i } as CSSProperties}
        />
      ))}
    </span>
  );
}

export const SkillsPage = () => {
  return (
    <div className="stats-screen">
      <h1 className="stats-id stats-panel stats-panel--paper">
        <span className="stats-id__name">{PROFILE.name}</span>
      </h1>

      <div className="stats-level stats-panel stats-panel--paper">
        <span className="stats-level__row">
          <span className="stats-level__lv">LV</span>
          <span className="stats-level__value">{CAREER.level}</span>
          <span className="stats-level__next">Next level</span>
          <Num value={CAREER.nextLevelDays} digits={4} />
          <span className="stats-level__unit">days</span>
        </span>
        <span className="stats-level__title">{PROFILE.title}</span>
      </div>

      <div className="stats-gauges stats-panel stats-panel--ink">
        <span className="stats-gauge stats-gauge--fe">
          <span className="stats-gauge__key">FE</span>
          {topLevel('frontend')}
        </span>
        <span className="stats-gauge stats-gauge--be">
          <span className="stats-gauge__key">BE</span>
          {topLevel('backend')}
        </span>
      </div>


      {SKILL_GROUPS.map((group, gi) => (
        <section
          key={group.id}
          className={`stat-box stats-panel stats-panel--ink stat-box--${group.id}`}
          style={{ '--g': gi } as CSSProperties}
          aria-labelledby={`stat-box-${group.id}`}
        >
          <h2 className="stat-box__title" id={`stat-box-${group.id}`}>
            {group.title}
            {group.tag && <span className="stat-box__tag">{group.tag}</span>}
          </h2>
          <ul className="stat-box__rows">
            {group.skills.map((skill, i) => (
              <li
                key={skill.name}
                className="stat-row"
                style={{ '--i': i } as CSSProperties}
              >
                <span className="stat-row__name">{skill.name}</span>
                <span className="stat-row__dot" aria-hidden="true">
                  •
                </span>
                <span className="stat-row__lv">
                  <span className="stat-row__lv-key">LV</span>
                  <Num value={skill.level} />
                </span>
                <LevelBar level={skill.level} />
              </li>
            ))}
          </ul>
        </section>
      ))}

    </div>
  );
};
