import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bureauPositionsFetchData } from 'actions/bureauPositions';
import { filtersFetchData } from 'actions/filters/filters';
import Spinner from 'Components/Spinner';

const ProjectedVacancySearch = props => {
  const {
    bureauFiltersIsLoading,
    isCDO,
  } = props;

  return (
    bureauFiltersIsLoading ?
      <Spinner type="bureau-filters" size="small" /> :
      <>
        <p>ProjectedVacancySearch {String(isCDO)}</p>
      </>
  );
};


ProjectedVacancySearch.propTypes = {
  bureauFiltersIsLoading: PropTypes.bool,
};

ProjectedVacancySearch.defaultProps = {
  bureauFilters: { filters: [] },
  bureauPositions: { results: [] },
  bureauFiltersIsLoading: false,
  bureauPositionsIsLoading: false,
};

const mapStateToProps = state => ({
  bureauPositions: state.bureauPositions,
  bureauPositionsIsLoading: state.bureauPositionsIsLoading,
  bureauPositionsHasErrored: state.bureauPositionsHasErrored,
  bureauFilters: state.filters,
  bureauFiltersIsLoading: state.filtersIsLoading,
});

export const mapDispatchToProps = dispatch => ({
  fetchBureauPositions: (query, bureauMenu) =>
    dispatch(bureauPositionsFetchData(query, bureauMenu)),
  fetchFilters: (items, queryParams, savedFilters) =>
    dispatch(filtersFetchData(items, queryParams, savedFilters)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectedVacancySearch);
