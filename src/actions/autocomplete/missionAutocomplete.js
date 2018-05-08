import { CancelToken } from 'axios';
import api from '../../api';

let cancel;

export function missionSearchHasErrored(bool) {
  return {
    type: 'MISSION_SEARCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function missionSearchIsLoading(bool) {
  return {
    type: 'MISSION_SEARCH_IS_LOADING',
    isLoading: bool,
  };
}

export function missionSearchSuccess(missions) {
  return {
    type: 'MISSION_SEARCH_FETCH_DATA_SUCCESS',
    missions,
  };
}

export function missionSearchFetchData(query) {
  return (dispatch) => {
    if (cancel) { cancel(); }
    dispatch(missionSearchHasErrored(false));
    dispatch(missionSearchIsLoading(true));
    api.get(`/country/?q=${query}&limit=3`, {
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
    })
    .then((response) => {
      dispatch(missionSearchIsLoading(false));
      return response.data.results;
    })
    .then(results => dispatch(missionSearchSuccess(results)))
    .catch(() => {
      dispatch(missionSearchHasErrored(true));
      dispatch(missionSearchIsLoading(false));
    });
  };
}
