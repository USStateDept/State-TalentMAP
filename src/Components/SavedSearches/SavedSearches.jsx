import { useState } from 'react';
import PropTypes from 'prop-types';
import ProfileSectionTitle from '../ProfileSectionTitle';
import SelectForm from '../SelectForm';
import Spinner from '../Spinner';
import SavedSearchesList from './SavedSearchesList';
import {
  MAPPED_PARAM_ARRAY,
  SAVED_SEARCH_PARENT_OBJECT,
} from '../../Constants/PropTypes';
import { SAVED_SEARCH_SORTS } from '../../Constants/Sort';
import Nav from '../FavoritePositions/Nav';

const SavedSearches = props => {
  const [selected, setSelected] = useState('all');

  const {
    savedSearches,
    savedSearchesIsLoading,
    goToSavedSearch,
    deleteSearch,
    onSortChange,
    mappedParams,
    filtersIsLoading,
  } = props;

  const getSearches = useType => {
    const cycle = '/api/v1/cycleposition/';
    const pos = '/api/v1/position/';
    const ap = '/api/v1/fsbid/available_positions/';
    const pv = '/api/v1/fsbid/projected_vacancies/';
    const apts = '/api/v1/fsbid/available_positions/tandem/';
    const pvts = '/api/v1/fsbid/projected_vacancies/tandem/';

    const checkBy = useType || selected;
    switch (checkBy) {
      case 'open':
        return savedSearches.results.filter(f => f.endpoint === cycle ||
          f.endpoint === pos || f.endpoint === ap);
      case 'pv':
        return savedSearches.results.filter(f => f.endpoint === pv);
      case 'open-ts':
        return savedSearches.results.filter(f => f.endpoint === apts);
      case 'pv-ts':
        return savedSearches.results.filter(f => f.endpoint === pvts);
      default:
        return savedSearches.results
          .filter(f => f.endpoint === cycle || f.endpoint === pos || f.endpoint === ap ||
              f.endpoint === pv || f.endpoint === apts || f.endpoint === pvts);
    }
  };

  const isLoading = (filtersIsLoading || savedSearchesIsLoading);

  const options = [
    { title: 'All Saved Searches ', value: 'all', numerator: getSearches('all').length },
    { title: 'Open Positions ', value: 'open', numerator: getSearches('open').length },
    { title: 'Projected Vacancies ', value: 'pv', numerator: getSearches('pv').length },
    { title: 'Tandem Open Positions ', value: 'open-ts', numerator: getSearches('open-ts').length },
    { title: 'Tandem Projected Vacancies ', value: 'pv-ts', numerator: getSearches('pv-ts').length },
  ];

  const searches = { results: getSearches() };

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
            defaultValue={SAVED_SEARCH_SORTS.defaultSort}
            onSelectOption={onSortChange}
            options={SAVED_SEARCH_SORTS.options}
            disabled={savedSearchesIsLoading}
          />
        </div>
      </div>
      {
        <Nav
          options={options}
          onClick={setSelected}
          selected={selected}
          denominator={getSearches('all').length}
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
};

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
