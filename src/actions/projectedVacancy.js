import {
  ADD_TO_PROPOSED_CYCLE_ERROR,
  ADD_TO_PROPOSED_CYCLE_ERROR_TITLE,
  ADD_TO_PROPOSED_CYCLE_SUCCESS,
  ADD_TO_PROPOSED_CYCLE_SUCCESS_TITLE,
  UPDATE_PROJECTED_VACANCY_ERROR,
  UPDATE_PROJECTED_VACANCY_ERROR_TITLE,
  UPDATE_PROJECTED_VACANCY_SUCCESS,
  UPDATE_PROJECTED_VACANCY_SUCCESS_TITLE,
} from 'Constants/SystemMessages';
import { batch } from 'react-redux';
import api from '../api';
import { toastError, toastSuccess } from './toast';

const dummyPositionDetails = {
  id: '2561',
  status: null,
  status_code: 'OP',
  ted: '2025-05-12T21:12:12.854000Z',
  posted_date: '2022-10-26T21:12:12.854000Z',
  availability: {
    availability: null,
    reason: null,
  },
  position: {
    id: null,
    grade: '05',
    skill: 'ECON RESOURCES & COMMODITIES (5050)',
    skill_code: '5050',
    skill_secondary: 'CONSULAR AFFAIRS (3001)',
    skill_secondary_code: '3001',
    bureau: '(EUR) BUR OF EUROPEAN AFF AND EURASIAN AFFAIRS',
    bureau_code: '120000',
    bureau_short_desc: 'EUR',
    organization: '(A/LM/OPS/TTM) TRANSPORTATION & TRAVEL MANAGEMENT DIVISION',
    tour_of_duty: '2 YRS/HLRT/2 YRS',
    classifications: null,
    representation: null,
    availability: {
      availability: null,
      reason: null,
    },
    position_number: '55207000',
    title: 'INFORMATION MANAGEMENT SPEC',
    is_overseas: null,
    create_date: null,
    update_date: '2022-11-07T21:12:12.019000Z',
    update_user: null,
    effective_date: null,
    posted_date: '2022-10-26T21:12:12.854000Z',
    description: {
      id: null,
      last_editing_user: null,
      is_editable_by_user: null,
      date_created: null,
      date_updated: '2022-11-07T11:12:12.184000Z',
      content: '&#40;Updated June 20070  One of 3 IMS staff members working in the IPC. The incumbent reports directly to the IPO, but is required to perform his assigned duties without supervision on a regular basis when the IPO is absent or when acting as the duty communications officer. Depending on individual job assignments, the incumbent may be assigned to supervise an LE Staff telephone technician, 3 LE Staff telephone operators, or two mailroom staff members. Acts as the Classified LAN &#40;CLAN&#41; systems administrator. May serve as Comsec or WPAS custodian, primary or backup Nortel Switch Administrator/IMS telephone technician. IPC staff manages approximately 50 CX workstations with W2K Client on W2003 Server, the TERP5, CableXpress, Exchange 2000 Server, and the E&#38;E and HF Radio Program- POC IMO Bill Hylton - PHONE NUMBER: 907-8005',
      point_of_contact: null,
      website: null,
    },
    current_assignment: {
      user: null,
      user_perdet_seq_num: null,
      tour_of_duty: '2 YRS/HLRT/2 YRS',
      status: null,
      start_date: null,
      estimated_end_date: '2016-10-17T05:00:00Z',
    },
    commuterPost: {
      description: null,
      frequency: null,
    },
    post: {
      id: null,
      code: 'NI0140000',
      tour_of_duty: '2 YRS/HLRT/2 YRS',
      post_overview_url: {
        internal: 'http://localhost:4000/post/detail/5',
        external: 'http://localhost:4000/external/post/detail/5',
      },
      post_bidding_considerations_url: {
        internal: 'http://localhost:4000/post/postdatadetails/5',
        external: 'http://localhost:4000/external/post/postdatadetails/5',
      },
      cost_of_living_adjustment: null,
      differential_rate: 15,
      danger_pay: 35,
      rest_relaxation_point: null,
      has_consumable_allowance: null,
      has_service_needs_differential: null,
      obc_id: '5',
      location: {
        country: 'USA',
        code: 'NI0140000',
        city: 'Foxworth',
        state: 'Tennessee',
      },
    },
    latest_bidcycle: {
      id: 160,
      name: 'Details/Training 2019',
      cycle_start_date: null,
      cycle_deadline_date: null,
      cycle_end_date: null,
      active: null,
    },
    languages: [
      {
        language: 'Japanese',
        reading_proficiency: '1',
        spoken_proficiency: '1',
        representation: 'Japanese (JA) 1/1',
      },
      {
        language: 'Telugu',
        reading_proficiency: '1',
        spoken_proficiency: '1',
        representation: 'Telugu (TE) 1/1',
      },
    ],
  },
  bidcycle: {
    id: 160,
    name: 'Details/Training 2019',
    cycle_start_date: null,
    cycle_deadline_date: null,
    cycle_end_date: null,
    active: null,
    handshake_allowed_date: null,
  },
  bid_handshake: {
    active_handshake_perdet: null,
  },
  lead_handshake: {
    hs_status_code: null,
    bidder_hs_code: null,
    hs_cdo_indicator: false,
    hs_date_accepted: null,
    hs_date_declined: null,
    hs_date_offered: null,
    hs_date_revoked: null,
    hs_date_expiration: null,
  },
  unaccompaniedStatus: 'Fully Accompanied',
  isConsumable: false,
  isServiceNeedDifferential: true,
  isDifficultToStaff: false,
  isEFMInside: true,
  isEFMOutside: false,
  isHardToFill: false,
  has_short_list: false,
};

export function projectedVacancyAddToProposedCycleErrored(bool) {
  return {
    type: 'PROJECTED_VACANCY_ADD_TO_PROPOSED_CYCLE_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function projectedVacancyAddToProposedCycleLoading(bool) {
  return {
    type: 'PROJECTED_VACANCY_ADD_TO_PROPOSED_CYCLE_IS_LOADING',
    isLoading: bool,
  };
}
export function projectedVacancyAddToProposedCycleSuccess(results) {
  return {
    type: 'PROJECTED_VACANCY_ADD_TO_PROPOSED_CYCLE_SUCCESS',
    results,
  };
}
export function projectedVacancyAddToProposedCycle(id, data) {
  return (dispatch) => {
    batch(() => {
      dispatch(projectedVacancyAddToProposedCycleLoading(true));
      dispatch(projectedVacancyAddToProposedCycleErrored(false));
    });

    api().patch(`ao/${id}/projectedVacancy/`, data)
      .then(() => {
        const toastTitle = ADD_TO_PROPOSED_CYCLE_SUCCESS_TITLE;
        const toastMessage = ADD_TO_PROPOSED_CYCLE_SUCCESS;
        batch(() => {
          dispatch(projectedVacancyAddToProposedCycleErrored(false));
          dispatch(projectedVacancyAddToProposedCycleSuccess(true));
          dispatch(toastSuccess(toastMessage, toastTitle));
          dispatch(projectedVacancyAddToProposedCycleSuccess());
          dispatch(projectedVacancyAddToProposedCycleLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(projectedVacancyAddToProposedCycleLoading(true));
            dispatch(projectedVacancyAddToProposedCycleErrored(false));
          });
        } else {
          // Start: temp toast logic
          // temp to randomly show toast error or success
          // when set up, just keep the error toast here
          const randInt = Math.floor(Math.random() * 2);
          if (randInt) {
            const toastTitle = ADD_TO_PROPOSED_CYCLE_ERROR_TITLE;
            const toastMessage = ADD_TO_PROPOSED_CYCLE_ERROR;
            dispatch(toastError(toastMessage, toastTitle));
          } else {
            const toastTitle = ADD_TO_PROPOSED_CYCLE_SUCCESS_TITLE;
            const toastMessage = ADD_TO_PROPOSED_CYCLE_SUCCESS;
            dispatch(toastSuccess(toastMessage, toastTitle));
          }
          // End: temp toast logic
          batch(() => {
            dispatch(projectedVacancyAddToProposedCycleErrored(true));
            dispatch(projectedVacancyAddToProposedCycleLoading(false));
          });
        }
      });
  };
}


export function projectedVacancyEditErrored(bool) {
  return {
    type: 'PROJECTED_VACANCY_EDIT_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function projectedVacancyEditLoading(bool) {
  return {
    type: 'PROJECTED_VACANCY_EDIT_IS_LOADING',
    isLoading: bool,
  };
}
export function projectedVacancyEditSuccess(results) {
  return {
    type: 'PROJECTED_VACANCY_EDIT_SUCCESS',
    results,
  };
}
export function projectedVacancyEdit(id, data) {
  return (dispatch) => {
    batch(() => {
      dispatch(projectedVacancyEditLoading(true));
      dispatch(projectedVacancyEditErrored(false));
    });

    api().patch(`ao/${id}/projectedVacancy/`, data)
      .then(() => {
        const toastTitle = UPDATE_PROJECTED_VACANCY_SUCCESS_TITLE;
        const toastMessage = UPDATE_PROJECTED_VACANCY_SUCCESS;
        batch(() => {
          dispatch(projectedVacancyEditErrored(false));
          dispatch(projectedVacancyEditSuccess(true));
          dispatch(toastSuccess(toastMessage, toastTitle));
          dispatch(projectedVacancyEditSuccess());
          dispatch(projectedVacancyEditLoading(false));
        });
      })
      .catch((err) => {
        if (err?.message === 'cancel') {
          batch(() => {
            dispatch(projectedVacancyEditLoading(true));
            dispatch(projectedVacancyEditErrored(false));
          });
        } else {
          // Start: temp toast logic
          // temp to randomly show toast error or success
          // when set up, just keep the error toast here
          const randInt = Math.floor(Math.random() * 2);
          if (randInt) {
            const toastTitle = UPDATE_PROJECTED_VACANCY_ERROR_TITLE;
            const toastMessage = UPDATE_PROJECTED_VACANCY_ERROR;
            dispatch(toastError(toastMessage, toastTitle));
          } else {
            const toastTitle = UPDATE_PROJECTED_VACANCY_SUCCESS_TITLE;
            const toastMessage = UPDATE_PROJECTED_VACANCY_SUCCESS;
            dispatch(toastSuccess(toastMessage, toastTitle));
          }
          // End: temp toast logic
          batch(() => {
            dispatch(projectedVacancyEditErrored(true));
            dispatch(projectedVacancyEditLoading(false));
          });
        }
      });
  };
}


export function projectedVacancyFetchDataErrored(bool) {
  return {
    type: 'PROJECTED_VACANCY_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}
export function projectedVacancyFetchDataLoading(bool) {
  return {
    type: 'PROJECTED_VACANCY_FETCH_IS_LOADING',
    isLoading: bool,
  };
}
export function projectedVacancyFetchDataSuccess(results) {
  return {
    type: 'PROJECTED_VACANCY_FETCH_SUCCESS',
    results,
  };
}
<<<<<<< HEAD
=======

export function testingMergingConflictsRaisingErrors() {
  return 'this is a test';
}
>>>>>>> dev
export function projectedVacancyFetchData() {
  return (dispatch) => {
    batch(() => {
      dispatch(projectedVacancyFetchDataSuccess(dummyPositionDetails));
      dispatch(projectedVacancyFetchDataErrored(false));
      dispatch(projectedVacancyFetchDataLoading(false));
    });
  };
}


export function projectedVacancySelectionsSaveSuccess(result) {
  return {
    type: 'PROJECTED_VACANCY_SELECTIONS_SAVE_SUCCESS',
    result,
  };
}
export function saveProjectedVacancySelections(queryObject) {
  return (dispatch) => dispatch(projectedVacancySelectionsSaveSuccess(queryObject));
}


export function projectedVacancyFiltersFetchDataErrored(bool) {
  return {
    type: 'PROJECTED_VACANCY_FILTERS_FETCH_ERRORED',
    hasErrored: bool,
  };
}
export function projectedVacancyFiltersFetchDataLoading(bool) {
  return {
    type: 'PROJECTED_VACANCY_FILTERS_FETCH_IS_LOADING',
    isLoading: bool,
  };
}
export function projectedVacancyFiltersFetchDataSuccess(results) {
  return {
    type: 'PROJECTED_VACANCY_FILTERS_FETCH_SUCCESS',
    results,
  };
}
export function projectedVacancyFiltersFetchData() {
  return (dispatch) => {
    batch(() => {
      dispatch(projectedVacancyFiltersFetchDataSuccess({}));
      dispatch(projectedVacancyFiltersFetchDataLoading(false));
    });
  };
}
