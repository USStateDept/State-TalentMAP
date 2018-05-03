import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { USER_PROFILE, BID_RESULTS } from '../../Constants/PropTypes';
import HomePagePositionsContainer from '../HomePagePositionsContainer/HomePagePositionsContainer';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 0,
      currentPage: { value: 0 },
    };
  }

  render() {
    const { userProfile, userProfileIsLoading, toggleFavorite, toggleBid, bidList,
      userProfileFavoritePositionIsLoading, onNavigateTo,
      userProfileFavoritePositionHasErrored } = this.props;
    return (
      <div className="home content-container">
        <HomePagePositionsContainer
          favorites={userProfile.favorite_positions}
          toggleFavorite={toggleFavorite}
          userProfileFavoritePositionIsLoading={userProfileFavoritePositionIsLoading}
          userProfileFavoritePositionHasErrored={userProfileFavoritePositionHasErrored}
          toggleBid={toggleBid}
          bidList={bidList}
          onNavigateTo={onNavigateTo}
          userProfileIsLoading={userProfileIsLoading}
        />
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
};

HomePage.defaultProps = {
  userProfile: {},
  userProfileIsLoading: false,
  filtersIsLoading: false,
};

export default HomePage;
