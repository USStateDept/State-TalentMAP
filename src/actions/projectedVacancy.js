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
import { get, keys, orderBy } from 'lodash';
import Q from 'q';
import api from '../api';
import { toastError, toastSuccess } from './toast';
import { convertQueryToString, mapDuplicates } from '../utilities';


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
export function projectedVacancyEdit(data) {
  return (dispatch) => {
    batch(() => {
      dispatch(projectedVacancyEditLoading(true));
      dispatch(projectedVacancyEditErrored(false));
    });

    api().put('/fsbid/projected_vacancies/edit/', data)
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

export function projectedVacancyFetchData(query = {}) {
  return (dispatch) => {
    batch(() => {
      dispatch(projectedVacancyFetchDataLoading(true));
      dispatch(projectedVacancyFetchDataErrored(false));
    });
    const q = convertQueryToString(query);
    const endpoint = '/fsbid/projected_vacancies/';
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
      dispatch(projectedVacancyFiltersFetchDataLoading(true));
      dispatch(projectedVacancyFiltersFetchDataErrored(false));
    });
    const ep = [
      '/fsbid/reference/cycles/',
      '/fsbid/reference/bureaus/',
      '/fsbid/reference/organizations/',
      '/fsbid/reference/skills/',
      '/fsbid/reference/grades/',
      '/fsbid/reference/locations/',
    ];
    const queryProms = ep.map(url =>
      api().get(url)
        .then((r) => r)
        .catch((e) => e),
    );
    Q.allSettled(queryProms)
      .then((results) => {
        const successCount = results.filter(r => get(r, 'state') === 'fulfilled' && get(r, 'value')).length || 0;
        const queryPromsLen = queryProms.length || 0;
        const countDiff = queryPromsLen - successCount;
        if (countDiff > 0) {
          batch(() => {
            dispatch(projectedVacancyFiltersFetchDataErrored(true));
            dispatch(projectedVacancyFiltersFetchDataLoading(false));
          });
        } else {
          const cycles = get(results, '[0].value.data', []);
          const bureaus = get(results, '[1].value.data', []);
          const organizations = get(results, '[2].value.data', []);
          const skills = get(results, '[3].value.data', []);
          const grades = get(results, '[4].value.data', []);
          const locations = get(results, '[5].value.data', []);
          const filters = {
            cycles, bureaus, organizations, skills, grades, locations,
          };
          const transformFunction = e => ({ ...e, name: get(e, 'code') ? `${get(e, 'name')} (${get(e, 'code')})` : get(e, 'name') });
          keys(filters).forEach(k => {
            filters[k] = mapDuplicates(filters[k], 'name', transformFunction);
            filters[k] = orderBy(filters[k], 'name');
          });
          batch(() => {
            dispatch(projectedVacancyFiltersFetchDataSuccess(filters));
            dispatch(projectedVacancyFiltersFetchDataErrored(false));
            dispatch(projectedVacancyFiltersFetchDataLoading(false));
          });
        }
      })
      .catch(() => {
        batch(() => {
          dispatch(projectedVacancyFiltersFetchDataErrored(true));
          dispatch(projectedVacancyFiltersFetchDataLoading(false));
        });
      });
  };
}
