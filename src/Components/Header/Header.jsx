import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'react-router-redux';
import ToggleContent from '../StaticDevContent/ToggleContent';
import { userProfileFetchData } from '../../actions/userProfile';
import { setSelectedSearchbarFilters } from '../../actions/selectedSearchbarFilters';
import { authRequest } from '../../login/actions';
import { toggleSearchBar } from '../../actions/showSearchBar';
import { USER_PROFILE, EMPTY_FUNCTION, ROUTER_LOCATION_OBJECT } from '../../Constants/PropTypes';
import StateBanner from './StateBanner/StateBanner';
import ResultsMultiSearchHeaderContainer from '../ResultsMultiSearchHeader/ResultsMultiSearchContainer';
import ResultsSearchHeader from '../ResultsSearchHeader';
import { isCurrentPath, isCurrentPathIn } from '../ProfileMenu/navigation';
import { searchBarRoutes, searchBarRoutesForce, searchBarRoutesForceHidden } from './searchRoutes';
import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';
import { getAssetPath, propOrDefault, focusByFirstOfHeader } from '../../utilities';
import MediaQuery from '../MediaQuery';
import BetaHeader from './BetaHeader';
import InteractiveElement from '../InteractiveElement';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.toggleSearchVisibility = this.toggleSearchVisibility.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.isOnHasOwnSearchRoute = this.isOnHasOwnSearchRoute.bind(this);
    this.isOnForceHideSearchRoute = this.isOnForceHideSearchRoute.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  componentWillMount() {
    if (this.props.isAuthorized()) {
      this.props.fetchData();
    }
    this.matchCurrentPath(this.props.location);
    this.checkPath();
  }

  onFilterChange(q) {
    const { searchbarFilters, setSearchFilters } = this.props;
    setSearchFilters({ ...searchbarFilters, ...q });
  }

  isOnResultsPage() {
    return isCurrentPath('/results', this.props.location.pathname);
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
      shouldShowSearchBar, logout, userProfile, searchbarFilters,
    } = this.props;

    const logo = getAssetPath('/assets/logos/png/horizontal_color_thin.png');

    let isLoggedIn = false;
    let signedInAs = null;
    const userFirstName = propOrDefault(userProfile, 'user.first_name');
    if (token && !requesting) {
      isLoggedIn = true;
      signedInAs = userFirstName;
    }

    // Apply a custom class if we're on the results page.
    const isOnResultsPage = this.isOnResultsPage();
    const resultsPageClass = isOnResultsPage ? 'is-on-results-page' : '';

    const isOnHasOwnSearchRoute = this.isOnHasOwnSearchRoute();
    const isOnForceHideSearchRoute = this.isOnForceHideSearchRoute();
    const showResultsSearchHeaderClass =
      shouldShowSearchBar && !isOnHasOwnSearchRoute && !isOnForceHideSearchRoute;
    const searchBarVisibilityClass = showResultsSearchHeaderClass ? 'search-bar-visible' : 'search-bar-hidden';

    const shouldRenderSearchBar = !this.isOnHasOwnSearchRoute() && !this.isOnForceHideSearchRoute()
      && showResultsSearchHeaderClass;

    return (
      <div className={`${searchBarVisibilityClass} ${resultsPageClass}`}>
        <InteractiveElement
          className="usa-skipnav"
          onClick={() => focusByFirstOfHeader()}
          role="link"
        >
          Skip to main content
        </InteractiveElement>
        <header id="header" className="usa-header usa-header-extended tm-header" role="banner">
          <ToggleContent />
          <StateBanner />
          <BetaHeader />
          <div className="usa-navbar padded-main-content padded-main-content--header">
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
          shouldRenderSearchBar &&
          <div className="results results-search-bar-header">
            <MediaQuery widthType="min" breakpoint="screenMdMin">
              <ResultsMultiSearchHeaderContainer
                onUpdate={this.submitSearch}
              />
            </MediaQuery>
            <MediaQuery widthType="max" breakpoint="screenSmMax">
              <ResultsSearchHeader
                onUpdate={this.submitSearch}
                onFilterChange={this.onFilterChange}
                defaultKeyword={searchbarFilters.q}
              />
            </MediaQuery>
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
  searchbarFilters: PropTypes.shape({}),
  setSearchFilters: PropTypes.func.isRequired,
};

Header.defaultProps = {
  client: null,
  userProfile: {},
  logout: EMPTY_FUNCTION,
  searchbarFilters: {},
  setSearchFilters: EMPTY_FUNCTION,
};

const mapStateToProps = state => ({
  login: state.login,
  client: state.client,
  userProfile: state.userProfile,
  shouldShowSearchBar: state.shouldShowSearchBar,
  searchbarFilters: state.selectedSearchbarFilters,
});

export const mapDispatchToProps = dispatch => ({
  fetchData: url => dispatch(userProfileFetchData(url)),
  logout: () => dispatch(authRequest(false)),
  onNavigateTo: dest => dispatch(push(dest)),
  toggleSearchBarVisibility: bool => dispatch(toggleSearchBar(bool)),
  setSearchFilters: query => dispatch(setSelectedSearchbarFilters(query)),
});

const connected = connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));

export default connected;
