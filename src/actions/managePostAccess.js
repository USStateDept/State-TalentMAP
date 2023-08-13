import {
  MANAGE_POST_ACCESS_ADD_ERROR,
  MANAGE_POST_ACCESS_ADD_ERROR_TITLE,
  MANAGE_POST_ACCESS_ADD_SUCCESS,
  MANAGE_POST_ACCESS_ADD_SUCCESS_TITLE,
} from 'Constants/SystemMessages';
import { batch } from 'react-redux';
import api from '../api';
import { toastError, toastSuccess } from './toast';

const dummyData = [
  { id: 1, name: 'Row 1', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 2, name: 'Row 2', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 3, name: 'Row 3', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 4, name: 'Row 4', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 5, name: 'Row 5', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 6, name: 'Row 6', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
  { id: 7, name: 'Row 7', description: 'FSBid Organization Bidders', value: 'Frank Jones', date: '00000005 (Trade Negot)', isChecked: false },
];

const dummyCountries = [
  { code: 1, name: 'Bahamas' },
  { code: 2, name: 'Andorra' },
  { code: 3, name: 'Vanuatu' },
  { code: 4, name: 'Malawi' },
  { code: 5, name: 'Equatorial Guinea' },
  { code: 6, name: 'Sierra Leone' },
  { code: 7, name: 'Mozambique' },
  { code: 8, name: 'France' },
  { code: 9, name: 'Sudan' },
  { code: 10, name: 'Iran' },
  { code: 11, name: 'Malta' },
  { code: 12, name: 'Papua New Guinea' },
  { code: 13, name: 'Congo' },
  { code: 14, name: 'Nauru' },
  { code: 15, name: 'Guatemala' },
  { code: 16, name: 'Wallis and Futuna' },
  { code: 17, name: 'Madagascar' },
  { code: 18, name: 'Virgin Islands' },
  { code: 19, name: 'Saint Pierre and Miquelon' },
  { code: 20, name: 'Tajikistan' },
  { code: 21, name: 'Trinidad and Tobago' },
  { code: 22, name: 'Iceland' },
  { code: 23, name: 'Italy' },
  { code: 24, name: 'Panama' },
  { code: 25, name: 'Lithuania' },
];

const dummyPeople = [
  { code: 1, name: 'John Smith' },
  { code: 2, name: 'Emily Johnson' },
  { code: 3, name: 'Michael Williams' },
  { code: 4, name: 'Emma Jones' },
  { code: 5, name: 'William Brown' },
  { code: 6, name: 'Olivia Davis' },
  { code: 7, name: 'James Miller' },
  { code: 8, name: 'Sophia Wilson' },
  { code: 9, name: 'Benjamin Taylor' },
  { code: 10, name: 'Ava Martinez' },
  { code: 11, name: 'Alexander Anderson' },
  { code: 12, name: 'Isabella Garcia' },
  { code: 13, name: 'Daniel Rodriguez' },
  { code: 14, name: 'Mia Martinez' },
  { code: 15, name: 'David Davis' },
  { code: 16, name: 'Charlotte Johnson' },
  { code: 17, name: 'Joseph Smith' },
  { code: 18, name: 'Sophia Wilson' },
  { code: 19, name: 'Matthew Anderson' },
  { code: 20, name: 'Olivia Taylor' },
];

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
export function managePostEdit(id, data) {
  return (dispatch) => {
    batch(() => {
      dispatch(managePostEditLoading(true));
      dispatch(managePostEditErrored(false));
    });

    api().patch(`ao/${id}/managePost/`, data)
      .then(() => {
        const toastTitle = MANAGE_POST_ACCESS_ADD_SUCCESS_TITLE;
        const toastMessage = MANAGE_POST_ACCESS_ADD_SUCCESS;
        batch(() => {
          dispatch(managePostEditErrored(false));
          dispatch(managePostEditSuccess(true));
          dispatch(toastSuccess(toastMessage, toastTitle));
          dispatch(managePostEditSuccess());
          dispatch(managePostEditLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(managePostEditLoading(true));
            dispatch(managePostEditErrored(false));
          });
        } else {
          const randInt = Math.floor(Math.random() * 2);
          if (randInt) {
            const toastTitle = MANAGE_POST_ACCESS_ADD_ERROR_TITLE;
            const toastMessage = MANAGE_POST_ACCESS_ADD_ERROR;
            dispatch(toastError(toastMessage, toastTitle));
          } else {
            const toastTitle = MANAGE_POST_ACCESS_ADD_SUCCESS_TITLE;
            const toastMessage = MANAGE_POST_ACCESS_ADD_SUCCESS;
            dispatch(toastSuccess(toastMessage, toastTitle));
          }
          batch(() => {
            dispatch(managePostEditErrored(true));
            dispatch(managePostEditLoading(false));
          });
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

export function managePostFetchData() {
  return (dispatch) => {
    batch(() => {
      dispatch(managePostFetchDataSuccess({ dummyData, dummyPeople, dummyCountries }));
      dispatch(managePostFetchDataErrored(false));
      dispatch(managePostFetchDataLoading(false));
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
