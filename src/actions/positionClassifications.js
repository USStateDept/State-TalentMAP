import { batch } from 'react-redux';
import { uniqBy } from 'lodash';
import api from '../api';

export function positionClassificationsHasErrored(bool) {
  return {
    type: 'POSITION_CLASSIFICATIONS_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function positionClassificationsIsLoading(bool) {
  return {
    type: 'POSITION_CLASSIFICATIONS_IS_LOADING',
    isLoading: bool,
  };
}

export function positionClassificationsFetchDataSuccess(classifications) {
  return {
    type: 'POSITION_CLASSIFICATIONS_FETCH_DATA_SUCCESS',
    classifications,
  };
}

export function fetchPositionClassifications() {
  return (dispatch) => {
    batch(() => {
      dispatch(positionClassificationsIsLoading(true));
      dispatch(positionClassificationsHasErrored(false));
    });

    api()
      .get('/fsbid/reference/positionclassifications/')
      .then(({ data }) => {
        const data$ = uniqBy(data, 'code');
        batch(() => {
          dispatch(positionClassificationsHasErrored(false));
          dispatch(positionClassificationsIsLoading(false));
          dispatch(positionClassificationsFetchDataSuccess(data$));
        });
      })
      .catch(() => {
        batch(() => {
          dispatch(positionClassificationsHasErrored(true));
          dispatch(positionClassificationsIsLoading(false));
        });
      });
  };
}
