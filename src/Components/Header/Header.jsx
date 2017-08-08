import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GovBanner from './GovBanner/GovBanner';
import { loginRequest, logoutRequest } from '../../login/actions';
import AccountDropdown from '../AccountDropdown/AccountDropdown';
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
        <GovBanner />
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
