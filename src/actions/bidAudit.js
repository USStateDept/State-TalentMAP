import {
  UPDATE_ENTRY_LEVEL_ERROR,
  UPDATE_ENTRY_LEVEL_ERROR_TITLE,
  UPDATE_ENTRY_LEVEL_SUCCESS,
  UPDATE_ENTRY_LEVEL_SUCCESS_TITLE,
} from 'Constants/SystemMessages';
import { batch } from 'react-redux';
import api from '../api';
import { toastError, toastSuccess } from './toast';

const dummyData = [
  {
    cycle_name: 'Fall Cycle 2023',
    descriptionTitle: 'INFORMATION MANAGEMENT',
    code: 2003,
    id: 96,
    cycle_status: 'Proposed',
    cycle_category: 'Active',
    bid_audit_date_posted: '2023-09-01T21:12:12.854000Z',
    bid_audit_date: '2025-03-01T21:12:12.854000Z',
    cycle_excl_position: 'Y',
    cycle_post_view: 'Y',
    description: 'This is a description for the Fall Cycle 2023',
  },
  {
    cycle_name: 'Summer Cycle 2023',
    descriptionTitle: 'INFORMATION MANAGEMENT',
    id: 97,
    cycle_status: 'Complete',
    cycle_category: 'Active',
    bid_audit_date_posted: '2025-06-01T21:12:12.854000Z',
    bid_audit_date: '2025-03-01T21:12:12.854000Z',
    cycle_excl_position: 'Y',
    cycle_post_view: 'Y',
    description: 'This is a description for the Summer Cycle 2023',
  },
  {
    cycle_name: 'Spring Cycle 2023',
    descriptionTitle: 'INFORMATION MANAGEMENT',
    id: 98,
    cycle_status: 'Closed',
    cycle_category: 'Closed',
    bid_audit_date_posted: '2025-03-01T21:12:12.854000Z',
    bid_audit_date: '2025-03-01T21:12:12.854000Z',
    cycle_excl_position: 'Y',
    cycle_post_view: 'Y',
    description: 'This is a description for the Spring Cycle 2023',
  },
  {
    cycle_name: 'Winter Cycle 2023',
    id: 99,
    cycle_status: 'Merged',
    cycle_category: 'Active',
    bid_audit_date_posted: '2022-12-01T21:12:12.854000Z',
    bid_audit_date: '2025-03-01T21:12:12.854000Z',
    cycle_excl_position: 'Y',
    cycle_post_view: 'Y',
    description: 'This is a description for the Winter Cycle 2023',
  },
];

export function bidAuditEditErrored(bool) {
  return {
    type: 'BID_AUDIT_EDIT_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function bidAuditEditLoading(bool) {
  return {
    type: 'BID_AUDIT_EDIT_IS_LOADING',
    isLoading: bool,
  };
}
export function bidAuditEditSuccess(results) {
  return {
    type: 'BID_AUDIT_EDIT_SUCCESS',
    results,
  };
}
export function bidAuditEdit(id, data) {
  return (dispatch) => {
    batch(() => {
      dispatch(bidAuditEditLoading(true));
      dispatch(bidAuditEditErrored(false));
    });

    api().patch(`/bidAudit/${id}`, data)
      .then(() => {
        const toastTitle = UPDATE_ENTRY_LEVEL_SUCCESS_TITLE;
        const toastMessage = UPDATE_ENTRY_LEVEL_SUCCESS;
        batch(() => {
          dispatch(bidAuditEditErrored(false));
          dispatch(bidAuditEditSuccess(true));
          dispatch(toastSuccess(toastMessage, toastTitle));
          dispatch(bidAuditEditSuccess());
          dispatch(bidAuditEditLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(bidAuditEditLoading(true));
            dispatch(bidAuditEditErrored(false));
          });
        } else {
          // Start: temp toast logic
          // temp to randomly show toast error or success
          // when set up, just keep the error toast here
          const randInt = Math.floor(Math.random() * 2);
          if (randInt) {
            const toastTitle = UPDATE_ENTRY_LEVEL_ERROR_TITLE;
            const toastMessage = UPDATE_ENTRY_LEVEL_ERROR;
            dispatch(toastError(toastMessage, toastTitle));
          } else {
            const toastTitle = UPDATE_ENTRY_LEVEL_SUCCESS_TITLE;
            const toastMessage = UPDATE_ENTRY_LEVEL_SUCCESS;
            dispatch(toastSuccess(toastMessage, toastTitle));
          }
          // End: temp toast logic
          batch(() => {
            dispatch(bidAuditEditErrored(true));
            dispatch(bidAuditEditLoading(false));
          });
        }
      });
  };
}


export function bidAuditFetchDataErrored(bool) {
  return {
    type: 'BID_AUDIT_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function bidAuditFetchDataLoading(bool) {
  return {
    type: 'BID_AUDIT_FETCH_IS_LOADING',
    isLoading: bool,
  };
}

export function bidAuditFetchDataSuccess(results) {
  return {
    type: 'BID_AUDIT_FETCH_SUCCESS',
    results,
  };
}

export function bidAuditFetchData() {
  return (dispatch) => {
    batch(() => {
      dispatch(bidAuditFetchDataSuccess(dummyData));
      dispatch(bidAuditFetchDataErrored(false));
      dispatch(bidAuditFetchDataLoading(false));
    });
  };
}


export function bidAuditSelectionsSaveSuccess(result) {
  return {
    type: 'BID_AUDIT_SELECTIONS_SAVE_SUCCESS',
    result,
  };
}
export function saveBidAuditSelections(queryObject) {
  return (dispatch) => dispatch(bidAuditSelectionsSaveSuccess(queryObject));
}


export function bidAuditFiltersFetchDataErrored(bool) {
  return {
    type: 'BID_AUDIT_FILTERS_FETCH_ERRORED',
    hasErrored: bool,
  };
}
export function bidAuditFiltersFetchDataLoading(bool) {
  return {
    type: 'BID_AUDIT_FILTERS_FETCH_IS_LOADING',
    isLoading: bool,
  };
}
export function bidAuditFiltersFetchDataSuccess(results) {
  return {
    type: 'BID_AUDIT_FILTERS_FETCH_SUCCESS',
    results,
  };
}
export function bidAuditFiltersFetchData() {
  return (dispatch) => {
    batch(() => {
      dispatch(bidAuditFiltersFetchDataSuccess({}));
      dispatch(bidAuditFiltersFetchDataLoading(false));
    });
  };
}
