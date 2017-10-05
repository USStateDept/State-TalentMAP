import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FILTER_ITEMS_ARRAY, HOME_PAGE_POSITIONS, USER_PROFILE } from '../../Constants/PropTypes';
import ENDPOINT_PARAMS from '../../Constants/EndpointParams';
import ResultsSearchHeader from '../../Components/ResultsSearchHeader/ResultsSearchHeader';
import Explore from '../../Components/Explore/Explore';
import NewPositionsSection from '../../Components/NewPositionsSection';
import HighlightedPositionsSection from '../../Components/HighlightedPositionsSection';
import Spinner from '../../Components/Spinner';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.submitSearch = this.submitSearch.bind(this);
    this.submitRegion = this.submitRegion.bind(this);
    this.state = {
      key: 0,
      currentPage: { value: 0 },
    };
  }

  submitSearch(q) {
    this.props.onNavigateTo(`/results?q=${q.q}`);
  }

  submitRegion(q) {
    this.props.onNavigateTo(`/results?${ENDPOINT_PARAMS.org}=${q}`);
  }

  render() {
    const { filters, homePagePositions,
      homePagePositionsIsLoading, homePagePositionsHasErrored,
      userProfile, toggleFavorite,
      userProfileFavoritePositionIsLoading,
      userProfileFavoritePositionHasErrored } = this.props;
    return (
      <div className="home">
        <div className="results results-search-bar-homepage">
          <ResultsSearchHeader
            onUpdate={this.submitSearch}
          />
        </div>
        <Explore
          filters={filters}
          onRegionSubmit={this.submitRegion}
        />
        <div className="usa-grid-full positions-section">
          {
            homePagePositionsIsLoading && !homePagePositionsHasErrored &&
              <Spinner type="homepage-position-results" size="big" />
          }
          <NewPositionsSection
            favorites={userProfile.favorite_positions}
            toggleFavorite={toggleFavorite}
            userProfileFavoritePositionIsLoading={userProfileFavoritePositionIsLoading}
            userProfileFavoritePositionHasErrored={userProfileFavoritePositionHasErrored}
            positions={homePagePositions.isNew}
            isLoading={homePagePositionsIsLoading}
          />
          <HighlightedPositionsSection
            favorites={userProfile.favorite_positions}
            toggleFavorite={toggleFavorite}
            userProfileFavoritePositionIsLoading={userProfileFavoritePositionIsLoading}
            userProfileFavoritePositionHasErrored={userProfileFavoritePositionHasErrored}
            positions={homePagePositions.isHighlighted}
            isLoading={homePagePositionsIsLoading}
          />
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  onNavigateTo: PropTypes.func.isRequired,
  filters: FILTER_ITEMS_ARRAY.isRequired,
  homePagePositions: HOME_PAGE_POSITIONS.isRequired,
  homePagePositionsIsLoading: PropTypes.bool,
  homePagePositionsHasErrored: PropTypes.bool,
  userProfile: USER_PROFILE,
  toggleFavorite: PropTypes.func.isRequired,
  userProfileFavoritePositionIsLoading: PropTypes.bool.isRequired,
  userProfileFavoritePositionHasErrored: PropTypes.bool.isRequired,
};

HomePage.defaultProps = {
  homePagePositionsIsLoading: true,
  homePagePositionsHasErrored: false,
  userProfile: {},
};

export default HomePage;
