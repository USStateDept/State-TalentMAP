import { batch } from 'react-redux';
import api from '../api';

export function classificationsHasErrored(bool) {
  return {
    type: 'CLASSIFICATIONS_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function classificationsIsLoading(bool) {
  return {
    type: 'CLASSIFICATIONS_IS_LOADING',
    isLoading: bool,
  };
}

export function classificationsFetchDataSuccess(classifications) {
  return {
    type: 'CLASSIFICATIONS_FETCH_DATA_SUCCESS',
    classifications,
  };
}

export function fetchClassifications() {
  return (dispatch) => {
    batch(() => {
      dispatch(classificationsIsLoading(true));
      dispatch(classificationsHasErrored(false));
    });

    api()
      .get('/fsbid/reference/classifications/')
      .then(({ data }) => {
        batch(() => {
          dispatch(classificationsHasErrored(false));
          dispatch(classificationsIsLoading(false));
          dispatch(classificationsFetchDataSuccess(data));
        });
      })
      .catch(() => {
        batch(() => {
          dispatch(classificationsHasErrored(true));
          dispatch(classificationsIsLoading(false));
        });
      });
  };
}
