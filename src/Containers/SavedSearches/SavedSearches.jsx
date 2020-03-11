import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'connected-react-router';
import { savedSearchesFetchData, setCurrentSavedSearch, deleteSavedSearch } from '../../actions/savedSearch';
import { SAVED_SEARCH_PARENT_OBJECT } from '../../Constants/PropTypes';
import { DEFAULT_USER_PROFILE, POSITION_RESULTS_OBJECT } from '../../Constants/DefaultProps';
import SavedSearchesMap from '../SavedSearchesMap';
import { formQueryString } from '../../utilities';

// Wrapper for anything related to saved searches
// Make sure to update Components/ResultsMultiSearchHeader/bypassRoutes.js with any routes
// that use this container.
class SavedSearchesContainer extends Component {
  UNSAFE_componentWillMount() {
    this.getSavedSearches();
  }

  getSavedSearches() {
    this.props.savedSearchesFetchData();
  }

  getSortedSearches = type => {
    if (type.target && type.target.value) {
      this.props.savedSearchesFetchData(type.target.value);
      this.setState({ defaultSort: type.target.value });
    }
  };

  goToSavedSearch = savedSearchObject => {
    const q = { ...savedSearchObject.filters };
    if (savedSearchObject.endpoint === '/api/v1/fsbid/projected_vacancies/') {
      q.projectedVacancy = 'projected';
    }
    const stringifiedQuery = formQueryString(q);
    this.props.setCurrentSavedSearch(savedSearchObject);
    this.props.onNavigateTo(`/results?${stringifiedQuery}`);
  };

  render() {
    const { savedSearches, deleteSearch, ChildElement, savedSearchesIsLoading } = this.props;
    return (
      <div className="saved-search-parent-container">
        <SavedSearchesMap
          savedSearches={savedSearches}
          savedSearchesIsLoading={savedSearchesIsLoading}
          goToSavedSearch={this.goToSavedSearch}
          deleteSearch={deleteSearch}
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
  ChildElement: PropTypes.func.isRequired,
};

SavedSearchesContainer.defaultProps = {
  isLoading: true,
  userProfile: DEFAULT_USER_PROFILE,
  savedSearches: POSITION_RESULTS_OBJECT,
  savedSearchesIsLoading: true,
  savedSearchesHasErrored: false,
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
});

export const mapDispatchToProps = dispatch => ({
  onNavigateTo: dest => dispatch(push(dest)),
  savedSearchesFetchData: sortType => dispatch(savedSearchesFetchData(sortType)),
  setCurrentSavedSearch: e => dispatch(setCurrentSavedSearch(e)),
  deleteSearch: id => dispatch(deleteSavedSearch(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SavedSearchesContainer));
