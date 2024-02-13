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
import { CancelToken } from 'axios';
import { batch } from 'react-redux';
import { get } from 'lodash';
import api from '../api';
import { toastError, toastSuccess } from './toast';
import { convertQueryToString } from '../utilities';

let cancelProjectedVacancy;

// ================ GET LIST ================

export function projectedVacancyFetchDataErrored(bool) {
  return {
    type: 'PROJECTED_VACANCY_FETCH_ERRORED',
    hasErrored: bool,
  };
}
export function projectedVacancyFetchDataLoading(bool) {
  return {
    type: 'PROJECTED_VACANCY_FETCH_LOADING',
    isLoading: bool,
  };
}
export function projectedVacancyFetchDataSuccess(results) {
  return {
    type: 'PROJECTED_VACANCY_FETCH_SUCCESS',
    results,
  };
}

export function projectedVacancyFetchData(query = {}) {
  return (dispatch) => {
    batch(() => {
      dispatch(projectedVacancyFetchDataLoading(true));
      dispatch(projectedVacancyFetchDataErrored(false));
    });
    const q = convertQueryToString(query);
    const endpoint = '/fsbid/admin/projected_vacancies/';
    const ep = `${endpoint}?${q}`;
    api().get(ep)
      .then(({ data }) => {
        batch(() => {
          dispatch(projectedVacancyFetchDataSuccess(data));
          dispatch(projectedVacancyFetchDataErrored(false));
          dispatch(projectedVacancyFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (get(err, 'message') === 'cancel') {
          batch(() => {
            dispatch(projectedVacancyFetchDataErrored(false));
            dispatch(projectedVacancyFetchDataLoading(true));
          });
        } else {
          batch(() => {
            dispatch(projectedVacancyFetchDataErrored(true));
            dispatch(projectedVacancyFetchDataLoading(false));
          });
        }
      });
  };
}

// ================ EDIT FILTER SELECTIONS ================

export function projectedVacancySelectionsSaveSuccess(result) {
  return {
    type: 'PROJECTED_VACANCY_SELECTIONS_SAVE_SUCCESS',
    result,
  };
}
export function saveProjectedVacancySelections(queryObject) {
  return (dispatch) => dispatch(projectedVacancySelectionsSaveSuccess(queryObject));
}

// ================ GET FILTER DATA ================

export function projectedVacancyFiltersErrored(bool) {
  return {
    type: 'PROJECTED_VACANCY_FILTERS_ERRORED',
    hasErrored: bool,
  };
}
export function projectedVacancyFiltersLoading(bool) {
  return {
    type: 'PROJECTED_VACANCY_FILTERS_LOADING',
    isLoading: bool,
  };
}
export function projectedVacancyFiltersSuccess(results) {
  return {
    type: 'PROJECTED_VACANCY_FILTERS_SUCCESS',
    results,
  };
}
export function projectedVacancyFilters() {
  return (dispatch) => {
    if (cancelProjectedVacancy) {
      cancelProjectedVacancy('cancel');
      dispatch(projectedVacancyFiltersLoading(true));
    }
    batch(() => {
      dispatch(projectedVacancyFiltersLoading(true));
      dispatch(projectedVacancyFiltersErrored(false));
    });
    const ep = '/fsbid/admin/projected_vacancies/filters/';
    api().get(ep, {
      cancelToken: new CancelToken((c) => { cancelProjectedVacancy = c; }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(projectedVacancyFiltersSuccess(data));
          dispatch(projectedVacancyFiltersErrored(false));
          dispatch(projectedVacancyFiltersLoading(false));
        });
      })
      .catch(() => {
        batch(() => {
          dispatch(projectedVacancyFiltersErrored(true));
          dispatch(projectedVacancyFiltersLoading(false));
        });
      });
  };
}

// ================ GET LANGUAGE OFFSET DATA ================

export function projectedVacancyLanguageOffsetsErrored(bool) {
  return {
    type: 'PROJECTED_VACANCY_LANGUAGE_OFFSETS_ERRORED',
    hasErrored: bool,
  };
}
export function projectedVacancyLanguageOffsetsLoading(bool) {
  return {
    type: 'PROJECTED_VACANCY_LANGUAGE_OFFSETS_LOADING',
    isLoading: bool,
  };
}
export function projectedVacancyLanguageOffsetsSuccess(results) {
  return {
    type: 'PROJECTED_VACANCY_LANGUAGE_OFFSETS_SUCCESS',
    results,
  };
}
export function projectedVacancyLanguageOffsets() {
  return (dispatch) => {
    if (cancelProjectedVacancy) {
      cancelProjectedVacancy('cancel');
      dispatch(projectedVacancyLanguageOffsetsLoading(true));
    }
    batch(() => {
      dispatch(projectedVacancyLanguageOffsetsLoading(true));
      dispatch(projectedVacancyLanguageOffsetsErrored(false));
    });
    const ep = '/fsbid/admin/projected_vacancies/language_offsets/';
    api().get(ep, {
      cancelToken: new CancelToken((c) => { cancelProjectedVacancy = c; }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(projectedVacancyLanguageOffsetsSuccess(data));
          dispatch(projectedVacancyLanguageOffsetsErrored(false));
          dispatch(projectedVacancyLanguageOffsetsLoading(false));
        });
      })
      .catch(() => {
        batch(() => {
          dispatch(projectedVacancyLanguageOffsetsErrored(true));
          dispatch(projectedVacancyLanguageOffsetsLoading(false));
        });
      });
  };
}

// ================ EDIT ================

export function projectedVacancyEditErrored(bool) {
  return {
    type: 'PROJECTED_VACANCY_EDIT_ERRORED',
    hasErrored: bool,
  };
}
export function projectedVacancyEditLoading(bool) {
  return {
    type: 'PROJECTED_VACANCY_EDIT_LOADING',
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

    api().put(`/fsbid/projected_vacancies/${id}/`, data)
      .then(() => {
        const toastTitle = UPDATE_PROJECTED_VACANCY_SUCCESS_TITLE;
        const toastMessage = UPDATE_PROJECTED_VACANCY_SUCCESS;
        batch(() => {
          dispatch(projectedVacancyEditErrored(false));
          dispatch(projectedVacancyEditSuccess(true));
          dispatch(toastSuccess(toastMessage, toastTitle));
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

// ================ ADD TO PROPOSED CYCLE ================

export function projectedVacancyAddToProposedCycleErrored(bool) {
  return {
    type: 'PROJECTED_VACANCY_ADD_TO_PROPOSED_CYCLE_ERRORED',
    hasErrored: bool,
  };
}
export function projectedVacancyAddToProposedCycleLoading(bool) {
  return {
    type: 'PROJECTED_VACANCY_ADD_TO_PROPOSED_CYCLE_LOADING',
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
