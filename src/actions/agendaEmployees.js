import { batch } from 'react-redux';
import { get, keys, orderBy } from 'lodash';
import { CancelToken } from 'axios';
import { convertQueryToString, downloadFromResponse, formatDate, mapDuplicates } from 'utilities';
import Q from 'q';
import shortid from 'shortid';
import { toastError, toastInfo, toastSuccess } from './toast';
import api from '../api';
import { store } from '../store';

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

export function agendaEmployeesFiltersFetchDataErrored(bool) {
  return {
    type: 'AGENDA_EMPLOYEES_FILTERS_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function agendaEmployeesFiltersFetchDataLoading(bool) {
  return {
    type: 'AGENDA_EMPLOYEES_FILTERS_FETCH_IS_LOADING',
    isLoading: bool,
  };
}

export function agendaEmployeesFiltersFetchDataSuccess(results) {
  return {
    type: 'AGENDA_EMPLOYEES_FILTERS_FETCH_SUCCESS',
    results,
  };
}

export function employeeAgendaSearchExport(query = {}) {
  const q = convertQueryToString(query);
  const endpoint = '/fsbid/agenda_employees/export/';
  const ep = `${endpoint}?${q}`;
  // generate a unique ID to isUpdate the Toast with
  const id = shortid.generate();
  store.dispatch(toastInfo('Employee Agenda Search export may take a while, please wait while we process. ' +
    'Export is capped at first 500 results.', 'Loading...', id));
  return api()
    .get(ep)
    .then((response) => {
      downloadFromResponse(response, `agenda_employees_${formatDate(new Date().getTime(), 'YYYY_M_D_Hms')}`);
      store.dispatch(toastSuccess('Employee Agenda Search Exported', 'Success', id, true));
    }).catch(() => {
      const text = 'Sorry, an error has occurred while processing your Employee Agenda Search export. Please try again.';
      store.dispatch(toastError(text, 'Employee Agenda Search Export Error', id, true));
    });
}

export function agendaEmployeesFetchData(query = {}) {
  return (dispatch) => {
    if (cancelAgendaEmployees) { cancelAgendaEmployees('cancel'); }
    batch(() => {
      dispatch(agendaEmployeesFetchDataLoading(true));
      dispatch(agendaEmployeesFetchDataErrored(false));
    });
    const q = convertQueryToString(query);
    const endpoint = '/fsbid/agenda_employees/';
    const ep = `${endpoint}?${q}`;
    api().get(ep, {
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

export function agendaEmployeesFiltersFetchData() {
  return (dispatch) => {
    batch(() => {
      dispatch(agendaEmployeesFiltersFetchDataLoading(true));
      dispatch(agendaEmployeesFiltersFetchDataErrored(false));
    });
    const ep = [
      '/fsbid/agenda_employees/reference/current-bureaus/',
      '/fsbid/agenda_employees/reference/handshake-bureaus/',
      '/fsbid/agenda_employees/reference/current-organizations/',
      '/fsbid/agenda_employees/reference/handshake-organizations/',
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
            dispatch(agendaEmployeesFiltersFetchDataErrored(true));
            dispatch(agendaEmployeesFiltersFetchDataLoading(false));
          });
        } else {
          const currentBureaus = get(results, '[0].value.data', []);
          const handshakeBureaus = get(results, '[1].value.data', []);
          const currentOrganizations = get(results, '[2].value.data', []);
          const handshakeOrganizations = get(results, '[3].value.data', []);
          const filters = {
            currentBureaus, handshakeBureaus, currentOrganizations, handshakeOrganizations,
          };
          const transformFunction = e => ({ ...e, name: get(e, 'code') ? `${get(e, 'name')} (${get(e, 'code')})` : get(e, 'name') });
          keys(filters).forEach(k => {
            filters[k] = mapDuplicates(filters[k], 'name', transformFunction);
            filters[k] = orderBy(filters[k], 'name');
          });
          batch(() => {
            dispatch(agendaEmployeesFiltersFetchDataSuccess(filters));
            dispatch(agendaEmployeesFiltersFetchDataErrored(false));
            dispatch(agendaEmployeesFiltersFetchDataLoading(false));
          });
        }
      })
      .catch(() => {
        batch(() => {
          dispatch(agendaEmployeesFiltersFetchDataErrored(true));
          dispatch(agendaEmployeesFiltersFetchDataLoading(false));
        });
      });
  };
}
