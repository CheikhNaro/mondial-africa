import { useState, useEffect } from 'react';
import './AdBlockerModal.css';

function detectEnv() {
  const ua = navigator.userAgent || '';
  const isIos = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);
  const isBrave = 'brave' in navigator;
  const isFirefox = /Firefox\//i.test(ua) && !/Seamonkey/i.test(ua);
  const isEdge = /Edg\//i.test(ua);
  const isChrome = /Chrome\//i.test(ua) && !isEdge && !isBrave;

  let browser = 'other';
  if (isBrave) browser = 'brave';
  else if (isFirefox) browser = 'firefox';
  else if (isEdge) browser = 'edge';
  else if (isChrome) browser = 'chrome';

  let device = 'desktop';
  if (isIos) device = 'ios';
  else if (isAndroid) device = 'android';

  return { device, browser };
}

const uBlockLinks = {
  chrome: {
    url: 'https://chromewebstore.google.com/detail/ublock-origin-lite/ddkjiahejlhfcafbddmgiahcphecmpfh',
    label: 'Installer uBlock Origin sur Chrome →',
  },
  edge: {
    url: 'https://microsoftedge.microsoft.com/addons/detail/ublock-origin/odfafepnkmbhccpbejgmiehpchacaeak',
    label: 'Installer uBlock Origin sur Edge →',
  },
  firefox: {
    url: 'https://addons.mozilla.org/fr/firefox/addon/ublock-origin/',
    label: 'Installer uBlock Origin sur Firefox →',
  },
};

const braveLinks = [
  {
    key: 'desktop',
    url: 'https://brave.com/fr/download/',
    icon: '💻',
    label: 'PC / Mac',
  },
  {
    key: 'android',
    url: 'https://play.google.com/store/apps/details?id=com.brave.browser&hl=fr',
    icon: '🤖',
    label: 'Android',
  },
  {
    key: 'ios',
    url: 'https://apps.apple.com/fr/app/brave-private-web-browser/id1052879175',
    icon: '🍎',
    label: 'iPhone',
  },
];

export default function AdBlockerModal() {
  const [visible, setVisible] = useState(false);
  const { device, browser } = detectEnv();
  const alreadyProtected = browser === 'brave';
  const ublock = uBlockLinks[browser];
  const showUblockSection = !alreadyProtected && !!ublock;
  const showIosNote = !alreadyProtected && device === 'ios' && !ublock;

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  function handleDismiss() {
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="modal-overlay" onClick={handleDismiss}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-kente-top" />

        <div className="modal-header">
          <span className="modal-device-icon">{alreadyProtected ? '🦁' : '🛡️'}</span>
          <div>
            <h2 className="modal-title">
              {alreadyProtected ? 'Déjà protégé !' : 'Bloque les pubs d\'abord'}
            </h2>
            <p className="modal-subtitle">
              {alreadyProtected
                ? 'Brave Browser bloque tout automatiquement.'
                : 'Indispensable pour profiter du streaming sans coupure'}
            </p>
          </div>
        </div>

        {alreadyProtected && (
          <div className="modal-shield modal-shield--success">
            <div className="shield-icon">✅</div>
            <p className="modal-description">
              Brave bloque automatiquement toutes les pubs et trackers. Tu peux profiter du streaming sans aucune interruption.
            </p>
          </div>
        )}

        {/* uBlock : 1 clic pour activer sur le navigateur actuel */}
        {showUblockSection && (
          <div className="modal-section">
            <div className="modal-section-label">
              <span className="section-badge section-badge--red">⚡ 1 CLIC</span>
              <span>Active uBlock Origin sur ton navigateur</span>
            </div>
            <a
              href={ublock.url}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-btn-ublock"
            >
              {ublock.label}
            </a>
          </div>
        )}

        {/* iOS : uBlock non disponible sur Safari */}
        {showIosNote && (
          <div className="modal-shield">
            <div className="shield-icon">ℹ️</div>
            <p className="modal-description">
              uBlock Origin n&apos;est pas disponible sur Safari iOS. La meilleure option est <strong>Brave Browser</strong> ci-dessous — il bloque tout nativement.
            </p>
          </div>
        )}

        {/* Séparateur si les deux sections sont visibles */}
        {showUblockSection && (
          <div className="modal-divider"><span>ou mieux encore, passe sur Brave</span></div>
        )}

        {/* Brave : 3 plateformes, device actuel mis en valeur */}
        {!alreadyProtected && (
          <div className="modal-section">
            <div className="modal-section-label">
              <span className="section-badge section-badge--orange">🦁 RECOMMANDÉ</span>
              <span>Brave Browser — zéro pub, zéro configuration</span>
            </div>
            <div className="modal-brave-grid">
              {braveLinks.map(link => (
                <a
                  key={link.key}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`modal-brave-btn${device === link.key ? ' modal-brave-btn--active' : ''}`}
                >
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="modal-actions">
          <button className="modal-btn-secondary" onClick={handleDismiss}>
            {alreadyProtected ? 'Parfait, continuer →' : 'J\'ai déjà un bloqueur, continuer'}
          </button>
        </div>

        <div className="modal-kente-bottom" />
      </div>
    </div>
  );
}
