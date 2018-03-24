import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { merge } from 'lodash';
import { filtersFetchData } from '../../actions/filters/filters';
import { mapSavedSearchesToSingleQuery } from '../../utilities';
import { DEFAULT_USER_PROFILE, POSITION_RESULTS_OBJECT } from '../../Constants/DefaultProps';
import {
  SAVED_SEARCH_PARENT_OBJECT,
  DELETE_SAVED_SEARCH_HAS_ERRORED,
  DELETE_SAVED_SEARCH_SUCCESS,
  CLONE_SAVED_SEARCH_HAS_ERRORED,
  CLONE_SAVED_SEARCH_SUCCESS,
  EMPTY_FUNCTION,
  FILTERS_PARENT,
} from '../../Constants/PropTypes';

class SavedSearchesMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasSetupValues: false,
    };
  }

  componentWillReceiveProps({ fetchFilters, ...rest }) {
    // To resolve eslint error no-unused-prop-types for `fetchFilters`
    const props = merge({ fetchFilters }, rest);
    this.setupValues(props);
  }

  setupValues(props) {
    const {
      filters,
      fetchFilters,
      savedSearches,
      savedSearchesIsLoading,
      cloneSavedSearchIsLoading,
      deleteSavedSearchIsLoading,
    } = props;

    const { hasSetupValues } = this.state;

    // is anything loading from the parent? if so, don't try to fetch filters
    const isLoading = (
      savedSearchesIsLoading ||
      cloneSavedSearchIsLoading ||
      deleteSavedSearchIsLoading
    );

    const mappedSearchQuery = mapSavedSearchesToSingleQuery(savedSearches);

    // Have the filters already been fetched?
    // if so, we'll pass back the saved filters
    // as a param, which tells our filters action
    // to not perform AJAX, and simply compare
    // the query params against the filters.
    // Don't try to fetch filters if filtersIsLoading is true.
    // We'll only perform this once after component mount, so we
    // set hasSetupValues to true after completing setup.
    if (filters.hasFetched && !isLoading && !hasSetupValues) {
      this.setState({ hasSetupValues: true });
      fetchFilters(filters, mappedSearchQuery, filters);
    } else if (!isLoading && !hasSetupValues) { // if not, we'll perform AJAX
      this.setState({ hasSetupValues: true });
      fetchFilters(filters, mappedSearchQuery);
    }
  }

  render() {
    const { savedSearches, deleteSearch, filters, ChildElement, cloneSavedSearch,
      savedSearchesHasErrored, savedSearchesIsLoading, deleteSavedSearchHasErrored,
      deleteSavedSearchIsLoading, deleteSavedSearchSuccess, cloneSavedSearchIsLoading,
      cloneSavedSearchHasErrored, cloneSavedSearchSuccess, goToSavedSearch,
      filtersIsLoading, onSortChange } = this.props;

    const props = {
      savedSearches,
      deleteSearch,
      filters,
      savedSearchesHasErrored,
      savedSearchesIsLoading,
      deleteSavedSearchHasErrored,
      deleteSavedSearchIsLoading,
      deleteSavedSearchSuccess,
      cloneSavedSearchIsLoading,
      cloneSavedSearchHasErrored,
      cloneSavedSearchSuccess,
      goToSavedSearch,
      cloneSavedSearch,
      filtersIsLoading,
      onSortChange,
      mappedParams: filters.mappedParams || [],
    };

    return (
      <ChildElement {...props} />
    );
  }
}

SavedSearchesMap.propTypes = {
  savedSearches: SAVED_SEARCH_PARENT_OBJECT,
  savedSearchesIsLoading: PropTypes.bool.isRequired,
  savedSearchesHasErrored: PropTypes.bool.isRequired,
  deleteSearch: PropTypes.func.isRequired,
  deleteSavedSearchIsLoading: PropTypes.bool.isRequired,
  deleteSavedSearchHasErrored: DELETE_SAVED_SEARCH_HAS_ERRORED.isRequired,
  deleteSavedSearchSuccess: DELETE_SAVED_SEARCH_SUCCESS.isRequired,
  cloneSavedSearch: PropTypes.func.isRequired,
  cloneSavedSearchIsLoading: PropTypes.bool.isRequired,
  cloneSavedSearchHasErrored: CLONE_SAVED_SEARCH_HAS_ERRORED.isRequired,
  cloneSavedSearchSuccess: CLONE_SAVED_SEARCH_SUCCESS.isRequired,
  filters: FILTERS_PARENT,
  goToSavedSearch: PropTypes.func.isRequired,
  fetchFilters: PropTypes.func.isRequired,
  ChildElement: PropTypes.func.isRequired,
  filtersIsLoading: PropTypes.bool,
  onSortChange: PropTypes.func.isRequired,
};

SavedSearchesMap.defaultProps = {
  isLoading: true,
  userProfile: DEFAULT_USER_PROFILE,
  savedSearches: POSITION_RESULTS_OBJECT,
  savedSearchesIsLoading: false,
  savedSearchesHasErrored: false,
  deleteSavedSearchIsLoading: false,
  deleteSavedSearchHasErrored: false,
  deleteSavedSearchSuccess: false,
  routeChangeResetState: EMPTY_FUNCTION,
  cloneSavedSearch: EMPTY_FUNCTION,
  cloneSavedSearchIsLoading: false,
  cloneSavedSearchHasErrored: false,
  cloneSavedSearchSuccess: false,
  filters: { filters: [] },
  goToSavedSearch: EMPTY_FUNCTION,
  fetchFilters: EMPTY_FUNCTION,
  filtersIsLoading: true,
};

SavedSearchesMap.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = state => ({
  filters: state.filters,
  filtersHasErrored: state.filtersHasErrored,
  filtersIsLoading: state.filtersIsLoading,
});

export const mapDispatchToProps = dispatch => ({
  fetchFilters: (items, queryParams, savedFilters) =>
    dispatch(filtersFetchData(items, queryParams, savedFilters)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SavedSearchesMap);
