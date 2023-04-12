/* eslint-disable */
import { Link } from 'react-router-dom';
import { getAssetPath } from 'utilities';

const hrFooterLogo = getAssetPath('/assets/logos/png/hr-logo-white-sm.png');
const tmFooterLogo = getAssetPath('/assets/logos/png/horizontal_white_thin-sm.png');

const version = process.env.VERSION;
/* eslint-enable */

const Footer = () => (
  <footer className="usa-footer usa-footer-medium tm-footer" role="contentinfo">
    <div className="usa-footer-primary-section tm-footer-nav">
      <div className="usa-grid-full">
        <div className="usa-width-one-half">
          <nav className="usa-footer-nav">
            <ul className="usa-unstyled-list">
              <li className="usa-width-one-sixth usa-footer-primary-content">
                <Link className="usa-footer-primary-link" to="/">Home</Link>
              </li>
              <li className="usa-width-one-sixth usa-footer-primary-content">
                <Link className="usa-footer-primary-link tutorial-help-link" to="/help">Help</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="usa-width-one-half">
          <div className="questions-container">
            <span className="help-text">Need Help? Contact </span>
            <a href="mailto:GTMHelpDesk@state.gov">
              GTMHelpDesk@state.gov
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="usa-footer-secondary_section tm-footer-body">
      <div className="usa-grid-full tm-footer-body-inner-container padded-main-content">
        <div className="usa-footer-logo usa-width-one-half">
          <div className="usa-footer-logo-img-tm-container container--hr">
            <img
              className="usa-footer-logo-img logo-img-hr"
              src={hrFooterLogo}
              alt="Bureau of Human Resources logo"
            />
          </div>
          <div className="usa-footer-logo-img-tm-container container--logo">
            <img
              className="usa-footer-logo-img-tm logo-img-tm"
              src={tmFooterLogo}
              alt="TalentMAP logo"
            />
          </div>
        </div>
        <div className="usa-footer-contact-links usa-width-one-half tm-footer-body-contact">
          <div className="tm-footer-body-contact-item">
            To share your feedback with us, please contact <a href="mailto:TalentMAP@state.gov">TalentMAP@state.gov</a>
          </div>
          {
            !!version &&
              <div className="tm-footer-body-contact-item">
                {`Version ${version}`}
                <span className="commit-hash">{__COMMIT_HASH__}</span>
              </div>
          }
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
