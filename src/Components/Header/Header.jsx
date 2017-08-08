import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginRequest, logoutRequest } from '../../login/actions';
import AccountDropdown from '../AccountDropdown/AccountDropdown';
import flag from '../../../node_modules/uswds/dist/img/favicons/favicon-57.png'; // usa flag
import iconDotGov from '../../../node_modules/uswds/dist/img/icon-dot-gov.svg'; // government building
import iconHttps from '../../../node_modules/uswds/dist/img/icon-https.svg'; // pad lock
import close from '../../../node_modules/uswds/dist/img/close.svg'; // close X icon

export class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loopActive: false,
      shuffleActive: false,
    };
  }

  render() {
    const {
      login: {
        requesting,
      },
    } = this.props;

    let showLogin = (<Link to="login">Login</Link>);
    if (this.props.client.token && !requesting) {
      showLogin = (<AccountDropdown />);
    }

    return (
      <header className="usa-header usa-header-extended tm-header" role="banner">
        <div className="usa-banner">
          <div className="usa-accordion">
            <header className="usa-banner-header">
              <div className="usa-grid usa-banner-inner">
                <img src={flag} alt="U.S. flag" />
                <p>An official website of the United States government</p>
                <button
                  className="usa-accordion-button usa-banner-button"
                  aria-expanded="false"
                  aria-controls="gov-banner"
                >
                  <span className="usa-banner-button-text">Here&#39;s how you know</span>
                </button>
              </div>
            </header>
            <div
              className="usa-banner-content usa-grid usa-accordion-content"
              id="gov-banner"
              aria-hidden="true"
            >
              <div className="usa-banner-guidance-gov usa-width-one-half">
                <img
                  className="usa-banner-icon usa-media_block-img"
                  src={iconDotGov}
                  alt="Dot gov"
                />
                <div className="usa-media_block-body">
                  <p>
                    <strong>The .gov means it’s official.</strong>
                    <br />
                      Federal government websites always use a .gov or .mil domain.
                      Before sharing sensitive information online,
                      make sure you’re on a .gov or .mil
                      site by inspecting your browser’s address (or “location”) bar.
                    </p>
                </div>
              </div>
              <div className="usa-banner-guidance-ssl usa-width-one-half">
                <img className="usa-banner-icon usa-media_block-img" src={iconHttps} alt="SSL" />
                <div className="usa-media_block-body">
                  <p>This site is also protected by an SSL (Secure Sockets Layer) certificate that’s been signed by the U.S. government. The <strong>https://</strong> means all transmitted data is encrypted &nbsp;— in other words, any information or browsing history that you provide is transmitted securely.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="usa-navbar">
          <button className="usa-menu-btn">Menu</button>
          <div className="usa-logo" id="logo">
            <em className="usa-logo-text">
              <Link to="/">
                TALENTMAP
              </Link>
            </em>
          </div>
        </div>
        <nav className="usa-nav">
          <div className="usa-nav-inner">
            <button className="usa-nav-close">
              <img src={close} alt="close" />
            </button>
            <div className="usa-nav-secondary">
              <form className="usa-search usa-search-small js-search-form usa-sr-only">
                <div role="search">
                  <label className="usa-sr-only" htmlFor="search-field-small">Search small</label>
                  <input id="search-field-small" type="search" name="search-small" />
                  <button type="submit">
                    <span className="usa-sr-only">Search</span>
                  </button>
                </div>
              </form>
              <ul className="usa-unstyled-list usa-nav-secondary-links">
                <li className="js-search-button-container">
                  <button className="usa-header-search-button js-search-button">Search</button>
                </li>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <a href="https://github.com/18F/State-TalentMAP">About</a>
                </li>
                <li>
                  <a href="https://github.com/18F/State-TalentMAP/issues">Feedback</a>
                </li>
                <li>
                  {showLogin}
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="usa-overlay" />
      </header>
    );
  }
}

Header.propTypes = {
  login: PropTypes.shape({
    requesting: PropTypes.bool,
    successful: PropTypes.bool,
  }).isRequired,
  client: PropTypes.shape({
    token: PropTypes.string,
  }),
};

Header.defaultProps = {
  client: null,
};

const mapStateToProps = state => ({
  login: state.login,
  client: state.client,
});

const connected = connect(mapStateToProps, { loginRequest, logoutRequest })(Header);

export default connected;
