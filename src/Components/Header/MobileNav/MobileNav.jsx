import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import close from 'uswds/dist/img/close.svg'; // close X icon
import InteractiveElement from '../../InteractiveElement';

const MobileNav = ({ user, logout, showLogin }) => (
  <nav className="usa-nav">
    <div className="usa-nav-inner">
      <button className="usa-nav-close">
        <img src={close} alt="close" />
      </button>
      <div className="usa-nav-secondary mobile-nav">
        <ul className="usa-unstyled-list usa-nav-secondary-links mobile-nav-only">
          <li className="mobile-nav-only">
            { user && user.length ? `Signed in as ${user}` : null }
          </li>
          <hr className="mobile-nav-only" />
          <li>
            <Link to="/results"><FontAwesome name="search" /> Search</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a href="https://github.com/18F/State-TalentMAP">About</a>
          </li>
          <span className="usa-unstyled-list mobile-nav-only">
            <hr />
            <li>
              <Link to="/profile/dashboard/">Profile</Link>
            </li>
            <li>
              {
                showLogin ?
                  <Link to="login" id="login-mobile">Login</Link>
                :
                  <InteractiveElement type="a" id="logout-mobile" onClick={logout}>Logout</InteractiveElement>
              }
            </li>
          </span>
        </ul>
      </div>
    </div>
  </nav>
);

MobileNav.propTypes = {
  user: PropTypes.string,
  logout: PropTypes.func.isRequired,
  showLogin: PropTypes.bool.isRequired,
};

MobileNav.defaultProps = {
  user: '',
};

export default MobileNav;
