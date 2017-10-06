import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'react-router-redux';
import { favoritePositionsFetchData } from '../../actions/favoritePositions';
import * as savedSearchActions from '../../actions/savedSearch';
import * as bidListActions from '../../actions/bidList';
import { userProfileToggleFavoritePosition } from '../../actions/userProfile';
import * as PROP_TYPES from '../../Constants/PropTypes';
import { DEFAULT_USER_PROFILE, POSITION_RESULTS_OBJECT } from '../../Constants/DefaultProps';
import ProfilePage from '../../Components/ProfilePage';
import { PUBLIC_ROOT } from '../../login/DefaultRoutes';
import { formQueryString } from '../../utilities';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.onToggleFavorite = this.onToggleFavorite.bind(this);
    this.goToSavedSearch = this.goToSavedSearch.bind(this);
  }

  componentWillMount() {
    if (!this.props.isAuthorized()) {
      this.props.onNavigateTo(PUBLIC_ROOT);
    } else {
      this.getFavorites();
      this.getSavedSearches();
      this.getBidList();
      // reset the alert messages
      this.props.routeChangeResetState();
      this.props.bidListRouteChangeResetState();
    }
  }

  onToggleFavorite(id, remove) {
    this.props.toggleFavorite(id, remove);
  }

  getFavorites() {
    this.props.fetchData();
  }

  getSavedSearches() {
    this.props.savedSearchesFetchData();
  }

  getBidList() {
    this.props.fetchBidList();
  }

  goToSavedSearch(savedSearchObject) {
    const stringifiedQuery = formQueryString(savedSearchObject.filters);
    this.props.setCurrentSavedSearch(savedSearchObject);
    this.props.onNavigateTo(`/results?${stringifiedQuery}`);
  }

  render() {
    const { userProfile, favoritePositions, userProfileFavoritePositionIsLoading,
      userProfileFavoritePositionHasErrored, favoritePositionsIsLoading,
      favoritePositionsHasErrored, savedSearches, deleteSearch, cloneSearch,
      savedSearchesHasErrored, savedSearchesIsLoading, deleteSavedSearchHasErrored,
      deleteSavedSearchIsLoading, deleteSavedSearchSuccess, cloneSavedSearchIsLoading,
      cloneSavedSearchHasErrored, cloneSavedSearchSuccess, bidList, toggleBidPosition,
      bidListHasErrored, bidListIsLoading, bidListToggleHasErrored,
      bidListToggleIsLoading, bidListToggleSuccess } = this.props;
    return (
      <div>
        <ProfilePage
          user={userProfile}
          favoritePositions={favoritePositions}
          favoritePositionsIsLoading={favoritePositionsIsLoading}
          favoritePositionsHasErrored={favoritePositionsHasErrored}
          toggleFavoritePositionIsLoading={userProfileFavoritePositionIsLoading}
          toggleFavoritePositionHasErrored={userProfileFavoritePositionHasErrored}
          toggleFavorite={this.onToggleFavorite}
          savedSearches={savedSearches}
          savedSearchesHasErrored={savedSearchesHasErrored}
          savedSearchesIsLoading={savedSearchesIsLoading}
          goToSavedSearch={this.goToSavedSearch}
          deleteSearch={deleteSearch}
          deleteSavedSearchIsLoading={deleteSavedSearchIsLoading}
          deleteSavedSearchHasErrored={deleteSavedSearchHasErrored}
          deleteSavedSearchSuccess={deleteSavedSearchSuccess}
          cloneSavedSearchIsLoading={cloneSavedSearchIsLoading}
          cloneSavedSearchHasErrored={cloneSavedSearchHasErrored}
          cloneSavedSearchSuccess={cloneSavedSearchSuccess}
          cloneSavedSearch={cloneSearch}
          toggleBidPosition={toggleBidPosition}
          bidList={bidList}
          bidListHasErrored={bidListHasErrored}
          bidListIsLoading={bidListIsLoading}
          bidListToggleHasErrored={bidListToggleHasErrored}
          bidListToggleIsLoading={bidListToggleIsLoading}
          bidListToggleSuccess={bidListToggleSuccess}
        />
      </div>
    );
  }
}

Profile.propTypes = {
  onNavigateTo: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  isAuthorized: PropTypes.func.isRequired,
  userProfile: PROP_TYPES.USER_PROFILE,
  toggleFavorite: PropTypes.func.isRequired,
  favoritePositions: PROP_TYPES.POSITION_SEARCH_RESULTS,
  favoritePositionsIsLoading: PropTypes.bool.isRequired,
  favoritePositionsHasErrored: PropTypes.bool.isRequired,
  userProfileFavoritePositionIsLoading: PropTypes.bool.isRequired,
  userProfileFavoritePositionHasErrored: PropTypes.bool.isRequired,
  savedSearchesFetchData: PropTypes.func.isRequired,
  savedSearches: PROP_TYPES.SAVED_SEARCH_PARENT_OBJECT,
  savedSearchesIsLoading: PropTypes.bool.isRequired,
  savedSearchesHasErrored: PropTypes.bool.isRequired,
  setCurrentSavedSearch: PropTypes.func.isRequired,
  deleteSearch: PropTypes.func.isRequired,
  deleteSavedSearchIsLoading: PropTypes.bool.isRequired,
  deleteSavedSearchHasErrored: PROP_TYPES.DELETE_SAVED_SEARCH_HAS_ERRORED.isRequired,
  deleteSavedSearchSuccess: PROP_TYPES.DELETE_SAVED_SEARCH_SUCCESS.isRequired,
  routeChangeResetState: PropTypes.func.isRequired,
  bidListRouteChangeResetState: PropTypes.func.isRequired,
  cloneSearch: PropTypes.func.isRequired,
  cloneSavedSearchIsLoading: PropTypes.bool.isRequired,
  cloneSavedSearchHasErrored: PROP_TYPES.CLONE_SAVED_SEARCH_HAS_ERRORED.isRequired,
  cloneSavedSearchSuccess: PROP_TYPES.CLONE_SAVED_SEARCH_SUCCESS.isRequired,
  fetchBidList: PropTypes.func,
  toggleBidPosition: PropTypes.func,
  bidListHasErrored: PropTypes.bool,
  bidListIsLoading: PropTypes.bool,
  bidList: PROP_TYPES.BID_LIST,
  bidListToggleHasErrored: PropTypes.bool,
  bidListToggleIsLoading: PropTypes.bool,
  bidListToggleSuccess: PropTypes.bool,
};

Profile.defaultProps = {
  isLoading: true,
  userProfile: DEFAULT_USER_PROFILE,
  favoritePositions: POSITION_RESULTS_OBJECT,
  favoritePositionsIsLoading: false,
  favoritePositionsHasErrored: false,
  userProfileFavoritePositionIsLoading: false,
  userProfileFavoritePositionHasErrored: false,
  savedSearches: POSITION_RESULTS_OBJECT,
  savedSearchesIsLoading: false,
  savedSearchesHasErrored: false,
  deleteSavedSearchIsLoading: false,
  deleteSavedSearchHasErrored: false,
  deleteSavedSearchSuccess: false,
  routeChangeResetState: PROP_TYPES.EMPTY_FUNCTION,
  bidListRouteChangeResetState: PROP_TYPES.EMPTY_FUNCTION,
  cloneSearch: PROP_TYPES.EMPTY_FUNCTION,
  cloneSavedSearchIsLoading: false,
  cloneSavedSearchHasErrored: false,
  cloneSavedSearchSuccess: false,
  fetchBidList: PROP_TYPES.EMPTY_FUNCTION,
  toggleBidPosition: PROP_TYPES.EMPTY_FUNCTION,
  bidList: { results: [] },
  bidListHasErrored: false,
  bidListIsLoading: false,
  bidListToggleHasErrored: false,
  bidListToggleIsLoading: false,
  bidListToggleSuccess: false,
};

Profile.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  userProfile: state.userProfile,
  favoritePositions: state.favoritePositions,
  favoritePositionsHasErrored: state.favoritePositionsHasErrored,
  favoritePositionsIsLoading: state.favoritePositionsIsLoading,
  id: ownProps,
  userProfileFavoritePositionIsLoading: state.userProfileFavoritePositionIsLoading,
  userProfileFavoritePositionHasErrored: state.userProfileFavoritePositionHasErrored,
  savedSearches: state.savedSearchesSuccess,
  savedSearchesIsLoading: state.savedSearchesIsLoading,
  savedSearchesHasErrored: state.savedSearchesHasErrored,
  deleteSavedSearchIsLoading: state.deleteSavedSearchIsLoading,
  deleteSavedSearchHasErrored: state.deleteSavedSearchHasErrored,
  deleteSavedSearchSuccess: state.deleteSavedSearchSuccess,
  cloneSavedSearchIsLoading: state.cloneSavedSearchIsLoading,
  cloneSavedSearchHasErrored: state.cloneSavedSearchHasErrored,
  cloneSavedSearchSuccess: state.cloneSavedSearchSuccess,
  bidListHasErrored: state.bidListHasErrored,
  bidListIsLoading: state.bidListIsLoading,
  bidList: state.bidListFetchDataSuccess,
  bidListToggleHasErrored: state.bidListToggleHasErrored,
  bidListToggleIsLoading: state.bidListToggleIsLoading,
  bidListToggleSuccess: state.bidListToggleSuccess,
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(favoritePositionsFetchData()),
  onNavigateTo: dest => dispatch(push(dest)),
  toggleFavorite: (id, remove) =>
    // Since this page references the full Favorites route, pass true to explicitly refresh them
    dispatch(userProfileToggleFavoritePosition(id, remove, true)),
  savedSearchesFetchData: () => dispatch(savedSearchActions.savedSearchesFetchData()),
  setCurrentSavedSearch: e => dispatch(savedSearchActions.setCurrentSavedSearch(e)),
  deleteSearch: id => dispatch(savedSearchActions.deleteSavedSearch(id)),
  routeChangeResetState: () => dispatch(savedSearchActions.routeChangeResetState()),
  cloneSearch: id => dispatch(savedSearchActions.cloneSavedSearch(id)),
  fetchBidList: () => dispatch(bidListActions.bidListFetchData()),
  toggleBidPosition: (id, remove) => dispatch(bidListActions.toggleBidPosition(id, remove)),
  bidListRouteChangeResetState: () => dispatch(bidListActions.routeChangeResetState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile));
