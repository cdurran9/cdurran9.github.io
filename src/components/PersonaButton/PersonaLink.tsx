import { PersonaLabel } from './PersonaLabel';
import { backdropVars } from './personaSeed';
import './PersonaButton.css';

type PersonaLinkProps = {
  href: string;
  children: string;
  className?: string;
};

/** PersonaButton look for links that leave the app (socials, mailto:). */
export function PersonaLink({ href, children, className = '' }: PersonaLinkProps) {
  const external = /^https?:/.test(href);
  return (
    <a
      className={`p-btn ${className}`}
      href={href}
      style={backdropVars(children)}
      {...(external && { target: '_blank', rel: 'noreferrer' })}
    >
      <PersonaLabel text={children} />
    </a>
  );
}
