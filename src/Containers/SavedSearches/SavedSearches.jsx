import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'react-router-redux';
import { savedSearchesFetchData, setCurrentSavedSearch, deleteSavedSearch, routeChangeResetState,
cloneSavedSearch } from '../../actions/savedSearch';
import { SAVED_SEARCH_PARENT_OBJECT, DELETE_SAVED_SEARCH_HAS_ERRORED, DELETE_SAVED_SEARCH_SUCCESS,
CLONE_SAVED_SEARCH_HAS_ERRORED, CLONE_SAVED_SEARCH_SUCCESS, EMPTY_FUNCTION } from '../../Constants/PropTypes';
import { DEFAULT_USER_PROFILE, POSITION_RESULTS_OBJECT } from '../../Constants/DefaultProps';
import SavedSearchesMap from '../SavedSearchesMap';
import { formQueryString } from '../../utilities';

// Wrapper for anything related to saved searches
// Make sure to update Components/ResultsMultiSearchHeader/bypassRoutes.js with any routes
// that use this container.
class SavedSearchesContainer extends Component {
  constructor(props) {
    super(props);
    this.goToSavedSearch = this.goToSavedSearch.bind(this);
    this.getSortedSearches = this.getSortedSearches.bind(this);
  }

  componentWillMount() {
    this.getSavedSearches();
    // reset the alert messages
    this.props.routeChangeResetState();
  }

  getSavedSearches() {
    this.props.savedSearchesFetchData();
  }

  getSortedSearches(type) {
    if (type.target && type.target.value) {
      this.props.savedSearchesFetchData(type.target.value);
      this.setState({ defaultSort: type.target.value });
    }
  }

  goToSavedSearch(savedSearchObject) {
    const stringifiedQuery = formQueryString(savedSearchObject.filters);
    this.props.setCurrentSavedSearch(savedSearchObject);
    this.props.onNavigateTo(`/results?${stringifiedQuery}`);
  }

  render() {
    const { savedSearches, deleteSearch, cloneSearch, ChildElement,
      savedSearchesIsLoading, deleteSavedSearchHasErrored,
      deleteSavedSearchIsLoading, deleteSavedSearchSuccess, cloneSavedSearchIsLoading,
      cloneSavedSearchHasErrored, cloneSavedSearchSuccess } = this.props;
    return (
      <div className="saved-search-parent-container">
        <SavedSearchesMap
          savedSearches={savedSearches}
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
          ChildElement={ChildElement}
          onSortChange={this.getSortedSearches}
        />
      </div>
    );
  }
}

SavedSearchesContainer.propTypes = {
  onNavigateTo: PropTypes.func.isRequired,
  savedSearchesFetchData: PropTypes.func.isRequired,
  savedSearches: SAVED_SEARCH_PARENT_OBJECT,
  savedSearchesIsLoading: PropTypes.bool.isRequired,
  setCurrentSavedSearch: PropTypes.func.isRequired,
  deleteSearch: PropTypes.func.isRequired,
  deleteSavedSearchIsLoading: PropTypes.bool.isRequired,
  deleteSavedSearchHasErrored: DELETE_SAVED_SEARCH_HAS_ERRORED.isRequired,
  deleteSavedSearchSuccess: DELETE_SAVED_SEARCH_SUCCESS.isRequired,
  routeChangeResetState: PropTypes.func.isRequired,
  cloneSearch: PropTypes.func.isRequired,
  cloneSavedSearchIsLoading: PropTypes.bool.isRequired,
  cloneSavedSearchHasErrored: CLONE_SAVED_SEARCH_HAS_ERRORED.isRequired,
  cloneSavedSearchSuccess: CLONE_SAVED_SEARCH_SUCCESS.isRequired,
  ChildElement: PropTypes.func.isRequired,
};

SavedSearchesContainer.defaultProps = {
  isLoading: true,
  userProfile: DEFAULT_USER_PROFILE,
  savedSearches: POSITION_RESULTS_OBJECT,
  savedSearchesIsLoading: true,
  savedSearchesHasErrored: false,
  deleteSavedSearchIsLoading: false,
  deleteSavedSearchHasErrored: false,
  deleteSavedSearchSuccess: false,
  routeChangeResetState: EMPTY_FUNCTION,
  cloneSearch: EMPTY_FUNCTION,
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

export const mapDispatchToProps = dispatch => ({
  onNavigateTo: dest => dispatch(push(dest)),
  savedSearchesFetchData: sortType => dispatch(savedSearchesFetchData(sortType)),
  setCurrentSavedSearch: e => dispatch(setCurrentSavedSearch(e)),
  deleteSearch: id => dispatch(deleteSavedSearch(id)),
  routeChangeResetState: () => dispatch(routeChangeResetState()),
  cloneSearch: id => dispatch(cloneSavedSearch(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SavedSearchesContainer));
