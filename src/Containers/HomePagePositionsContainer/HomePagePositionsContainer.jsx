import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { homePageFeaturedPositionsFetchData, homePageRecommendedPositionsFetchData } from 'actions/homePagePositions';
import { BID_RESULTS, EMPTY_FUNCTION, USER_PROFILE } from 'Constants/PropTypes';
import { DEFAULT_HOME_PAGE_FEATURED_POSITIONS, DEFAULT_HOME_PAGE_RECOMMENDED_POSITIONS } from 'Constants/DefaultProps';
import HomePagePositions from '../../Components/HomePagePositions/HomePagePositions';
import Spinner from '../../Components/Spinner';

const HomePagePositionsContainer = props => {
  useEffect(() => {
    if (props.userProfile.id) {
      props.homePageRecommendedPositionsFetchData(props.userProfile.employee_info.skills,
        props.userProfile.employee_info.grade, props.userProfile.employee_info.skills_additional);
      props.homePageFeaturedPositionsFetchData(props.userProfile.employee_info.skills,
        props.userProfile.employee_info.grade, props.userProfile.employee_info.skills_additional);
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
        props.userProfile.employee_info.grade, props.userProfile.employee_info.skills_additional);
      props.homePageFeaturedPositionsFetchData(props.userProfile.employee_info.skills,
        props.userProfile.employee_info.grade, props.userProfile.employee_info.skills_additional);
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
  userProfile: {},
  userProfileIsLoading: false,
  homePageFeaturedPositionsFetchData: EMPTY_FUNCTION,
  homePageFeaturedPositions: DEFAULT_HOME_PAGE_FEATURED_POSITIONS,
  homePageFeaturedPositionsIsLoading: false,
  homePageRecommendedPositionsFetchData: EMPTY_FUNCTION,
  homePageRecommendedPositions: DEFAULT_HOME_PAGE_RECOMMENDED_POSITIONS,
  homePageRecommendedPositionsIsLoading: false,
};

const mapStateToProps = state => ({
  userProfile: state.userProfile,
  userProfileIsLoading: state.userProfileIsLoading,
  homePageFeaturedPositions: state.homePageFeaturedPositions,
  homePageFeaturedPositionsIsLoading: state.homePageFeaturedPositionsIsLoading,
  homePageRecommendedPositions: state.homePageRecommendedPositions,
  homePageRecommendedPositionsIsLoading: state.homePageRecommendedPositionsIsLoading,
});

export const mapDispatchToProps = dispatch => ({
  homePageFeaturedPositionsFetchData: (skills, grade, cones) =>
    dispatch(homePageFeaturedPositionsFetchData(skills, grade, cones)),
  homePageRecommendedPositionsFetchData: (skills, grade, cones) =>
    dispatch(homePageRecommendedPositionsFetchData(skills, grade, cones)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePagePositionsContainer);
