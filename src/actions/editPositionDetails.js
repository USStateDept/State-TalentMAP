/* eslint-disable no-unused-vars */
import { batch } from 'react-redux';
import { get, identity, isArray, isString, pickBy } from 'lodash';
import { CancelToken } from 'axios';
import { downloadFromResponse, formatDate, mapDuplicates } from 'utilities';
import Q from 'q';
import { stringify } from 'query-string';
import api from '../api';

let cancelEditPositionDetails;

export function editPositionDetailsFetchDataErrored(bool) {
  return {
    type: 'EDIT_POSITION_DETAILS_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function editPositionDetailsFetchDataLoading(bool) {
  return {
    type: 'EDIT_POSITION_DETAILS_FETCH_IS_LOADING',
    isLoading: bool,
  };
}

export function editPositionDetailsFetchDataSuccess(results) {
  return {
    type: 'EDIT_POSITION_DETAILS_FETCH_SUCCESS',
    results,
  };
}

export function editPositionDetailsFiltersFetchDataErrored(bool) {
  return {
    type: 'EDIT_POSITION_DETAILS_FILTERS_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function editPositionDetailsFiltersFetchDataLoading(bool) {
  return {
    type: 'EDIT_POSITION_DETAILS_FILTERS_FETCH_IS_LOADING',
    isLoading: bool,
  };
}

export function editPositionDetailsFiltersFetchDataSuccess(results) {
  return {
    type: 'EDIT_POSITION_DETAILS_FILTERS_FETCH_SUCCESS',
    results,
  };
}

// replace this with the utilities import
// once panelmeetingagendas pr is merged
const convertQueryToString = query => {
  let q = pickBy(query, identity);
  Object.keys(q).forEach(queryk => {
    if (isArray(q[queryk])) { q[queryk] = q[queryk].join(); }
    if (isString(q[queryk]) && !q[queryk]) {
      q[queryk] = undefined;
    }
  });
  q = stringify(q);
  return q;
};

export function editPositionDetailsExport(query = {}) {
  const q = convertQueryToString(query);
  const endpoint = '/fsbid/agenda_employees/export/'; // Replace with correct endpoint when available
  const ep = `${endpoint}?${q}`;
  return api()
    .get(ep)
    .then((response) => {
      downloadFromResponse(response, `Edit_Position_Details_${formatDate(new Date().getTime(), 'YYYY_M_D_Hms')}`);
    });
}

export function editPositionDetailsFetchData(query = {}) {
  return (dispatch) => {
    if (cancelEditPositionDetails) { cancelEditPositionDetails('cancel'); }
    batch(() => {
      dispatch(editPositionDetailsFetchDataLoading(true));
      dispatch(editPositionDetailsFetchDataErrored(false));
    });
    const q = convertQueryToString(query);
    const endpoint = '/fsbid/edit_position_details/';
    const ep = `${endpoint}?${q}`;
    api().get(ep, {
      cancelToken: new CancelToken((c) => {
        cancelEditPositionDetails = c;
      }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(editPositionDetailsFetchDataSuccess(data));
          dispatch(editPositionDetailsFetchDataErrored(false));
          dispatch(editPositionDetailsFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (get(err, 'message') === 'cancel') {
          batch(() => {
            dispatch(editPositionDetailsFetchDataErrored(false));
            dispatch(editPositionDetailsFetchDataLoading(true));
          });
        } else {
          batch(() => {
            dispatch(editPositionDetailsFetchDataSuccess([]));
            dispatch(editPositionDetailsFetchDataErrored(true));
            dispatch(editPositionDetailsFetchDataLoading(false));
          });
        }
      });
  };
}

export function editPositionDetailsSelectionsSaveSuccess(result) {
  return {
    type: 'EDIT_POSITION_DETAILS_SELECTIONS_SAVE_SUCCESS',
    result,
  };
}

export function saveEditPositionDetailsSelections(queryObject) {
  return (dispatch) => dispatch(editPositionDetailsSelectionsSaveSuccess(queryObject));
}

export function editPositionDetailsFiltersFetchData() {
  return (dispatch) => {
    batch(() => {
      dispatch(editPositionDetailsFiltersFetchDataSuccess({}));
      dispatch(editPositionDetailsFiltersFetchDataLoading(false));
    });
  };
}
