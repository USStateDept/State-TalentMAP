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

    const queryTypes = [{ name: 'isPopular', query: 'limit=3' }, { name: 'isNew', query: 'ordering=create_date&limit=5' }];

    const queryProms = queryTypes.map(type => axios.get(`${api}/position/?${type.query}`));

    Promise.all(queryProms)
      // Promise.all returns a single array which matches the order of the originating array
      .then((results) => {
        // because of that, we can be sure results[x] aligns with queryTypes[x]
        // and set the relevant resultsType property accordingly
        resultsTypes[queryTypes[0].name] = results[0].data.results;
        resultsTypes[queryTypes[1].name] = results[1].data.results;
        dispatch(homePagePositionsHasErrored(false));
        dispatch(homePagePositionsIsLoading(false));
        dispatch(homePagePositionsFetchDataSuccess(resultsTypes));
      })
      .catch(() => {
        dispatch(homePagePositionsHasErrored(true));
        dispatch(homePagePositionsIsLoading(false));
      });
  };
}
