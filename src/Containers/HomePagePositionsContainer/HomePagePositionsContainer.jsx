import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { homePagePositionsFetchData } from '../../actions/homePagePositions';
import HomePagePositions from '../../Components/HomePagePositions/HomePagePositions';
import { EMPTY_FUNCTION, HOME_PAGE_POSITIONS, USER_PROFILE, BID_RESULTS } from '../../Constants/PropTypes';
import { DEFAULT_HOME_PAGE_POSITIONS } from '../../Constants/DefaultProps';
import Spinner from '../../Components/Spinner';

class HomePagePositionsContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // Track whether we've received a valid user profile and attempted to fetch positions.
      hasFetched: false,
    };
  }

  componentWillMount() {
    // Don't try to pull positions until we've received the user's profile.
    if (this.props.userProfile.id) {
      this.props.homePagePositionsFetchData(this.props.userProfile.skills,
        this.props.userProfile.grade);
    }
  }

  componentWillReceiveProps(nextProps) {
    // Once we have a valid user profile, fetch the positions, but only
    // once. We'll set hasFetched to true to keep track.
    if (nextProps.userProfile.id && !this.state.hasFetched) {
      this.setState({ hasFetched: true });
      nextProps.homePagePositionsFetchData(nextProps.userProfile.skills,
        nextProps.userProfile.grade);
    }
  }

  render() {
    const { homePagePositions, userProfileIsLoading,
      homePagePositionsHasErrored, homePagePositionsIsLoading,
      userProfile, userProfileFavoritePositionIsLoading,
      userProfileFavoritePositionHasErrored, onNavigateTo,
      toggleFavorite, toggleBid, bidList } = this.props;
    return (
      <div className="content-container">
        {
          (userProfileIsLoading || homePagePositionsIsLoading) &&
            <Spinner type="homepage-position-results" size="big" />
        }
        {
          !userProfileIsLoading && !homePagePositionsIsLoading &&
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
        }
      </div>
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
  userProfileIsLoading: PropTypes.bool,
};

HomePagePositionsContainer.defaultProps = {
  homePagePositionsFetchData: EMPTY_FUNCTION,
  homePagePositions: DEFAULT_HOME_PAGE_POSITIONS,
  homePagePositionsHasErrored: false,
  homePagePositionsIsLoading: true,
  userProfileFavoritePositionIsLoading: false,
  userProfileFavoritePositionHasErrored: false,
  userProfile: {},
  userProfileIsLoading: false,
};

const mapStateToProps = state => ({
  userProfile: state.userProfile,
  homePagePositions: state.homePagePositions,
  homePagePositionsHasErrored: state.homePagePositionsHasErrored,
  homePagePositionsIsLoading: state.homePagePositionsIsLoading,
  userProfileIsLoading: state.userProfileIsLoading,
});

export const mapDispatchToProps = dispatch => ({
  homePagePositionsFetchData: (skills, grade) =>
    dispatch(homePagePositionsFetchData(skills, grade)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePagePositionsContainer);
