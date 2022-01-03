
import { batch } from 'react-redux';
import { get } from 'lodash';
import { stringify } from 'query-string';
import { CancelToken } from 'axios';
import api from '../api';

let cancelAgendaEmployees;

export function agendaEmployeesFetchDataErrored(bool) {
  return {
    type: 'AGENDA_EMPLOYEES_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function agendaEmployeesFetchDataLoading(bool) {
  return {
    type: 'AGENDA_EMPLOYEES_FETCH_IS_LOADING',
    isLoading: bool,
  };
}

export function agendaEmployeesFetchDataSuccess(results) {
  return {
    type: 'AGENDA_EMPLOYEES_FETCH_SUCCESS',
    results,
  };
}

export function agendaEmployeesFetchData(query = {}) {
  return (dispatch) => {
    if (cancelAgendaEmployees) { cancelAgendaEmployees('cancel'); }
    batch(() => {
      dispatch(agendaEmployeesFetchDataLoading(true));
      dispatch(agendaEmployeesFetchDataErrored(false));
    });
    const query$ = stringify(query);
    const endpoint = '/fsbid/agenda_employees/';
    const q = `${endpoint}?${query$}`;
    api().get(q, {
      cancelToken: new CancelToken((c) => {
        cancelAgendaEmployees = c;
      }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(agendaEmployeesFetchDataSuccess(data));
          dispatch(agendaEmployeesFetchDataErrored(false));
          dispatch(agendaEmployeesFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (get(err, 'message') === 'cancel') {
          batch(() => {
            dispatch(agendaEmployeesFetchDataErrored(false));
            dispatch(agendaEmployeesFetchDataLoading(true));
          });
        } else {
          batch(() => {
            dispatch(agendaEmployeesFetchDataSuccess([]));
            dispatch(agendaEmployeesFetchDataErrored(true));
            dispatch(agendaEmployeesFetchDataLoading(false));
          });
        }
      });
  };
}

export function agendaEmployeesSelectionsSaveSuccess(result) {
  return {
    type: 'AGENDA_EMPLOYEES_SELECTIONS_SAVE_SUCCESS',
    result,
  };
}

export function saveAgendaEmployeesSelections(queryObject) {
  return (dispatch) => dispatch(agendaEmployeesSelectionsSaveSuccess(queryObject));
}

