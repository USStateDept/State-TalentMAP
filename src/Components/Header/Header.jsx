import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginRequest, logoutRequest } from '../../login/actions';

// If you were testing, you'd want to export this component
// so that you can test your custom made component and not
// test whether or not Redux and Redux Form are doing their jobs
class Login extends Component {
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
        loggedIn, // eslint-disable-line
        requesting,
      },
      isAuthorized, // eslint-disable-line
    } = this.props;

    const logout = () => {
      this.props.logoutRequest();
    };

    let showLogin = (<Link to="login">Login</Link>);
    if (this.props.client.token && !requesting) { // eslint-disable-line
      showLogin = (<Link to="login" onClick={() => logout()}>Logout</Link>); // eslint-disable-line
    }

    console.log(this.props.client); // eslint-disable-line

    return (
      <header className="usa-header usa-header-extended" role="banner">
        <div className="usa-banner">
          <div className="usa-accordion">
            <header className="usa-banner-header">
              <div className="usa-grid usa-banner-inner">
                <img src="https://unpkg.com/uswds@1.0.0/dist/img/favicons/favicon-57.png" alt="U.S. flag" />
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
                <img className="usa-banner-icon usa-media_block-img" src="https://unpkg.com/uswds@1.0.0/dist/img/icon-dot-gov.svg" alt="Dot gov" />
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
                <img className="usa-banner-icon usa-media_block-img" src="https://unpkg.com/uswds@1.0.0/dist/img/icon-https.svg" alt="SSL" />
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
              <a href="/" title="Home" aria-label="Home">
                  DOS TalentMAP
                </a>
            </em>
          </div>
        </div>
        <nav className="usa-nav">
          <div className="usa-nav-inner">
            <button className="usa-nav-close">
              <img src="https://unpkg.com/uswds@1.0.0/dist/img/close.svg" alt="close" />
            </button>
            <ul className="usa-nav-primary usa-accordion">
              <li>
                <button
                  className="
                  usa-accordion-button usa-nav-link"
                  aria-expanded="false"
                  aria-controls="side-nav-1"
                >
                  <span>Section title</span>
                </button>
                <ul id="side-nav-1" className="usa-nav-submenu" aria-hidden="true">
                  <li>
                    <a href="/#">Page title</a>
                  </li>
                  <li>
                    <a href="/#">Page title</a>
                  </li>
                  <li>
                    <a href="/#">Page title</a>
                  </li>
                </ul>
              </li>
              <li>
                <button
                  className="usa-accordion-button usa-nav-link"
                  aria-expanded="false"
                  aria-controls="sidenav-2"
                >
                  <span>Simple terms</span>
                </button>
                <ul id="sidenav-2" className="usa-nav-submenu" aria-hidden="true">
                  <li>
                    <a href="/#">Page title</a>
                  </li>
                  <li>
                    <a href="/#">Page title</a>
                  </li>
                  <li>
                    <a href="/#">Page title</a>
                  </li>
                </ul>
              </li>
              <li>
                <a className="usa-nav-link" href="/#">
                  <span>This is a link</span>
                </a>
              </li>
              <li>
                <button
                  className="usa-accordion-button usa-nav-link"
                  aria-expanded="false"
                  aria-controls="sidenav-3"
                >
                  <span>This is another menu</span>
                </button>
                <ul id="sidenav-3" className="usa-nav-submenu" aria-hidden="true">
                  <li>
                    <a href="/#">Page title</a>
                  </li>
                  <li>
                    <a href="/#">Page title</a>
                  </li>
                  <li>
                    <a href="/#">Page title</a>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="usa-nav-secondary">
              <form className="usa-search usa-search-small js-search-form usa-sr-only">
                <div role="search">
                  <label className="usa-sr-only" htmlFor="search-field-small">Search small</label>
                  <input id="search-field-small" type="search" name="search" />
                  <button type="submit">
                    <span className="usa-sr-only">Search</span>
                  </button>
                </div>
              </form>
              <ul className="usa-unstyled-list usa-nav-secondary-links">
                {/* <li class="js-search-button-container">
                    <button class="usa-header-search-button js-search-button">Search</button>
                  </li> */}
                <li>
                  <a href="/#">Secondary link</a>
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

// Pass the correct proptypes in for validation
Login.propTypes = {
  handleSubmit: PropTypes.func, // eslint-disable-line
  loginRequest: PropTypes.func, // eslint-disable-line
  logoutRequest: PropTypes.func, // eslint-disable-line
  login: PropTypes.shape({ // eslint-disable-line
    requesting: PropTypes.bool,
    successful: PropTypes.bool,
    messages: PropTypes.array,
    errors: PropTypes.array,
    loggedIn: PropTypes.bool,
  }),
};

// Grab only the piece of state we need
const mapStateToProps = state => ({
  login: state.login,
  client: state.client,
});

// make Redux state piece of `login` and our action `loginRequest`
// available in this.props within our component
const connected = connect(mapStateToProps, { loginRequest, logoutRequest })(Login);

// Export our well formed login component
export default connected;
