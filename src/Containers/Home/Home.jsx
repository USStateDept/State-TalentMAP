import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { toggleBidPosition, bidListFetchData } from '../../actions/bidList';
import { userProfileToggleFavoritePosition } from '../../actions/userProfile';
import { homePagePositionsFetchData } from '../../actions/homePagePositions';
import { toggleSearchBar } from '../../actions/showSearchBar';
import HomePage from '../../Containers/HomePage/HomePage';
import { FILTERS_PARENT, EMPTY_FUNCTION, HOME_PAGE_POSITIONS, USER_PROFILE, BID_LIST } from '../../Constants/PropTypes';
import { DEFAULT_HOME_PAGE_POSITIONS } from '../../Constants/DefaultProps';
import { LOGIN_REDIRECT } from '../../login/routes';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proficiency: {},
      qString: null,
      searchText: { value: '' },
    };
  }

  componentWillMount() {
    if (!this.props.isAuthorized()) {
      this.props.onNavigateTo(LOGIN_REDIRECT);
    } else {
      this.props.bidListFetchData();
    }
  }

  onChildSubmit(e) {
    this.props.onNavigateTo(e);
  }

  render() {
    const { onNavigateTo, items, homePagePositions,
      homePagePositionsHasErrored, homePagePositionsIsLoading,
      userProfile, userProfileIsLoading, toggleFavorite, toggleBid,
      userProfileFavoritePositionIsLoading, bidList,
      userProfileFavoritePositionHasErrored, filtersIsLoading } = this.props;
    return (
      <HomePage
        onNavigateTo={onNavigateTo}
        filters={items.filters}
        filtersIsLoading={filtersIsLoading}
        homePagePositions={homePagePositions}
        homePagePositionsHasErrored={homePagePositionsHasErrored}
        homePagePositionsIsLoading={homePagePositionsIsLoading}
        userProfile={userProfile}
        userProfileIsLoading={userProfileIsLoading}
        toggleFavorite={toggleFavorite}
        userProfileFavoritePositionIsLoading={userProfileFavoritePositionIsLoading}
        userProfileFavoritePositionHasErrored={userProfileFavoritePositionHasErrored}
        toggleBid={toggleBid}
        bidList={bidList.results}
      />
    );
  }
}

Home.propTypes = {
  onNavigateTo: PropTypes.func.isRequired,
  items: FILTERS_PARENT,
  isAuthorized: PropTypes.func.isRequired,
  homePagePositions: HOME_PAGE_POSITIONS,
  homePagePositionsHasErrored: PropTypes.bool,
  homePagePositionsIsLoading: PropTypes.bool,
  userProfile: USER_PROFILE,
  userProfileIsLoading: PropTypes.bool,
  toggleFavorite: PropTypes.func.isRequired,
  userProfileFavoritePositionIsLoading: PropTypes.bool.isRequired,
  userProfileFavoritePositionHasErrored: PropTypes.bool.isRequired,
  toggleBid: PropTypes.func.isRequired,
  bidList: BID_LIST.isRequired,
  bidListFetchData: PropTypes.func.isRequired,
  filtersIsLoading: PropTypes.bool,
};

Home.defaultProps = {
  items: { filters: [] },
  hasErrored: false,
  isLoading: true,
  homePagePositionsFetchData: EMPTY_FUNCTION,
  homePagePositions: DEFAULT_HOME_PAGE_POSITIONS,
  homePagePositionsHasErrored: false,
  homePagePositionsIsLoading: true,
  userProfile: {},
  userProfileIsLoading: false,
  userProfileFavoritePositionIsLoading: false,
  userProfileFavoritePositionHasErrored: false,
  toggleBid: EMPTY_FUNCTION,
  bidList: { results: [] },
  filtersIsLoading: false,
};

const mapStateToProps = state => ({
  items: state.filters,
  hasErrored: state.filtersHasErrored,
  filtersIsLoading: state.filtersIsLoading,
  homePagePositions: state.homePagePositions,
  homePagePositionsHasErrored: state.homePagePositionsHasErrored,
  homePagePositionsIsLoading: state.homePagePositionsIsLoading,
  userProfile: state.userProfile,
  userProfileIsLoading: state.userProfileIsLoading,
  userProfileFavoritePositionIsLoading: state.userProfileFavoritePositionIsLoading,
  userProfileFavoritePositionHasErrored: state.userProfileFavoritePositionHasErrored,
  bidList: state.bidListFetchDataSuccess,
});

export const mapDispatchToProps = dispatch => ({
  homePagePositionsFetchData: (skills, grade) =>
    dispatch(homePagePositionsFetchData(skills, grade)),
  onNavigateTo: dest => dispatch(push(dest)),
  toggleFavorite: (id, remove) => dispatch(userProfileToggleFavoritePosition(id, remove)),
  toggleBid: (id, remove) => dispatch(toggleBidPosition(id, remove)),
  bidListFetchData: () => dispatch(bidListFetchData()),
  toggleSearchBarVisibility: showHide => dispatch(toggleSearchBar(showHide)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
