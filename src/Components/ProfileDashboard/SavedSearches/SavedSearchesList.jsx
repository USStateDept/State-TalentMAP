import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { MAPPED_PARAM_ARRAY, SAVED_SEARCH_PARENT_OBJECT } from 'Constants/PropTypes';
import SectionTitle from '../SectionTitle';
import BorderedList from '../../BorderedList';
import SavedSearchesListResultsCard from './SavedSearchesListResultsCard';
import Spinner from '../../Spinner';
import NoSavedSearches from '../../EmptyListAlert/NoSavedSearches';

const SavedSearchesList = ({ savedSearches, goToSavedSearch, mappedParams, filtersIsLoading }) => {
  const savedSearchArray = [];
  get(savedSearches, 'results', []).slice(0, 3).forEach(savedSearch => (
    savedSearchArray.push(
      <SavedSearchesListResultsCard
        savedSearch={savedSearch}
        goToSavedSearch={goToSavedSearch}
        mappedParams={mappedParams}
        /* pass a parentClassName that we can use from the BorderedList component */
        parentClassName="parent-list-container list-transparent"
        isProjectedVacancy={savedSearch.endpoint === '/api/v1/fsbid/projected_vacancies/' || savedSearch.endpoint === '/api/v1/fsbid/projected_vacancies/tandem/'}
        isTandemSearch={savedSearch.endpoint === '/api/v1/fsbid/available_positions/tandem/' || savedSearch.endpoint === '/api/v1/fsbid/projected_vacancies/tandem/'}
      />,
    )
  ));
  return (
    <div className="usa-grid-full saved-searches-list-profile-container">
      {filtersIsLoading ?
        <Spinner type="saved-searches" size="big" />
        :
        <div className="usa-grid-full">
          <div className="usa-grid-full section-padded-inner-container">
            <div className="usa-width-one-whole">
              <SectionTitle title="Saved Searches" icon="clock-o" len={get(savedSearches, 'results.length')} />
            </div>
          </div>
          <div className="saved-search-list-container">
            {
              savedSearchArray.length === 0 ?
                <div className="usa-grid-full section-padded-inner-container">
                  <NoSavedSearches />
                </div>
                :
                <BorderedList contentArray={savedSearchArray} />
            }
          </div>
          <div className="section-padded-inner-container small-link-container view-more-link-centered">
            <Link to="/profile/searches/">View more</Link>
          </div>
        </div>
      }
    </div>
  );
};

SavedSearchesList.propTypes = {
  savedSearches: SAVED_SEARCH_PARENT_OBJECT.isRequired,
  goToSavedSearch: PropTypes.func.isRequired,
  mappedParams: MAPPED_PARAM_ARRAY,
  filtersIsLoading: PropTypes.bool,
};

SavedSearchesList.defaultProps = {
  savedSearches: [],
  mappedParams: [],
  filtersIsLoading: false,
};

export default SavedSearchesList;
