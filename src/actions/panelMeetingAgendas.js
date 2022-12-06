import { batch } from 'react-redux';
import { convertQueryToString, downloadFromResponse, formatDate } from 'utilities';
import api from '../api';

const dummyAgenda = [
  {
    id: 155,
    position_id: 89413,
    panel_date: '2015-02-14T00:00:00Z',
    status: 'BR',
    status_full: 'Item Status: Ready',
    skill: 'CONSULAR AFFAIRS (3001)',
    bureau: '(DGHR) DIR GEN OF THE FOR SER & DIR OF HUMAN RESOURCES',
    language: 'Spanish 3/3',
    grade: '03',
    creators:
      {
        hruempseqnbr: null,
        hruneuid: 87496,
        hruid: 65426,
        neuid: 87496,
        last_name: 'Woodward',
        first_name: 'Wendy',
        neumiddlenm: 'Cléopatre',
      },
    updaters:
      {
        hruempseqnbr: null,
        hruneuid: 87496,
        hruid: 65426,
        neuid: 87496,
        last_name: 'Andrews',
        first_name: 'John',
        neumiddlenm: 'Cléopatre',
      },
    remarks: [
      {
        active_ind: 'Y',
        mutually_exclusive_ind: 'N',
        order_num: 7,
        rc_code: 'B',
        seq_num: 2,
        short_desc_text: 'Promo Bd Recognized',
        text: 'Potential recognized by last promo board',
      },
      {
        active_ind: 'Y',
        mutually_exclusive_ind: 'N',
        order_num: 5,
        rc_code: 'G',
        seq_num: 3,
        short_desc_text: 'Soph',
        text: 'Sophie',
      }],
    legs: [{
      grade: '03',
      pos_num: '56100035',
      pos_title: 'SPECIAL AGENT',
      org: 'A/LM/OPS/TTM',
      eta: '2015-02-14T00:00:00Z',
      ted: '2015-02-14T00:00:00Z',
      action: 'Extend (by 3 months)',
      travel: 'PostToPostHL',
    },
    {
      grade: '03',
      pos_num: '56100035',
      pos_title: 'SPECIAL AGENT',
      org: 'A/LM/OPS/TTM',
      eta: '2015-02-14T00:00:00Z',
      ted: '2015-02-14T00:00:00Z',
      tod: '27MRR',
      action: 'Extend (by 3 months)',
      travel: 'PostToPostHL',
    },
    {
      grade: 'OM',
      eta: '2015-02-14T00:00:00Z',
      ted: '2015-02-14T00:00:00Z',
      tod: '2YRR',
      org: 'BERLIN USEMB',
      pos_num: 'S5764000',
      pos_title: 'HR OFF CAREER MANAGEMENT',
    }],
  }];

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

export function panelMeetingAgendasFetchData() {
  return (dispatch) => {
    batch(() => {
      dispatch(panelMeetingAgendasFetchDataSuccess(dummyAgenda));
      dispatch(panelMeetingAgendasFetchDataLoading(false));
      dispatch(panelMeetingAgendasFetchDataErrored(false));
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
