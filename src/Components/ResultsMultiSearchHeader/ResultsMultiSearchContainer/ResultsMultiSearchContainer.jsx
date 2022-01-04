import { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { setSelectedSearchbarFilters } from '../../../actions/selectedSearchbarFilters';
import { EMPTY_FUNCTION, FILTERS_PARENT, HISTORY_OBJECT, USER_PROFILE } from '../../../Constants/PropTypes';
import { filtersFetchData } from '../../../actions/filters/filters';
import ResultsMultiSearchHeader from '../ResultsMultiSearchHeader';
import bypassRoutes from '../bypassRoutes';
import { isCurrentPathIn } from '../../ProfileMenu/navigation';

class ResultsMultiSearchHeaderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: {
        position_q: '',
      },
    };
  }

  UNSAFE_componentWillMount() {
    const { fetchFilters, filters, history } = this.props;

    // We have a nested Saved Search container that fetches all of the data that this one needs.
    // So we check the user navigated to any route where that's used. If so,
    // we don't need to fecth filters, because they'll get fetched anyways.
    const shouldBypassFetch = isCurrentPathIn(history.location.pathname, bypassRoutes);

    // Have the filters already been fetched?
    // if so, we'll pass back the saved filters
    // as a param, which tells our filters action
    // to not perform AJAX, and simply compare
    // the query params against the filters
    if (filters.hasFetched && !shouldBypassFetch) {
      fetchFilters(filters, {}, filters);
    } else if (!shouldBypassFetch) { // if not, we'll perform AJAX
      fetchFilters(filters, {});
    }
  }

  onFilterChange = q => {
    const { searchbarFilters, setSearchFilters } = this.props;
    setSearchFilters({ ...searchbarFilters, ...q });
  };

  onSubmit = q => {
    const query = q;
    const stringifiedFilterValues = {};
    // Form query object by iterating through keys.
    Object.keys(query).forEach((key) => {
      // Is there a value for the key?
      if (query[key] && query[key].length) {
        // If it's an array, split it. Else, simply return the string.
        const isArray = Array.isArray(query[key]);
        if (isArray) {
          stringifiedFilterValues[key] = query[key].join();
        } else {
          stringifiedFilterValues[key] = query[key];
        }
      }
      // If there's no value for a key, delete it from the object.
      if (!stringifiedFilterValues[key] || !stringifiedFilterValues[key].length) {
        delete stringifiedFilterValues[key];
      }
    });
    // Stringify the object
    const qString = queryString.stringify(stringifiedFilterValues);
    // Navigate to results with the formed query.
    this.props.onNavigateTo(`/results?${qString}`);
  };

  render() {
    const { filters, userProfile, filtersIsLoading,
      searchbarFilters } = this.props;
    return (
      <ResultsMultiSearchHeader
        filters={filters.filters}
        filtersIsLoading={filtersIsLoading}
        userProfile={userProfile}
        onSubmit={this.onSubmit}
        onFilterChange={this.onFilterChange}
        defaultFilters={searchbarFilters}
      />
    );
  }
}

ResultsMultiSearchHeaderContainer.propTypes = {
  filters: FILTERS_PARENT,
  filtersIsLoading: PropTypes.bool,
  fetchFilters: PropTypes.func.isRequired,
  userProfile: USER_PROFILE.isRequired,
  onNavigateTo: PropTypes.func.isRequired,
  setSearchFilters: PropTypes.func.isRequired,
  searchbarFilters: PropTypes.shape({}),
  history: HISTORY_OBJECT.isRequired,
};

ResultsMultiSearchHeaderContainer.defaultProps = {
  filters: { filters: [] },
  filtersIsLoading: false,
  userProfile: {},
  setSearchFilters: EMPTY_FUNCTION,
  searchbarFilters: {},
};

const mapStateToProps = state => ({
  filters: state.filters,
  filtersHasErrored: state.filtersHasErrored,
  filtersIsLoading: state.filtersIsLoading,
  selectedAccordion: state.selectedAccordion,
  userProfile: state.userProfile,
  userProfileIsLoading: state.userProfileIsLoading,
  searchbarFilters: state.selectedSearchbarFilters,
});

export const mapDispatchToProps = dispatch => ({
  fetchFilters: (items, queryParams, savedFilters) =>
    dispatch(filtersFetchData(items, queryParams, savedFilters)),
  onNavigateTo: dest => dispatch(push(dest)),
  setSearchFilters: query => dispatch(setSelectedSearchbarFilters(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(ResultsMultiSearchHeaderContainer),
);
