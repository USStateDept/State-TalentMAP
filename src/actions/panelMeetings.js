import { batch } from 'react-redux';
import { get, keys, orderBy } from 'lodash';
import { CancelToken } from 'axios';
import { downloadFromResponse, formatDate, mapDuplicates } from 'utilities';
import Q from 'q';
import api from '../api';

// TO-DO: Update the naming/functionality in this file
// based on what the BE/WS returns

let cancelPanelMeetings;

export function panelMeetingsFetchDataErrored(bool) {
  return {
    type: 'PANEL_MEETINGS_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function panelMeetingsFetchDataLoading(bool) {
  return {
    type: 'PANEL_MEETINGS_FETCH_IS_LOADING',
    isLoading: bool,
  };
}

export function panelMeetingsFetchDataSuccess(results) {
  return {
    type: 'PANEL_MEETINGS_FETCH_SUCCESS',
    results,
  };
}

export function panelMeetingsFiltersFetchDataErrored(bool) {
  return {
    type: 'PANEL_MEETINGS_FILTERS_FETCH_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function panelMeetingsFiltersFetchDataLoading(bool) {
  return {
    type: 'PANEL_MEETINGS_FILTERS_FETCH_IS_LOADING',
    isLoading: bool,
  };
}

export function panelMeetingsFiltersFetchDataSuccess(results) {
  return {
    type: 'PANEL_MEETINGS_FILTERS_FETCH_SUCCESS',
    results,
  };
}

export function panelMeetingsExport(query = {}) {
  const endpoint = '/fsbid/panel_meetings/export/';
  const ep = `${endpoint}?${query}`;
  return api()
    .get(ep)
    .then((response) => {
      downloadFromResponse(response, `Panel_Meetings_${formatDate(new Date().getTime(), 'YYYY_M_D_Hms')}`);
    });
}

export function panelMeetingsFetchData(query = {}) {
  return (dispatch) => {
    if (cancelPanelMeetings) { cancelPanelMeetings('cancel'); }
    batch(() => {
      dispatch(panelMeetingsFetchDataLoading(true));
      dispatch(panelMeetingsFetchDataErrored(false));
    });
    const endpoint = '/fsbid/panel_meetings/';
    const ep = `${endpoint}?${query}`;
    api().get(ep, {
      cancelToken: new CancelToken((c) => {
        cancelPanelMeetings = c;
      }),
    })
      .then(({ data }) => {
        batch(() => {
          dispatch(panelMeetingsFetchDataSuccess(data));
          dispatch(panelMeetingsFetchDataErrored(false));
          dispatch(panelMeetingsFetchDataLoading(false));
        });
      })
      .catch((err) => {
        if (get(err, 'message') === 'cancel') {
          batch(() => {
            dispatch(panelMeetingsFetchDataErrored(false));
            dispatch(panelMeetingsFetchDataLoading(true));
          });
        } else {
          batch(() => {
            dispatch(panelMeetingsFetchDataSuccess([]));
            dispatch(panelMeetingsFetchDataErrored(true));
            dispatch(panelMeetingsFetchDataLoading(false));
          });
        }
      });
  };
}

export function panelMeetingsSelectionsSaveSuccess(result) {
  return {
    type: 'PANEL_MEETINGS_SELECTIONS_SAVE_SUCCESS',
    result,
  };
}

export function savePanelMeetingsSelections(queryObject) {
  return (dispatch) => dispatch(panelMeetingsSelectionsSaveSuccess(queryObject));
}

export function panelMeetingsFiltersFetchData() {
  return (dispatch) => {
    batch(() => {
      dispatch(panelMeetingsFiltersFetchDataLoading(true));
      dispatch(panelMeetingsFiltersFetchDataErrored(false));
    });
    const ep = [
      '/fsbid/panel_meetings/reference/type/',
      '/fsbid/panel_meetings/reference/status/',
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
            dispatch(panelMeetingsFiltersFetchDataErrored(true));
            dispatch(panelMeetingsFiltersFetchDataLoading(false));
          });
        } else {
          const type = get(results, '[0].value.data', []);
          const status = get(results, '[1].value.data', []);
          const filters = {
            type, status,
          };
          const transformFunction = e => ({ ...e, name: get(e, 'code') ? `${get(e, 'name')} (${get(e, 'code')})` : get(e, 'name') });
          keys(filters).forEach(k => {
            filters[k] = mapDuplicates(filters[k], 'name', transformFunction);
            filters[k] = orderBy(filters[k], 'name');
          });
          batch(() => {
            dispatch(panelMeetingsFiltersFetchDataSuccess(filters));
            dispatch(panelMeetingsFiltersFetchDataErrored(false));
            dispatch(panelMeetingsFiltersFetchDataLoading(false));
          });
        }
      })
      .catch(() => {
        batch(() => {
          dispatch(panelMeetingsFiltersFetchDataErrored(true));
          dispatch(panelMeetingsFiltersFetchDataLoading(false));
        });
      });
  };
}
