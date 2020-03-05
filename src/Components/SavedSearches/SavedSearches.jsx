import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProfileSectionTitle from '../ProfileSectionTitle';
import SelectForm from '../SelectForm';
import Spinner from '../Spinner';
import SavedSearchesList from './SavedSearchesList';
import {
  SAVED_SEARCH_PARENT_OBJECT,
  MAPPED_PARAM_ARRAY,
} from '../../Constants/PropTypes';
import { SAVED_SEARCH_SORTS } from '../../Constants/Sort';
import Nav from '../FavoritePositions/Nav';
import { checkFlag } from '../../flags';

const getUsePV = () => checkFlag('flags.projected_vacancy');

class SavedSearches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'all',
    };
  }

  getSearches = useType => {
    const cycle = '/api/v1/cycleposition/';
    const pos = '/api/v1/position/';
    const pv = '/api/v1/fsbid/projected_vacancies/';
    const { savedSearches } = this.props;
    const { selected } = this.state;

    const checkBy = useType || selected;
    switch (checkBy) {
      case 'open':
        return savedSearches.results.filter(f => f.endpoint === cycle || f.endpoint === pos);
      case 'pv':
        return getUsePV() ?
          savedSearches.results.filter(f => f.endpoint === pv) : [];
      default:
        return savedSearches.results
          .filter(f => f.endpoint === cycle || f.endpoint === pos || f.endpoint === pv);
    }
  };

  render() {
    const {
      savedSearchesIsLoading,
      goToSavedSearch,
      deleteSearch,
      onSortChange,
      mappedParams,
      filtersIsLoading,
    } = this.props;

    const isLoading = (filtersIsLoading || savedSearchesIsLoading);

    let options = [{ title: 'All Saved Searches', value: 'all', numerator: this.getSearches('all').length }];
    if (getUsePV()) {
      options = [
        ...options,
        { title: 'Open Positions', value: 'open', numerator: this.getSearches('open').length },
        { title: 'Projected Vacancies', value: 'pv', numerator: this.getSearches('pv').length },
      ];
    }

    const searches = { results: this.getSearches() };

    return (
      <div
        className={`usa-grid-full profile-content-inner-container saved-searches-container saved-searches-page
        ${(isLoading) ? 'results-loading' : ''}`}
      >
        <div className="usa-grid-full searches-top-section">
          <div className="searches-title-container">
            <ProfileSectionTitle title="Saved Searches" icon="clock-o" />
          </div>
          <div className="results-dropdown results-dropdown-sort">
            <SelectForm
              id="sort"
              label="Sort by:"
              onSelectOption={onSortChange}
              options={SAVED_SEARCH_SORTS.options}
              disabled={savedSearchesIsLoading}
            />
          </div>
        </div>
        {
          getUsePV() &&
          <Nav
            options={options}
            onClick={s => this.setState({ selected: s })}
            selected={this.state.selected}
            denominator={this.getSearches('all').length}
          />
        }
        {
          isLoading &&
            <Spinner type="homepage-position-results" size="big" />
        }
        {
          !isLoading &&
          <SavedSearchesList
            savedSearches={searches}
            goToSavedSearch={goToSavedSearch}
            deleteSearch={deleteSearch}
            mappedParams={mappedParams}
          />
        }
      </div>
    );
  }
}

SavedSearches.propTypes = {
  savedSearches: SAVED_SEARCH_PARENT_OBJECT.isRequired,
  savedSearchesIsLoading: PropTypes.bool.isRequired,
  goToSavedSearch: PropTypes.func.isRequired,
  deleteSearch: PropTypes.func.isRequired,
  mappedParams: MAPPED_PARAM_ARRAY,
  filtersIsLoading: PropTypes.bool.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

SavedSearches.defaultProps = {
  mappedParams: [],
};

export default SavedSearches;
