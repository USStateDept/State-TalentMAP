import { batch } from 'react-redux';
import { get, sortBy } from 'lodash';
import { convertQueryToString, downloadFromResponse, formatDate } from 'utilities';
import api from '../api';

// ======================== Panel Meeting Agendas ========================
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

export function panelMeetingAgendasFetchData(query = {}) {
  return (dispatch) => {
    batch(() => {
      dispatch(panelMeetingAgendasFetchDataLoading(true));
      dispatch(panelMeetingAgendasFetchDataErrored(false));
    });
    const q = convertQueryToString(query);
    const endpoint = '/fsbid/agenda/agenda_items/';
    const ep = `${endpoint}?${q}`;
    dispatch(panelMeetingAgendasFetchDataLoading(true));
    api().get(ep)
      .then(({ data }) => {
        batch(() => {
          dispatch(panelMeetingAgendasFetchDataSuccess(data));
          dispatch(panelMeetingAgendasFetchDataErrored(false));
          dispatch(panelMeetingAgendasFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (get(err, 'message') === 'cancel') {
          batch(() => {
            dispatch(panelMeetingAgendasFetchDataErrored(false));
            dispatch(panelMeetingAgendasFetchDataLoading(true));
          });
        } else {
          batch(() => {
            dispatch(panelMeetingAgendasFetchDataSuccess([]));
            dispatch(panelMeetingAgendasFetchDataErrored(true));
            dispatch(panelMeetingAgendasFetchDataLoading(false));
          });
        }
      });
  };
}

// ======================== Panel Meeting Agendas Filters ========================
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

export function panelMeetingAgendasFiltersFetchData() {
  return (dispatch) => {
    batch(() => {
      dispatch(panelMeetingAgendasFiltersFetchDataLoading(true));
      dispatch(panelMeetingAgendasFiltersFetchDataErrored(false));
    });

    const endpoints = [
      'fsbid/agenda/remarks/',
      'fsbid/agenda/statuses/',
      '/fsbid/agenda/leg_action_types/',
      '/fsbid/panel/reference/categories/',
      '/fsbid/agenda_employees/reference/current-organizations/',
    ];

    const requests = endpoints.map(endpoint => api().get(endpoint));


    Promise.all(requests)
      .then((responses) => {
        const data = {
          remarks: get(responses[0], 'data.results', []),
          statuses: get(responses[1], 'data.results', []),
          actions: get(responses[2], 'data.results', []),
          categories: get(responses[3], 'data.results', []),
          currentOrganizations: get(responses[4], 'data', []),
        };

        // Sort results
        data.remarks = sortBy(data.remarks, [(r) => r.short_desc_text.toLowerCase()]);
        data.statuses = sortBy(data.statuses, [(s) => s.desc_text]);
        data.actions = sortBy(data.actions, [(a) => a.desc_text]);
        data.categories = sortBy(data.categories, [(c) => c.mic_desc_text]);
        data.currentOrganizations = sortBy(data.currentOrganizations, [(o) => o.name]);

        batch(() => {
          dispatch(panelMeetingAgendasFiltersFetchDataSuccess(data));
          dispatch(panelMeetingAgendasFiltersFetchDataErrored(false));
          dispatch(panelMeetingAgendasFiltersFetchDataLoading(false));
        });
      })
      .catch(() => {
        batch(() => {
          dispatch(panelMeetingAgendasFiltersFetchDataErrored(true));
          dispatch(panelMeetingAgendasFiltersFetchDataLoading(false));
        });
      });
  };
}

// ======================== Panel Meeting Agendas Selections ========================
export function panelMeetingAgendasSelectionsSaveSuccess(result) {
  return {
    type: 'PANEL_MEETING_AGENDAS_SELECTIONS_SAVE_SUCCESS',
    result,
  };
}

export function savePanelMeetingAgendasSelections(queryObject) {
  return (dispatch) => dispatch(panelMeetingAgendasSelectionsSaveSuccess(queryObject));
}

// ======================== Panel Meeting Agendas Export ========================
export function panelMeetingAgendasExport(pmseqnum = '') {
  const ep = `/fsbid/panel/${pmseqnum}/agendas/export/`;
  return api()
    .get(ep)
    .then((response) => {
      downloadFromResponse(response, `Panel_Meeting_Agendas_${formatDate(new Date().getTime(), 'YYYY_M_D_Hms')}`);
    });
}
