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

  componentDidMount() {
    // Don't try to pull positions until we've received the user's profile.
    if (this.props.userProfile.id) {
      this.props.homePagePositionsFetchData(this.props.userProfile.skills,
        this.props.userProfile.grade);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // Once we have a valid user profile, fetch the positions, but only
    // once. We'll set hasFetched to true to keep track.
    if (nextProps.userProfile.id && !this.state.hasFetched && !this.props.homePagePositionsIsLoading
      && !nextProps.homePagePositionsIsLoading) {
      this.props.homePagePositionsFetchData(nextProps.userProfile.skills,
        nextProps.userProfile.grade);
    }

    if (this.props.homePagePositionsIsLoading && !nextProps.homePagePositionsIsLoading) {
      setTimeout(() => {
        this.setState({ hasFetched: true });
      }, 0); // account for delay
    }
  }

  render() {
    const { homePagePositions, userProfileIsLoading, homePagePositionsIsLoading,
      userProfile, bidList } = this.props;
    const { hasFetched } = this.state;
    return (
      <div className="content-container">
        {
          (userProfileIsLoading || homePagePositionsIsLoading || !hasFetched)
            ?
            <div className="usa-grid-full homepage-positions-section-container">

              <Spinner type="homepage-position-results" size="big" />
            </div>
            :
            <HomePagePositions
              homePagePositions={homePagePositions}
              homePagePositionsIsLoading={homePagePositionsIsLoading}
              userProfile={userProfile}

              bidList={bidList}
            />
        }
      </div>
    );
  }
}

HomePagePositionsContainer.propTypes = {
  homePagePositionsFetchData: PropTypes.func,
  homePagePositions: HOME_PAGE_POSITIONS,
  homePagePositionsIsLoading: PropTypes.bool,
  userProfile: USER_PROFILE.isRequired,
  bidList: BID_RESULTS.isRequired,
  userProfileIsLoading: PropTypes.bool,
};

HomePagePositionsContainer.defaultProps = {
  homePagePositionsFetchData: EMPTY_FUNCTION,
  homePagePositions: DEFAULT_HOME_PAGE_POSITIONS,
  homePagePositionsIsLoading: false,
  userProfile: {},
  userProfileIsLoading: false,
};

const mapStateToProps = state => ({
  userProfile: state.userProfile,
  homePagePositions: state.homePagePositions,
  homePagePositionsIsLoading: state.homePagePositionsIsLoading,
  userProfileIsLoading: state.userProfileIsLoading,
});

export const mapDispatchToProps = dispatch => ({
  homePagePositionsFetchData: (skills, grade) =>
    dispatch(homePagePositionsFetchData(skills, grade)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePagePositionsContainer);
