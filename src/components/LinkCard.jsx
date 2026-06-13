import { useState, useRef, useCallback, useEffect } from 'react';
import { ExternalIcon } from './Icons';
import './LinkCard.css';

export default function LinkCard({ link, accentColor }) {
  const [expanded, setExpanded] = useState(false);
  const [long, setLong] = useState(false);
  const cardRef = useRef(null);
  const overlayRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    if (descRef.current) {
      setLong(descRef.current.scrollHeight > descRef.current.clientHeight);
    }
  }, []);

  const onMouseMove = useCallback((e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const overlay = overlayRef.current;
    overlay.style.setProperty('--x', `${x}px`);
    overlay.style.setProperty('--y', `${y}px`);
    overlay.style.setProperty('--opacity', '1');
  }, []);

  const onMouseLeave = useCallback(() => {
    overlayRef.current.style.setProperty('--opacity', '0');
  }, []);

  function onExpand(e) {
    e.preventDefault();
    e.stopPropagation();
    setExpanded(prev => !prev);
  }

  return (
    <a
      ref={cardRef}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`link-card ${link.top ? 'link-card--top' : ''}`}
      style={{ '--accent': accentColor }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="link-card-base">
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
          <p ref={descRef} className={`link-desc ${expanded ? 'link-desc--expanded' : ''}`}>
            {link.description}
          </p>
        </div>

        {long && (
          <button className="link-card-expand" onClick={onExpand} type="button">
            {expanded ? 'Réduire' : 'Lire plus'}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`link-expand-arrow ${expanded ? 'link-expand-arrow--up' : ''}`}>
              <polyline points="6,9 12,15 18,9" />
            </svg>
          </button>
        )}
      </div>

      <div ref={overlayRef} className="link-card-overlay" aria-hidden="true">
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
          <p className={`link-desc ${expanded ? 'link-desc--expanded' : ''}`}>
            {link.description}
          </p>
        </div>

        {long && (
          <button className="link-card-expand" onClick={onExpand} type="button">
            {expanded ? 'Réduire' : 'Lire plus'}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`link-expand-arrow ${expanded ? 'link-expand-arrow--up' : ''}`}>
              <polyline points="6,9 12,15 18,9" />
            </svg>
          </button>
        )}
      </div>
    </a>
  );
}
