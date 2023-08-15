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
  { id: 1, access_type: 'Employee Access', bureau: 'AF', post: 'Azerbaijan', employee: 'Holden, James', role: 'FSBid Organization Bidders', position: '---', title: '---' },
  { id: 2, access_type: 'Employee Access', bureau: 'AF', post: 'Senegal', employee: 'Nagata, Naomi', role: 'FSBid Organization Capsule Positions', position: '---', title: '---' },
  { id: 3, access_type: 'Employee Access', bureau: 'AF', post: 'Azerbaijan', employee: 'Burton, Amos', role: 'FSBid Organization Bidders', position: '---', title: '---' },
  { id: 4, access_type: 'Employee Access', bureau: 'AF', post: 'Germany', employee: 'Kamal, Alex', role: 'FSBid Organization Capsule Positions', position: '---', title: '---' },
  { id: 11, access_type: 'Employee Access', bureau: 'AF', post: 'Azerbaijan', employee: 'Holden, James', role: 'FSBid Organization Bidders', position: '---', title: '---' },
  { id: 21, access_type: 'Employee Access', bureau: 'AF', post: 'Senegal', employee: 'Nagata, Naomi', role: 'FSBid Organization Capsule Positions', position: '---', title: '---' },
  { id: 31, access_type: 'Employee Access', bureau: 'AF', post: 'Azerbaijan', employee: 'Burton, Amos', role: 'FSBid Organization Bidders', position: '---', title: '---' },
  { id: 41, access_type: 'Employee Access', bureau: 'AF', post: 'Germany', employee: 'Kamal, Alex', role: 'FSBid Organization Capsule Positions', position: '---', title: '---' },
  { id: 112, access_type: 'Employee Access', bureau: 'AF', post: 'Azerbaijan', employee: 'Holden, James', role: 'FSBid Organization Bidders', position: '---', title: '---' },
  { id: 212, access_type: 'Employee Access', bureau: 'AF', post: 'Senegal', employee: 'Nagata, Naomi', role: 'FSBid Organization Capsule Positions', position: '---', title: '---' },
  { id: 312, access_type: 'Employee Access', bureau: 'AF', post: 'Azerbaijan', employee: 'Burton, Amos', role: 'FSBid Organization Bidders', position: '---', title: '---' },
  { id: 412, access_type: 'Employee Access', bureau: 'AF', post: 'Germany', employee: 'Kamal, Alex', role: 'FSBid Organization Capsule Positions', position: '---', title: '---' },
  { id: 1123, access_type: 'Employee Access', bureau: 'AF', post: 'Azerbaijan', employee: 'Holden, James', role: 'FSBid Organization Bidders', position: '---', title: '---' },
  { id: 2123, access_type: 'Employee Access', bureau: 'AF', post: 'Senegal', employee: 'Nagata, Naomi', role: 'FSBid Organization Capsule Positions', position: '---', title: '---' },
  { id: 3123, access_type: 'Employee Access', bureau: 'AF', post: 'Azerbaijan', employee: 'Burton, Amos', role: 'FSBid Organization Bidders', position: '---', title: '---' },
  { id: 4123, access_type: 'Employee Access', bureau: 'AF', post: 'Germany', employee: 'Kamal, Alex', role: 'FSBid Organization Capsule Positions', position: '---', title: '---' },
  { id: 1124, access_type: 'Employee Access', bureau: 'AF', post: 'Azerbaijan', employee: 'Holden, James', role: 'FSBid Organization Bidders', position: '---', title: '---' },
  { id: 2124, access_type: 'Employee Access', bureau: 'AF', post: 'Senegal', employee: 'Nagata, Naomi', role: 'FSBid Organization Capsule Positions', position: '---', title: '---' },
  { id: 3124, access_type: 'Employee Access', bureau: 'AF', post: 'Azerbaijan', employee: 'Burton, Amos', role: 'FSBid Organization Bidders', position: '---', title: '---' },
  { id: 4124, access_type: 'Employee Access', bureau: 'AF', post: 'Germany', employee: 'Kamal, Alex', role: 'FSBid Organization Capsule Positions', position: '---', title: '---' },
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
    type: 'SEARCH_POST_ACCESS_SELECTIONS_SAVE_SUCCESS',
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

export function searchPostAccessRemove(positions) {
  return (dispatch) => {
    if (cancel) { cancel('cancel'); }
    dispatch(searchPostAccessRemoveIsLoading(true));
    dispatch(searchPostAccessRemoveHasErrored(false));
    api()
      .post('/placeholder/POST/endpoint', {
        positions,
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
