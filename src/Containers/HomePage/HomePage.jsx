import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { USER_PROFILE, BID_RESULTS } from '../../Constants/PropTypes';
import { ENDPOINT_PARAMS } from '../../Constants/EndpointParams';
import HomePagePositionsContainer from '../HomePagePositionsContainer/HomePagePositionsContainer';
import Spinner from '../../Components/Spinner';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.submitRegion = this.submitRegion.bind(this);
    this.state = {
      key: 0,
      currentPage: { value: 0 },
    };
  }

  submitRegion(q) {
    this.props.onNavigateTo(`/results?${ENDPOINT_PARAMS.org}=${q}`);
  }

  render() {
    const { userProfile, userProfileIsLoading, toggleFavorite, toggleBid, bidList,
      userProfileFavoritePositionIsLoading, onNavigateTo,
      userProfileFavoritePositionHasErrored, homePagePositionsIsLoading } = this.props;
    return (
      <div className="home content-container">
        {
          (userProfileIsLoading || homePagePositionsIsLoading) &&
            <Spinner type="homepage-position-results" size="big" />
        }
        {
          !userProfileIsLoading &&
            <HomePagePositionsContainer
              favorites={userProfile.favorite_positions}
              toggleFavorite={toggleFavorite}
              userProfileFavoritePositionIsLoading={userProfileFavoritePositionIsLoading}
              userProfileFavoritePositionHasErrored={userProfileFavoritePositionHasErrored}
              toggleBid={toggleBid}
              bidList={bidList}
              onNavigateTo={onNavigateTo}
            />
        }
      </div>
    );
  }
}

HomePage.propTypes = {
  onNavigateTo: PropTypes.func.isRequired,
  userProfile: USER_PROFILE,
  userProfileIsLoading: PropTypes.bool,
  toggleFavorite: PropTypes.func.isRequired,
  userProfileFavoritePositionIsLoading: PropTypes.bool.isRequired,
  userProfileFavoritePositionHasErrored: PropTypes.bool.isRequired,
  toggleBid: PropTypes.func.isRequired,
  bidList: BID_RESULTS.isRequired,
  homePagePositionsIsLoading: PropTypes.bool,
};

HomePage.defaultProps = {
  userProfile: {},
  userProfileIsLoading: false,
  filtersIsLoading: false,
  homePagePositionsIsLoading: false,
};

export default HomePage;
