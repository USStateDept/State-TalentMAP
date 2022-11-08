import { batch } from 'react-redux';
import { get } from 'lodash';
import { CancelToken } from 'axios';
import { convertQueryToString, downloadFromResponse, formatDate } from 'utilities';
import api from '../api';

let cancelPanelMeetingAgendas;

const dummyAgenda = [
  {
    id: 155,
    position_id: 89413,
    panel_date: '2015-02-14T00:00:00Z',
    status: 'BR',
    status_full: 'Item Status: Ready',
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

export function panelMeetingAgendasFetchData(query = {}) {
  return (dispatch) => {
    if (cancelPanelMeetingAgendas) { cancelPanelMeetingAgendas('cancel'); }
    batch(() => {
      dispatch(panelMeetingAgendasFetchDataLoading(true));
      dispatch(panelMeetingAgendasFetchDataErrored(false));
    });
    const q = convertQueryToString(query);
    const endpoint = '/fsbid/panel_agendas/';
    const ep = `${endpoint}?${q}`;
    api().get(ep, {
      cancelToken: new CancelToken((c) => {
        cancelPanelMeetingAgendas = c;
      }),
    })
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
  // return (dispatch) => {
  //   batch(() => {
  //     dispatch(panelMeetingAgendasFiltersFetchDataLoading(true));
  //     dispatch(panelMeetingAgendasFiltersFetchDataErrored(false));
  //   });
  //   const ep = [
  //     '/fsbid/panel_meetings/reference/type/',
  //     '/fsbid/panel_meetings/reference/status/',
  //   ];
  //   const queryProms = ep.map(url =>
  //     api().get(url)
  //       .then((r) => r)
  //       .catch((e) => e),
  //   );
  //   Q.allSettled(queryProms)
  //     .then((results) => {
  //       const successCount = results.filter(r => get(r, 'state') ===
  // 'fulfilled' && get(r, 'value')).length || 0;
  //       const queryPromsLen = queryProms.length || 0;
  //       const countDiff = queryPromsLen - successCount;
  //       if (countDiff > 0) {
  //         batch(() => {
  //           dispatch(panelMeetingAgendasFiltersFetchDataErrored(true));
  //           dispatch(panelMeetingAgendasFiltersFetchDataLoading(false));
  //         });
  //       } else {
  //         const type = get(results, '[0].value.data', []);
  //         const status = get(results, '[1].value.data', []);
  //         const filters = {
  //           type, status,
  //         };
  //         const transformFunction = e => ({ ...e, name: get(e, 'code') ?
  // `${get(e, 'name')} (${get(e, 'code')})` : get(e, 'name')});
  //         keys(filters).forEach(k => {
  //           filters[k] = mapDuplicates(filters[k], 'name', transformFunction);
  //           filters[k] = orderBy(filters[k], 'name');
  //         });
  //         batch(() => {
  //           dispatch(panelMeetingAgendasFiltersFetchDataSuccess(filters));
  //           dispatch(panelMeetingAgendasFiltersFetchDataErrored(false));
  //           dispatch(panelMeetingAgendasFiltersFetchDataLoading(false));
  //         });
  //       }
  //     })
  //     .catch(() => {
  //       batch(() => {
  //         dispatch(panelMeetingAgendasFiltersFetchDataErrored(true));
  //         dispatch(panelMeetingAgendasFiltersFetchDataLoading(false));
  //       });
  //     });
  // };
}

export function panelMeetingAgendasLoadAgendasErrored(bool) {
  return {
    type: 'PANEL_MEETING_AGENDAS_LOAD_AGENDAS_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function panelMeetingAgendasLoadAgendasIsLoading(bool) {
  return {
    type: 'PANEL_MEETING_AGENDAS_LOAD_AGENDAS_IS_LOADING',
    isLoading: bool,
  };
}

export function panelMeetingAgendasLoadAgendasSuccess(results) {
  return {
    type: 'PANEL_MEETING_AGENDAS_LOAD_AGENDAS_SUCCESS',
    results,
  };
}

export function panelMeetingAgendasLoadAgendas() {
  return (dispatch) => {
    batch(() => {
      dispatch(panelMeetingAgendasLoadAgendasSuccess(dummyAgenda));
      dispatch(panelMeetingAgendasLoadAgendasIsLoading(false));
      dispatch(panelMeetingAgendasLoadAgendasErrored(false));
    });
  };
}
