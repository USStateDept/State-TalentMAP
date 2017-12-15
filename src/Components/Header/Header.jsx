import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'react-router-redux';
import ToggleContent from '../StaticDevContent/ToggleContent';
import { userProfileFetchData } from '../../actions/userProfile';
import { logoutRequest } from '../../login/actions';
import { toggleSearchBar } from '../../actions/showSearchBar';
import { USER_PROFILE, EMPTY_FUNCTION, ROUTER_LOCATION_OBJECT } from '../../Constants/PropTypes';
import GovBanner from './GovBanner/GovBanner';
import ResultsSearchHeader from '../ResultsSearchHeader';
import { isCurrentPath, isCurrentPathIn } from '../ProfileMenu/navigation';
import { searchBarRoutes, searchBarRoutesForce } from './searchRoutes';
import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';
import { getAssetPath } from '../../utilities';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.toggleSearchVisibility = this.toggleSearchVisibility.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.isOnSearchPage = this.isOnSearchPage.bind(this);
  }

  componentWillMount() {
    if (this.props.isAuthorized()) {
      this.props.fetchData();
      this.matchCurrentPath(this.props.location);
      this.checkPath();
    }
  }

  matchCurrentPath(historyObject) {
    this.props.toggleSearchBarVisibility(false);
    if (isCurrentPathIn(historyObject.pathname, searchBarRoutes)) {
      this.props.toggleSearchBarVisibility(true);
    }
  }

  checkPath() {
    const { history } = this.props;
    history.listen((historyObject) => {
      this.matchCurrentPath(historyObject);
    });
  }

  toggleSearchVisibility() {
    const { shouldShowSearchBar, location } = this.props;
    if (searchBarRoutesForce.indexOf(location.pathname) <= -1) {
      this.props.toggleSearchBarVisibility(!shouldShowSearchBar);
    }
  }

  submitSearch(q) {
    this.props.onNavigateTo(`/results?q=${q.q}`);
  }

  isOnSearchPage() {
    const { location } = this.props;
    return isCurrentPath(location.pathname, '/results');
  }

  render() {
    const {
      login: {
        requesting,
      },
      client: {
        token,
      },
      shouldShowSearchBar, logout, userProfile,
    } = this.props;

    const logo = getAssetPath('/assets/logos/png/horizontal_color_thin.png');

    let isLoggedIn = false;
    let signedInAs = null;
    if (token && !requesting) {
      isLoggedIn = true;
      if (userProfile.user && userProfile.user.username) {
        signedInAs = userProfile.user.username;
      }
    }

    const isOnSearchPage = this.isOnSearchPage();

    return (
      <div className={shouldShowSearchBar ? 'search-bar-visible' : 'search-bar-hidden'}>
        <header className="usa-header usa-header-extended tm-header" role="banner">
          <ToggleContent />
          <GovBanner />
          <div className="usa-navbar">
            <button className="usa-menu-btn">Menu</button>
            <div className="usa-logo" id="logo">
              <div className="usa-logo-text">
                <Link to="/">
                  <img src={logo} alt="TalentMAP logo" />
                </Link>
              </div>
            </div>
            <DesktopNav
              isLoggedIn={isLoggedIn}
              shouldShowSearchBar={shouldShowSearchBar}
              logout={logout}
              userProfile={userProfile}
              toggleSearchVisibility={this.toggleSearchVisibility}
            />
          </div>
          <MobileNav user={signedInAs} logout={logout} showLogin={!isLoggedIn} />
          <div className="usa-overlay" />
        </header>
        {
          shouldShowSearchBar && !isOnSearchPage &&
          <div className="results results-search-bar-homepage">
            <ResultsSearchHeader
              onUpdate={this.submitSearch}
            />
          </div>
        }
      </div>
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
  onNavigateTo: PropTypes.func.isRequired,
  location: ROUTER_LOCATION_OBJECT.isRequired,
  toggleSearchBarVisibility: PropTypes.func.isRequired,
  shouldShowSearchBar: PropTypes.bool.isRequired,
  history: PropTypes.shape({}).isRequired,
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
  shouldShowSearchBar: state.shouldShowSearchBar,
});

const mapDispatchToProps = dispatch => ({
  fetchData: url => dispatch(userProfileFetchData(url)),
  logout: () => dispatch(logoutRequest()),
  onNavigateTo: dest => dispatch(push(dest)),
  toggleSearchBarVisibility: bool => dispatch(toggleSearchBar(bool)),
});

const connected = connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));

export default connected;
