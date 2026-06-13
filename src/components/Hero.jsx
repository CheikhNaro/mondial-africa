import './Hero.css';

export default function Hero({ totalLinks }) {
  return (
    <div className="hero">
      <div className="hero-bg">
        <div className="hero-orb hero-orb--1" />
        <div className="hero-orb hero-orb--2" />
      </div>

      <div className="hero-content">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Portail Streaming Premium
        </div>

        <h1 className="hero-title">
          Ton univers<br />
          <span className="hero-title-accent">illimité</span> t'attend
        </h1>

        <p className="hero-subtitle">
          Films, séries, sport et TV en direct — tout ce dont tu as besoin,
          classé et prêt à l'emploi. Zéro inscription.
        </p>

        <div className="hero-stats">
          <div className="hero-stat">
            <span className="stat-value">{totalLinks}+</span>
            <span className="stat-label">Sites</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="stat-value">6</span>
            <span className="stat-label">Catégories</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="stat-value">100%</span>
            <span className="stat-label">Gratuit</span>
          </div>
        </div>

        <a href="#live-tv" className="hero-cta">
          Explorer le catalogue
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="hero-cta-arrow">
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19,12 12,19 5,12" />
          </svg>
        </a>
      </div>
    </div>
  );
}