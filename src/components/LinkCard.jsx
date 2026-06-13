import { ExternalIcon } from './Icons';
import './LinkCard.css';

export default function LinkCard({ link, accentColor }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`link-card ${link.top ? 'link-card--top' : ''}`}
      style={{ '--accent': accentColor }}
    >
      <div className="link-card-glow" style={{ background: `radial-gradient(ellipse at 50% 0%, ${accentColor}15 0%, transparent 70%)` }} />

      <div className="link-card-inner">
        <div className="link-card-top-row">
          <span className="link-badge" style={{ color: accentColor, background: `${accentColor}10` }}>
            {link.badge}
          </span>
          <span className="link-arrow">
            <ExternalIcon size={14} />
          </span>
        </div>

        <h3 className="link-name">{link.name}</h3>
        <p className="link-desc">{link.description}</p>

        <div className="link-url">
          {link.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
        </div>
      </div>
    </a>
  );
}