import { batch } from 'react-redux';
import { get } from 'lodash';
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

export function panelMeetingAgendasExport(pmseqnum = '') {
  const ep = `/fsbid/panel/${pmseqnum}/agendas/export/`;
  return api()
    .get(ep)
    .then((response) => {
      downloadFromResponse(response, `Panel_Meeting_Agendas_${formatDate(new Date().getTime(), 'YYYY_M_D_Hms')}`);
    });
}

export function panelMeetingAgendasFetchData(query = {}, id) {
  return (dispatch) => {
    batch(() => {
      dispatch(panelMeetingAgendasFetchDataLoading(true));
      dispatch(panelMeetingAgendasFetchDataErrored(false));
    });
    const q = convertQueryToString(query);
    const endpoint = `/fsbid/panel/${id}/agendas/`;
    const ep = `${endpoint}?${q}`;
    dispatch(panelMeetingAgendasFetchDataLoading(true));
    api().get(ep)
      .then(({ data }) => {
        batch(() => {
          dispatch(panelMeetingAgendasFetchDataSuccess(data.results));
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

export function panelMeetingAgendasSelectionsSaveSuccess(result) {
  return {
    type: 'PANEL_MEETING_AGENDAS_SELECTIONS_SAVE_SUCCESS',
    result,
  };
}

export function savePanelMeetingAgendasSelections(queryObject) {
  return (dispatch) => dispatch(panelMeetingAgendasSelectionsSaveSuccess(queryObject));
}

export function selectedEditPanelMeetingSuccess(result) {
  return {
    type: 'SELECTED_EDIT_PANEL_MEETING_SUCCESS',
    result,
  };
}

export function selectedEditPanelMeetingIsLoading(bool) {
  return {
    type: 'SELECTED_EDIT_PANEL_MEETING_IS_LOADING',
    isLoading: bool,
  };
}

export function selectedEditPanelMeetingErrored(bool) {
  return {
    type: 'SELECTED_EDIT_PANEL_MEETING_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function saveSelectedEditPanelMeeting(panelMeeting) {
  return (dispatch) => {
    batch(() => {
      dispatch(selectedEditPanelMeetingIsLoading(true));
      dispatch(selectedEditPanelMeetingErrored(false));
    });
    if (Object.keys(panelMeeting).length) {
      batch(() => {
        dispatch(selectedEditPanelMeetingSuccess(panelMeeting));
        dispatch(selectedEditPanelMeetingErrored(false));
        dispatch(selectedEditPanelMeetingIsLoading(false));
      });
    } else {
      batch(() => {
        dispatch(selectedEditPanelMeetingSuccess({}));
        dispatch(selectedEditPanelMeetingErrored(true));
        dispatch(selectedEditPanelMeetingIsLoading(false));
      });
    }
  };
}
