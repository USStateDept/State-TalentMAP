import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logos/png/horizontal_color.png';

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
                <a className="usa-footer-primary-link" href="https://github.com/18F/State-TalentMAP">About</a>
              </li>
              <li className="usa-width-one-sixth usa-footer-primary-content">
                <a className="usa-footer-primary-link" href="https://github.com/18F/State-TalentMAP/issues">Feedback</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="usa-width-one-half">
          <div className="questions-container">
            <span className="help-text">Need Help? Contact</span> | TeamTalentMapOutreach@Dos.gov
          </div>
        </div>
      </div>
    </div>
    <div className="usa-footer-secondary_section tm-footer-body">
      <div className="usa-grid-full tm-footer-body-inner-container">
        <div className="usa-footer-logo usa-width-one-half">
          <img
            className="usa-footer-logo-img logo-img-seal"
            src="/assets/img/rsz_dos-seal.png"
            alt="DOS Seal"
          />
          <div className="usa-footer-logo-img-tm-container">
            <img
              className="usa-footer-logo-img-tm logo-img-tm"
              src={logo}
              alt="TalentMAP logo"
            />
          </div>
        </div>
        <div className="usa-footer-contact-links usa-width-one-half tm-footer-body-contact">
          <div className="tm-footer-body-contact-item">
            To share your feedback with us, open an issue or pull request on our <a href="https://github.com/18F/State-TalentMAP">Github Repository</a>
          </div>
          <div className="tm-footer-body-contact-item">
            This project is a beta for Department of State
          </div>
        </div>
      </div>
    </div>
  </footer>
  );

export default Footer;
