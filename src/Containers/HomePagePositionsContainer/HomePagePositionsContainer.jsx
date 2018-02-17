import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { homePagePositionsFetchData } from '../../actions/homePagePositions';
import HomePagePositions from '../../Components/HomePagePositions/HomePagePositions';
import { EMPTY_FUNCTION, HOME_PAGE_POSITIONS, USER_PROFILE, BID_RESULTS } from '../../Constants/PropTypes';
import { DEFAULT_HOME_PAGE_POSITIONS } from '../../Constants/DefaultProps';

class HomePagePositionsContainer extends Component {

  componentWillMount() {
    this.props.homePagePositionsFetchData(this.props.userProfile.skills,
      this.props.userProfile.grade);
  }

  render() {
    const { homePagePositions,
      homePagePositionsHasErrored, homePagePositionsIsLoading,
      userProfile, userProfileFavoritePositionIsLoading,
      userProfileFavoritePositionHasErrored, onNavigateTo,
      toggleFavorite, toggleBid, bidList } = this.props;
    return (
      <HomePagePositions
        homePagePositions={homePagePositions}
        homePagePositionsHasErrored={homePagePositionsHasErrored}
        homePagePositionsIsLoading={homePagePositionsIsLoading}
        userProfile={userProfile}
        userProfileFavoritePositionIsLoading={userProfileFavoritePositionIsLoading}
        userProfileFavoritePositionHasErrored={userProfileFavoritePositionHasErrored}
        onNavigateTo={onNavigateTo}
        toggleFavorite={toggleFavorite}
        toggleBid={toggleBid}
        bidList={bidList}
      />
    );
  }
}

HomePagePositionsContainer.propTypes = {
  homePagePositionsFetchData: PropTypes.func, // eslint-disable-line
  homePagePositions: HOME_PAGE_POSITIONS,
  homePagePositionsHasErrored: PropTypes.bool,
  homePagePositionsIsLoading: PropTypes.bool,
  userProfile: USER_PROFILE.isRequired,
  userProfileFavoritePositionIsLoading: PropTypes.bool.isRequired,
  userProfileFavoritePositionHasErrored: PropTypes.bool.isRequired,
  onNavigateTo: PropTypes.func.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  toggleBid: PropTypes.func.isRequired,
  bidList: BID_RESULTS.isRequired,
};

HomePagePositionsContainer.defaultProps = {
  homePagePositionsFetchData: EMPTY_FUNCTION,
  homePagePositions: DEFAULT_HOME_PAGE_POSITIONS,
  homePagePositionsHasErrored: false,
  homePagePositionsIsLoading: true,
  userProfileFavoritePositionIsLoading: false,
  userProfileFavoritePositionHasErrored: false,
  userProfile: {},
};

const mapStateToProps = state => ({
  userProfile: state.userProfile,
  homePagePositions: state.homePagePositions,
  homePagePositionsHasErrored: state.homePagePositionsHasErrored,
  homePagePositionsIsLoading: state.homePagePositionsIsLoading,
});

export const mapDispatchToProps = dispatch => ({
  homePagePositionsFetchData: (skills, grade) =>
    dispatch(homePagePositionsFetchData(skills, grade)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePagePositionsContainer);
