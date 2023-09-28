import {
  DELETE_BID_AUDIT_ERROR,
  DELETE_BID_AUDIT_ERROR_TITLE,
  DELETE_BID_AUDIT_SUCCESS,
  DELETE_BID_AUDIT_SUCCESS_TITLE,
  UPDATE_BID_AUDIT_ERROR,
  UPDATE_BID_AUDIT_ERROR_TITLE,
  UPDATE_BID_AUDIT_SUCCESS,
  UPDATE_BID_AUDIT_SUCCESS_TITLE,
} from 'Constants/SystemMessages';
import { batch } from 'react-redux';
import api from '../api';
import { toastError, toastSuccess } from './toast';

// All of these Actions and Reducers will likely change during Integration
const dummyData = [
  {
    atGrades: [
      {
        header: 'Position',
        subHeader1: 'Grade',
        subHeader2: 'Skill Code',
        subHeader3: 'Description',
        row1data: '04',
        row2data: '2333',
        row3data: 'INFORMATION MANAGEMENT',
      },
      {
        header: 'Employee',
        subHeader1: 'Grade',
        subHeader2: 'Skill Code',
        subHeader3: 'Description',
        row1data: '04',
        row2data: '2333',
        row3data: 'INFORMATION MANAGEMENT',
      },
      {
        header: 'Tenure',
        subHeader1: 'Grade',
        subHeader2: 'Skill Code',
        row1data: '04',
        row2data: '2333',
      },
    ],
  },
  {
    inCategories: [
      {
        header: 'Position',
        subHeader1: 'Grade',
        subHeader2: 'Skill Code',
        subHeader3: 'Description',
        row1data: '04',
        row2data: '2333',
        row3data: 'INFORMATION MANAGEMENT',
      },
      {
        header: 'Employee',
        subHeader1: 'Grade',
        subHeader2: 'Skill Code',
        subHeader3: 'Description',
        row1data: '04',
        row2data: '2333',
        row3data: 'INFORMATION MANAGEMENT',
      },
    ],
  },
  {
    bidAudit: [
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
        description: 'Test Fall Cycle 2023',
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
        description: 'Test Summer Cycle 2023',
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
        description: 'Test Spring Cycle 2023',
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
        description: 'Test Winter Cycle 2023',
      },
    ],
  },
];

export function bidAuditErrored(bool) {
  return {
    type: 'BID_AUDIT_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function bidAuditLoading(bool) {
  return {
    type: 'BID_AUDIT_EDIT_IS_LOADING',
    isLoading: bool,
  };
}

export function bidAuditDeleteLoading(bool) {
  return {
    type: 'BID_AUDIT_DELETE_IS_LOADING',
    isLoading: bool,
  };
}

export function bidAuditSuccess(results) {
  return {
    type: 'BID_AUDIT_SUCCESS',
    results,
  };
}

export function savebidAuditSelections(data) {
  return (dispatch) => {
    dispatch(bidAuditLoading(true));
    dispatch(bidAuditErrored(false));
    api().post('/Placeholder/', data)
      .then(({ res }) => {
        batch(() => {
          dispatch(bidAuditErrored(false));
          dispatch(bidAuditSuccess(res));
          dispatch(toastSuccess(UPDATE_BID_AUDIT_SUCCESS,
            UPDATE_BID_AUDIT_SUCCESS_TITLE));
          dispatch(bidAuditLoading(false));
        });
      }).catch(() => {
        batch(() => {
          dispatch(toastError(UPDATE_BID_AUDIT_ERROR,
            UPDATE_BID_AUDIT_ERROR_TITLE));
          dispatch(bidAuditErrored(true));
          dispatch(bidAuditLoading(false));
        });
      });
  };
}

export function bidAuditDeleteDataErrored(bool) {
  return {
    type: 'BID_AUDIT_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function bidAuditDeleteDataSuccess(results) {
  return {
    type: 'BID_AUDIT_DELETE_SUCCESS',
    results,
  };
}

export function deleteBidAudit(id) {
  return (dispatch) => {
    dispatch(bidAuditDeleteLoading(true));
    api().delete(`/Placeholder/${id}/}`)
      .then(() => {
        dispatch(bidAuditDeleteLoading(false));
        dispatch(bidAuditDeleteDataErrored(false));
        dispatch(bidAuditDeleteDataSuccess('Successfully deleted the selected search.'));
        dispatch(toastSuccess(
          DELETE_BID_AUDIT_SUCCESS,
          DELETE_BID_AUDIT_SUCCESS_TITLE,
        ));
      })
      .catch(() => {
        dispatch(toastError(
          DELETE_BID_AUDIT_ERROR,
          DELETE_BID_AUDIT_ERROR_TITLE,
        ));
        dispatch(bidAuditDeleteLoading(false));
        dispatch(bidAuditDeleteDataSuccess(false));
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
