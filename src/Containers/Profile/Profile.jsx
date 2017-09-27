import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'react-router-redux';
import { favoritePositionsFetchData } from '../../actions/favoritePositions';
import { savedSearchesFetchData, setCurrentSavedSearch, deleteSavedSearch, routeChangeResetState } from '../../actions/savedSearch';
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
      // reset the alert messages
      this.props.routeChangeResetState();
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

  goToSavedSearch(savedSearchObject) {
    const stringifiedQuery = formQueryString(savedSearchObject.filters);
    this.props.setCurrentSavedSearch(savedSearchObject);
    this.props.onNavigateTo(`/results?${stringifiedQuery}`);
  }

  render() {
    const { userProfile, favoritePositions, userProfileFavoritePositionIsLoading,
      userProfileFavoritePositionHasErrored, favoritePositionsIsLoading,
      favoritePositionsHasErrored, savedSearches, deleteSearch,
      savedSearchesHasErrored, savedSearchesIsLoading, deleteSavedSearchHasErrored,
      deleteSavedSearchIsLoading, deleteSavedSearchSuccess } = this.props;
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
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(favoritePositionsFetchData()),
  onNavigateTo: dest => dispatch(push(dest)),
  toggleFavorite: (id, remove) => dispatch(userProfileToggleFavoritePosition(id, remove)),
  savedSearchesFetchData: () => dispatch(savedSearchesFetchData()),
  setCurrentSavedSearch: e => dispatch(setCurrentSavedSearch(e)),
  deleteSearch: id => dispatch(deleteSavedSearch(id)),
  routeChangeResetState: () => dispatch(routeChangeResetState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile));
