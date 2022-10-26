import { batch } from 'react-redux';
import { get } from 'lodash';
import { CancelToken } from 'axios';
import { convertQueryToString, downloadFromResponse, formatDate } from 'utilities';
import api from '../api';

let cancelPanelMeetingAgendas;

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
  // remove once be/ws is hooked up
  const filters = {
    bureau: [
      { description: 'BUREAU OF ADMINISTRATION', code: 'A' },
      { description: 'BUREAU OF AFRICAN AFFAIRS', code: 'AF' },
      { description: 'BUREAU OF DIPLOMATIC SECURITY', code: 'DS' },
    ],
    category: [
      { description: 'Category 1', code: 'C1' },
      { description: 'Category 2', code: 'C2' },
      { description: 'Category 3', code: 'C3' },
    ],
    grade: [
      { description: '01', code: '01' },
      { description: '02', code: '02' },
      { description: '03', code: '03' },
    ],
    itemAction: [
      { description: 'Item Action 1', code: 'IA1' },
      { description: 'Item Action 2', code: 'IA2' },
      { description: 'Item Action 3', code: 'IA3' },
    ],
    itemStatus: [
      { description: 'Item Status 1', code: 'IS1' },
      { description: 'Item Status 2', code: 'IS2' },
      { description: 'Item Status 3', code: 'IS3' },
    ],
    language: [
      { description: 'Albanian (AB)', code: 'AB' },
      { description: 'Czech (CX)', code: 'CX' },
      { description: 'Dutch (DU)', code: 'DU' },
    ],
    location: [
      { description: 'Baden, Hong Kong', code: 'BHK' },
      { description: 'Bynum, Denmark', code: 'BD' },
      { description: 'Cumberland, Iowa', code: 'CI' },
    ],
    overseas: [
      { description: 'Overseas 1', code: 'OS1' },
      { description: 'Overseas 2', code: 'OS2' },
      { description: 'Overseas 3', code: 'OS3' },
    ],
    remarks: [
      { description: 'Critical Need Position', code: 'CNP' },
      { description: 'High Differential Post', code: 'HDP' },
      { description: 'SND Post', code: 'SND' },
    ],
    skill: [
      { description: 'CONSULAR AFFAIRS (3001)', code: '3001' },
      { description: 'ECONOMICS (5015)', code: '5015' },
      { description: 'INFORMATION MANAGEMENT (2880)', code: '2880' },
    ],
  };
  return (dispatch) => {
    batch(() => {
      dispatch(panelMeetingAgendasFiltersFetchDataSuccess(filters));
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
