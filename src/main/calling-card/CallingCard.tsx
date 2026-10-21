import { PersonaLabel } from '../../components/PersonaButton/PersonaLabel';
import { PersonaLink } from '../../components/PersonaButton/PersonaLink';
import { PROFILE } from '../../profile';
import { careerStats } from '../skills/skillsData';
import './CallingCard.css';

const YEARS = careerStats(new Date()).level;

/** Home page: a calling card pinned to the wall with a dagger. */
export const CallingCard = () => {
  return (
    <div className="calling-page">
      <article className="calling-card" aria-labelledby="calling-card-name">
        <div className="calling-card__face">
          <p className="calling-card__kicker">Calling Card</p>

          <h1 className="calling-card__name" id="calling-card-name">
            <PersonaLabel text={PROFILE.name} />
          </h1>

          <p className="calling-card__title">{PROFILE.title}</p>

          <ul className="calling-card__details">
            <li>{YEARS} years shipping production web apps</li>
            <li>
              Full-stack, frontend-leaning: React &amp; TypeScript up front, Java,
              Spring Boot &amp; PostgreSQL behind it
            </li>
            <li>Leads frontend standards, AI practices &amp; training</li>
            <li>{PROFILE.location} · makes games in Godot on the side</li>
          </ul>

          <nav className="calling-card__links" aria-label="Socials">
            <PersonaLink href={PROFILE.linkedin} className="p-btn--small">
              LinkedIn
            </PersonaLink>
            <PersonaLink href={PROFILE.github} className="p-btn--small">
              GitHub
            </PersonaLink>
          </nav>
        </div>

        <img
          className="calling-card__dagger"
          src={`${import.meta.env.BASE_URL}dagger.png`}
          alt=""
          width={1223}
          height={1010}
        />
      </article>
    </div>
  );
};
