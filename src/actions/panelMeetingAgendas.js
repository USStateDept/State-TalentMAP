import { batch } from 'react-redux';
import { convertQueryToString, downloadFromResponse, formatDate } from 'utilities';
import api from '../api';

export function panelMeetingAgendasFetchDataErrored(bool) {
  return {
    type: 'PANEL_MEETING_AGENDAS_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function panelMeetingAgendasFetchDataLoading(bool) {
  return {
    type: 'PANEL_MEETING_AGENDAS_FETCH_IS_LOADING',
    isLoading: bool,
  };
}

export function panelMeetingAgendasFetchDataSuccess(results) {
  return {
    type: 'PANEL_MEETING_AGENDAS_FETCH_SUCCESS',
    results,
  };
}

export function panelMeetingAgendasFiltersFetchDataErrored(bool) {
  return {
    type: 'PANEL_MEETING_AGENDAS_FILTERS_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function panelMeetingAgendasFiltersFetchDataLoading(bool) {
  return {
    type: 'PANEL_MEETING_AGENDAS_FILTERS_FETCH_IS_LOADING',
    isLoading: bool,
  };
}

export function panelMeetingAgendasFiltersFetchDataSuccess(results) {
  return {
    type: 'PANEL_MEETING_AGENDAS_FILTERS_FETCH_SUCCESS',
    results,
  };
}

export function panelMeetingAgendasExport(query = {}) {
  const q = convertQueryToString(query);
  const endpoint = '/fsbid/agenda_employees/export/'; // Replace with correct endpoint when available
  const ep = `${endpoint}?${q}`;
  return api()
    .get(ep)
    .then((response) => {
      downloadFromResponse(response, `Panel_Meeting_Agendas_${formatDate(new Date().getTime(), 'YYYY_M_D_Hms')}`);
    });
}

export function panelMeetingAgendasFetchData(query = {}, id) {
  return (dispatch) => {
    const q = convertQueryToString(query);
    const endpoint = `/fsbid/panel/${id}/agendas`;
    const ep = `${endpoint}?${q}`;
    api().get(ep)
      .then(({ data }) => {
        batch(() => {
          dispatch(panelMeetingAgendasFetchDataSuccess(data));
          dispatch(panelMeetingAgendasFetchDataErrored(false));
          dispatch(panelMeetingAgendasFetchDataLoading(false));
        });
      });
  };
}

export function panelMeetingAgendasSelectionsSaveSuccess(result) {
  return {
    type: 'PANEL_MEETING_AGENDAS_SELECTIONS_SAVE_SUCCESS',
    result,
  };
}

export function savePanelMeetingAgendasSelections(queryObject) {
  return (dispatch) => dispatch(panelMeetingAgendasSelectionsSaveSuccess(queryObject));
}

export function panelMeetingAgendasFiltersFetchData() {
  return (dispatch) => {
    batch(() => {
      dispatch(panelMeetingAgendasFiltersFetchDataSuccess({}));
      dispatch(panelMeetingAgendasFiltersFetchDataLoading(false));
    });
  };
}
