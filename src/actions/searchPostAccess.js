import { batch } from 'react-redux';
import { CancelToken } from 'axios';
import {
  SEARCH_POST_ACCESS_REMOVE_ERROR,
  SEARCH_POST_ACCESS_REMOVE_ERROR_TITLE,
  SEARCH_POST_ACCESS_REMOVE_SUCCESS,
  SEARCH_POST_ACCESS_REMOVE_SUCCESS_TITLE,
} from 'Constants/SystemMessages';
import { toastError, toastSuccess } from './toast';
import api from '../api';

const dummyData = [
  { id: 1, name: 'Row 1', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 2, name: 'Row 2', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 3, name: 'Row 3', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 4, name: 'Row 4', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 5, name: 'Row 5', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 6, name: 'Row 6', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 7, name: 'Row 7', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 1, name: 'Row 1', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 2, name: 'Row 2', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 3, name: 'Row 3', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 4, name: 'Row 4', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 5, name: 'Row 5', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 6, name: 'Row 6', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 7, name: 'Row 7', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 1, name: 'Row 1', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 2, name: 'Row 2', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 3, name: 'Row 3', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 4, name: 'Row 4', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 5, name: 'Row 5', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 6, name: 'Row 6', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 7, name: 'Row 7', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 1, name: 'Row 1', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 2, name: 'Row 2', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 3, name: 'Row 3', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 4, name: 'Row 4', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 5, name: 'Row 5', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 6, name: 'Row 6', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 7, name: 'Row 7', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 1, name: 'Row 1', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 2, name: 'Row 2', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 3, name: 'Row 3', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 4, name: 'Row 4', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 5, name: 'Row 5', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 6, name: 'Row 6', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 7, name: 'Row 7', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
];
const dummyDataToReturn = (query) => new Promise((resolve) => {
  const { limit } = query;
  resolve({
    results: dummyData.slice(0, limit),
    count: dummyData.length,
    next: null,
    previous: null,
  });
});

export function searchPostAccessFetchDataErrored(bool) {
  return {
    type: 'SEARCH_POST_ACCESS_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function searchPostAccessFetchDataLoading(bool) {
  return {
    type: 'SEARCH_POST_ACCESS_FETCH_IS_LOADING',
    isLoading: bool,
  };
}

export function searchPostAccessFetchDataSuccess(results) {
  return {
    type: 'SEARCH_POST_ACCESS_FETCH_SUCCESS',
    results,
  };
}

let cancel;

export function searchPostAccessFetchData(query = {}) {
  return (dispatch) => {
    batch(() => {
      dispatch(searchPostAccessFetchDataLoading(true));
      dispatch(searchPostAccessFetchDataErrored(false));
    });
    // const q = convertQueryToString(query);
    // const endpoint = `sweet/new/endpoint/we/can/pass/a/query/to/?${q}`;
    // api().get(endpoint)
    dispatch(searchPostAccessFetchDataLoading(true));
    dummyDataToReturn(query)
      .then((data) => {
        batch(() => {
          dispatch(searchPostAccessFetchDataSuccess(data));
          dispatch(searchPostAccessFetchDataErrored(false));
          dispatch(searchPostAccessFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(searchPostAccessFetchDataLoading(true));
            dispatch(searchPostAccessFetchDataErrored(false));
          });
        } else {
          batch(() => {
            dispatch(searchPostAccessFetchDataSuccess(dummyDataToReturn));
            dispatch(searchPostAccessFetchDataErrored(false));
            dispatch(searchPostAccessFetchDataLoading(false));
          });
        }
      });
  };
}


export function searchPostAccessSelectionsSaveSuccess(result) {
  return {
    type: 'CYCLE_MANAGEMENT_SELECTIONS_SAVE_SUCCESS',
    result,
  };
}
export function searchPostAccessSaveSelections(queryObject) {
  return (dispatch) => dispatch(searchPostAccessSelectionsSaveSuccess(queryObject));
}


export function searchPostAccessRemoveHasErrored(bool) {
  return {
    type: 'SEARCH_POST_ACCESS_REMOVE_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function searchPostAccessRemoveIsLoading(bool) {
  return {
    type: 'SEARCH_POST_ACCESS_REMOVE_IS_LOADING',
    isLoading: bool,
  };
}

export function searchPostAccessRemoveSuccess(results) {
  return {
    type: 'SEARCH_POST_ACCESS_REMOVE_SUCCESS',
    results,
  };
}

export function searchPostAccessRemove(position) {
  return (dispatch) => {
    if (cancel) { cancel('cancel'); }
    dispatch(searchPostAccessRemoveIsLoading(true));
    dispatch(searchPostAccessRemoveHasErrored(false));
    api()
      .post('/placeholder/POST/endpoint', {
        position,
      }, {
        cancelToken: new CancelToken((c) => {
          cancel = c;
        }),
      })
      .then(({ data }) => {
        batch(() => {
          dispatch(searchPostAccessRemoveHasErrored(false));
          dispatch(searchPostAccessRemoveSuccess(data || []));
          dispatch(
            toastSuccess(
              SEARCH_POST_ACCESS_REMOVE_SUCCESS, SEARCH_POST_ACCESS_REMOVE_SUCCESS_TITLE,
            ));
          dispatch(searchPostAccessRemoveIsLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          dispatch(searchPostAccessRemoveHasErrored(false));
          dispatch(searchPostAccessRemoveIsLoading(false));
        } else {
          dispatch(toastError(
            SEARCH_POST_ACCESS_REMOVE_ERROR, SEARCH_POST_ACCESS_REMOVE_ERROR_TITLE,
          ));
          dispatch(searchPostAccessRemoveHasErrored(true));
          dispatch(searchPostAccessRemoveIsLoading(false));
        }
      });
  };
}
