import { batch } from 'react-redux';
import { CancelToken } from 'axios';
import {
  MANAGE_POST_ACCESS_ADD_ERROR,
  MANAGE_POST_ACCESS_ADD_ERROR_TITLE,
  MANAGE_POST_ACCESS_ADD_SUCCESS,
  MANAGE_POST_ACCESS_ADD_SUCCESS_TITLE,
} from 'Constants/SystemMessages';
import api from '../api';
import { toastError, toastSuccess } from './toast';

const dummyData = [
  { id: 1, role: 'FSBid Organization Bidders', person: 'Frank Jones', position: '00000005 (Trade Negot)', post: 'Abidjan' },
  { id: 2, role: 'FSBid Organization Bidders', person: 'Frank Jones', position: '00000005 (Trade Negot)', post: 'Abidjan' },
  { id: 3, role: 'FSBid Organization Bidders', person: 'Frank Jones', position: '00000005 (Trade Negot)', post: 'Abidjan' },
  { id: 4, role: 'FSBid Organization Bidders', person: 'Frank Jones', position: '00000005 (Trade Negot)', post: 'Abidjan' },
  { id: 5, role: 'FSBid Organization Bidders', person: 'Frank Jones', position: '00000005 (Trade Negot)', post: 'Abidjan' },
  { id: 6, role: 'FSBid Organization Bidders', person: 'Frank Jones', position: '00000005 (Trade Negot)', post: 'Abidjan' },
  { id: 7, role: 'FSBid Organization Bidders', person: 'Frank Jones', position: '00000005 (Trade Negot)', post: 'Abidjan' },
  { id: 11, role: 'FSBid Organization Bidders', person: 'Frank Jones', position: '00000005 (Trade Negot)', post: 'Abidjan' },
  { id: 21, role: 'FSBid Organization Bidders', person: 'Frank Jones', position: '00000005 (Trade Negot)', post: 'Abidjan' },
  { id: 31, role: 'FSBid Organization Bidders', person: 'Frank Jones', position: '00000005 (Trade Negot)', post: 'Abidjan' },
  { id: 41, role: 'FSBid Organization Bidders', person: 'Frank Jones', position: '00000005 (Trade Negot)', post: 'Abidjan' },
  { id: 51, role: 'FSBid Organization Bidders', person: 'Frank Jones', position: '00000005 (Trade Negot)', post: 'Abidjan' },
  { id: 61, role: 'FSBid Organization Bidders', person: 'Frank Jones', position: '00000005 (Trade Negot)', post: 'Abidjan' },
  { id: 71, role: 'FSBid Organization Bidders', person: 'Frank Jones', position: '00000005 (Trade Negot)', post: 'Abidjan' },
  { id: 12, role: 'FSBid Organization Bidders', person: 'Frank Jones', position: '00000005 (Trade Negot)', post: 'Abidjan' },
  { id: 22, role: 'FSBid Organization Bidders', person: 'Frank Jones', position: '00000005 (Trade Negot)', post: 'Abidjan' },
  { id: 32, role: 'FSBid Organization Bidders', person: 'Frank Jones', position: '00000005 (Trade Negot)', post: 'Abidjan' },
  { id: 42, role: 'FSBid Organization Bidders', person: 'Frank Jones', position: '00000005 (Trade Negot)', post: 'Abidjan' },
  { id: 52, role: 'FSBid Organization Bidders', person: 'Frank Jones', position: '00000005 (Trade Negot)', post: 'Abidjan' },
  { id: 62, role: 'FSBid Organization Bidders', person: 'Frank Jones', position: '00000005 (Trade Negot)', post: 'Abidjan' },
  { id: 72, role: 'FSBid Organization Bidders', person: 'Frank Jones', position: '00000005 (Trade Negot)', post: 'Abidjan' },
  { id: 13, role: 'FSBid Organization Bidders', person: 'Frank Jones', position: '00000005 (Trade Negot)', post: 'Abidjan' },
  { id: 23, role: 'FSBid Organization Bidders', person: 'Frank Jones', position: '00000005 (Trade Negot)', post: 'Abidjan' },
  { id: 33, role: 'FSBid Organization Bidders', person: 'Frank Jones', position: '00000005 (Trade Negot)', post: 'Abidjan' },
  { id: 43, role: 'FSBid Organization Bidders', person: 'Frank Jones', position: '00000005 (Trade Negot)', post: 'Abidjan' },
  { id: 53, role: 'FSBid Organization Bidders', person: 'Frank Jones', position: '00000005 (Trade Negot)', post: 'Abidjan' },
  { id: 63, role: 'FSBid Organization Bidders', person: 'Frank Jones', position: '00000005 (Trade Negot)', post: 'Abidjan' },
  { id: 73, role: 'FSBid Organization Bidders', person: 'Frank Jones', position: '00000005 (Trade Negot)', post: 'Abidjan' },
  { id: 14, role: 'FSBid Organization Bidders', person: 'Frank Jones', position: '00000005 (Trade Negot)', post: 'Abidjan' },
  { id: 24, role: 'FSBid Organization Bidders', person: 'Frank Jones', position: '00000005 (Trade Negot)', post: 'Abidjan' },
  { id: 34, role: 'FSBid Organization Bidders', person: 'Frank Jones', position: '00000005 (Trade Negot)', post: 'Abidjan' },
  { id: 44, role: 'FSBid Organization Bidders', person: 'Frank Jones', position: '00000005 (Trade Negot)', post: 'Abidjan' },
  { id: 54, role: 'FSBid Organization Bidders', person: 'Frank Jones', position: '00000005 (Trade Negot)', post: 'Abidjan' },
  { id: 64, role: 'FSBid Organization Bidders', person: 'Frank Jones', position: '00000005 (Trade Negot)', post: 'Abidjan' },
  { id: 74, role: 'FSBid Organization Bidders', person: 'Frank Jones', position: '00000005 (Trade Negot)', post: 'Abidjan' },
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

export function managePostEditErrored(bool) {
  return {
    type: 'MANAGE_POST_EDIT_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function managePostEditLoading(bool) {
  return {
    type: 'MANAGE_POST_EDIT_IS_LOADING',
    isLoading: bool,
  };
}
export function managePostEditSuccess(results) {
  return {
    type: 'MANAGE_POST_EDIT_SUCCESS',
    results,
  };
}

let cancel;
export function managePostEdit(positions) {
  return (dispatch) => {
    if (cancel) { cancel('cancel'); }
    dispatch(managePostEditLoading(true));
    dispatch(managePostEditErrored(false));
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
          dispatch(managePostEditErrored(false));
          dispatch(managePostEditSuccess(data || []));
          dispatch(
            toastSuccess(
              MANAGE_POST_ACCESS_ADD_SUCCESS, MANAGE_POST_ACCESS_ADD_SUCCESS_TITLE,
            ));
          dispatch(managePostEditLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          dispatch(managePostEditErrored(false));
          dispatch(managePostEditLoading(false));
        } else {
          dispatch(toastError(
            MANAGE_POST_ACCESS_ADD_ERROR, MANAGE_POST_ACCESS_ADD_ERROR_TITLE,
          ));
          dispatch(managePostEditErrored(true));
          dispatch(managePostEditLoading(false));
        }
      });
  };
}


export function managePostFetchDataErrored(bool) {
  return {
    type: 'MANAGE_POST_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function managePostFetchDataLoading(bool) {
  return {
    type: 'MANAGE_POST_FETCH_IS_LOADING',
    isLoading: bool,
  };
}

export function managePostFetchDataSuccess(results) {
  return {
    type: 'MANAGE_POST_FETCH_SUCCESS',
    results,
  };
}

export function managePostFetchData(query = {}) {
  return (dispatch) => {
    batch(() => {
      dispatch(managePostFetchDataLoading(true));
      dispatch(managePostFetchDataErrored(false));
    });
    // const q = convertQueryToString(query);
    // const endpoint = `sweet/new/endpoint/we/can/pass/a/query/to/?${q}`;
    // api().get(endpoint)
    dispatch(managePostFetchDataLoading(true));
    dummyDataToReturn(query)
      .then((data) => {
        batch(() => {
          dispatch(managePostFetchDataSuccess(data));
          dispatch(managePostFetchDataErrored(false));
          dispatch(managePostFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(managePostFetchDataLoading(true));
            dispatch(managePostFetchDataErrored(false));
          });
        } else {
          batch(() => {
            dispatch(managePostFetchDataSuccess(dummyDataToReturn));
            dispatch(managePostFetchDataErrored(false));
            dispatch(managePostFetchDataLoading(false));
          });
        }
      });
  };
}

export function managePostSelectionsSaveSuccess(result) {
  return {
    type: 'MANAGE_POST_SELECTIONS_SAVE_SUCCESS',
    result,
  };
}

export function saveManagePostSelections(queryObject) {
  return (dispatch) => dispatch(managePostSelectionsSaveSuccess(queryObject));
}

export function managePostFiltersFetchDataErrored(bool) {
  return {
    type: 'MANAGE_POST_FILTERS_FETCH_ERRORED',
    hasErrored: bool,
  };
}

export function managePostFiltersFetchDataLoading(bool) {
  return {
    type: 'MANAGE_POST_FILTERS_FETCH_IS_LOADING',
    isLoading: bool,
  };
}

export function managePostFiltersFetchDataSuccess(results) {
  return {
    type: 'MANAGE_POST_FILTERS_FETCH_SUCCESS',
    results,
  };
}

export function managePostFiltersFetchData() {
  return (dispatch) => {
    batch(() => {
      dispatch(managePostFiltersFetchDataSuccess({}));
      dispatch(managePostFiltersFetchDataLoading(false));
    });
  };
}
