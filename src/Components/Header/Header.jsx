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
import { isCurrentPathIn } from '../ProfileMenu/navigation';
import { searchBarRoutes, searchBarRoutesForce, searchBarRoutesForceHidden } from './searchRoutes';
import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';
import { getAssetPath } from '../../utilities';
import MediaQuery from '../MediaQuery';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.toggleSearchVisibility = this.toggleSearchVisibility.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.isOnHasOwnSearchRoute = this.isOnHasOwnSearchRoute.bind(this);
    this.isOnForceHideSearchRoute = this.isOnForceHideSearchRoute.bind(this);
  }

  componentWillMount() {
    if (this.props.isAuthorized()) {
      this.props.fetchData();
    }
    this.matchCurrentPath(this.props.location);
    this.checkPath();
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
    // if we're not on one of the pages where the search bar is forced,
    // then toggle the search bar visibility
    if (searchBarRoutesForce.indexOf(location.pathname) <= -1) {
      this.props.toggleSearchBarVisibility(!shouldShowSearchBar);
    }
  }

  submitSearch(q) {
    this.props.onNavigateTo(`/results?q=${q.q}`);
  }

  // The results page uses its own search bar, so we don't
  // display the header's search bar if we're on the results page
  isOnHasOwnSearchRoute() {
    const { location } = this.props;
    return isCurrentPathIn(location.pathname, searchBarRoutesForce);
  }

  // We want to ensure pages like the login page never display the search bar
  isOnForceHideSearchRoute() {
    const { location } = this.props;
    return isCurrentPathIn(location.pathname, searchBarRoutesForceHidden);
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
    const userFirstName = userProfile && userProfile.user ? userProfile.user.first_name : null;
    if (token && !requesting) {
      isLoggedIn = true;
      signedInAs = userFirstName;
    }

    const isOnHasOwnSearchRoute = this.isOnHasOwnSearchRoute();
    const isOnForceHideSearchRoute = this.isOnForceHideSearchRoute();
    const showResultsSearchHeader =
      shouldShowSearchBar && !isOnHasOwnSearchRoute && !isOnForceHideSearchRoute;
    const searchBarVisibilityClass = shouldShowSearchBar ? 'search-bar-visible' : 'search-bar-hidden';

    return (
      <div className={searchBarVisibilityClass}>
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
            <MediaQuery widthType="min" breakpoint="screenMdMin">
              <DesktopNav
                isLoggedIn={isLoggedIn}
                shouldShowSearchBar={shouldShowSearchBar}
                logout={logout}
                userProfile={userProfile}
                toggleSearchVisibility={this.toggleSearchVisibility}
              />
            </MediaQuery>
          </div>
          <MediaQuery widthType="max" breakpoint="screenSmMax">
            <MobileNav user={signedInAs} logout={logout} showLogin={!isLoggedIn} />
          </MediaQuery>
          <div className="usa-overlay" />
        </header>
        {
          showResultsSearchHeader &&
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

export const mapDispatchToProps = dispatch => ({
  fetchData: url => dispatch(userProfileFetchData(url)),
  logout: () => dispatch(logoutRequest()),
  onNavigateTo: dest => dispatch(push(dest)),
  toggleSearchBarVisibility: bool => dispatch(toggleSearchBar(bool)),
});

const connected = connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));

export default connected;
