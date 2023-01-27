import { batch } from 'react-redux';
import { get } from 'lodash';
import { CancelToken } from 'axios';
import { convertQueryToString, downloadFromResponse, formatDate } from 'utilities';
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

export function panelMeetingsFetchData(query = {}) {
  return (dispatch) => {
    if (cancelPanelMeetings) { cancelPanelMeetings('cancel'); }
    batch(() => {
      dispatch(panelMeetingsFetchDataLoading(true));
      dispatch(panelMeetingsFetchDataErrored(false));
    });
    const q = convertQueryToString(query);
    const endpoint = '/fsbid/panel/meetings/';
    const ep = `${endpoint}?${q}`;
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
            dispatch(panelMeetingsFetchDataErrored(true));
            dispatch(panelMeetingsFetchDataLoading(false));
          });
        }
      });
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

export function panelMeetingsFiltersFetchData() {
  return (dispatch) => {
    batch(() => {
      dispatch(panelMeetingsFiltersFetchDataLoading(true));
      dispatch(panelMeetingsFiltersFetchDataErrored(false));
    });
    const EPs = [
      // '/fsbid/panel/reference/categories/',
      // '/fsbid/panel/reference/dates/',
      '/fsbid/panel/reference/statuses/',
      '/fsbid/panel/reference/types/',
    ];
    const queryProms = EPs.map(url =>
      api().get(url)
        .then((r) => r)
        .catch((e) => e),
    );
    Q.allSettled(queryProms)
      .then((results) => {
        const refFilters = { /* panelCategories: [],
          panelDates: [], */
          panelStatuses: [],
          panelTypes: [] };

        let errCount = 0;

        results.forEach((p, i) => {
          const refFiltersKeys = Object.keys(refFilters);
          // handle Promise errors
          if (p.value.response || p.reason) {
            // eslint-disable-next-line no-plusplus
            errCount++;
            refFilters[refFiltersKeys[i]] = 'Error';
          } else {
            refFilters[refFiltersKeys[i]] = get(p, 'value.data.results') || [];
          }
        });

        // if more than half of the calls fail, then fail filters
        if (errCount > Math.floor(EPs.length / 2)) {
          batch(() => {
            dispatch(panelMeetingsFiltersFetchDataErrored(true));
            dispatch(panelMeetingsFiltersFetchDataErrored(false));
          });
        }

        batch(() => {
          dispatch(panelMeetingsFiltersFetchDataSuccess(refFilters));
          dispatch(panelMeetingsFiltersFetchDataErrored(false));
          dispatch(panelMeetingsFiltersFetchDataLoading(false));
        });
      })
      .catch(() => {
        batch(() => {
          dispatch(panelMeetingsFiltersFetchDataErrored(true));
          dispatch(panelMeetingsFiltersFetchDataLoading(false));
        });
      });
  };
}


export function panelMeetingsExport(query = {}) {
  const q = convertQueryToString(query);
  const endpoint = '/fsbid/agenda_employees/export/'; // Replace with correct endpoint when available
  const ep = `${endpoint}?${q}`;
  return api()
    .get(ep)
    .then((response) => {
      downloadFromResponse(response, `Panel_Meetings_${formatDate(new Date().getTime(), 'YYYY_M_D_Hms')}`);
    });
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
