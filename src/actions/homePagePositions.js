import axios from 'axios';
import api from '../api';

export function homePagePositionsHasErrored(bool) {
  return {
    type: 'HOME_PAGE_POSITIONS_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function homePagePositionsIsLoading(bool) {
  return {
    type: 'HOME_PAGE_POSITIONS_IS_LOADING',
    isLoading: bool,
  };
}
export function homePagePositionsFetchDataSuccess(results) {
  return {
    type: 'HOME_PAGE_POSITIONS_FETCH_DATA_SUCCESS',
    results,
  };
}

// general positions search results
export function homePagePositionsFetchData() {
  return (dispatch) => {
    dispatch(homePagePositionsIsLoading(true));
    dispatch(homePagePositionsHasErrored(false));

    const resultsTypes = { isPopular: [], isNew: [] };

    // Have results been pushed to isPopular and isNew? If so, return success
    function checkForCompletion() {
      if (resultsTypes.isPopular.length && resultsTypes.isNew.length) {
        dispatch(homePagePositionsFetchDataSuccess(resultsTypes));
        dispatch(homePagePositionsIsLoading(false));
        dispatch(homePagePositionsHasErrored(false));
      }
    }

    const queryTypes = [{ name: 'isPopular', query: 'limit=3' }, { name: 'isNew', query: 'ordering=create_date&limit=5' }];
    queryTypes.forEach((type) => {
      axios.get(`${api}/position/?${type.query}`)
              .then((response) => {
                dispatch(homePagePositionsIsLoading(false));
                resultsTypes[type.name] = response.data.results;
                return true;
              })
              .then(() => checkForCompletion())
              .catch(() => {
                dispatch(homePagePositionsHasErrored(true));
                dispatch(homePagePositionsIsLoading(false));
              });
    });
  };
}
