import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HOME_PAGE_POSITIONS, USER_PROFILE, BID_RESULTS } from '../../Constants/PropTypes';
import { ENDPOINT_PARAMS } from '../../Constants/EndpointParams';
import NewPositionsSection from '../../Components/NewPositionsSection';
import HomePagePositionsSection from '../../Components/HomePagePositionsSection';
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
    const { homePagePositions,
      homePagePositionsIsLoading, homePagePositionsHasErrored,
      userProfile, toggleFavorite, toggleBid, bidList,
      userProfileFavoritePositionIsLoading,
      userProfileFavoritePositionHasErrored } = this.props;
    return (
      <div className="home content-container">
        <div className="homepage-positions-section-container">
          {
            homePagePositionsIsLoading && !homePagePositionsHasErrored &&
              <Spinner type="homepage-position-results" size="big" />
          }
          <div
            className="usa-grid-full homepage-positions-section-container-inner padded-main-content"
          >
            <HomePagePositionsSection
              title="Highlighted Positions"
              maxLength="6"
              viewMoreLink="/results?is_highlighted=1"
              favorites={userProfile.favorite_positions}
              toggleFavorite={toggleFavorite}
              userProfileFavoritePositionIsLoading={userProfileFavoritePositionIsLoading}
              userProfileFavoritePositionHasErrored={userProfileFavoritePositionHasErrored}
              positions={homePagePositions.isHighlighted}
              isLoading={homePagePositionsIsLoading}
              toggleBid={toggleBid}
              bidList={bidList}
            />
            <NewPositionsSection
              favorites={userProfile.favorite_positions}
              toggleFavorite={toggleFavorite}
              userProfileFavoritePositionIsLoading={userProfileFavoritePositionIsLoading}
              userProfileFavoritePositionHasErrored={userProfileFavoritePositionHasErrored}
              positions={homePagePositions.isNew}
              isLoading={homePagePositionsIsLoading}
              toggleBid={toggleBid}
              bidList={bidList}
            />
          </div>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  onNavigateTo: PropTypes.func.isRequired,
  homePagePositions: HOME_PAGE_POSITIONS.isRequired,
  homePagePositionsIsLoading: PropTypes.bool,
  homePagePositionsHasErrored: PropTypes.bool,
  userProfile: USER_PROFILE,
  toggleFavorite: PropTypes.func.isRequired,
  userProfileFavoritePositionIsLoading: PropTypes.bool.isRequired,
  userProfileFavoritePositionHasErrored: PropTypes.bool.isRequired,
  toggleBid: PropTypes.func.isRequired,
  bidList: BID_RESULTS.isRequired,
};

HomePage.defaultProps = {
  homePagePositionsIsLoading: true,
  homePagePositionsHasErrored: false,
  userProfile: {},
  filtersIsLoading: false,
};

export default HomePage;
