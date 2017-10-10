import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'react-router-redux';
import * as savedSearchActions from '../../actions/savedSearch';
import * as PROP_TYPES from '../../Constants/PropTypes';
import { DEFAULT_USER_PROFILE, POSITION_RESULTS_OBJECT } from '../../Constants/DefaultProps';
import SavedSearches from '../../Components/SavedSearches';
import { formQueryString } from '../../utilities';

class SavedSearchesContainer extends Component {
  constructor(props) {
    super(props);
    this.goToSavedSearch = this.goToSavedSearch.bind(this);
  }

  componentWillMount() {
    this.getSavedSearches();
    // reset the alert messages
    this.props.routeChangeResetState();
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
    const { savedSearches, deleteSearch, cloneSearch,
      savedSearchesHasErrored, savedSearchesIsLoading, deleteSavedSearchHasErrored,
      deleteSavedSearchIsLoading, deleteSavedSearchSuccess, cloneSavedSearchIsLoading,
      cloneSavedSearchHasErrored, cloneSavedSearchSuccess } = this.props;
    return (
      <div>
        <SavedSearches
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
        />
      </div>
    );
  }
}

SavedSearchesContainer.propTypes = {
  onNavigateTo: PropTypes.func.isRequired,
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
  cloneSearch: PropTypes.func.isRequired,
  cloneSavedSearchIsLoading: PropTypes.bool.isRequired,
  cloneSavedSearchHasErrored: PROP_TYPES.CLONE_SAVED_SEARCH_HAS_ERRORED.isRequired,
  cloneSavedSearchSuccess: PROP_TYPES.CLONE_SAVED_SEARCH_SUCCESS.isRequired,
};

SavedSearchesContainer.defaultProps = {
  isLoading: true,
  userProfile: DEFAULT_USER_PROFILE,
  savedSearches: POSITION_RESULTS_OBJECT,
  savedSearchesIsLoading: false,
  savedSearchesHasErrored: false,
  deleteSavedSearchIsLoading: false,
  deleteSavedSearchHasErrored: false,
  deleteSavedSearchSuccess: false,
  routeChangeResetState: PROP_TYPES.EMPTY_FUNCTION,
  cloneSearch: PROP_TYPES.EMPTY_FUNCTION,
  cloneSavedSearchIsLoading: false,
  cloneSavedSearchHasErrored: false,
  cloneSavedSearchSuccess: false,
};

SavedSearchesContainer.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  userProfile: state.userProfile,
  id: ownProps,
  savedSearches: state.savedSearchesSuccess,
  savedSearchesIsLoading: state.savedSearchesIsLoading,
  savedSearchesHasErrored: state.savedSearchesHasErrored,
  deleteSavedSearchIsLoading: state.deleteSavedSearchIsLoading,
  deleteSavedSearchHasErrored: state.deleteSavedSearchHasErrored,
  deleteSavedSearchSuccess: state.deleteSavedSearchSuccess,
  cloneSavedSearchIsLoading: state.cloneSavedSearchIsLoading,
  cloneSavedSearchHasErrored: state.cloneSavedSearchHasErrored,
  cloneSavedSearchSuccess: state.cloneSavedSearchSuccess,
});

const mapDispatchToProps = dispatch => ({
  onNavigateTo: dest => dispatch(push(dest)),
  savedSearchesFetchData: () => dispatch(savedSearchActions.savedSearchesFetchData()),
  setCurrentSavedSearch: e => dispatch(savedSearchActions.setCurrentSavedSearch(e)),
  deleteSearch: id => dispatch(savedSearchActions.deleteSavedSearch(id)),
  routeChangeResetState: () => dispatch(savedSearchActions.routeChangeResetState()),
  cloneSearch: id => dispatch(savedSearchActions.cloneSavedSearch(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SavedSearchesContainer));
