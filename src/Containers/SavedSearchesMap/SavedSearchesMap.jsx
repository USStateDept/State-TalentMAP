import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { merge } from 'lodash';
import { filtersFetchData } from '../../actions/filters/filters';
import { mapSavedSearchesToSingleQuery } from '../../utilities';
import { DEFAULT_USER_PROFILE, POSITION_RESULTS_OBJECT } from '../../Constants/DefaultProps';
import {
  EMPTY_FUNCTION,
  FILTERS_PARENT,
  SAVED_SEARCH_PARENT_OBJECT,
} from '../../Constants/PropTypes';

class SavedSearchesMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasSetupValues: false,
    };
  }

  UNSAFE_componentWillReceiveProps({ fetchFilters, ...rest }) {
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
      deleteSavedSearchIsLoading,
    } = props;

    const filters$ = { ...filters };

    const { hasSetupValues } = this.state;

    // is anything loading from the parent? if so, don't try to fetch filters
    const isLoading = (
      savedSearchesIsLoading ||
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
    if (filters$.hasFetched && !isLoading && !hasSetupValues) {
      this.setState({ hasSetupValues: true });
      fetchFilters(filters$, mappedSearchQuery, filters$);
    } else if (!isLoading && !hasSetupValues) { // if not, we'll perform AJAX
      this.setState({ hasSetupValues: true });
      fetchFilters(filters$, mappedSearchQuery);
    }
  }

  render() {
    const { savedSearches, deleteSearch, filters, ChildElement, defaultSort,
      savedSearchesHasErrored, savedSearchesIsLoading, goToSavedSearch,
      filtersIsLoading, onSortChange } = this.props;
    const props = {
      savedSearches,
      deleteSearch,
      filters,
      savedSearchesHasErrored,
      savedSearchesIsLoading,
      goToSavedSearch,
      filtersIsLoading,
      onSortChange,
      defaultSort,
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
  filters: FILTERS_PARENT,
  goToSavedSearch: PropTypes.func.isRequired,
  fetchFilters: PropTypes.func.isRequired,
  ChildElement: PropTypes.func.isRequired,
  filtersIsLoading: PropTypes.bool,
  onSortChange: PropTypes.func.isRequired,
  defaultSort: PropTypes.string,
};

SavedSearchesMap.defaultProps = {
  isLoading: true,
  userProfile: DEFAULT_USER_PROFILE,
  savedSearches: POSITION_RESULTS_OBJECT,
  savedSearchesIsLoading: false,
  savedSearchesHasErrored: false,
  routeChangeResetState: EMPTY_FUNCTION,
  filters: { filters: [] },
  goToSavedSearch: EMPTY_FUNCTION,
  fetchFilters: EMPTY_FUNCTION,
  filtersIsLoading: true,
  defaultSort: '',
};

SavedSearchesMap.contextTypes = {
  router: PropTypes.object,
  container: PropTypes.element,
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
