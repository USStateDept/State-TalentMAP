import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import close from 'uswds/dist/img/close.svg'; // close X icon
import { userProfileFetchData } from '../../actions/userProfile';
import { logoutRequest } from '../../login/actions';
import { USER_PROFILE, EMPTY_FUNCTION } from '../../Constants/PropTypes';
import GovBanner from './GovBanner/GovBanner';
import AccountDropdown from '../AccountDropdown/AccountDropdown';

export class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loopActive: false,
      shuffleActive: false,
    };
  }

  componentWillMount() {
    if (this.props.isAuthorized()) {
      this.props.fetchData();
    }
  }

  render() {
    const {
      login: {
        requesting,
      },
    } = this.props;

    let showLogin = (<Link to="login" id="login-desktop">Login</Link>);
    let signedInAs = null;
    const { logout } = this.props;
    if (this.props.client.token && !requesting) {
      const { userProfile } = this.props;
      showLogin = (
        <AccountDropdown
          userProfile={this.props.userProfile}
          logoutRequest={logout}
        />);
      if (userProfile.user && userProfile.user.username) {
        signedInAs = `Signed in as ${userProfile.user.username}`;
      }
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
              <ul className="usa-unstyled-list usa-nav-secondary-links mobile-nav">
                <li className="mobile-nav-only">
                  {signedInAs}
                </li>
                <hr className="mobile-nav-only" />
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
                <span className="usa-unstyled-list mobile-nav-only">
                  <hr />
                  <li>
                    <Link to="/">Profile</Link>
                  </li>
                  <li>
                    <Link to="login" id="login-mobile" onClick={logout}>Logout</Link>
                  </li>
                </span>
                <span className="desktop-nav-only">
                  <li>
                    {showLogin}
                  </li>
                </span>
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
  fetchData: PropTypes.func.isRequired,
  isAuthorized: PropTypes.func.isRequired,
  userProfile: USER_PROFILE,
  logout: PropTypes.func,
};

Header.defaultProps = {
  client: null,
  userProfile: {},
  logout: EMPTY_FUNCTION,
};

const mapStateToProps = state => ({
  login: state.login,
  client: state.client,
  userProfile: state.userProfile,
});

const mapDispatchToProps = dispatch => ({
  fetchData: url => dispatch(userProfileFetchData(url)),
  logout: () => dispatch(logoutRequest()),
});

const connected = connect(mapStateToProps, mapDispatchToProps)(Header);

export default connected;
