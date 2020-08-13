import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { homePageRecommendedPositionsFetchData, homePageFeaturedPositionsFetchData } from 'actions/homePagePositions';
import { EMPTY_FUNCTION, USER_PROFILE, BID_RESULTS } from 'Constants/PropTypes';
import { DEFAULT_HOME_PAGE_RECOMMENDED_POSITIONS, DEFAULT_HOME_PAGE_FEATURED_POSITIONS } from 'Constants/DefaultProps';
// import { usePrevious } from 'hooks';
import HomePagePositions from '../../Components/HomePagePositions/HomePagePositions';
import Spinner from '../../Components/Spinner';

const HomePagePositionsContainer = props => {
  useEffect(() => {
    if (props.userProfile.id) {
      props.homePageRecommendedPositionsFetchData(props.userProfile.employee_info.skills,
        props.userProfile.employee_info.grade);
      props.homePageFeaturedPositionsFetchData(props.userProfile.employee_info.skills,
        props.userProfile.employee_info.grade);
    }
  }, []);

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    if (props.userProfile.id) {
      props.homePageRecommendedPositionsFetchData(props.userProfile.employee_info.skills,
        props.userProfile.employee_info.grade);
      props.homePageFeaturedPositionsFetchData(props.userProfile.employee_info.skills,
        props.userProfile.employee_info.grade);
    }
  }, [props.userProfile.id]);

  const { homePageRecommendedPositions, homePageFeaturedPositions,
    userProfileIsLoading, homePageRecommendedPositionsIsLoading,
    homePageFeaturedPositionsIsLoading, bidList, userProfile } = props;

  return (
    <div className="content-container">
      {
        (userProfileIsLoading || homePageRecommendedPositionsIsLoading
              || homePageFeaturedPositionsIsLoading)
          ?
          <div className="usa-grid-full homepage-positions-section-container">
            <Spinner type="homepage-position-results" size="big" />
          </div>
          :
          <HomePagePositions
            homePageRecommendedPositions={homePageRecommendedPositions}
            homePageRecommendedPositionsIsLoading={homePageRecommendedPositionsIsLoading}
            homePageFeaturedPositions={homePageFeaturedPositions}
            homePageFeaturedPositionsIsLoading={homePageFeaturedPositionsIsLoading}
            userProfile={userProfile}
            bidList={bidList}
          />
      }
    </div>
  );
};

HomePagePositionsContainer.propTypes = {
  userProfile: USER_PROFILE.isRequired,
  bidList: BID_RESULTS.isRequired,
  userProfileIsLoading: PropTypes.bool,
  homePageRecommendedPositionsFetchData: PropTypes.func,
  homePageRecommendedPositions: PropTypes.shape({}),
  homePageRecommendedPositionsIsLoading: PropTypes.bool,
  homePageFeaturedPositionsFetchData: PropTypes.func,
  homePageFeaturedPositions: PropTypes.shape({}),
  homePageFeaturedPositionsIsLoading: PropTypes.bool,
};

HomePagePositionsContainer.defaultProps = {
  userProfileIsLoading: false,
  homePageRecommendedPositionsFetchData: EMPTY_FUNCTION,
  homePageRecommendedPositions: DEFAULT_HOME_PAGE_RECOMMENDED_POSITIONS,
  homePageRecommendedPositionsIsLoading: false,
  homePageFeaturedPositionsFetchData: EMPTY_FUNCTION,
  homePageFeaturedPositions: DEFAULT_HOME_PAGE_FEATURED_POSITIONS,
  homePageFeaturedPositionsIsLoading: false,
};

const mapStateToProps = state => ({
  userProfile: state.userProfile,
  userProfileIsLoading: state.userProfileIsLoading,
  homePageRecommendedPositions: state.homePageRecommendedPositions,
  homePageRecommendedPositionsIsLoading: state.homePageRecommendedPositionsIsLoading,
  homePageFeaturedPositions: state.homePageFeaturedPositions,
  homePageFeaturedPositionsIsLoading: state.homePageFeaturedPositionsIsLoading,
});

export const mapDispatchToProps = dispatch => ({
  homePageRecommendedPositionsFetchData: (skills, grade) =>
    dispatch(homePageRecommendedPositionsFetchData(skills, grade)),
  homePageFeaturedPositionsFetchData: (skills, grade) =>
    dispatch(homePageFeaturedPositionsFetchData(skills, grade)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePagePositionsContainer);
