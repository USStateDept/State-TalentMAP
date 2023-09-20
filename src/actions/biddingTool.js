import {
  CREATE_BIDDING_TOOL_ERROR,
  CREATE_BIDDING_TOOL_ERROR_TITLE,
  CREATE_BIDDING_TOOL_SUCCESS,
  CREATE_BIDDING_TOOL_SUCCESS_TITLE,
  EDIT_BIDDING_TOOL_ERROR,
  EDIT_BIDDING_TOOL_ERROR_TITLE,
  EDIT_BIDDING_TOOL_SUCCESS,
  EDIT_BIDDING_TOOL_SUCCESS_TITLE,
} from 'Constants/SystemMessages';
import { batch } from 'react-redux';
import api from '../api';
import { toastError, toastSuccess } from './toast';

const dummyData = [{
  id: 1,
  post: 'Abidjan, Cote Divoire',
  post_code: 'IV1000000',
  tod: '2 YRS (2 R & R)',
  rr_point: 'Paris',
  cola: 25,
  differential_rate: 25,
  consumable_allowance: false,
  apo_fpo_dpo: false,
  danger_pay: 1,
  snd: true,
  hds: true,
  unaccompanied_status: 'Fully Accompanied',
  housing_type: 'Government Owned/Leased',
  quarters: 'Furnished',
  school_year: 'Lorem ipsum',
  grade_adequater_education: 'Lorem ipsum',
  efm_employment_opportunities: 'Lorem ipsum',
  efm_issues: 'Lorem ipsum',
  medical: 'Lorem ipsum',
  remarks: 'Lorem ipsum',
  status: 'Active',
  gsa_location: 'Abidjan, Cote Divoire',
  climate_zone: 'Climate Zone',
  fm_fp_accepted: true,
  quarters_remarks: 'Lorem ipsum',
  special_ship_allow: 'Lorem ipsum',
  mission_efm_emp: true,
  outside_efm_emp: true,
}, {
  id: 2,
  post: 'Abidjan, Cote Divoire',
  post_code: 'IV1000000',
  tod: '2 YRS (2 R & R)',
  rr_point: 'Paris',
  cola: 25,
  differential_rate: 25,
  consumable_allowance: false,
  apo_fpo_dpo: false,
  danger_pay: 2,
  snd: true,
  hds: true,
  unaccompanied_status: 'Fully Accompanied',
  housing_type: 'Government Owned/Leased',
  quarters: 'Furnished',
  school_year: 'Lorem ipsum',
  grade_adequater_education: 'Lorem ipsum',
  efm_employment_opportunities: 'Lorem ipsum',
  efm_issues: 'Lorem ipsum',
  medical: 'Lorem ipsum',
  remarks: 'Lorem ipsum',
  status: 'Active',
  gsa_location: 'Abidjan, Cote Divoire',
  climate_zone: 'Climate Zone',
  fm_fp_accepted: true,
  quarters_remarks: 'Lorem ipsum',
  special_ship_allow: 'Lorem ipsum',
  mission_efm_emp: true,
  outside_efm_emp: true,
}];

// ================ BIDDING TOOL ================

export function biddingToolFetchDataErrored(bool) {
  return {
    type: 'BIDDING_TOOL_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function biddingToolFetchDataLoading(bool) {
  return {
    type: 'BIDDING_TOOL_FETCH_IS_LOADING',
    isLoading: bool,
  };
}
export function biddingToolFetchDataSuccess(results) {
  return {
    type: 'BIDDING_TOOL_FETCH_SUCCESS',
    results,
  };
}
export function biddingTool() {
  return (dispatch) => {
    batch(() => {
      dispatch(biddingToolFetchDataSuccess(dummyData[0]));
      dispatch(biddingToolFetchDataErrored(false));
      dispatch(biddingToolFetchDataLoading(false));
    });
  };
}


// ================ BIDDING TOOL LIST ================

export function biddingToolsFetchDataErrored(bool) {
  return {
    type: 'BIDDING_TOOLS_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function biddingToolsFetchDataLoading(bool) {
  return {
    type: 'BIDDING_TOOLS_FETCH_IS_LOADING',
    isLoading: bool,
  };
}
export function biddingToolsFetchDataSuccess(results) {
  return {
    type: 'BIDDING_TOOLS_FETCH_SUCCESS',
    results,
  };
}
export function biddingTools() {
  return (dispatch) => {
    batch(() => {
      dispatch(biddingToolsFetchDataSuccess(dummyData));
      dispatch(biddingToolsFetchDataErrored(false));
      dispatch(biddingToolsFetchDataLoading(false));
    });
  };
}


// ================ BIDDING TOOL EDIT ================

export function biddingToolEditHasErrored(bool) {
  return {
    type: 'BIDDING_TOOL_EDIT_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function biddingToolEditIsLoading(bool) {
  return {
    type: 'BIDDING_TOOL_EDIT_IS_LOADING',
    isLoading: bool,
  };
}
export function biddingToolEditSuccess(results) {
  return {
    type: 'BIDDING_TOOL_EDIT_SUCCESS',
    results,
  };
}
export function biddingToolEdit(data) {
  return (dispatch) => {
    batch(() => {
      dispatch(biddingToolEditIsLoading(true));
      dispatch(biddingToolEditHasErrored(false));
    });

    api().patch('biddingtool-ep/', data)
      .then(() => {
        const toastTitle = EDIT_BIDDING_TOOL_SUCCESS_TITLE;
        const toastMessage = EDIT_BIDDING_TOOL_SUCCESS;
        batch(() => {
          dispatch(biddingToolEditHasErrored(false));
          dispatch(biddingToolEditSuccess(true));
          dispatch(toastSuccess(toastMessage, toastTitle));
          dispatch(biddingToolEditSuccess());
          dispatch(biddingToolEditIsLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(biddingToolEditIsLoading(true));
            dispatch(biddingToolEditHasErrored(false));
          });
        } else {
          // Start: temp toast logic
          // temp to randomly show toast error or success
          // when set up, just keep the error toast here
          const randInt = Math.floor(Math.random() * 2);
          if (randInt) {
            const toastTitle = EDIT_BIDDING_TOOL_ERROR_TITLE;
            const toastMessage = EDIT_BIDDING_TOOL_ERROR;
            dispatch(toastError(toastMessage, toastTitle));
          } else {
            const toastTitle = EDIT_BIDDING_TOOL_SUCCESS_TITLE;
            const toastMessage = EDIT_BIDDING_TOOL_SUCCESS;
            dispatch(toastSuccess(toastMessage, toastTitle));
          }
          // End: temp toast logic
          batch(() => {
            dispatch(biddingToolEditHasErrored(true));
            dispatch(biddingToolEditIsLoading(false));
          });
        }
      });
  };
}


// ================ BIDDING TOOL CREATE ================

export function biddingToolCreateHasErrored(bool) {
  return {
    type: 'BIDDING_TOOL_CREATE_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function biddingToolCreateIsLoading(bool) {
  return {
    type: 'BIDDING_TOOL_CREATE_IS_LOADING',
    isLoading: bool,
  };
}
export function biddingToolCreateSuccess(results) {
  return {
    type: 'BIDDING_TOOL_CREATE_SUCCESS',
    results,
  };
}
export function biddingToolCreate(data) {
  return (dispatch) => {
    batch(() => {
      dispatch(biddingToolCreateIsLoading(true));
      dispatch(biddingToolCreateHasErrored(false));
    });

    api().patch('biddingtool-ep/', data)
      .then(() => {
        const toastTitle = CREATE_BIDDING_TOOL_SUCCESS_TITLE;
        const toastMessage = CREATE_BIDDING_TOOL_SUCCESS;
        batch(() => {
          dispatch(biddingToolCreateHasErrored(false));
          dispatch(biddingToolCreateSuccess(true));
          dispatch(toastSuccess(toastMessage, toastTitle));
          dispatch(biddingToolCreateSuccess());
          dispatch(biddingToolCreateIsLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(biddingToolCreateIsLoading(true));
            dispatch(biddingToolCreateHasErrored(false));
          });
        } else {
          // Start: temp toast logic
          // temp to randomly show toast error or success
          // when set up, just keep the error toast here
          const randInt = Math.floor(Math.random() * 2);
          if (randInt) {
            const toastTitle = CREATE_BIDDING_TOOL_ERROR_TITLE;
            const toastMessage = CREATE_BIDDING_TOOL_ERROR;
            dispatch(toastError(toastMessage, toastTitle));
          } else {
            const toastTitle = CREATE_BIDDING_TOOL_SUCCESS_TITLE;
            const toastMessage = CREATE_BIDDING_TOOL_SUCCESS;
            dispatch(toastSuccess(toastMessage, toastTitle));
          }
          // End: temp toast logic
          batch(() => {
            dispatch(biddingToolCreateHasErrored(true));
            dispatch(biddingToolCreateIsLoading(false));
          });
        }
      });
  };
}
